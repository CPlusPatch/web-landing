<template>
    <section id="gravgun" class=" ">
        <div id="gravgunimage" class="gravgunimage"></div>
        <div id="mobilemessage" class="text-secondary-foreground text-xs">
            <span class="use-mouse">Perhaps with a mouse?</span>
            <span class="use-desktop">Perhaps on a desktop browser?</span>
        </div>
    </section>
    <Teleport to="body">
        <div id="physContainer">
            <canvas id="physCanvas"></canvas>
            <canvas width="933" height="1057" id="physCanvas" style="background: transparent 0% 0% / contain"></canvas>
        </div>
    </Teleport>
</template>

<script lang="ts" setup>
onMounted(() => {
    new PhysPlay();
});
</script>

<style>
/* Stolen from https://www.half-life.com/en/halflife2/20th */
#mobilemessage {
    text-align: center;
    font-size: 100%;
    margin-top: -1em;
    pointer-events: none;
    transition: opacity 0.3s ease-out;
    line-height: 1em;
    min-height: 1em;
}

#mobilemessage span {
    display: none;
}

body:not(.physGravGunMessage) #mobilemessage {
    opacity: 0;
}

#physContainer {
    pointer-events: none;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 9001;
}

#physCanvas {
    position: fixed;
    /* Keeps the canvas fixed in place */
    top: 0;
    left: 0;
    width: 100vw;
    /* Full viewport width */
    height: 100vh;
    /* Full viewport height */
    z-index: 10000;
    /* Puts canvas on top of other content */
}

body:not(.physDebugPhysics) #physCanvas {
    visibility: hidden;
}

.physElement {
    pointer-events: all !important;
    contain: layout;
}

.physPlaceholder,
.physPlaceholder * {
    pointer-events: none !important;
}

.physElement.extractable {
    transition: all 0.2s ease-out;
    user-select: none;
    -webkit-user-select: none;
    /* for safari */
}

.physElement.extractable:hover {
    filter: drop-shadow(0px 2px 5px rgba(0, 0, 0, 0.3)) !important;
}

.physElement.extracted {
    transition: none !important;
}

body:not(.physGunEquipped) .physElement.extracted,
body:not(.physGunEquipped) .physElement.extracted * {
    cursor: default !important;
}

body:not(.physDebugPageElements) .physPlaceholder:not(.visiblePlaceholder),
body:not(.physDebugPageElements) .physPlaceholder:not(.visiblePlaceholder) * {
    visibility: hidden !important;
}

body:not(.physDebugPageElements) .physElement.visiblePlaceholder,
body:not(.physDebugPageElements) .physElement.visiblePlaceholder * {
    visibility: hidden !important;
}

body.physDebugPageElements .physPlaceholder {
    opacity: 0.3 !important;
}

.trashcan.physPlaceholder,
.trashcan.physPlaceholder * {
    visibility: visible !important;
}

body.physDebugPageElements .physElement:not(.extracted) {
    outline: dotted 2px magenta;
}

.physMediaPlaceholder {
    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAIAAAD91JpzAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAFiUAABYlAUlSJPAAAAAQSURBVBhXY/gPhBDwn+E/ABvyA/1Bas9NAAAAAElFTkSuQmCC") !important;
    background-size: 20px 20px !important;
    image-rendering: pixelated !important;
}

body.physGunEquipped,
body.physGunEquipped * {
    cursor: none !important;
}

body.physHasPhysBodies {
    user-select: none;
    -webkit-user-select: none;
    /* for safari */
}

.debugUI {
    user-select: none;
    -webkit-user-select: none;
    /* for safari */
    width: calc(90vw);
    margin-left: calc(-45vw + 50%);
    margin-bottom: 2em;
}

.debugUI input[type="text"] {
    width: 80%;
    margin-right: 1ch;
}

.debugUI ul {
    list-style-type: none;
    margin-bottom: 1em;
}

.debugUI li {
    margin: 3px;
    display: inline-block;
}

body:not(.showPhysDebugUI) #physdebug {
    display: none;
}

body:not(.showSoundDebugUI) #sounddebug {
    display: none;
}

.can {
    height: 54px;
    width: auto;
    position: absolute;
    filter: drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.5));
}

.can.intrash1,
.can.intrash2 {
    bottom: 10px;
}

.can.intrash1 {
    bottom: 130px;
    left: calc(var(--trash-width) * (-0.2));
    height: 80px;
}

.can.intrash2 {
    bottom: 120px;
    transform: rotate(90deg);
    left: calc(var(--trash-width) * (-0.35));
}

#can {
    bottom: 0;
    right: -20px;
}

.trashcan {
    height: var(--trash-height);
    width: var(--trash-width);
    position: absolute;
    bottom: 0;
    left: calc(var(--trash-width) * (-0.6));
    background-image: url("https://cdn.fastly.steamstatic.com/half-life.com/images/halflife220/trashcan.png");
    background-size: contain;
    background-position-x: center;
    background-position-y: bottom;
    filter: drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.5));
    user-select: none;
    -webkit-user-select: none;
    /* for safari */
    z-index: 9100 !important;
}

#gravgun {
    margin: auto;
    width: 90%;
    max-width: 90%;
}

body.physGunEquipped footer {
    pointer-events: none;
}

.gravgunimage {
    background-image: url("https://cdn.fastly.steamstatic.com/half-life.com/images/halflife220/gravgun-outline.png");
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
    margin: auto;
    width: 180px;
    height: 155px;
    transition-property: transform, background-image;
    transition-duration: 150ms;
    transition-timing-function: ease-in-out;
}

