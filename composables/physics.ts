/**
 * Adapted from https://www.half-life.com/en/halflife2/20th
 */

// NOTES:
//
// - Adjust the DraggableSelector value below to make elements draggable based on selector.
// - Add the a data-phys attribute to any elements to also make them draggable. e.g. <div data-phys>...</div>
// - To prevent an otherwise draggable element from being draggable, set data-phys="none".
//

import fastdom from "fastdom";
import Matter from "matter-js";
// @ts-expect-error
import MatterWrap from "matter-wrap";
import { CSoundEffects } from "./physics-sfx";

const soundEffects = new CSoundEffects();

interface CustomMouseEvent extends MouseEvent {
    extractedElement?: boolean;
}

const defaultPhysConfigValues = {
    // ====== EDIT DEFAULT VALUES HERE ======
    // Or temporarily change values at the bottom of the page.
    ShowPhysDebugUI: false,
    ShowSoundDebugUI: false,
    MouseCanDragElements: false,
    DebugPageElements: false,
    DebugPhysics: false,
    AutoEquipGravGun: false,
    NoYoutube: false,
    DraggableSelector: [
        "[data-phys]",
        "img",
        "video",
        ".tab > div",
        "#testGravBox",
        "h2",
        "h1",
        "h3",
        "button",
        "p",
        "button",
        "li",
    ].join(", "),
    NeverDraggableSelector: [
        "[data-phys=none]",
        ".decoration .top img",
        ".lightbox *",
        "footer *",
    ].join(", "),
    EnableTextBounds: true,
    TextBoundedSelectors: [
        "[data-phys-bounds=text]",
        "h3",
        "h2",
        "h1",
        "p",
    ].join(", "),
    // HoverScale: 1.02,
    HoverScale: 1,
    MinMouseDragDistance: 5,
    GravityHoverDebounceDelay: 200, // ms
};

const isFirefox = navigator.userAgent.toLowerCase().includes("firefox");

class PhysPlayElement {
    elemPlaceholder: HTMLElement | null = null;
    body: Matter.Body | null = null;

    isHoveringOverElement = false;
    isHoveringOverPickupBounds = false;
    isMouseDown = false;
    hasHoverStyle = false;

    preHoverTransformStyle: TransformStyle | null = null;

    preExtractionTransformStyle: TransformStyle | null = null;
    preExtractionBounds: DOMRect | null = null;
    preExtractionClientSize: { width: number; height: number } | null = null;
    preExtractionCumulativeRotationDeg = 0;

    originalOpacity = "1";
    updateCount = 1;
    localBodyOffset = { x: 0, y: 0 };

    constructor(
        public phys: PhysPlay,
        public elem: HTMLElement | null,
    ) {
        if (!elem) {
            throw new Error("Element is null");
        }
        // Prevent native dragging of this element when dragging would otherwise extract the physics element.
        elem?.addEventListener("dragstart", (event) => {
            if (this.isExtractable || this.isExtracted) {
                event.preventDefault();
                event.stopPropagation();
            }
        });

        this.elem?.classList.add(physPlayClassNames.PhysElement);

        elem?.addEventListener("mousemove", (event) => this.onMouseMove(event));
        elem?.addEventListener("mouseenter", (event) =>
            this.onMouseEnter(event),
        );
        elem?.addEventListener("mouseleave", (event) =>
            this.onMouseLeave(event),
        );
        elem?.addEventListener("mousedown", (event) => this.onMouseDown(event));
    }

    get isExtracted() {
        return this.body !== null;
    }

    get isExtractable() {
        if (this.isExtracted) {
            return false;
        }

        if (this.phys.config.values.MouseCanDragElements) {
            return true;
        }

        if (this.phys.gun.equipped) {
            return true;
        }

        return false;
    }

    updateHoverStyle() {
        if (!this.elem) {
            return;
        }
        const bExtractable = this.isExtractable;

        const bShouldHaveHoverStyle =
            (this.isHoveringOverPickupBounds || this.isMouseDown) &&
            bExtractable;
        if (this.hasHoverStyle === bShouldHaveHoverStyle) {
            return;
        }

        this.hasHoverStyle = bShouldHaveHoverStyle;

        PhysPlayUtil.setElementClass(
            this.elem,
            physPlayClassNames.PhysElement_Extractable,
            bShouldHaveHoverStyle,
        );

        if (bShouldHaveHoverStyle) {
            if (this.preHoverTransformStyle == null) {
                this.preHoverTransformStyle = new TransformStyle(this.elem);
            }

            const trs = this.preHoverTransformStyle.clone();
            trs.scale *= this.phys.config.values.HoverScale;
            trs.translate.y -= 4;
            trs.applyToElement(this.elem);
        } else {
            this.preHoverTransformStyle?.applyToElement(this.elem);
        }
    }

    isPointOverGrabbableRegion(clientX: number, clientY: number) {
        if (!this.elem) {
            return false;
        }

        if (this.shouldUseTextBounds()) {
            const textBounds = this.getTextBoundingClientRect();
            return (
                textBounds !== null &&
                clientX >= textBounds.left &&
                clientX <= textBounds.right &&
                clientY >= textBounds.top &&
                clientY <= textBounds.bottom
            );
        }

        const elems = document.elementsFromPoint(clientX, clientY) ?? [];
        return elems.includes(this.elem);
    }

    onMouseMove(mouseEvent: CustomMouseEvent) {
        if (
            !this.isExtractable ||
            !this.isHoveringOverElement ||
            !this.shouldUseTextBounds()
        ) {
            return;
        }

        if (this.getParentPhysElements().length > 0) {
            // In the scenario of an extractable element inside of another,
            // always prefer to drag the parent.
            return;
        }

        this.isHoveringOverPickupBounds = this.isPointOverGrabbableRegion(
            mouseEvent.clientX,
            mouseEvent.clientY,
        );
        this.updateHoverStyle();
    }

    onMouseEnter(mouseEvent: CustomMouseEvent) {
        if (!this.isExtractable) {
            return;
        }

        if (this.getParentPhysElements().length > 0) {
            // In the scenario of an extractable element inside of another,
            // always prefer to drag the parent.
            return;
        }

        this.isHoveringOverElement = true;
        if (!this.shouldUseTextBounds()) {
            this.isHoveringOverPickupBounds = true;
        }

        this.updateHoverStyle();
    }

    onMouseLeave(mouseEvent: CustomMouseEvent) {
        this.isHoveringOverElement = false;
        this.isHoveringOverPickupBounds = false;
        this.updateHoverStyle();
    }

