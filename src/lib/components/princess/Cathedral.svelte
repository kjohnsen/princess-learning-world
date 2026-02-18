<script lang="ts">
    import { princessState } from "$lib/stores/princessState";
    import PrinceAvatar from "./PrinceAvatar.svelte";
    import PrincessAvatar from "./PrincessAvatar.svelte";

    // Confetti effect
    let confetti = Array(50)
        .fill(0)
        .map(() => ({
            x: Math.random() * 100,
            y: -10 - Math.random() * 50,
            color: ["#FFD700", "#FF69B4", "#87CEEB", "#FFFFFF"][
                Math.floor(Math.random() * 4)
            ],
            delay: Math.random() * 5,
            duration: 3 + Math.random() * 2,
        }));
</script>

<div class="cathedral-scene">
    <!-- Interior Background -->
    <div class="wall">
        <!-- Stain Glass Windows -->
        <div class="window left">
            <div class="glass"></div>
        </div>
        <div class="window right">
            <div class="glass"></div>
        </div>

        <!-- Rose Window -->
        <div class="rose-window">
            <div class="glass-circle"></div>
        </div>

        <!-- Arch/Altar Area -->
        <div class="archway">
            <div class="altar"></div>
        </div>
    </div>

    <!-- Floor/Aisle -->
    <div class="floor">
        <div class="carpet"></div>
    </div>

    <!-- Decorations -->
    <div class="flowers left">💐</div>
    <div class="flowers right">💐</div>

    <!-- Characters -->
    <div class="avatars-layer">
        <!-- Confetti falling -->
        {#each confetti as c}
            <div
                class="confetti"
                style="left: {c.x}%; top: {c.y}%; background: {c.color}; animation-delay: {c.delay}s; animation-duration: {c.duration}s;"
            ></div>
        {/each}

        <div class="couple-container">
            <div class="princess-pos">
                <PrincessAvatar
                    skinTone={$princessState.skinTone}
                    dressId={$princessState.dress}
                    hairId={$princessState.hair}
                    crownId={$princessState.crown}
                    makeupId={$princessState.makeup}
                    scale={0.45}
                />
            </div>
            <div class="prince-pos">
                <PrinceAvatar scale={0.45} />
            </div>
        </div>
    </div>
</div>

<style>
    .cathedral-scene {
        width: 100%;
        height: 500px;
        position: relative;
        overflow: hidden;
        border-radius: var(--radius-lg);
        background: #f5f5dc; /* Beige stone */
        box-shadow: inset 0 0 50px rgba(0, 0, 0, 0.2);
    }

    .wall {
        position: absolute;
        top: 0;
        width: 100%;
        height: 80%;
        background: radial-gradient(circle at 50% 30%, #fff8e1, #d7ccc8);
    }

    .floor {
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 20%;
        background: #8d6e63;
        perspective: 500px;
    }

    .carpet {
        position: absolute;
        left: 50%;
        bottom: 0;
        transform: translateX(-50%);
        width: 120px;
        height: 100%;
        background: #c62828;
        border-left: 5px solid #ffd700;
        border-right: 5px solid #ffd700;
    }

    .window {
        position: absolute;
        top: 100px;
        width: 60px;
        height: 120px;
        background: #333;
        border-radius: 30px 30px 0 0;
        border: 4px solid #5d4037;
    }

    .window.left {
        left: 100px;
    }
    .window.right {
        right: 100px;
    }

    .glass {
        width: 100%;
        height: 100%;
        background: linear-gradient(
            135deg,
            rgba(255, 0, 0, 0.5),
            rgba(0, 0, 255, 0.5)
        );
        border-radius: 25px 25px 0 0;
        opacity: 0.8;
    }

    .rose-window {
        position: absolute;
        top: 40px;
        left: 50%;
        transform: translateX(-50%);
        width: 100px;
        height: 100px;
        border-radius: 50%;
        border: 5px solid #5d4037;
        background: #333;
        overflow: hidden;
    }

    .glass-circle {
        width: 100%;
        height: 100%;
        background: conic-gradient(red, yellow, lime, aqua, blue, magenta, red);
        opacity: 0.7;
    }

    .archway {
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 200px;
        height: 150px;
        border: 20px solid #a1887f;
        border-bottom: none;
        border-radius: 100px 100px 0 0;
        z-index: 1;
    }

    .altar {
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 80px;
        height: 40px;
        background: #ffd700;
        border-radius: 5px 5px 0 0;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    }

    .flowers {
        position: absolute;
        bottom: 25%;
        font-size: 3rem;
        z-index: 5;
    }

    .flowers.left {
        left: 20%;
        transform: rotate(-10deg);
    }
    .flowers.right {
        right: 20%;
        transform: rotate(10deg);
    }

    .avatars-layer {
        position: absolute;
        bottom: 30px;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 10;
    }

    .couple-container {
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        align-items: flex-end;
        justify-content: center;
        width: 300px;
    }

    .princess-pos {
        transform: scaleX(-1) translateX(-30px); /* Face right */
        z-index: 2;
    }

    .prince-pos {
        transform: translateX(-30px); /* Face left */
        z-index: 1;
    }

    .confetti {
        position: absolute;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        animation: fall linear infinite;
    }

    @keyframes fall {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(500px) rotate(360deg);
            opacity: 0;
        }
    }
</style>
