import {
    type Blending,
    DoubleSide,
    NormalBlending,
    ShaderMaterial,
    type Side,
    Uniform,
    Vector3,
} from "three";

/**
 * Parameters for configuring the enhanced AtmosphereMaterial
 */
export interface AtmosphereMaterialParameters {
    /** Inner radius of the atmosphere (default: 1.0) */
    innerRadius?: number;
    /** Outer radius of the atmosphere (default: 1.5) */
    outerRadius?: number;
    /** Rayleigh scattering coefficient (default: [3.8, 13.5, 33.1]) */
    rayleighCoefficient?: Vector3;
    /** Mie scattering coefficient (default: 21.0) */
    mieCoefficient?: number;
    /** Mie scattering direction (default: -0.78) */
    mieDirectionalG?: number;
    /** Sun/light direction (default: [0, 0, 1]) */
    lightDirection?: Vector3;
    /** The opacity of the atmosphere (default: 1.0) */
    opacity?: number;
    /** The rendering side (default: THREE.DoubleSide) */
    side?: Side;
    /** Enable or disable depth testing (default: false) */
    depthTest?: boolean;
    /** Custom blending mode (default: THREE.AdditiveBlending) */
    blendMode?: Blending;
}

/**
 * Enhanced AtmosphereMaterial with complete spherical scattering
 */
export class AtmosphereMaterial extends ShaderMaterial {
    declare uniforms: {
        innerRadius: { value: number };
        outerRadius: { value: number };
        rayleighCoefficient: { value: Vector3 };
        mieCoefficient: { value: number };
        mieDirectionalG: { value: number };
        lightDirection: { value: Vector3 };
        opacity: { value: number };
    };

    private static readonly vertexShader = `
        varying vec3 vWorldPosition;
        varying vec3 vNormal;
        varying vec3 vPositionW;
        
        void main() {
            vec4 worldPosition = modelMatrix * vec4(position, 1.0);
            vWorldPosition = worldPosition.xyz;
            vPositionW = (modelMatrix * vec4(position, 1.0)).xyz;
            vNormal = normalize((modelMatrix * vec4(normal, 0.0)).xyz);
            gl_Position = projectionMatrix * viewMatrix * worldPosition;
        }
    `;

    private static readonly fragmentShader = `
        uniform vec3 rayleighCoefficient;
        uniform float mieCoefficient;
        uniform float mieDirectionalG;
        uniform float innerRadius;
        uniform float outerRadius;
        uniform vec3 lightDirection;
        uniform float opacity;

        varying vec3 vWorldPosition;
        varying vec3 vNormal;
        varying vec3 vPositionW;

        const float PI = 3.14159265359;
        const int NUM_OUT_SCATTER = 8;
        const int NUM_IN_SCATTER = 80;
        const float EPSILON = 0.000001;
        
        // Ray vs sphere intersection
        vec2 raySphereIntersect(vec3 ro, vec3 rd, float sr) {
            // More stable ray-sphere intersection
            float a = dot(rd, rd);
            vec3 s0_r0 = ro;
            float b = 2.0 * dot(rd, s0_r0);
            float c = dot(s0_r0, s0_r0) - (sr * sr);
            float disc = b*b - 4.0*a*c;
            
            if (disc < 0.0) {
                return vec2(100000.0, -100000.0);
            }
            
            float diskSqrt = sqrt(disc);
            float q = (-b - diskSqrt) / 2.0;
            float t0 = q / a;
            float t1 = c / q;
            
            if (t0 > t1) {
                float temp = t0;
                t0 = t1;
                t1 = temp;
            }
            
            return vec2(t0, t1);
        }

        // Mie scattering phase function
        float phaseMie(float g, float c, float cc) {
            float gg = g * g;
            float a = (1.0 - gg) * (1.0 + cc);
            float b = 1.0 + gg - 2.0 * g * c;
            b *= sqrt(b);
            b *= 2.0 + gg;
            return (3.0 / 8.0 / PI) * a / b;
        }

        // Rayleigh phase function
        float phaseRayleigh(float cc) {
            return (3.0 / 16.0 / PI) * (1.0 + cc);
        }

        // Atmospheric density at point
        float density(vec3 p, float ph) {
            float altitude = length(p) - innerRadius;
            return exp(-altitude / ph);
        }

        // Optical depth calculation
        float opticalDepth(vec3 p, vec3 q, float ph) {
            vec3 step = (q - p) / float(NUM_OUT_SCATTER);
            vec3 v = p + step * 0.5;
            
            float sum = 0.0;
            for(int i = 0; i < NUM_OUT_SCATTER; i++) {
                sum += density(v, ph);
                v += step;
            }
            
            return sum * length(step);
        }

        vec3 calculateScattering(vec3 startPos, vec3 rayDir, vec3 sphereCenter) {
            const float ph_ray = 0.05; // Rayleigh scattering height
            const float ph_mie = 0.02; // Mie scattering height
            const float k_mie_ex = 1.1; // Mie extinction factor
            
            // Adjust ray starting position and direction relative to sphere center
            vec3 rayStart = startPos - sphereCenter;
            float rayLength = length(rayStart);
            
            // Calculate intersections with atmosphere
            vec2 outerIntersections = raySphereIntersect(rayStart, rayDir, outerRadius);
            
            // Skip if ray doesn't intersect atmosphere
            if (outerIntersections.x > outerIntersections.y) return vec3(0.0);
            
            // Adjust start position to be at atmosphere entry
            outerIntersections.x = max(outerIntersections.x, 0.0);
            vec3 entryPoint = rayStart + rayDir * outerIntersections.x;
            
            // Calculate intersections with planet
            vec2 innerIntersections = raySphereIntersect(rayStart, rayDir, innerRadius);
            
            // Adjust end position based on planet intersection
            float rayDistance = outerIntersections.y;
            if (innerIntersections.x > 0.0 && innerIntersections.x < rayDistance) {
                rayDistance = innerIntersections.x;
            }
            
            // Calculate scattering
            float stepSize = (rayDistance - outerIntersections.x) / float(NUM_IN_SCATTER);
            vec3 step = rayDir * stepSize;
            vec3 p = entryPoint + step * 0.5;
            
            vec3 sumRay = vec3(0.0);
            vec3 sumMie = vec3(0.0);
            float opticalDepthRay = 0.0;
            float opticalDepthMie = 0.0;
            
            for(int i = 0; i < NUM_IN_SCATTER; i++) {
                float h = length(p) - innerRadius;
                
                // Skip points inside the planet
                if (h < 0.0) {
                    p += step;
                    continue;
                }
                
                float densityRay = exp(-h / ph_ray) * stepSize;
                float densityMie = exp(-h / ph_mie) * stepSize;
                
                opticalDepthRay += densityRay;
                opticalDepthMie += densityMie;
                
                // Calculate light contribution
                vec2 lightIntersection = raySphereIntersect(p, lightDirection, outerRadius);
                if (lightIntersection.x < lightIntersection.y) {
                    vec3 q = p + lightDirection * lightIntersection.y;
                    
                    float opticalDepthLightRay = opticalDepth(p, q, ph_ray);
                    float opticalDepthLightMie = opticalDepth(p, q, ph_mie);
                    
                    vec3 attenuation = exp(
                        -rayleighCoefficient * (opticalDepthRay + opticalDepthLightRay)
                        - mieCoefficient * k_mie_ex * (opticalDepthMie + opticalDepthLightMie)
                    );
                    
                    sumRay += densityRay * attenuation;
                    sumMie += densityMie * attenuation;
                }
                
                p += step;
            }
            
            float cosTheta = dot(rayDir, -lightDirection);
            float cos2Theta = cosTheta * cosTheta;
            
            return (
                sumRay * rayleighCoefficient * phaseRayleigh(cos2Theta) +
                sumMie * mieCoefficient * phaseMie(mieDirectionalG, cosTheta, cos2Theta)
            ) * 15.0; // Increased intensity factor
        }

        void main() {
            vec3 viewDir = normalize(vWorldPosition - cameraPosition);
            vec3 sphereCenter = vec3(0.0, 0.0, 0.0); // Assuming planet is at origin
            
            vec3 scatter = calculateScattering(cameraPosition, viewDir, sphereCenter);
            
            // Apply gamma correction and exposure
            vec3 color = pow(scatter, vec3(1.0 / 2.2));
            
            // Fade out atmosphere at edges
            float edge = 1.0 - pow(abs(dot(normalize(vNormal), viewDir)), 2.0);
            
            gl_FragColor = vec4(color, opacity * edge);
            
            #include <tonemapping_fragment>
            #include <colorspace_fragment>
        }
    `;

