import type { Feature, FeatureCollection } from "geojson";
import {
    AdditiveBlending,
    AmbientLight,
    type BufferGeometry,
    Clock,
    Color,
    DirectionalLight,
    Euler,
    Fog,
    type Material,
    Mesh,
    MeshLambertMaterial,
    PerspectiveCamera,
    PointLight,
    Scene,
    SphereGeometry,
    TubeGeometry,
    Vector3,
    WebGLRenderer,
} from "three";
import ThreeGlobe from "three-globe";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { degToRad } from "three/src/math/MathUtils.js";
import AtmosphereMaterial, { type AtmosphereMaterialParameters } from "./glow";
import { CustomOrbitCurve } from "./orbit";

export class GlowMesh extends Mesh {
    constructor(geometry: BufferGeometry, glow: AtmosphereMaterialParameters) {
        super();

        const fakeGlowMaterial = new AtmosphereMaterial(glow);

        this.geometry = geometry;
        this.material = fakeGlowMaterial;
    }
}

/**
 * Configuration options for the Globe visualization
 */
interface GlobeConfig {
    /** DOM element to attach the renderer to */
    container: HTMLElement;
    /** Initial width of the visualization */
    width: number;
    /** Initial height of the visualization */
    height: number;
    /** Minimum camera distance */
    minDistance?: number;
    /** Maximum camera distance */
    maxDistance?: number;
    /** Auto-rotation speed (0 for no rotation) */
    autoRotateSpeed?: number;
}

/**
 * Flight data structure for arc visualization
 */
export interface FlightData {
    /** Starting point coordinates */
    start: [number, number];
    /** Ending point coordinates */
    end: [number, number];
    /** Arc altitude */
    arcAlt: number;
    /** Flight status */
    status: boolean;
    /** Order for animation */
    order: number;
}

/**
 * Airport data structure for labels and points
 */
export interface AirportData {
    /** Airport city name */
    city: string;
    /** Airport coordinates */
    coordinates: [number, number];
    /** Label size */
    size: number;
}

/**
 * Orbits data structure for orbit visualization
 */
export interface OrbitData {
    apoapsis: number;
    periapsis: number;
    inclination: number;
}

export interface GlobeVisualizationConstants {
    /** Amount that all time values should be scaled by */
    timeScale: number;
    /** Earth's axial tilt in degrees */
    earthAxialTilt: number;
}

/**
 * Manages a 3D globe visualization with flight paths and airport markers
 */
export class GlobeVisualization {
    private renderer!: WebGLRenderer;
    private scene!: Scene;
    private camera!: PerspectiveCamera;
    private controls!: OrbitControls;
    private globe!: ThreeGlobe;
    private clock: Clock = new Clock();
    private atmosphere!: GlowMesh;
    private orbits: Mesh[] = [];
    private mouseX = 0;
    private mouseY = 0;
    private windowHalfX: number;
    private windowHalfY: number;
    public currentDate = new Date();
    public constants: GlobeVisualizationConstants = {
        timeScale: 1000,
        earthAxialTilt: 23.5,
    };

    /**
     * Creates a new globe visualization
     * @param config - Configuration options for the globe
     */
    constructor(private config: GlobeConfig) {
        this.windowHalfX = config.width / 2;
        this.windowHalfY = config.height / 2;

        this.initScene();
        this.initGlobe();
        this.initAtmosphere();
        this.setupEventListeners();
        this.animate();
    }

    /**
     * Initializes the Three.js scene, camera, and renderer
     */
    private initScene(): void {
        // Initialize renderer
        this.renderer = new WebGLRenderer({ antialias: false, alpha: true });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(this.config.width, this.config.height);
        this.renderer.setClearColor(0x000000, 0);
        this.config.container.appendChild(this.renderer.domElement);

        // Initialize scene
        this.scene = new Scene();
        this.scene.add(new AmbientLight(0xbbbbbb, 0.3));
        this.scene.background = null;
        this.scene.fog = new Fog(0x535ef3, 400, 2000);

        // Initialize camera
        this.camera = new PerspectiveCamera();
        this.camera.aspect = this.config.width / this.config.height;
        this.camera.updateProjectionMatrix();
        this.camera.position.set(0, 0, 400);

        // Add lights
        const lights = this.createLights();
        for (const light of lights) {
            this.camera.add(light);
        }
        this.scene.add(this.camera);

        // Initialize controls
        this.controls = this.createControls();
    }

    /**
     * Creates the lighting setup for the scene
     * @returns Array of lights
     */
    private createLights() {
        const mainLight = new DirectionalLight(0xffffff, 0.8);
        mainLight.position.set(-800, 2000, 400);

        const accentLight = new DirectionalLight(0x7982f6, 1);
        accentLight.position.set(-200, 500, 200);

        const pointLight = new PointLight(0x8566cc, 0.5);
        pointLight.position.set(-200, 500, 200);

        return [
            /* mainLight, accentLight, pointLight */
        ];
    }

