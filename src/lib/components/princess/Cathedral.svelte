<script>
    // Confetti effect
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
</div>

<style>
    .cathedral-scene {
        width: 100%;
        height: 500px;
        position: relative;
        overflow: hidden;
        border-radius: var(--radius-lg);
        background: #f5f5dc;
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
    }

    .carpet {
        position: absolute;
        left: 50%;
        bottom: 0;
        transform: translateX(-50%);
        width: 120px;
        height: 100%;
        background: #c62828;
    }

    .window {
        position: absolute;
        top: 100px;
        width: 60px;
        height: 120px;
        background: #333;
        border-radius: 30px 30px 0 0;
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
        background: blue;
        opacity: 0.5;
    }

    .rose-window {
        position: absolute;
        top: 40px;
        left: 50%;
        transform: translateX(-50%);
        width: 100px;
        height: 100px;
        border-radius: 50%;
        background: #333;
    }

    .archway {
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 200px;
        height: 150px;
        background: #a1887f;
        border-radius: 100px 100px 0 0;
    }

    .altar {
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 80px;
        height: 40px;
        background: #ffd700;
    }

    .flowers {
        position: absolute;
        bottom: 25%;
        font-size: 3rem;
        z-index: 5;
    }

    .flowers.left {
        left: 20%;
    }
    .flowers.right {
        right: 20%;
    }
</style>
