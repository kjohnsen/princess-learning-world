<script lang="ts">
    import {
        blushes,
        crowns,
        dresses,
        hairStyles,
        lipsticks,
        polishes,
        shadows,
        shoes,
    } from "$lib/stores/princessState";
    import { fade } from "svelte/transition";

    export let skinTone = "#FFDFC4";
    export let dressId = 0;
    export let hairId = 0;
    export let hairCutId = 0;
    export let crownId = 0;
    export let makeup = { blush: 0, shadow: 0, lipstick: 0, polish: 0 };
    export let scale = 1;
    export let shoeId = 0;

    // Helper to get item data safely
    $: currentDress = dresses.find((d) => d.id === dressId) || dresses[0];
    $: currentHair = hairStyles.find((h) => h.id === hairId) || hairStyles[0];
    $: currentCrown = crowns.find((c) => c.id === crownId) || crowns[0];
    $: currentBlush = blushes.find((m) => m.id === makeup.blush) || blushes[0];
    $: currentShadow =
        shadows.find((m) => m.id === makeup.shadow) || shadows[0];
    $: currentLipstick =
        lipsticks.find((m) => m.id === makeup.lipstick) || lipsticks[0];
    $: currentPolish =
        polishes.find((m) => m.id === makeup.polish) || polishes[0];
    $: currentShoe =
        shoes.find((s) => s.id === shoeId) || shoes[0];
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
        {#if hairCutId === 0}
            <path
                d="M80,80 Q125,40 170,80 L180,150 Q125,140 70,150 Z"
                fill={currentHair.color}
                style="transform-origin: center; transform: scale(1.2) translateY(-10px);"
            />
        {:else if hairCutId === 1}
            <!-- Short Bob -->
            <path
                d="M70,80 Q125,30 180,80 L175,110 Q125,130 75,110 Z"
                fill={currentHair.color}
                style="transform-origin: center; transform: scale(1.2) translateY(-10px);"
            />
        {:else if hairCutId === 2}
            <!-- High Bun Back -->
            <circle cx="125" cy="30" r="30" fill={currentHair.color} />
            <path d="M90,75 Q125,20 160,75 Z" fill={currentHair.color} />
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
            {#if makeup.shadow > 0}
                <circle
                    cx="110"
                    cy="75"
                    r="6"
                    fill={currentShadow.color}
                    style="mix-blend-mode: multiply;"
                />
                <circle
                    cx="140"
                    cy="75"
                    r="6"
                    fill={currentShadow.color}
                    style="mix-blend-mode: multiply;"
                />
            {/if}

            <!-- Mouth / Lipstick -->
            <path
                d="M115,90 Q125,100 135,90"
                stroke={makeup.lipstick > 0 ? currentLipstick.color : "#333"}
                stroke-width={makeup.lipstick > 0 ? "3" : "2"}
                fill="none"
            />

            <!-- Blush -->
            {#if makeup.blush > 0}
                <circle
                    cx="105"
                    cy="85"
                    r="5"
                    fill={currentBlush.color}
                    filter="blur(2px)"
                />
                <circle
                    cx="145"
                    cy="85"
                    r="5"
                    fill={currentBlush.color}
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
            {#if dressId === 5}
                <!-- Red sash at waist -->
                <path
                    d="M93,220 Q125,235 157,220 L158,235 Q125,250 92,235 Z"
                    fill="#EF4444"
                />
                <!-- Sash tie hanging down -->
                <path
                    d="M135,230 L125,320 L135,325 L145,230 Z"
                    fill="#D32F2F"
                />
                
                <!-- Red neck bandana -->
                <path d="M100,122 L125,142 L150,122 Z" fill="#EF4444" />
                <path d="M125,142 L120,155 L125,145 L130,155 Z" fill="#D32F2F" />
            {/if}
        {/if}

        <!-- Shoes -->
        {#if shoeId > 0}
            {#if shoeId === 3}
                <!-- San Fermin Alpargatas with ribbons wrapping ankles -->
                <!-- Left Shoe Ribbons -->
                <path d="M98,363 L112,371 M112,363 L98,371" stroke="#EF4444" stroke-width="2" />
                <path d="M98,353 L112,361 M112,353 L98,361" stroke="#EF4444" stroke-width="2" />
                <!-- Right Shoe Ribbons -->
                <path d="M138,363 L152,371 M152,363 L138,371" stroke="#EF4444" stroke-width="2" />
                <path d="M138,353 L152,361 M152,353 L138,361" stroke="#EF4444" stroke-width="2" />

                <!-- Left Foot Shoe -->
                <path d="M93,372 L117,372 L119,384 L91,384 Z" fill="#FFFFFF" stroke="#D32F2F" stroke-width="1" />
                <!-- Right Foot Shoe -->
                <path d="M133,372 L157,372 L159,384 L131,384 Z" fill="#FFFFFF" stroke="#D32F2F" stroke-width="1" />
            {:else}
                <!-- Normal Shoes -->
                <path d="M93,372 L117,372 L119,384 L91,384 Z" fill={currentShoe.color} />
                <path d="M133,372 L157,372 L159,384 L131,384 Z" fill={currentShoe.color} />
            {/if}
        {/if}

        <!-- Hair (Front/Bangs) - Moved BEHIND face/crowns for visibility -->
        {#if hairCutId === 0 || hairCutId === 1}
            <!-- swept bangs -->
            <path
                d="M75,80 Q75,50 85,40 Q125,20 165,40 Q175,50 175,80 L170,60 Q125,40 80,60 Z"
                fill={currentHair.color}
            />
        {:else if hairCutId === 2}
            <!-- Bun front layer (tight) -->
            <path
                d="M80,85 Q80,55 90,45 Q125,25 160,45 Q170,55 170,85 L165,65 Q125,45 85,65 Z"
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

        <!-- Nail Polish -->
        {#if makeup.polish > 0}
            <circle cx="50" cy="232" r="6" fill={currentPolish.color} />
            <circle cx="210" cy="182" r="6" fill={currentPolish.color} />
        {/if}

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