    onMouseDown(mouseDownEvent: CustomMouseEvent) {
        if (this.phys.gun.equipped) {
            // Gravgun itself handles mouse events.
            return;
        }

        if (this.getParentPhysElements().length > 0) {
            // In the scenario of one extractable element inside of another,
            // always prefer to extract+drag the parent.
            return;
        }

        if (
            !this.isPointOverGrabbableRegion(
                mouseDownEvent.clientX,
                mouseDownEvent.clientY,
            )
        ) {
            return;
        }

        const onDocumentMouseMove = (mouseMoveEvent: CustomMouseEvent) => {
            if (mouseDownEvent.extractedElement) {
                return;
            }

            const delta = {
                x: mouseMoveEvent.clientX - mouseDownEvent.clientX,
                y: mouseMoveEvent.clientY - mouseDownEvent.clientY,
            };
            const dist = Math.sqrt(delta.x * delta.x + delta.y * delta.y);

            // Require a small minimum drag distance to make just clicking on links easier.
            if (
                this.isExtractable &&
                dist >= this.phys.config.values.MinMouseDragDistance
            ) {
                mouseDownEvent.extractedElement = true;
                this.extractElement(mouseDownEvent);
            }
        };

        const onDocumentMouseUp = (mouseUpEvent: CustomMouseEvent) => {
            this.elem?.ownerDocument.removeEventListener(
                "mousemove",
                onDocumentMouseMove,
            );
            this.elem?.ownerDocument.removeEventListener(
                "mouseup",
                onDocumentMouseUp,
            );

            this.isMouseDown = false;
            this.updateHoverStyle();
        };

        this.elem?.ownerDocument.addEventListener(
            "mousemove",
            onDocumentMouseMove,
        );
        this.elem?.ownerDocument.addEventListener("mouseup", onDocumentMouseUp);

        this.isMouseDown = true;
        this.updateHoverStyle();
    }

    playExtractionSoundEffect() {
        // @ts-expect-error
        if (this.elem?.attributes["data-phys-pickup-sound"]) {
            soundEffects.playSound(
                // @ts-expect-error
                this.elem?.attributes["data-phys-pickup-sound"].value,
            );
        }
    }

    async extractElement(mouseDownEvent?: CustomMouseEvent) {
        if (this.isExtracted || !this.elem) {
            return;
        }

        if (
            mouseDownEvent &&
            !this.isPointOverGrabbableRegion(
                mouseDownEvent.clientX,
                mouseDownEvent.clientY,
            )
        ) {
            return Promise.reject();
        }

        this.handlePreExtractionSideEffects();

        const computedStyle = getComputedStyle(this.elem);

        this.preExtractionTransformStyle = new TransformStyle(this.elem);
        this.preExtractionBounds = this.elem.getBoundingClientRect();
        this.preExtractionCumulativeRotationDeg =
            PhysPlayUtil.getCumulativeCSSRotateDeg(this.elem);

        if (computedStyle.display !== "inline") {
            // We need the client size (and not any other size metric) because we want the actual size of the
            // element irrespective of any rotation it has, and before any present transform styles are applied
            // (since we read and modify those separately).
            this.preExtractionClientSize = {
                width: this.elem.clientWidth,
                height: this.elem.clientHeight,
            };
        } else {
            // But in the case of inline elements, their client size is 0 so our next best option is just to
            // take the screens-apce bounding client rect. Let's hope the inline text we're extracting doesn't
            // have any fancy transform styles applied directly to it...
            const bounds = this.elem.getBoundingClientRect();
            this.preExtractionClientSize = {
                width: bounds.width,
                height: bounds.height,
            };
        }

        this.createMatterBody();
        Matter.Body.setStatic(this.body as Matter.Body, true); // Until the element finishes extraction, which is async.

        // Deep clone the element into a new off-screen element that will become
        // the layout placeholder.
        this.elemPlaceholder = PhysPlayUtil.deepCloneElement(this.elem, true);
        this.elemPlaceholder?.classList.add(physPlayClassNames.Placeholder);
        this.elemPlaceholder?.classList.remove(physPlayClassNames.PhysElement);

        // Before we remove the real element from its current hierarchy, we need to
        // bake in the layout and computed styles (incl. css vars and calcs) of its
        // children, otherwise its appearance will likely change.
        await PhysPlayUtil.bakeComputedElementStyles(this.elem);

        // Before we put our element back in the new container, lock down its
        // outer size to its previous in-layout size.
        PhysPlayUtil.forceFixedElementLayoutSize(
            this.elem,
            this.preExtractionClientSize.width + 2, // Account for rounding-down.
            this.preExtractionClientSize.height + 2,
        );

        // On firefox, once reparented it'll quickly flicker in the top left of the page otherwise.
        this.originalOpacity = this.elem.style.opacity;
        if (isFirefox) {
            this.elem.style.opacity = "0";
        }

        // Now pull an Indiana Jones.
        this.elem.replaceWith(this.elemPlaceholder as HTMLElement);

        this.elem.style.position = "absolute";
        this.elem.style.top = "0px";
        this.elem.style.left = "0px";
        this.elem.style.bottom = "initial";
        this.elem.style.right = "initial";
        this.elem.style.margin = "initial";
        this.elem.style.transformOrigin = "initial";
        this.elem.classList.add(physPlayClassNames.PhysElement_Extracted);

        // If the extracted elem is a list item, it won't display correctly not unside its list
        // container (its bullet will be inside its bounds, not outside like it should be). So
        // downgrade it to a block so that it displays correctly, without a floating bullet point.
        if (this.elem.style?.display === "list-item") {
            this.elem.style.display = "block";
        }

        PhysPlayUtil.preventDefaultClicks(this.elemPlaceholder);

        this.elemPlaceholder?.addEventListener(
            "mouseup",
            (event) => {
                event.preventDefault();
                event.stopPropagation();
                event.cancelBubble = true;
            },
            { capture: false },
        );

        this.elem.addEventListener(
            "click",
            (event) => {
                event.preventDefault();
                event.stopPropagation();
            },
            { capture: true },
        );

        // How we'll start dragging the element *after* it's been extracted off the page.
        this.elem.addEventListener(
            "mousedown",
            (event) => {
                if (this.phys.gun.equipped) {
                    // Gravgun itself handles mouse events.
                    return;
                }

                event.preventDefault();
                event.stopPropagation();
                // @ts-expect-error matter-js types aren't up to date.
                this.phys.render?.mouse.mousedown(event);
            },
            { capture: true },
        );

        this.phys.mapExtractedElements.set(this.elem, this);
        this.phys.elemPhysContainer?.appendChild(this.elem);

        Matter.Body.setStatic(this.body as Matter.Body, false);
        if (mouseDownEvent) {
            // Starts dragging this new body immediately, but from the initial mousedown position.
            // @ts-expect-error matter-js types aren't up to date.
            this.phys.render?.mouse.mousedown(mouseDownEvent);
            // @ts-expect-error matter-js types aren't up to date.
            Matter.MouseConstraint.update(this.phys.mouseConstraint, [
                this.body,
            ]);
        }

        this.updateTransform(true);
        this.playExtractionSoundEffect();
    }

