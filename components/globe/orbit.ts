import { Curve, Vector3 } from "three";
import { degToRad } from "three/src/math/MathUtils.js";

export class CustomOrbitCurve extends Curve<Vector3> {
    constructor(
        /* Lowest point in orbit, in units from sphere surface */
        private apoapsis: number,
        /* Highest point in orbit, in units from sphere surface */
        private periapsis: number,
        /* Inclination of orbit in degrees */
        private inclination: number,
    ) {
        super();
    }

    // t goes from 0 to 1
    override getPoint(t: number): Vector3 {
        // Using Kepler's equation to calculate the position of a point on the orbit
        // The origin should be one of the foci of the ellipse

        const eccentricity =
            (this.apoapsis - this.periapsis) / (this.apoapsis + this.periapsis);
        const semiMajorAxis = (this.apoapsis + this.periapsis) / 2;
        const semiMinorAxis = Math.sqrt(
            semiMajorAxis ** 2 * (1 - eccentricity ** 2),
        );
        const theta = 2 * Math.PI * t;
        const x = semiMajorAxis * Math.cos(theta);
        const y = semiMinorAxis * Math.sin(theta);
        const z = 0;

        const point = new Vector3(x, y, z);
        point.applyAxisAngle(new Vector3(0, 0, 1), degToRad(this.inclination));

        // Offset the point so that (0, 0, 0) is a foci of the ellipse
        point.add(new Vector3(semiMajorAxis * eccentricity, 0, 0));

        return point;
    }
}
