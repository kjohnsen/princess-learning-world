<script lang="ts">
    import { inventory } from "$lib/stores/inventory";
    import { princessState } from "$lib/stores/princessState";
    import { scale } from "svelte/transition";
    import PrinceAvatar from "./PrinceAvatar.svelte";
    import PrincessAvatar from "./PrincessAvatar.svelte";

    // Simple flower data structure
    type Flower = {
        id: number;
        x: number;
        y: number;
        type: number; // 0-2 for different shapes/colors
        scale: number;
    };

    let flowers: Flower[] = [];
    let nextId = 0;

    // Track coins earned for animation
    let floatingTexts: { id: number; x: number; y: number; text: string }[] =
        [];
    let nextTextId = 0;

    function plantFlower(event: MouseEvent) {
        // Get click position
        const target = event.target as HTMLElement;
        const rect = target.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        // If clicked on existing flower (class 'flower-click-target'), harvest it!
        // We'll handle this in the flower click handler instead.

        // Don't plant in the sky
        if (y < rect.height * 0.4) return;

        // Don't plant if we just harvested (simple debounce via target check)
        if (target.closest(".flower-interactive")) return;

        const newFlower: Flower = {
            id: nextId++,
            x,
            y,
            type: Math.floor(Math.random() * 3),
            scale: 0.5 + Math.random() * 0.5,
        };

        flowers = [...flowers, newFlower];

        // Reward for planting too! Re-incentivize gardening
        // inventory.earnCoins(1); // Maybe too easy?
    }

    function harvestFlower(event: MouseEvent, flowerId: number) {
        event.stopPropagation(); // Don't plant a new flower

        // Remove flower
        const flower = flowers.find((f) => f.id === flowerId);
        if (flower) {
            flowers = flowers.filter((f) => f.id !== flowerId);

            // Earn coins
            inventory.earnCoins(10);

            // Show floating text
            const textId = nextTextId++;
            floatingTexts = [
                ...floatingTexts,
                { id: textId, x: flower.x, y: flower.y, text: "+10 💰" },
            ];
            setTimeout(() => {
                floatingTexts = floatingTexts.filter((t) => t.id !== textId);
            }, 1000);
        }
    }

    const flowerColors = ["#FF69B4", "#FFD700", "#9370DB"];
</script>

<div
    class="garden-scene"
    on:click={plantFlower}
    role="button"
    tabindex="0"
    on:keydown={() => {}}
>
    <div class="sky">
        <div class="sun"></div>
        <div class="cloud c1"></div>
        <div class="cloud c2"></div>
    </div>
    <div class="grass">
        <div class="avatars-layer">
            <div class="princess-pos">
                <PrincessAvatar
                    skinTone={$princessState.skinTone}
                    dressId={$princessState.dress}
                    hairId={$princessState.hair}
                    crownId={$princessState.crown}
                    makeupId={$princessState.makeup}
                    scale={0.5}
                />
            </div>
            <div class="prince-pos">
                <PrinceAvatar scale={0.5} />
            </div>
        </div>

        <div class="instruction">
            Tap grass to plant. Tap flower to harvest (+10💰)!
        </div>
        {#each flowers as flower (flower.id)}
            <!-- Interactive wrapper -->
            <button
                class="flower-interactive"
                style="left: {flower.x}px; top: {flower.y}px;"
                aria-label="Harvest flower"
                on:click={(e) => harvestFlower(e, flower.id)}
            >
                <div
                    class="flower"
                    style="transform: scale({flower.scale}); --flower-color: {flowerColors[
                        flower.type
                    ]}"
                    in:scale={{ duration: 400, start: 0 }}
                >
                    <div class="flower-head"></div>
                    <div class="stem"></div>
                    <div class="leaf left"></div>
                    <div class="leaf right"></div>
                </div>
            </button>
        {/each}

        {#each floatingTexts as ft (ft.id)}
            <div class="floating-text" style="left: {ft.x}px; top: {ft.y}px;">
                {ft.text}
            </div>
        {/each}
    </div>
</div>

<style>
    .garden-scene {
        width: 100%;
        height: 500px;
        position: relative;
        overflow: hidden;
        border-radius: var(--radius-lg);
        cursor:
            url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>')
                12 12,
            crosshair;
        background: linear-gradient(
            to bottom,
            #87ceeb 0%,
            #87ceeb 40%,
            #90ee90 40%,
            #4caf50 100%
        );
    }

    .sky {
        height: 40%;
        position: relative;
        z-index: 0;
    }

    .sun {
        position: absolute;
        top: 20px;
        right: 30px;
        width: 60px;
        height: 60px;
        background: #ffd700;
        border-radius: 50%;
        box-shadow: 0 0 40px #ffd700;
        animation: spin 20s linear infinite;
    }

    .cloud {
        background: white;
        border-radius: 20px;
        opacity: 0.8;
        position: absolute;
    }

    .c1 {
        width: 100px;
        height: 40px;
        top: 50px;
        left: 20%;
        animation: float 15s linear infinite alternate;
    }
    .c2 {
        width: 80px;
        height: 30px;
        top: 80px;
        left: 60%;
        animation: float 12s linear infinite alternate-reverse;
    }

    .grass {
        height: 60%;
        position: relative;
        z-index: 1;
    }

    .avatars-layer {
        position: absolute;
        bottom: 20px;
        width: 100%;
        display: flex;
        justify-content: center;
        gap: 20px;
        pointer-events: none;
        z-index: 0; /* Behind flowers */
    }

    .princess-pos {
        filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
    }

    .prince-pos {
        filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
    }

    .instruction {
        position: absolute;
        top: 10px;
        width: 100%;
        text-align: center;
        color: white;
        font-weight: bold;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
        pointer-events: none;
    }

    .flower {
        position: relative;
        pointer-events: none;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .flower-head {
        width: 30px;
        height: 30px;
        background: var(--flower-color);
        border-radius: 50%;
        position: relative;
        z-index: 2;
        box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.1);
    }

    .flower-head::after {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 10px;
        height: 10px;
        background: #fff;
        border-radius: 50%;
    }

    .stem {
        width: 4px;
        height: 40px;
        background: #2e7d32;
        margin: -5px auto 0;
        position: relative;
        z-index: 1;
    }

    .leaf {
        width: 15px;
        height: 10px;
        background: #2e7d32;
        position: absolute;
        border-radius: 0 10px 0 10px;
        top: 15px;
    }

    .leaf.left {
        left: -12px;
        transform: rotate(-10deg);
    }
    .leaf.right {
        right: -12px;
        transform: rotate(190deg) scaleX(-1);
    }

    @keyframes float {
        from {
            transform: translateX(0);
        }
        to {
            transform: translateX(30px);
        }
    }
    @keyframes spin {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }

    .flower-interactive {
        position: absolute;
        background: none;
        border: none;
        padding: 0;
        cursor: pointer;
        transform: translate(-50%, -100%);
    }

    .flower-interactive:hover {
        filter: brightness(1.2);
        transform: translate(-50%, -105%);
        transition: transform 0.1s;
    }

    .floating-text {
        position: absolute;
        color: #ffd700;
        font-weight: bold;
        font-size: 1.5rem;
        text-shadow: 0 2px 0 #000;
        pointer-events: none;
        animation: floatUpFade 1s forwards;
        z-index: 20;
    }

    @keyframes floatUpFade {
        0% {
            transform: translateY(0);
            opacity: 1;
        }
        100% {
            transform: translateY(-50px);
            opacity: 0;
        }
    }
</style>