    handlePreExtractionSideEffects() {
        if (this.elem?.matches("#crowbar3 .crowbar-isolated")) {
            document
                .querySelector("#crowbar3 .crowbar")
                ?.classList.add(physPlayClassNames.NoShadow);
        }
    }

    getTextBoundingClientRect() {
        if (!this.elem) {
            return null;
        }

        return (
            PhysPlayUtil.getTextBounds(this.elem) ?? this.preExtractionBounds
        );
    }

    shouldUseTextBounds() {
        return (
            this.phys.config.values.EnableTextBounds &&
            this.elem?.matches(this.phys.config.values.TextBoundedSelectors)
        );
    }

    createMatterBody() {
        let bodyPositionCenter: { x: number; y: number };
        let bodySize: { width: number; height: number };

        if (
            !this.preExtractionBounds ||
            !this.preExtractionClientSize ||
            !this.preExtractionTransformStyle ||
            !this.phys.render ||
            !this.phys.engine
        ) {
            return;
        }

        const elementCenter = {
            x: this.preExtractionBounds.x + this.preExtractionBounds.width / 2,
            y: this.preExtractionBounds.y + this.preExtractionBounds.height / 2,
        };

        if (this.shouldUseTextBounds()) {
            const textBounds = this.getTextBoundingClientRect();

            if (!textBounds) {
                return;
            }

            const textPositionCenter = {
                x: textBounds.x + textBounds.width / 2,
                y: textBounds.y + textBounds.height / 2,
            };
            this.localBodyOffset = {
                x: textPositionCenter.x - elementCenter.x,
                y: textPositionCenter.y - elementCenter.y,
            };

            this.localBodyOffset.x /= this.preExtractionTransformStyle.scale;
            this.localBodyOffset.y /= this.preExtractionTransformStyle.scale;

            bodyPositionCenter = textPositionCenter;
            bodySize = {
                width: textBounds.width,
                height: textBounds.height,
            };
        } else {
            bodyPositionCenter = elementCenter;
            bodySize = {
                width:
                    this.preExtractionClientSize.width *
                    this.preExtractionTransformStyle.scale,
                height:
                    this.preExtractionClientSize.height *
                    this.preExtractionTransformStyle.scale,
            };
        }

        // Move from client space to physics world space
        bodyPositionCenter.x += this.phys.render.bounds.min.x;
        bodyPositionCenter.y += this.phys.render.bounds.min.y;

        this.body = Matter.Bodies.rectangle(
            bodyPositionCenter.x,
            bodyPositionCenter.y,
            bodySize.width,
            bodySize.height,
            {
                render: {
                    fillStyle: "aqua",
                    opacity: 0.5,
                },
            },
        );

        const preExtractionCumulativeRotationRad =
            (this.preExtractionCumulativeRotationDeg * Math.PI) / 180;
        const rotation =
            this.preExtractionTransformStyle.rotate +
            preExtractionCumulativeRotationRad;
        Matter.Body.setAngle(this.body, rotation);
        Matter.Composite.add(this.phys.engine.world, [this.body]);
    }

    updateTransform(force: boolean) {
        if (
            this.body == null ||
            (!force && this.body.isSleeping) ||
            !this.preExtractionClientSize ||
            !this.preExtractionTransformStyle ||
            !this.elem ||
            !this.phys.render
        ) {
            return;
        }

        if (
            !force &&
            // @ts-expect-error matter-js types aren't up to date.
            this.body.angle === this.body.anglePrev &&
            // @ts-expect-error matter-js types aren't up to date.
            this.body.position.x === this.body.positionPrev.x &&
            // @ts-expect-error matter-js types aren't up to date.
            this.body.position.y === this.body.positionPrev.y &&
            (!isFirefox || this.updateCount > 3)
        ) {
            return;
        }

        const trs = new TransformStyle(
            {
                x:
                    this.body.position.x -
                    0.5 * this.preExtractionClientSize.width -
                    this.phys.render.bounds.min.x,
                y:
                    this.body.position.y -
                    0.5 * this.preExtractionClientSize.height -
                    this.phys.render.bounds.min.y,
            },
            this.body.angle,
            this.preExtractionTransformStyle.scale,
        );

        let css = trs.getCSS();
        if (this.localBodyOffset.x !== 0 || this.localBodyOffset.y !== 0) {
            css += ` translate(${-this.localBodyOffset.x}px, ${-this.localBodyOffset.y}px) `;
        }
        this.elem.style.transform = css;

        if (isFirefox && this.updateCount >= 3) {
            this.elem.style.opacity = this.originalOpacity;
        }

        this.updateCount++;
    }

    getParentPhysElements() {
        const parentPhysPlayElements: PhysPlayElement[] = [];
        for (
            let elem = this.elem?.parentElement;
            elem !== null;
            elem = elem?.parentElement
        ) {
            if (this.phys.mapPageElements.has(elem)) {
                parentPhysPlayElements.push(
                    this.phys.mapPageElements.get(elem),
                );
            }
        }
        return parentPhysPlayElements;
    }

    remove() {
        if (!this.phys.engine) {
            return;
        }

        if (this.body !== null) {
            const body = this.body;
            this.body = null;
            Matter.Composite.remove(this.phys.engine.world, [body]);
        }

        this.phys.mapExtractedElements.delete(this.elem);
        this.phys.mapPageElements.delete(this.elem);

        if (this.elem) {
            this.elem?.parentElement?.removeChild(this.elem);
            this.elem = null;
        }
    }

    onBodyRemoved() {
        this.remove();
    }
}

export class PhysPlay {
    config = new PhysPlayConfig();
    gun = new PhysPlayGun(this);

    engine: Matter.Engine | null = null;
    render: Matter.Render | null = null;

    mapPageElements = new Map(); // Map<HTMLElement, PhysPlayElement>
    mapExtractedElements = new Map(); // Map<PhysPlayElement, PhysPlayElement>;
    setCanElements = new Set(); // Set<PhysPlayElement>

    elemPhysContainer: HTMLDivElement;
    elemCanvas: HTMLCanvasElement | null = null;
    elemFooter: HTMLDivElement;

