<script lang="ts">
    import {
        princeCapes,
        princeCrowns,
        princeHairStyles,
        princePants,
        princeShirts,
    } from "$lib/stores/princeState";

    export let scale = 1;
    export let skinTone = "#FFDFC4";
    export let hairId = 0;
    export let hairCutId = 0;
    export let shirtId = 0;
    export let pantsId = 0;
    export let capeId = 0;
    export let crownId = 0;

    $: currentHair =
        princeHairStyles.find((h) => h.id === hairId) || princeHairStyles[0];
    $: currentShirt =
        princeShirts.find((s) => s.id === shirtId) || princeShirts[0];
    $: currentPants =
        princePants.find((p) => p.id === pantsId) || princePants[0];
    $: currentCape = princeCapes.find((c) => c.id === capeId) || princeCapes[0];
    $: currentCrown =
        princeCrowns.find((c) => c.id === crownId) || princeCrowns[0];
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

        <!-- Body -->
        <g filter="url(#shadow)">
            <!-- Legs/Pants -->
            <path
                d="M100,250 L100,380 L150,380 L150,250 Z"
                fill={currentPants.color}
            />
            <!-- Blue pants -->
            <!-- Torso/Tunic -->
            <path
                d="M85,140 Q125,130 165,140 L160,250 L90,250 Z"
                fill={currentShirt.color}
            />
            <!-- Lighter blue tunic -->
            <!-- Belt -->
            <rect x="90" y="240" width="70" height="10" fill="#FCD34D" />
            <!-- Neck -->
            <rect x="110" y="100" width="30" height="40" fill={skinTone} />
            <!-- Head -->
            <circle cx="125" cy="80" r="45" fill={skinTone} />

            <!-- Arms -->
            <!-- Left Arm (Reaching Left) -->
            <path
                d="M85,145 Q60,165 40,165"
                stroke={skinTone}
                stroke-width="20"
                stroke-linecap="round"
                fill="none"
            />
            <!-- Right Arm (Normal) -->
            <path
                d="M165,145 Q190,180 200,220"
                stroke={skinTone}
                stroke-width="20"
                stroke-linecap="round"
                fill="none"
            />
            <!-- Sleeves -->
            <path
                d="M85,145 Q72,162 68,170"
                stroke={currentShirt.color}
                stroke-width="20"
                stroke-linecap="round"
                fill="none"
            />
            <path
                d="M165,145 Q178,162 182,170"
                stroke={currentShirt.color}
                stroke-width="20"
                stroke-linecap="round"
                fill="none"
            />
        </g>

        <!-- Face -->
        <g>
            <circle cx="115" cy="75" r="4" fill="#333" />
            <circle cx="135" cy="75" r="4" fill="#333" />
            <path
                d="M115,90 Q125,95 135,90"
                stroke="#333"
                stroke-width="2"
                fill="none"
            />
            <!-- Smile -->
        </g>

        <!-- Hair -->
        {#if hairCutId === 0}
            <path
                d="M80,70 Q125,40 170,70 Q170,50 160,40 Q125,20 90,40 Q80,50 80,70"
                fill={currentHair.color}
            />
            <path d="M80,70 L80,90 Q75,85 80,70" fill={currentHair.color} />
            <path d="M170,70 L170,90 Q175,85 170,70" fill={currentHair.color} />
        {:else if hairCutId === 1}
            <!-- Spike -->
            <path
                d="M80,70 L100,25 L115,50 L135,15 L150,50 L170,35 L170,70 Z"
                fill={currentHair.color}
            />
            <path d="M80,70 L80,90 Q75,85 80,70" fill={currentHair.color} />
            <path d="M170,70 L170,90 Q175,85 170,70" fill={currentHair.color} />
        {:else if hairCutId === 2}
            <!-- Messy -->
            <path
                d="M70,80 Q90,40 110,60 Q130,30 150,60 Q170,40 180,80 Q190,60 170,90 Q140,85 125,95 Q100,85 80,90 Q65,65 70,80 Z"
                fill={currentHair.color}
                transform="translate(0, -25)"
            />
        {/if}

        <!-- Crown -->
        {#if currentCrown.color !== "transparent"}
            <path
                d="M95,50 L95,35 L110,45 L125,30 L140,45 L155,35 L155,50 Z"
                fill={currentCrown.color}
                stroke="#B8860B"
                stroke-width="1"
            />
        {/if}

        <!-- Cape (Behind) -->
        {#if currentCape.color !== "transparent"}
            <path
                d="M85,140 Q50,300 60,350 L190,350 Q200,300 165,140"
                fill={currentCape.color}
                style="z-index: -1;"
                opacity="0.8"
            />
        {/if}
    </svg>
</div>

<style>
    .avatar-container {
        display: inline-block;
        transform-origin: bottom center;
    }
    .character-preview {
        height: 400px;
        width: 300px;
        filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1));
    }
</style>