    /**
     * Creates and configures the OrbitControls
     * @returns Configured OrbitControls instance
     */
    private createControls(): OrbitControls {
        const controls = new OrbitControls(
            this.camera,
            this.renderer.domElement,
        );
        controls.enableDamping = true;
        // controls.dynamicDampingFactor = 0.01;
        controls.enablePan = false;
        controls.minDistance = this.config.minDistance ?? 200;
        controls.maxDistance = this.config.maxDistance ?? 500;
        controls.rotateSpeed = 0.8;
        controls.zoomSpeed = 1;
        controls.autoRotate = Boolean(this.config.autoRotateSpeed);
        controls.autoRotateSpeed = this.config.autoRotateSpeed ?? 0;
        controls.minPolarAngle = Math.PI / 3.5;
        controls.maxPolarAngle = Math.PI - Math.PI / 3;

        return controls;
    }

    /**
     * Initializes the globe with its visual properties
     */
    private initGlobe(): void {
        this.globe = new ThreeGlobe({
            waitForGlobeReady: true,
            animateIn: true,
        });

        this.configureGlobeMaterial();
        this.setGlobeRotation();
        this.scene.add(this.globe);
    }

    /**
     * Initializes the atmosphere glow effect
     */
    private initAtmosphere(): void {
        const geometry = new SphereGeometry(150, 32, 32);

        this.atmosphere = new GlowMesh(geometry, {
            innerRadius: 100,
            outerRadius: 150,
            mieCoefficient: 1000,
            rayleighCoefficient: new Vector3(3.8, 13.5, 33.1),
            lightDirection: new Vector3(-0.5, 0.2, 0.0),
            opacity: 0.7,
            blendMode: AdditiveBlending,
        });

        this.atmosphere.position.set(
            this.globe.position.x,
            this.globe.position.y,
            this.globe.position.z,
        );

        this.scene.add(this.atmosphere);
    }

    /**
     * Configures the globe's material properties
     */
    private configureGlobeMaterial(): void {
        const material = this.globe.globeMaterial() as Material;
        Object.assign(material, {
            color: new Color(0x3a228a),
            emissive: new Color(0x220038),
            emissiveIntensity: 0.4,
            shininess: 0.7,
        });
    }

    /**
     * Sets the initial rotation of the globe
     */
    private setGlobeRotation(): void {
        this.globe.rotateY(-Math.PI * (5 / 9));
        this.globe.rotateZ(-Math.PI / 6);
    }

    /**
     * Updates the visualization with new country data
     * @param countries - GeoJSON feature collection of countries
     */
    public updateCountries(countries: FeatureCollection): void {
        this.globe
            .hexPolygonsData(countries.features)
            .hexPolygonResolution(3)
            .hexPolygonMargin(0.7)
            .showAtmosphere(false)
            .atmosphereColor("blue")
            .atmosphereAltitude(0.25)
            // @ts-expect-error - Types aren't strict enough
            .hexPolygonColor((e: Feature): string => {
                const iso = e.properties?.SOV_A3;
                const highlightedCountries = ["FR1"];
                return highlightedCountries.includes(iso)
                    ? "rgba(255,255,255, 1)"
                    : "rgba(255,255,255, 0.5)";
            });
    }

    /**
     * Updates the visualization with flight and airport data
     * @param flights - Array of flight path data
     * @param airports - Array of airport location data
     */
    public updateFlightData(
        flights: FlightData[],
        airports: AirportData[],
    ): void {
        this.globe
            .arcsData(flights)
            // @ts-expect-error - Types aren't strict enough
            .arcColor((e: FlightData) => (e.status ? "#9cff00" : "#FF4000"))
            // @ts-expect-error - Types aren't strict enough
            .arcAltitude((e: FlightData) => e.arcAlt)
            // @ts-expect-error - Types aren't strict enough
            .arcStroke((e: FlightData) => (e.status ? 0.5 : 0.3))
            .arcDashLength(0.9)
            .arcDashGap(4)
            .arcDashAnimateTime(1000)
            .arcsTransitionDuration(1000)
            // @ts-expect-error - Types aren't strict enough
            .arcDashInitialGap((e: FlightData) => e.order * 1)
            .labelsData(airports)
            .labelColor(() => "#ffcb21")
            // @ts-expect-error - Types aren't strict enough
            .labelDotOrientation((e: AirportData) =>
                e.city === "ALA" ? "top" : "right",
            )
            .labelDotRadius(0.3)
            // @ts-expect-error - Types aren't strict enough
            .labelSize((e: AirportData) => e.size)
            .labelText("city")
            .labelResolution(6)
            .labelAltitude(0.01)
            .pointsData(airports)
            .pointColor(() => "#ffffff")
            .pointsMerge(true)
            .pointAltitude(0.07)
            .pointRadius(0.05);
    }