#gravgun.gravgunEquipped .gravgunimage,
#gravgun .gravgunimage.equipped {
    background-image: url("https://cdn.fastly.steamstatic.com/half-life.com/images/halflife220/gravgun-inset.png");
}

#gravgun.gravgunEquipped .gravgunimage:hover,
#gravgun .gravgunimage.equipped:hover {
    background-image: url("https://cdn.fastly.steamstatic.com/half-life.com/images/halflife220/gravgun-inset-hover.png");
}

.gravgunimage:hover {
    background-image: url("https://cdn.fastly.steamstatic.com/half-life.com/images/halflife220/gravgun-hover.png");
    transition-duration: 0ms;
}

@keyframes gravgunwiggle {

    0%,
    100% {
        transform: rotate(0deg);
    }

    10% {
        transform: rotate(10deg);
    }

    30% {
        transform: rotate(-10deg);
    }

    50% {
        transform: rotate(10deg);
    }

    70% {
        transform: rotate(-10deg);
    }

    90% {
        transform: rotate(10deg);
    }
}

.gravgunimage.buttonWiggle {
    animation-name: gravgunwiggle;
    animation-duration: 0.5s;
    animation-timing-function: ease-in-out;
    animation-iteration-count: 1;
}

body.physGravGunMessage .gravgunimage {
    background-image: url("https://cdn.fastly.steamstatic.com/half-life.com/images/halflife220/gravgun-hover.png");
    transition-duration: 0ms;
}

.gravgunHeldContainer {
    width: 150px;
    height: 150px;
    position: fixed;
    top: -60px;
    left: -70px;
    pointer-events: none;
    z-index: 9002;
}

.gravgunHeld {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
}

.gravgunHeld:not(.equipped) {
    display: none;
}

@keyframes gravgunRecoil {

    0%,
    100% {
        transform: rotateZ(0deg) scale(1);
    }

    10% {
        transform: rotateZ(0deg) scale(1.05);
    }

    20% {
        transform: rotateZ(2deg) scale(1.05);
    }

    40% {
        transform: rotateZ(-2deg) scale(1.05);
    }
}

.gravgunHeld.recoil {
    animation-name: gravgunRecoil;
    animation-duration: 0.5s;
    animation-iteration-count: 1;
}

@keyframes gravgunFlicker {

    0%,
    100% {
        opacity: calc((var(--flicker-min) + (0.27 * var(--flicker-magnitude))) * var(--flicker-scalar));
    }

    08% {
        opacity: calc((var(--flicker-min) + (0.64 * var(--flicker-magnitude))) * var(--flicker-scalar));
    }

    18% {
        opacity: calc((var(--flicker-min) + (0.27 * var(--flicker-magnitude))) * var(--flicker-scalar));
    }

    31% {
        opacity: calc((var(--flicker-min) + (1 * var(--flicker-magnitude))) * var(--flicker-scalar));
    }

    35% {
        opacity: calc((var(--flicker-min) + (0 * var(--flicker-magnitude))) * var(--flicker-scalar));
    }

    49% {
        opacity: calc((var(--flicker-min) + (0.55 * var(--flicker-magnitude))) * var(--flicker-scalar));
    }

    59% {
        opacity: calc((var(--flicker-min) + (0.27 * var(--flicker-magnitude))) * var(--flicker-scalar));
    }

    56% {
        opacity: calc((var(--flicker-min) + (0.64 * var(--flicker-magnitude))) * var(--flicker-scalar));
    }

    78% {
        opacity: calc((var(--flicker-min) + (0.09 * var(--flicker-magnitude))) * var(--flicker-scalar));
    }

    88% {
        opacity: calc((var(--flicker-min) + (0.64 * var(--flicker-magnitude))) * var(--flicker-scalar));
    }

    92% {
        opacity: calc((var(--flicker-min) + (0.82 * var(--flicker-magnitude))) * var(--flicker-scalar));
    }
}

.gravgunHeld::before {
    content: "";
    background: radial-gradient(circle,
            rgba(255, 212, 53, 1) 0%,
            rgba(255, 147, 32, 0.6) 10%,
            rgba(255, 140, 6, 0.3) 38%,
            rgba(255, 132, 0, 0) 59%);
    z-index: 0;
    display: block;
    width: 50px;
    height: 50px;
    position: relative;
    top: 37px;
    left: 41px;
    transform: scale(1.8);
    transition: all 0.1s ease-in-out;

    --flicker-min: 0.75;
    --flicker-magnitude: 0.25;
    --flicker-scalar: 0.5;
    animation-name: gravgunFlicker;
    animation-duration: 1.4s;
    animation-iteration-count: infinite;
}

.gravgunHeld.hoveringOverItem::before {
    transform: scale(2.2);
    --flicker-scalar: 0.8;
}

.gravgunHeld.holdingItem::before {
    transform: scale(2.5);
    --flicker-scalar: 1;
    animation-duration: 0.8s;
}

.gravgunHeld::after {
    content: "";
    background-image: url("https://cdn.fastly.steamstatic.com/half-life.com/images/halflife220/gravgun_vm_close.png");
    background-size: contain;
    background-repeat: no-repeat;
    z-index: 1;
    display: block;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
}

.gravgunHeld.hoveringOverItem::after {
    background-image: url("https://cdn.fastly.steamstatic.com/half-life.com/images/halflife220/gravgun_vm_open.png");
}
</style>