    bodyGround: Matter.Body | null = null;
    mouseConstraint: Matter.MouseConstraint | null = null;

    constructor() {
        this.elemPhysContainer = document.querySelector(
            "#physContainer",
        ) as HTMLDivElement;
        this.elemFooter = document.querySelector("footer") as HTMLDivElement;

        this.config.onupdate = () => this.onConfigUpdate();
        this.onConfigUpdate();

        this.initializeEngine();
        this.initializeWrapping();

        this.createGroundAndCeiling();

        document.addEventListener("mousemove", (event) => {
            if (this.gun.equipped) {
                // GravGun handles this.
                return;
            }

            // @ts-expect-error matter-js types aren't up to date.
            this.render?.mouse.mousemove(event);
        });

        document.addEventListener("mouseup", (event) => {
            if (this.gun.equipped) {
                // GravGun handles this.
                return;
            }

            // @ts-expect-error matter-js types aren't up to date.
            this.render?.mouse.mouseup(event);
        });

        this.initializeExtractableElements();

        if (this.config.values.AutoEquipGravGun) {
            this.gun.setEquipped(true);
        }
    }

    showDebug() {
        this.config.values.ShowPhysDebugUI = true;
        this.config.save();
    }

    updateBodyClasses() {
        PhysPlayUtil.setElementClass(
            document.body,
            physPlayClassNames.DebugPageElements,
            this.config.values.DebugPageElements,
        );
        PhysPlayUtil.setElementClass(
            document.body,
            physPlayClassNames.DebugPhysics,
            this.config.values.DebugPhysics,
        );
        PhysPlayUtil.setElementClass(
            document.body,
            physPlayClassNames.ShowPhysDebugUI,
            this.config.values.ShowPhysDebugUI,
        );
        PhysPlayUtil.setElementClass(
            document.body,
            physPlayClassNames.ShowSoundDebugUI,
            this.config.values.ShowSoundDebugUI,
        );
        PhysPlayUtil.setElementClass(
            document.body,
            physPlayClassNames.PhysGunEquipped,
            this.gun.equipped,
        );
        PhysPlayUtil.setElementClass(
            document.body,
            physPlayClassNames.AllElementsExtractable,
            this.gun.equipped || this.config.values.MouseCanDragElements,
        );
    }

    onConfigUpdate() {
        this.updateBodyClasses();

        if (this.render) {
            this.render.options = {
                ...this.render.options,
                ...this.desiredMatterRenderOptions(),
            };
        }

        this.initializeExtractableElements();

        if (this.config.values.NoYoutube) {
            for (const elem of document.querySelectorAll(
                ".youtube-container",
            )) {
                elem.remove();
            }
        }
    }

    desiredMatterRenderOptions() {
        return {
            enabled: this.config.values.DebugPhysics,
            showDebug: this.config.values.DebugPhysics,
        };
    }

    initializeEngine() {
        this.engine = Matter.Engine.create();
        this.render = Matter.Render.create({
            element: this.elemPhysContainer,
            engine: this.engine,
            options: {
                width: window.innerWidth,
                height: window.innerHeight,
                background: "transparent",
                wireframes: false,
                showAngleIndicator: false,
                ...this.desiredMatterRenderOptions(),
            },
        });

        this.elemCanvas = this.render.canvas;
        this.elemCanvas.id = "physCanvas";

        // Create the Matter.js mouse object and mouse constraint
        const mouse = Matter.Mouse.create(this.elemCanvas);
        this.mouseConstraint = Matter.MouseConstraint.create(this.engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.1,
                length: 0,
                // @ts-expect-error matter-js types aren't up to date.
                angularStiffness: 0,
                render: { visible: true },
            },
        });

        Matter.Composite.add(this.engine.world, this.mouseConstraint);
        this.render.mouse = mouse;

        // Run the renderer and engine
        Matter.Render.run(this.render);
        const runner = Matter.Runner.create();
        Matter.Runner.run(runner, this.engine);

        // Resize canvas when window is resized
        window.addEventListener("scroll", this.updateGroundPosition.bind(this));
        window.addEventListener("resize", this.resizeCanvas.bind(this));
        this.resizeCanvas();

        Matter.Events.on(this.engine.world, "afterRemove", (event) => {
            for (const obj of event.object) {
                this.onBodyRemoved(obj);
            }
        });

        requestAnimationFrame(() => this.onAnimationFrame());

        setTimeout(() => this.updateGroundPosition(), 1000);
    }

    onAnimationFrame() {
        PhysPlayUtil.setElementClass(
            document.body,
            physPlayClassNames.HasPhysBodies,
            this.mapExtractedElements.size > 0,
        );

        for (const pair of this.mapExtractedElements) {
            pair[1].updateTransform();
        }

        requestAnimationFrame(() => this.onAnimationFrame());
    }

    initializeWrapping() {
        Matter.use(MatterWrap);

        Matter.Events.on(this.engine?.world, "afterAdd", (event) => {
            // @ts-expect-error matter-js types aren't up to date.
            for (const obj of event.object) {
                this.initializeWrappingForBody(obj);
            }
        });
    }

    initializeWrappingForBody(body: Matter.Body) {
        if (!this.render) {
            return;
        }

        body.plugin.wrap = {
            min: {
                x: this.render.bounds.min.x,
                y: this.render.bounds.min.y - 100000,
            },
            max: { x: this.render.bounds.max.x, y: this.render.bounds.max.y },
        };
    }

    resizeCanvas() {
        if (!this.render || !this.engine) {
            return;
        }

        this.render.bounds.max.x = window.innerWidth;
        this.render.bounds.max.y = window.innerHeight;
        this.render.options.width = window.innerWidth;
        this.render.options.height = window.innerHeight;
        this.render.canvas.width = window.innerWidth;
        this.render.canvas.height = window.innerHeight;

        this.updateGroundPosition();

        for (const body of this.engine.world.bodies) {
            this.initializeWrappingForBody(body);
        }

        Matter.Render.lookAt(this.render, {
            min: { x: 0, y: 0 },
            max: { x: window.innerWidth, y: window.innerHeight },
        });
    }

    createGroundAndCeiling() {
        if (!this.engine) {
            return;
        }

        this.bodyGround = Matter.Bodies.rectangle(0, 0, 100000, 10000, {
            isStatic: true,
            render: {
                fillStyle: "orange",
                opacity: 0.5,
            },
        });

        const bodyCeiling = Matter.Bodies.rectangle(
            0,
            -500 - 1000,
            100000,
            1000,
            { isStatic: true },
        );

        Matter.Composite.add(this.engine.world, [this.bodyGround, bodyCeiling]);
        this.updateGroundPosition();
    }

    updateGroundPosition() {
        if (!this.bodyGround) {
            return;
        }
        const groundEdgeY = Math.min(
            window.innerHeight,
            this.elemFooter.getBoundingClientRect().top,
        );
        const groundCenterY = groundEdgeY + 5000;

        if (
            this.bodyGround.position.y !== 0 &&
            this.bodyGround.position.y !== groundCenterY
        ) {
            const groundDeltaY = groundCenterY - this.bodyGround.position.y;
            for (const physElem of this.mapExtractedElements.values()) {
                if (!physElem.body) {
                    continue;
                }

                Matter.Body.setPosition(
                    physElem.body,
                    Matter.Vector.create(
                        physElem.body.position.x,
                        physElem.body.position.y + groundDeltaY,
                    ),
                );
                physElem.updateTransform(true);
            }
        }

        Matter.Body.setPosition(
            this.bodyGround,
            Matter.Vector.create(0, groundCenterY),
        );
    }

    initializeExtractableElements() {
        const elements = document.querySelectorAll(
            this.config.values.DraggableSelector,
        );
        for (const elem of elements) {
            this.makeElementExtractable(elem as HTMLElement);
        }

        const observer = new MutationObserver((mutationsList, observer) => {
            for (const mutation of mutationsList) {
                if (mutation.type !== "childList") {
                    continue;
                }

                for (const node of mutation.addedNodes) {
                    if (
                        !(node as HTMLElement)?.matches?.(
                            this.config.values.DraggableSelector,
                        )
                    ) {
                        continue;
                    }

                    this.makeElementExtractable(node as HTMLElement);
                }
            }
        });

        observer.observe(document, { childList: true, subtree: true });
    }

    makeElementExtractable(elem: HTMLElement) {
        if (
            this.mapPageElements.has(elem) ||
            this.mapExtractedElements.has(elem)
        ) {
            return;
        }

        if (elem.classList.contains(physPlayClassNames.Placeholder)) {
            return;
        }

        if (elem.matches(this.config.values.NeverDraggableSelector)) {
            return;
        }

        const pageElem = new PhysPlayElement(this, elem);
        this.mapPageElements.set(elem, pageElem);
    }

    onBodyRemoved(body: Matter.Body) {
        for (const physElem of this.mapExtractedElements.values()) {
            if (body && physElem.body === body) {
                physElem.onBodyRemoved();
            }
        }
    }
}

