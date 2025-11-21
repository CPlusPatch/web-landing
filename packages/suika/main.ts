import {
    Bodies,
    type Body,
    Engine,
    Events,
    Render,
    Runner,
    World,
} from "matter-js";

declare module "matter-js" {
    interface IBodyDefinition {
        pawnIndex?: number;
    }

    interface Body {
        pawnIndex?: number;
    }
}

export interface PawnConfig {
    radius: number;
    spriteUrl: string;
}

export class Game {
    public config: PawnConfig[];
    public engine!: Engine;
    public render!: Render;

    public constructor(config: PawnConfig[]) {
        this.config = config;
    }

    public async initialize(container: HTMLElement): Promise<void> {
        this.engine = Engine.create();
        this.render = Render.create({
            element: container,
            engine: this.engine,
            options: {
                width: container.clientWidth,
                height: container.clientHeight,
                wireframes: true,
            },
        });

        await this.createWorld();

        Render.run(this.render);
    }

    public async createWorld(): Promise<void> {
        const wallWidth = 50;
        const lineHeight = 2;

        const leftWall = Bodies.rectangle(
            -wallWidth / 2,
            this.render.canvas.height / 2,
            wallWidth,
            this.render.canvas.height,
            {
                isStatic: true,
            },
        );

        const rightWall = Bodies.rectangle(
            this.render.canvas.width + wallWidth / 2,
            this.render.canvas.height / 2,
            wallWidth,
            this.render.canvas.height,
            {
                isStatic: true,
            },
        );

        // Used to check for overflow
        const topLine = Bodies.rectangle(
            this.render.canvas.width / 2,
            -lineHeight / 2,
            this.render.canvas.width,
            lineHeight,
            {
                isStatic: true,
                isSensor: true,
            },
        );

        const ground = Bodies.rectangle(
            this.render.canvas.width / 2,
            this.render.canvas.height + lineHeight / 2,
            this.render.canvas.width,
            lineHeight,
            {
                isStatic: true,
            },
        );

        World.add(this.engine.world, [leftWall, rightWall, topLine, ground]);
    }

    public async createPawn(
        config: PawnConfig,
        pawnIndex: number,
    ): Promise<Body> {
        const pawn = Bodies.circle(
            this.render.canvas.width / 2,
            -config.radius / 2,
            config.radius,
            {
                pawnIndex,
                restitution: 0.2,
            },
        );

        World.add(this.engine.world, pawn);

        return pawn;
    }

    public async start(): Promise<void> {
        const runner = Runner.create();
        Runner.run(runner, this.engine);

        Events.on(this.engine, "collisionStart", (event) => {
            const pairs = event.pairs;

            for (const pair of pairs) {
                const { bodyA, bodyB, collision } = pair;

                if (
                    bodyA.pawnIndex !== undefined &&
                    bodyB.pawnIndex !== undefined &&
                    bodyA.pawnIndex === bodyB.pawnIndex &&
                    collision.supports[0]
                ) {
                    const index = bodyA.pawnIndex;

                    // If the collision has the final stage pawnIndex, we win
                    if (index === this.config.length - 1) {
                        console.log("Victory! Final stage pawn collided.");
                        return;
                    }

                    World.remove(this.engine.world, [bodyA, bodyB]);

                    const newPawnConfig = this.config[index + 1] as PawnConfig;

                    const newBody = Bodies.circle(
                        collision.supports[0].x,
                        collision.supports[0].y,
                        newPawnConfig.radius,
                        {
                            pawnIndex: index + 1,
                            restitution: 0.2,
                        },
                    );

                    World.add(this.engine.world, newBody);
                }
            }
        });
    }
}
