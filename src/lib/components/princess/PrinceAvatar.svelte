<script lang="ts">
    export let scale = 1;
    export let skinTone = '#FFDFC4';
</script>

<div class="avatar-container" style="transform: scale({scale});">
    <svg viewBox="0 0 250 420" class="character-preview">
        <!-- Defs for filters/gradients -->
        <defs>
            <filter id="shadow">
                <feDropShadow dx="2" dy="2" stdDeviation="3" flood-opacity="0.2"/>
            </filter>
        </defs>

        <!-- Body -->
        <g filter="url(#shadow)">
            <!-- Legs/Pants -->
            <path d="M100,250 L100,380 L150,380 L150,250 Z" fill="#1E3A8A" /> <!-- Blue pants -->
            <!-- Torso/Tunic -->
            <path d="M85,140 Q125,130 165,140 L160,250 L90,250 Z" fill="#3B82F6" /> <!-- Lighter blue tunic -->
            <!-- Belt -->
            <rect x="90" y="240" width="70" height="10" fill="#FCD34D" />
            <!-- Neck -->
            <rect x="110" y="100" width="30" height="40" fill={skinTone} />
            <!-- Head -->
            <circle cx="125" cy="80" r="45" fill={skinTone} />
            
            <!-- Arms -->
            <!-- Left Arm (Reaching Left) -->
            <path d="M85,145 Q60,165 40,165" stroke={skinTone} stroke-width="20" stroke-linecap="round" fill="none" />
            <!-- Right Arm (Normal) -->
            <path d="M165,145 Q190,180 200,220" stroke={skinTone} stroke-width="20" stroke-linecap="round" fill="none" />
             <!-- Sleeves -->
            <path d="M85,145 Q72,162 68,170" stroke="#3B82F6" stroke-width="20" stroke-linecap="round" fill="none" />
            <path d="M165,145 Q178,162 182,170" stroke="#3B82F6" stroke-width="20" stroke-linecap="round" fill="none" />
        </g>

        <!-- Face -->
        <g>
            <circle cx="115" cy="75" r="4" fill="#333" />
            <circle cx="135" cy="75" r="4" fill="#333" />
            <path d="M115,90 Q125,95 135,90" stroke="#333" stroke-width="2" fill="none" /> <!-- Smile -->
        </g>

        <!-- Hair (Short Brown) -->
        <path d="M80,70 Q125,40 170,70 Q170,60 160,50 Q125,30 90,50 Q80,60 80,70" fill="#5D4037" />
        <path d="M80,70 L80,90 Q75,85 80,70" fill="#5D4037" /> <!-- Sideburn -->
        <path d="M170,70 L170,90 Q175,85 170,70" fill="#5D4037" /> <!-- Sideburn -->

        <!-- Crown -->
        <path d="M95,50 L95,35 L110,45 L125,30 L140,45 L155,35 L155,50 Z" fill="#FFD700" stroke="#B8860B" stroke-width="1" />
        
        <!-- Cape (Behind) -->
        <path d="M85,140 Q50,300 60,350 L190,350 Q200,300 165,140" fill="#EF4444" style="z-index: -1;" opacity="0.8" />

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
        filter: drop-shadow(0 4px 6px rgba(0,0,0,0.1));
    }
</style>