class PhysPlayGun {
    elemButton: HTMLDivElement;
    elemPhysGunContainer: HTMLDivElement;
    elemPhysGun: HTMLDivElement;
    transform = new TransformStyle();

    equipped = false;
    everEquipped = false;

    heldItem: PhysPlayElement | null = null;
    hoveredItem: PhysPlayElement | null = null;
    closeTimeout: number | undefined = undefined; // setTimeout ID

    touchingButton = false;
    touchEndTimeout: number | undefined = undefined; // setTimeout ID

    constructor(public phys: PhysPlay) {
        this.elemButton = document.querySelector(
            "#gravgunimage",
        ) as HTMLDivElement;

        this.elemPhysGunContainer = document.createElement("div");
        this.elemPhysGunContainer.className =
            physPlayClassNames.GravGun_Container;
        document.body.appendChild(this.elemPhysGunContainer);

        this.elemPhysGun = document.createElement("div");
        this.elemPhysGun.className = physPlayClassNames.GravGun;
        this.elemPhysGunContainer.appendChild(this.elemPhysGun);

        document.addEventListener(
            "click",
            (event) => {
                if (this.equipped) {
                    // Prevent links from being followed, etc.
                    event.preventDefault();
                }
            },
            { capture: true },
        );

        document.addEventListener(
            "contextmenu",
            (event) => {
                if (this.equipped) {
                    // Prevent standard right-click context menu.
                    event.preventDefault();
                }
            },
            { capture: true },
        );

        document.addEventListener("mousedown", (event) =>
            this.onMouseDown(event),
        );
        document.addEventListener("mousemove", (event) =>
            this.onMouseMove(event),
        );
        document.addEventListener("mouseup", (event) => this.onMouseUp(event));

        this.elemButton.addEventListener("mouseenter", () => {
            if (this.touchingButton) {
                return;
            }

            soundEffects.playSound("weaponswitch");
        });

        this.elemButton.addEventListener("mousedown", () => {
            if (this.touchingButton) {
                return;
            }

            this.setEquipped(!this.equipped);
        });

        this.elemButton.addEventListener("touchstart", (event) => {
            this.touchingButton = true;
            this.showTouchMessage(true);
            soundEffects.playSound("dryfire");
            clearTimeout(this.touchEndTimeout);
        });

        this.elemButton.addEventListener("touchend", (event) => {
            clearTimeout(this.touchEndTimeout);
            this.touchEndTimeout = setTimeout(() => {
                this.touchingButton = event.touches.length > 0;
            }, 100) as unknown as number;
        });
    }

    showTouchMessage(wiggleGravGun: boolean) {
        // TODO: Make work
        const elemMessage = document.querySelector("#mobilemessage");
        if (!elemMessage) {
            return;
        }

        const bMobile = document.body.clientWidth <= Number.parseInt("700px");
        (
            document.querySelector(
                "#mobilemessage .use-mouse",
            ) as HTMLDivElement
        ).style.display = bMobile ? "none" : "inline";
        (
            document.querySelector(
                "#mobilemessage .use-desktop",
            ) as HTMLDivElement
        ).style.display = bMobile ? "inline" : "none";

        PhysPlayUtil.setElementClass(
            document.body,
            physPlayClassNames.ShowGravGunMessage,
            true,
        );

        if (wiggleGravGun) {
            PhysPlayUtil.setElementClass(
                this.elemButton,
                physPlayClassNames.GravGunButton_ButtonWiggle,
                false,
            );
            setTimeout(
                () =>
                    PhysPlayUtil.setElementClass(
                        this.elemButton,
                        physPlayClassNames.GravGunButton_ButtonWiggle,
                        true,
                    ),
                0,
            );
        }
    }

    hideTouchMessage() {
        PhysPlayUtil.setElementClass(
            document.body,
            physPlayClassNames.ShowGravGunMessage,
            false,
        );
    }

