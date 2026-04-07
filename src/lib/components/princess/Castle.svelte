<script lang="ts">
</script>

<div class="castle-scene">
    <div class="sky"></div>
    <div class="clouds"></div>

    <!-- Castle SVG Composition -->
    <div class="castle">
        <!-- Main Tower -->
        <div class="tower main">
            <div class="roof"></div>
            <div class="window"></div>
            <div class="gate"></div>
        </div>
        <!-- Side Towers -->
        <div class="tower side left">
            <div class="roof"></div>
            <div class="window"></div>
        </div>
        <div class="tower side right">
            <div class="roof"></div>
            <div class="window"></div>
        </div>
        <!-- Flag -->
        <div class="flag">🚩</div>
    </div>

    <div class="ground">
        <div class="path"></div>
    </div>
</div>

<style>
    .castle-scene {
        width: 100%;
        height: 500px;
        position: relative;
        overflow: hidden;
        border-radius: var(--radius-lg);
        background: linear-gradient(to bottom, #4fc3f7, #e1f5fe);
    }

    .ground {
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 100px;
        background: #66bb6a;
        z-index: 1;
    }

    .path {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: 0;
        width: 100px;
        height: 100%;
        background: #d7ccc8;
        clip-path: polygon(20% 0, 80% 0, 100% 100%, 0% 100%);
    }

    .castle {
        position: absolute;
        bottom: 80px; /* Sit on ground */
        left: 50%;
        transform: translateX(-50%);
        width: 300px;
        height: 250px;
        z-index: 2;
    }

    .tower {
        position: absolute;
        bottom: 0;
        background: #e0e0e0;
        border: 2px solid #9e9e9e;
    }

    .tower.main {
        left: 50%;
        transform: translateX(-50%);
        width: 100px;
        height: 180px;
        z-index: 2;
    }

    .tower.side {
        width: 60px;
        height: 120px;
        z-index: 1;
    }

    .tower.side.left {
        left: 40px;
    }
    .tower.side.right {
        right: 40px;
    }

    .roof {
        position: absolute;
        top: -40px;
        left: -5px; /* overhang */
        width: calc(100% + 10px);
        height: 40px;
        background: #f06292; /* Pink roofs */
        clip-path: polygon(50% 0, 0% 100%, 100% 100%);
    }

    .gate {
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 40px;
        height: 60px;
        background: #5d4037;
        border-radius: 20px 20px 0 0;
    }

    .flag {
        position: absolute;
        top: -60px;
        left: 50%;
        font-size: 2rem;
    }
</style>
