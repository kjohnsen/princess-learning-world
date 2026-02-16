<script lang="ts">
    import { fade } from 'svelte/transition';
    import { princessState } from '$lib/stores/princessState';
    import PrincessAvatar from './PrincessAvatar.svelte';
    import PrinceAvatar from './PrinceAvatar.svelte';

    let isNight = false;

    function toggleDayNight() {
        isNight = !isNight;
    }
</script>

<div class="bedroom-scene {isNight ? 'night' : 'day'}">
    <div class="window">
        <div class="sky"></div>
        {#if !isNight}
            <div class="sun"></div>
        {:else}
            <div class="moon"></div>
            <div class="stars">✨ ✨ ✨</div>
        {/if}
        <div class="curtains"></div>
    </div>

    <div class="room-content">
        <div class="bed" on:click={toggleDayNight}>
            <div class="pillow"></div>
            <div class="blanket"></div>
        </div>
        <div class="rug"></div>
        
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
    </div>
    
    <div class="instruction">Tap the bed to sleep! 💤</div>
</div>

<style>
    .bedroom-scene {
        width: 100%;
        height: 500px;
        position: relative;
        overflow: hidden;
        border-radius: var(--radius-lg);
        background: #FCE4EC; /* Pink walls */
        transition: background 1s;
    }
    
    .bedroom-scene.night {
        background: #283593; /* Dark blue walls */
    }

    .window {
        position: absolute;
        top: 50px;
        left: 50px;
        width: 120px;
        height: 150px;
        background: skyblue;
        border: 8px solid white;
        overflow: hidden;
    }
    
    .bedroom-scene.night .window { background: #000033; }
    
    .sun { width: 30px; height: 30px; background: yellow; border-radius: 50%; position: absolute; top: 10px; right: 10px; }
    .moon { width: 30px; height: 30px; background: white; border-radius: 50%; position: absolute; top: 10px; right: 10px; }
    .stars { color: white; position: absolute; top: 40px; font-size: 0.8rem; }

    .curtains {
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        border-right: 20px solid rgba(255,192,203,0.5);
        border-left: 20px solid rgba(255,192,203,0.5);
    }

    .bed {
        position: absolute;
        bottom: 50px;
        right: 50px;
        width: 200px;
        height: 120px;
        background: #8D6E63; /* Wood frame */
        border-radius: 10px;
        cursor: pointer;
        z-index: 5;
    }
    
    .pillow {
        position: absolute;
        top: -10px;
        left: 10px;
        width: 50px;
        height: 30px;
        background: white;
        border-radius: 10px;
    }
    
    .blanket {
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 80%;
        background: #F48FB1;
        border-radius: 5px;
    }

    .rug {
        position: absolute;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        width: 300px;
        height: 60px;
        background: rgba(255,255,255,0.3);
        border-radius: 50%;
    }

    .avatars-layer {
        position: absolute;
        bottom: 20px;
        left: 0;
        width: 100%;
        display: flex;
        justify-content: center;
        gap: 0; /* Holding hands */
        pointer-events: none;
        z-index: 10;
    }

    /* Pull them closer for hand holding */
    .princess-pos { transform: scaleX(-1) translateX(-20px); }
    .prince-pos { transform: translateX(-20px); }
    
    .instruction {
        position: absolute;
        top: 20px;
        width: 100%;
        text-align: center;
        color: #555;
        font-weight: bold;
    }
    
    .bedroom-scene.night .instruction { color: white; }
</style>