    setEquipped(bEquip: boolean) {
        if (this.equipped === bEquip) {
            return;
        }

        this.equipped = bEquip;
        this.updateClasses();
        this.everEquipped = this.everEquipped || bEquip;

        if (bEquip) {
            soundEffects.playSound("select");
            this.hideTouchMessage();
        } else {
            soundEffects.playSound("weaponswitch");
        }

        if (bEquip && this.hoveredItem !== null) {
            this.playOpenSound();
        }
    }

    async pickupItem(
        physPlayElement: PhysPlayElement,
        mouseEvent: CustomMouseEvent,
    ) {
        if (!physPlayElement) {
            return;
        }

        if (this.heldItem !== null) {
            this.dropItem();
        }

        if (!physPlayElement.isExtracted) {
            await physPlayElement.extractElement();
        }

        this.heldItem = physPlayElement;
        this.updateClasses();
        soundEffects.playSound("pickup");
        soundEffects.playSound("holdloop");

        // @ts-expect-error matter-js types aren't up to date.
        this.phys.render?.mouse.mousedown(mouseEvent);
        // @ts-expect-error matter-js types aren't up to date.
        Matter.MouseConstraint.update(this.phys.mouseConstraint, [
            this.heldItem.body,
        ]);
        this.recoil();
    }

    dropItem(mouseEvent?: CustomMouseEvent) {
        // @ts-expect-error matter-js types aren't up to date.
        this.phys.render?.mouse.mouseup(mouseEvent);
        if (!this.heldItem) {
            return;
        }

        this.heldItem = null;
        this.updateClasses();
        soundEffects.stopSound("holdloop");
        soundEffects.playSound("drop");
        clearTimeout(this.closeTimeout);
        this.closeTimeout = undefined;
        // this.recoil();
    }

    dryFire(mouseEvent?: CustomMouseEvent) {
        soundEffects.playSound("dryfire");
        this.recoil();
    }

    recoil() {
        PhysPlayUtil.setElementClass(
            this.elemPhysGun,
            physPlayClassNames.GravGun_Recoil,
            false,
        );
        setTimeout(
            () =>
                PhysPlayUtil.setElementClass(
                    this.elemPhysGun,
                    physPlayClassNames.GravGun_Recoil,
                    true,
                ),
            0,
        );
    }

    onMouseDown(event: CustomMouseEvent) {
        this.updatePosition(event.clientX, event.clientY);

        if (!this.equipped) {
            return;
        }

        if (
            this.hoveredItem &&
            (this.hoveredItem.isExtractable || this.hoveredItem.isExtracted)
        ) {
            this.pickupItem(this.hoveredItem, event).catch(() =>
                this.dryFire(),
            );
        } else {
            this.dryFire();
        }
    }

    onMouseMove(event: CustomMouseEvent) {
        this.updatePosition(event.clientX, event.clientY);

        if (!this.equipped) {
            return;
        }

        // @ts-expect-error matter-js types aren't up to date.
        this.phys.render?.mouse.mousemove(event);
    }

    onMouseUp(event: CustomMouseEvent) {
        this.updatePosition(event.clientX, event.clientY);
        this.dropItem(event);
    }

    updatePosition(x: number, y: number) {
        this.transform.translate.x = x;
        this.transform.translate.y = y;
        this.transform.applyToElement(this.elemPhysGunContainer);
        this.updateClasses();

        const bHadHoveredItem = !!this.hoveredItem;

        if (this.heldItem) {
            this.hoveredItem = this.heldItem;
        } else {
            this.hoveredItem = null;
            for (const elem of document.elementsFromPoint(
                // @ts-expect-error deprecated
                event.clientX,
                // @ts-expect-error deprecated
                event.clientY,
            )) {
                const physElem =
                    this.phys.mapExtractedElements.get(elem) ??
                    this.phys.mapPageElements.get(elem);
                if (physElem) {
                    // In the case of nested elements, prefer the shallowest one.
                    if (
                        this.hoveredItem == null ||
                        physElem.elem.contains(this.hoveredItem.elem)
                    ) {
                        this.hoveredItem = physElem;
                    }
                }
            }
            if (!this.hoveredItem?.isPointOverGrabbableRegion(x, y)) {
                this.hoveredItem = null;
            }
        }

        if (this.equipped) {
            if (this.hoveredItem && !bHadHoveredItem) {
                this.playOpenSound();
            } else if (!this.hoveredItem && bHadHoveredItem) {
                this.playCloseSound();
            }
        }
    }

    playOpenSound() {
        if (this.closeTimeout == null) {
            soundEffects.playSound("open");
        } else {
            clearTimeout(this.closeTimeout);
            this.closeTimeout = undefined;
        }
    }

    playCloseSound() {
        clearTimeout(this.closeTimeout);
        this.closeTimeout = setTimeout(() => {
            soundEffects.playSound("close");
            this.closeTimeout = undefined;
        }, this
            .phys.config.values.GravityHoverDebounceDelay) as unknown as number;
    }

    updateClasses() {
        PhysPlayUtil.setElementClass(
            this.elemButton,
            physPlayClassNames.GravGun_Equipped,
            this.equipped,
        );
        PhysPlayUtil.setElementClass(
            this.elemPhysGun,
            physPlayClassNames.GravGun_Equipped,
            this.equipped,
        );
        PhysPlayUtil.setElementClass(
            this.elemPhysGun,
            physPlayClassNames.GravGun_HoveringOverItem,
            this.hoveredItem !== null,
        );
        PhysPlayUtil.setElementClass(
            this.elemPhysGun,
            physPlayClassNames.GravGun_HoldingItem,
            this.heldItem !== null,
        );
        this.phys.updateBodyClasses();
    }
}

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
class PhysPlayUtil {
    static setElementClass(
        elem: HTMLElement,
        className: string,
        bSet: boolean,
    ) {
        if (bSet) {
            elem.classList.add(className);
        } else {
            elem.classList.remove(className);
        }
    }

    static copyComputedStyles(elemFrom: HTMLElement, elemTo: HTMLElement) {
        const styles = getComputedStyle(elemFrom);
        for (const styleKey of styles) {
            // @ts-expect-error
            elemTo.style.setProperty(styleKey, styles[styleKey]);
        }
    }