    /**
     * Updates the visualization with orbit data, adding TubeGeometry arcs
     * @param orbits - Array of orbit data
     */
    public updateOrbits(orbits: OrbitData[]): void {
        for (const orbit of orbits) {
            const material = new MeshLambertMaterial({
                color: 0x00ff00,
                opacity: 1,
                emissive: 0x00ff00,
                emissiveIntensity: 0.5,
            });

            const curve = new CustomOrbitCurve(
                orbit.apoapsis,
                orbit.periapsis,
                orbit.inclination,
            );

            const geometry = new TubeGeometry(curve, 128, 0.5, 8, false);

            const mesh = new Mesh(geometry, material);
            mesh.position.set(
                this.globe.position.x,
                this.globe.position.y,
                this.globe.position.z,
            );

            this.orbits.push(mesh);
        }

        this.scene.add(...this.orbits);
    }

    /**
     * Handles window resize events
     */
    private onWindowResize = (): void => {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.windowHalfX = window.innerWidth / 1.5;
        this.windowHalfY = window.innerHeight / 1.5;
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    };

    /**
     * Handles mouse movement events
     */
    private onMouseMove = (event: MouseEvent): void => {
        this.mouseX = event.clientX - this.windowHalfX;
        this.mouseY = event.clientY - this.windowHalfY;
    };

    /**
     * Sets up event listeners for window resize and mouse movement
     */
    private setupEventListeners(): void {
        window.addEventListener("resize", this.onWindowResize);
        document.addEventListener("mousemove", this.onMouseMove);
    }

    /**
     * Animation loop
     */
    private animate = (): void => {
        /* if (Math.abs(this.mouseX) <= this.windowHalfX / 2) {
            this.camera.position.x +=
                (this.mouseX / 2 - this.camera.position.x) * 0.005;
        }
        this.camera.position.y +=
            (-this.mouseY / 2 - this.camera.position.y) * 0.005;
        this.camera.lookAt(this.scene.position); */

        this.tickTime();
        this.controls.update();
        this.animateGlobe();
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(this.animate);
    };

    /**
     * Updates the current date based on the elapsed time
     */
    private tickTime = (): void => {
        const deltaMs = this.clock.getDelta() * 1000;
        this.currentDate = new Date(
            this.currentDate.getTime() + deltaMs * this.constants.timeScale,
        );
    };

    /*
     * Calculate the rotation of the Earth for a given date
     *
     * Assumes the earth is at rotation 0 on January 1st 1970, and completes a full rotation every day
     * @param date
     * @returns
     */
    private getWorldRotationForDate = (date: Date): number => {
        const msSinceEpoch = date.getTime();
        const msSince1970 = msSinceEpoch - 0;
        const msPerDay = 1000 * 60 * 60 * 24;
        const daysSince1970 = msSince1970 / msPerDay;
        const rotation = (daysSince1970 * Math.PI * 2) % (Math.PI * 2);

        return rotation;
    };

    /**
     * Calculate the sunlight's rotation for a given date
     *
     * Assumes the sun is at rotation 0 on January 1st 1970, and completes a full rotation every year
     * Rotation 0 is illuminating the globe from the left
     * @param date
     */
    private getSunlightRotationForDate = (date: Date): number => {
        const msSinceEpoch = date.getTime();
        const msSince1970 = msSinceEpoch - 0;
        const msPerYear = 1000 * 60 * 60 * 24 * 365;
        const yearsSince1970 = msSince1970 / msPerYear;
        const rotation = (yearsSince1970 * Math.PI * 2) % (Math.PI * 2);

        return rotation;
    };

    private setLightDirection = (vector: Vector3): void => {
        // @ts-expect-error - Materials don't export uniform's types
        this.atmosphere.material.uniforms.lightDirection.value = vector;
    };

    private animateGlobe = (): void => {
        // Set axial tilt and rotation of the Earth
        this.globe.setRotationFromEuler(
            new Euler(
                degToRad(this.constants.earthAxialTilt),
                this.getWorldRotationForDate(this.currentDate),
                0,
            ),
        );

        // Rotate sunlight to match Earth's rotation
        const sunlightRotation = this.getSunlightRotationForDate(
            this.currentDate,
        );

        this.setLightDirection(
            // Sunlight comes from the side, not directly above
            // In OpenGL, y is up
            new Vector3(
                Math.cos(sunlightRotation),
                0,
                Math.sin(sunlightRotation),
            ),
        );
    };

    /**
     * Cleans up event listeners and Three.js resources
     */
    public dispose(): void {
        window.removeEventListener("resize", this.onWindowResize);
        document.removeEventListener("mousemove", this.onMouseMove);
        this.renderer.dispose();
        this.controls.dispose();
    }
}