    constructor(parameters: AtmosphereMaterialParameters = {}) {
        super();

        this.vertexShader = AtmosphereMaterial.vertexShader;
        this.fragmentShader = AtmosphereMaterial.fragmentShader;

        // Initialize uniforms with default values
        this.uniforms = {
            innerRadius: new Uniform(parameters.innerRadius ?? 1.0),
            outerRadius: new Uniform(parameters.outerRadius ?? 1.5),
            rayleighCoefficient: new Uniform(
                parameters.rayleighCoefficient ?? new Vector3(3.8, 13.5, 33.1),
            ),
            mieCoefficient: new Uniform(parameters.mieCoefficient ?? 21.0),
            mieDirectionalG: new Uniform(parameters.mieDirectionalG ?? -0.78),
            lightDirection: new Uniform(
                parameters.lightDirection ?? new Vector3(0, 0, 1),
            ),
            opacity: new Uniform(parameters.opacity ?? 1.0),
        };

        // Set material properties
        this.transparent = true;
        this.depthTest = parameters.depthTest ?? false;
        this.blending = parameters.blendMode ?? NormalBlending;
        this.side = parameters.side ?? DoubleSide;
    }

    /**
     * Updates the inner radius of the atmosphere
     */
    setInnerRadius(radius: number): void {
        this.uniforms.innerRadius.value = radius;
    }

    /**
     * Updates the outer radius of the atmosphere
     */
    setOuterRadius(radius: number): void {
        this.uniforms.outerRadius.value = radius;
    }

    /**
     * Updates the Rayleigh scattering coefficient
     */
    setRayleighCoefficient(coefficient: Vector3): void {
        this.uniforms.rayleighCoefficient.value.copy(coefficient);
    }

    /**
     * Updates the Mie scattering coefficient
     */
    setMieCoefficient(coefficient: number): void {
        this.uniforms.mieCoefficient.value = coefficient;
    }

    /**
     * Updates the Mie directional coefficient
     */
    setMieDirectionalG(g: number): void {
        this.uniforms.mieDirectionalG.value = g;
    }

    /**
     * Updates the light direction
     */
    setLightDirection(direction: Vector3): void {
        this.uniforms.lightDirection.value.copy(direction.normalize());
    }

    /**
     * Updates the opacity of the atmosphere
     */
    setOpacity(opacity: number): void {
        this.uniforms.opacity.value = Math.max(0, Math.min(1, opacity));
    }
}

export default AtmosphereMaterial;