    static deepCloneElement(
        elem: HTMLElement,
        bCloneMediaAsPlaceholders: boolean,
    ) {
        const bIsText = elem.nodeName.toLowerCase() === "#text";
        const bIsMedia = !bIsText && elem.matches("img, video, iframe");

        if (bIsMedia && bCloneMediaAsPlaceholders) {
            const elemMediaPlaceholder = document.createElement("div");
            PhysPlayUtil.copyComputedStyles(elem, elemMediaPlaceholder);
            elemMediaPlaceholder.className =
                physPlayClassNames.MediaPlaceholder;

            // Seemingly only way to get the floating point width and height of an element that does NOT factor in
            // layer transforms in the transform style (e.g. rotate() scale() etc), since we'll still be applying
            // that same css style to the new placeholder element.
            const computedStyle = window.getComputedStyle(elem);
            PhysPlayUtil.forceFixedElementLayoutSize(
                elemMediaPlaceholder,
                Number.parseFloat(computedStyle.width),
                Number.parseFloat(computedStyle.height),
            );

            return elemMediaPlaceholder;
        }

        const newChildren = [];
        for (const child of elem.childNodes) {
            newChildren.push(
                PhysPlayUtil.deepCloneElement(
                    child as HTMLElement,
                    bCloneMediaAsPlaceholders,
                ),
            );
        }

        const clone = elem.cloneNode(false) as HTMLElement;

        if (elem.attributes) {
            for (const attr of elem.attributes) {
                clone.setAttribute(attr.name, attr.value);
            }
        }

        for (const child of newChildren) {
            clone.appendChild(child);
        }

        return clone;
    }

    // Recursively computes the concrete values of all styles (e.g. no variables, calcs, etc)
    // so that layout is preserved even if the root node is reparented.
    static async bakeComputedElementStyles(elemRoot: HTMLElement) {
        const elems: HTMLElement[] = [];
        const elemsToTraverse = [elemRoot];
        while (elemsToTraverse.length > 0) {
            const elem = elemsToTraverse.pop();
            if (!elem) {
                continue;
            }
            elems.push(elem);
            for (const child of elem.children) {
                elemsToTraverse.push(child as HTMLElement);
            }
        }

        // First read all styles property values from all child elements
        // so that we can later apply them in one go to prevent layout thrashing.
        const elemStyles = elems.map((elem) => {
            const styles = getComputedStyle(elem);
            const stylePairs = [];
            for (let i = 0; i < styles.length; i++) {
                const propName = styles.item(i);
                stylePairs.push([propName, styles.getPropertyValue(propName)]);
            }
            return stylePairs;
        });

        return new Promise<void>((done) => {
            fastdom.mutate(() => {
                for (let i = 0; i < elems.length; i++) {
                    const elem = elems[i];
                    const styles = elemStyles[i];

                    elem.style.contain = "layout";
                    for (const stylePair of styles) {
                        if (stylePair[0] === "contain") {
                            continue;
                        }

                        elem.style.setProperty(stylePair[0], stylePair[1]);
                    }
                }

                done();
            });
        });
    }

    // Sets styles to enforce a fixed size as far as the DOM layout of the element is concerned,
    // but this is before any css transform styles are applied (e.g. "transform: scale()")
    static forceFixedElementLayoutSize(
        elem: HTMLElement,
        width: number,
        height: number,
    ) {
        const strWidth = `${width}px`;
        const strHeight = `${height}px`;

        elem.style.width = strWidth;
        elem.style.minWidth = strWidth;
        elem.style.maxWidth = strWidth;
        elem.style.height = strHeight;
        elem.style.minHeight = strHeight;
        elem.style.maxHeight = strHeight;

        if (elem.style.display === "inline") {
            elem.style.display = "inline-block";
        }
    }

    static getContainingLinkTag(elem: HTMLElement) {
        let loopElem: HTMLElement | null = elem;

        while (loopElem !== null) {
            if (loopElem.nodeName.toLowerCase() === "a") {
                return loopElem;
            }

            loopElem = loopElem.parentElement;
        }

        return null;
    }

    static preventDefaultClicks(elem: HTMLElement) {
        // Walk up the hierarchy and prevent clicks on any parent link elements too, unless there's other children.
        while (elem !== null) {
            elem.addEventListener("click", (event) => {
                event.preventDefault();
                event.stopPropagation();
            });

            elem.addEventListener("mousedown", (event) => {
                event.preventDefault();
            });

            elem.style.cursor = "default";

            const parentElement = elem.parentElement;

            if (
                parentElement?.nodeName.toLowerCase() !== "a" &&
                parentElement?.nodeName.toLowerCase() !== "button"
            ) {
                break;
            }
        }
    }

    static getChildTextNodes(element: HTMLElement) {
        const textNodes = [];
        const nodesToTraverse = [element];
        while (nodesToTraverse.length > 0) {
            const node = nodesToTraverse.pop();
            if (!node) {
                continue;
            }

            if (node.nodeName.toLowerCase() === "#text") {
                textNodes.push(node);
            }
            for (const child of node.childNodes) {
                nodesToTraverse.push(child as HTMLElement);
            }
        }

        return textNodes;
    }

    static getTextBounds(element: HTMLElement) {
        const textRects = PhysPlayUtil.getChildTextNodes(element)
            .map((textNode) => {
                if (document.createRange) {
                    const range = document.createRange();
                    range.selectNodeContents(textNode);
                    if (range.getBoundingClientRect) {
                        return range.getBoundingClientRect();
                    }
                }
                return null;
            })
            .filter((rect) => rect && (rect.width > 0 || rect.height > 0));

        if (textRects.length === 0 || textRects[0] === null) {
            return null;
        }

        const bounds = {
            left: textRects[0].left,
            right: textRects[0].right,
            top: textRects[0].top,
            bottom: textRects[0].bottom,
        };
        for (let i = 1; i < textRects.length; i++) {
            const rect = textRects[i];

            if (!rect) {
                continue;
            }

            if (rect.left < bounds.left) {
                bounds.left = rect.left;
            }
            if (rect.top < bounds.top) {
                bounds.top = rect.top;
            }
            if (rect.right > bounds.right) {
                bounds.right = rect.right;
            }
            if (rect.bottom > bounds.bottom) {
                bounds.bottom = rect.bottom;
            }
        }

        return new DOMRect(
            bounds.left,
            bounds.top,
            bounds.right - bounds.left,
            bounds.bottom - bounds.top,
        );
    }

    // Gets cumulative css rotate property (in degrees) for this element, considering all parents.
    // https://developer.mozilla.org/en-US/docs/Web/CSS/rotate
    // This is different from the css transform:rotate() value! Use the TransformStyle helper to get that.
    static getCumulativeCSSRotateDeg(elem: HTMLElement) {
        let totalDegrees = 0;

        let returnElem: HTMLElement | null = elem;

        while (returnElem) {
            const degrees = Number.parseFloat(
                getComputedStyle(returnElem).rotate,
            );
            if (!Number.isNaN(degrees)) {
                totalDegrees += degrees;
            }

            returnElem = returnElem.parentElement;
        }

        return totalDegrees;
    }
}

