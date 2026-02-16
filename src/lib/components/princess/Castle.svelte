<script lang="ts">
    import { fade } from 'svelte/transition';
    import { princessState } from '$lib/stores/princessState';
    import PrincessAvatar from './PrincessAvatar.svelte';
    import PrinceAvatar from './PrinceAvatar.svelte';
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

    <div class="avatars-layer">
        <div class="princess-pos">
            <PrincessAvatar 
                skinTone={$princessState.skinTone}
                dressId={$princessState.dress}
                hairId={$princessState.hair}
                crownId={$princessState.crown}
                makeupId={$princessState.makeup}
                scale={0.4}
            />
        </div>
        <div class="prince-pos">
            <PrinceAvatar scale={0.4} />
        </div>
    </div>
</div>

<style>
    .castle-scene {
        width: 100%;
        height: 500px;
        position: relative;
        overflow: hidden;
        border-radius: var(--radius-lg);
        background: linear-gradient(to bottom, #4FC3F7, #E1F5FE);
    }
    
    .ground {
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 100px;
        background: #66BB6A;
        z-index: 1;
    }
    
    .path {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: 0;
        width: 100px;
        height: 100%;
        background: #D7CCC8;
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
        background: #E0E0E0;
        border: 2px solid #9E9E9E;
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
    
    .tower.side.left { left: 40px; }
    .tower.side.right { right: 40px; }
    
    .roof {
        position: absolute;
        top: -40px;
        left: -5px; /* overhang */
        width: calc(100% + 10px);
        height: 40px;
        background: #F06292; /* Pink roofs */
        clip-path: polygon(50% 0, 0% 100%, 100% 100%);
    }
    
    .gate {
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 40px;
        height: 60px;
        background: #5D4037;
        border-radius: 20px 20px 0 0;
    }
    
    .flag {
        position: absolute;
        top: -60px;
        left: 50%;
        font-size: 2rem;
    }

    .avatars-layer {
        position: absolute;
        bottom: 20px;
        left: 0;
        width: 100%;
        display: flex;
        justify-content: center;
        gap: 0; 
        pointer-events: none;
        z-index: 10;
    }
    
    .princess-pos { transform: scaleX(-1) translateX(-20px); }
    .prince-pos { transform: translateX(-20px); }
</style>
