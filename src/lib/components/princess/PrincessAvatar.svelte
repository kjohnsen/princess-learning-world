<script lang="ts">
    import {
        crowns,
        dresses,
        hairStyles,
        makeupStyles,
    } from "$lib/stores/princessState";
    import { fade } from "svelte/transition";

    export let skinTone = "#FFDFC4";
    export let dressId = 0;
    export let hairId = 0;
    export let crownId = 0;
    export let makeupId = 0;
    export let scale = 1;

    // Helper to get item data safely
    $: currentDress = dresses.find((d) => d.id === dressId) || dresses[0];
    $: currentHair = hairStyles.find((h) => h.id === hairId) || hairStyles[0];
    $: currentCrown = crowns.find((c) => c.id === crownId) || crowns[0];
    $: currentMakeup =
        makeupStyles.find((m) => m.id === makeupId) || makeupStyles[0];
</script>

<div class="avatar-container" style="transform: scale({scale});">
    <svg viewBox="0 0 250 420" class="character-preview">
        <!-- Defs for filters/gradients -->
        <defs>
            <filter id="shadow">
                <feDropShadow
                    dx="2"
                    dy="2"
                    stdDeviation="3"
                    flood-opacity="0.2"
                />
            </filter>
        </defs>

        <!-- Hair (Back) - FIRST / BOTTOM LAYER -->
        {#if hairId >= 0}
            <path
                d="M80,80 Q125,40 170,80 L180,150 Q125,140 70,150 Z"
                fill={currentHair.color}
                style="transform-origin: center; transform: scale(1.2) translateY(-10px);"
            />
        {/if}

        <!-- Body -->
        <g filter="url(#shadow)">
            <!-- Legs/Base -->
            <path d="M100,250 L100,380 L150,380 L150,250 Z" fill={skinTone} />
            <!-- Torso -->
            <path
                d="M85,140 Q125,130 165,140 L160,250 L90,250 Z"
                fill={skinTone}
            />
            <!-- Neck -->
            <rect x="110" y="100" width="30" height="40" fill={skinTone} />
            <!-- Head -->
            <circle cx="125" cy="80" r="45" fill={skinTone} />
        </g>

        <!-- Face -->
        <g>
            <circle cx="110" cy="75" r="4" fill="#333" />
            <circle cx="140" cy="75" r="4" fill="#333" />

            <!-- Eyeshadow (Under lashes, above skin) -->
            {#if makeupId > 0}
                <circle
                    cx="110"
                    cy="75"
                    r="6"
                    fill={currentMakeup.shadow}
                    style="mix-blend-mode: multiply;"
                />
                <circle
                    cx="140"
                    cy="75"
                    r="6"
                    fill={currentMakeup.shadow}
                    style="mix-blend-mode: multiply;"
                />
            {/if}

            <path
                d="M115,90 Q125,100 135,90"
                stroke="#333"
                stroke-width="2"
                fill="none"
            />

            <!-- Blush -->
            {#if makeupId > 0}
                <circle
                    cx="105"
                    cy="85"
                    r="5"
                    fill={currentMakeup.blush}
                    filter="blur(2px)"
                />
                <circle
                    cx="145"
                    cy="85"
                    r="5"
                    fill={currentMakeup.blush}
                    filter="blur(2px)"
                />
            {/if}
        </g>

        <!-- Underwear (Basic) -->
        <path
            d="M90,250 L160,250 L150,280 L100,280 Z"
            fill="white"
            opacity={dressId === 0 ? 0.8 : 0}
        />
        <path
            d="M90,150 Q125,180 160,150 L160,200 L90,200 Z"
            fill="white"
            opacity={dressId === 0 ? 0.8 : 0}
        />

        <!-- Dress Overlay -->
        {#if dressId > 0}
            <path
                d="M85,150 Q125,180 165,150 L200,380 Q125,420 50,380 Z"
                fill={currentDress.color}
                transition:fade
            />
            <!-- Dress Detail -->
            <path
                d="M85,150 Q125,180 165,150"
                stroke="rgba(255,255,255,0.3)"
                stroke-width="5"
                fill="none"
            />
        {/if}

        <!-- Hair (Front/Bangs) - Moved BEHIND face/crowns for visibility -->
        {#if hairId >= 0}
            <!-- High swept bangs, kept simple to not block eyes -->
            <path
                d="M75,80 Q75,50 85,40 Q125,20 165,40 Q175,50 175,80 L170,60 Q125,40 80,60 Z"
                fill={currentHair.color}
            />
        {/if}

        <!-- Arms - Right arm reaching out for holding hands -->
        <!-- Left Arm (Normal) -->
        <path
            d="M90,160 Q60,200 50,230"
            stroke={skinTone}
            stroke-width="20"
            stroke-linecap="round"
            fill="none"
        />
        <!-- Right Arm (Reaching Right) -->
        <path
            d="M160,160 Q190,180 210,180"
            stroke={skinTone}
            stroke-width="20"
            stroke-linecap="round"
            fill="none"
        />

        <!-- Crowns - On top of everything -->
        {#if crownId > 0}
            {#if crownId === 3}
                <!-- Floral -->
                <path
                    d="M90,55 Q125,45 160,55"
                    stroke={currentCrown.color}
                    stroke-width="5"
                    fill="none"
                />
                <circle cx="90" cy="55" r="3" fill="pink" />
                <circle cx="125" cy="50" r="3" fill="white" />
                <circle cx="160" cy="55" r="3" fill="pink" />
            {:else}
                <path
                    d="M95,55 L95,40 L110,50 L125,35 L140,50 L155,40 L155,55 Z"
                    fill={currentCrown.color}
                    stroke="#B8860B"
                    stroke-width="1"
                />
            {/if}
        {/if}
    </svg>
</div>

<style>
    .avatar-container {
        display: inline-block;
        transform-origin: top center;
    }
    .character-preview {
        height: 400px;
        width: 300px;
        filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1));
    }
</style>