// Utility class that represents the individual components of a CSS "transform" property.
class TransformStyle {
    translate: {
        x: number;
        y: number;
    } = { x: 0, y: 0 }; // { x, y } (Translation is pixels)
    rotate = 0; // Number (Rotation is radians)
    scale = 1; // Number (Scale is normalized, 1 = 100%)

    constructor(
        translateOrElement?:
            | Element
            | {
                  x: number;
                  y: number;
              }
            | null,
        rotate?: number,
        scale?: number,
    ) {
        if (translateOrElement && translateOrElement instanceof Element) {
            this.getFromElement(translateOrElement);
        } else {
            this.translate = translateOrElement ?? this.translate;
            this.rotate = rotate ?? this.rotate;
            this.scale = scale ?? this.scale;
        }
    }

    get isIdentity() {
        return (
            this.translate.x === 0 &&
            this.translate.y === 0 &&
            this.rotate === 0 &&
            this.scale === 1
        );
    }

    clone() {
        const trs = new TransformStyle();
        trs.translate = { ...this.translate };
        trs.rotate = this.rotate;
        trs.scale = this.scale;
        return trs;
    }

    getFromElement(elem: Element) {
        const computedStyle = getComputedStyle(elem);
        const matrix = new DOMMatrixReadOnly(computedStyle.transform);

        if (matrix.isIdentity) {
            return;
        }

        this.rotate = Math.atan2(matrix.m12, matrix.m11);

        if (matrix.m11 === 0 && matrix.m12 === 0) {
            this.scale = 0;
        } else if (Math.abs(matrix.m11) < Number.EPSILON * 10) {
            // approx 0
            this.scale = matrix.m12 / Math.sin(this.rotate);
        } else {
            this.scale = matrix.m11 / Math.cos(this.rotate);
        }

        this.translate = {
            x: matrix.m41,
            y: matrix.m42,
        };

        // My god there must be a better way, right?
    }

    applyToElement(elem: HTMLElement) {
        if (this.isIdentity) {
            elem.style.removeProperty("transform");
        } else {
            elem.style.transform = this.getCSS();
        }
    }

    getCSS() {
        if (this.isIdentity) {
            return "";
        }

        return [
            `translate(${this.translate?.x ?? 0}px, ${this.translate?.y ?? 0}px)`,
            `rotate(${this.rotate ?? 0}rad)`,
            `scale(${this.scale ?? 1})`,
        ].join(" ");
    }
}

class PhysPlayConfig {
    values: typeof defaultPhysConfigValues = { ...defaultPhysConfigValues };
    initialValues = { ...this.values };
    onupdate: (() => void) | null = null;

    constructor() {
        this.load();
        this.createDebugInputs();
    }

    reset() {
        this.values = { ...this.initialValues };
        sessionStorage.removeItem("PhysPlayConfig");
        this.updateDebugInputs();
        this.onupdate?.();
    }

    save() {
        sessionStorage.setItem("PhysPlayConfig", JSON.stringify(this.values));
        this.updateDebugInputs();
        this.onupdate?.();
    }

    load() {
        this.values = {
            ...this.initialValues,
            ...JSON.parse(sessionStorage.getItem("PhysPlayConfig") ?? "{}"),
        };
        this.updateDebugInputs();
    }

    createDebugInputs() {
        const elemContainer = document.querySelector("#physdebug ul");
        if (!elemContainer) {
            return;
        }

        for (const cfgName of Object.keys(this.values)) {
            const elem = document.createElement("div");
            let fnSetCfgValue: (event: Event) => void;
            // @ts-expect-error
            if (typeof this.values[cfgName] === "boolean") {
                elem.innerHTML = `<label><input type="checkbox" data-phys-config="${cfgName}">${cfgName}</label>`;
                fnSetCfgValue = (event) => {
                    // @ts-expect-error
                    this.values[cfgName] = (
                        event.target as HTMLInputElement
                    ).checked;
                };
            } else {
                elem.innerHTML = `<label><input type="text" data-phys-config="${cfgName}">${cfgName}</label>`;
                fnSetCfgValue = (event) => {
                    // @ts-expect-error
                    this.values[cfgName] = (
                        event.target as HTMLInputElement
                    ).value;
                };
            }

            const fnUpdate = (event: Event) => {
                fnSetCfgValue(event);
                this.save();
                this.onupdate?.();
            };
            elem.querySelector("input")?.addEventListener("change", fnUpdate);
            elem.querySelector("input")?.addEventListener("blur-sm", fnUpdate);
            elem.querySelector("input")?.addEventListener("submit", fnUpdate);
            elemContainer.appendChild(elem);
        }

        this.updateDebugInputs();
    }

    updateDebugInputs() {
        for (const elem of document.querySelectorAll("[data-phys-config]")) {
            // @ts-expect-error
            const cfgName = elem.attributes["data-phys-config"].value;
            const elemInput = document.querySelector(
                `[data-phys-config=${cfgName}]`,
            ) as HTMLInputElement;
            if (!elemInput) {
                continue;
            }

            // @ts-expect-error
            if (typeof this.values[cfgName] === "boolean") {
                // @ts-expect-error
                elemInput.checked = this.values[cfgName];
            } else {
                // @ts-expect-error
                elemInput.value = this.values[cfgName];
            }
        }
    }
}

const physPlayClassNames = {
    // Body classes
    DebugPageElements: "physDebugPageElements",
    DebugPhysics: "physDebugPhysics",
    HasPhysBodies: "physHasPhysBodies",
    AllElementsExtractable: "physAllElementsExtractable",
    PhysGunEquipped: "physGunEquipped",
    ShowPhysDebugUI: "showPhysDebugUI",
    ShowSoundDebugUI: "showSoundDebugUI",
    ShowGravGunMessage: "physGravGunMessage",

    // Interactive element classes
    PhysElement: "physElement",
    PhysElement_Extractable: "extractable",
    PhysElement_Extracted: "extracted",
    PhysElement_VisiblePlaceholder: "visiblePlaceholder",

    // Placeholder element classes
    Placeholder: "physPlaceholder",
    MediaPlaceholder: "physMediaPlaceholder",

    // Gravity gun classes
    GravGun: "gravgunHeld",
    GravGun_Container: "gravgunHeldContainer",
    GravGun_Equipped: "equipped",
    GravGun_HoveringOverItem: "hoveringOverItem",
    GravGun_HoldingItem: "holdingItem",
    GravGun_Recoil: "recoil",

    // Other
    GravGunButton_ButtonWiggle: "buttonWiggle",
    NoShadow: "noshadow",
};
