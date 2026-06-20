<script lang="ts">
    export let scale = 1;
    export let skinTone = "#FFDFC4";
</script>

<div class="avatar-container" style="transform: scale({scale});">
    <svg viewBox="0 0 250 420" class="doctor-preview">
        <defs>
            <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
                <feDropShadow dx="2" dy="2" stdDeviation="3" flood-opacity="0.2" />
            </filter>
        </defs>

        <!-- Body -->
        <g filter="url(#shadow)">
            <!-- Legs/Pants (Blue Scrubs) -->
            <path d="M100,250 L100,380 L150,380 L150,250 Z" fill="#4DD0E1" />
            
            <!-- Torso (Doctor White Coat over Blue Scrubs) -->
            <!-- Blue Scrubs Shirt Underneath -->
            <path d="M85,140 Q125,130 165,140 L160,250 L90,250 Z" fill="#4DD0E1" />
            
            <!-- White Coat Panels -->
            <!-- Left Coat Panel -->
            <path d="M85,140 L115,140 L110,250 L85,250 Z" fill="#FFFFFF" />
            <!-- Right Coat Panel -->
            <path d="M135,140 L165,140 L165,250 L140,250 Z" fill="#FFFFFF" />
            <!-- Coat Collar -->
            <path d="M85,140 L110,175 L115,140 Z" fill="#ECEFF1" />
            <path d="M165,140 L140,175 L135,140 Z" fill="#ECEFF1" />

            <!-- Red Cross Icon on Coat Pocket -->
            <rect x="92" y="165" width="12" height="12" fill="#FFFFFF" rx="2" />
            <rect x="97" y="167" width="2" height="8" fill="#EF5350" />
            <rect x="94" y="170" width="8" height="2" fill="#EF5350" />

            <!-- Neck -->
            <rect x="110" y="100" width="30" height="40" fill={skinTone} />
            <!-- Head -->
            <circle cx="125" cy="80" r="45" fill={skinTone} />

            <!-- Arms -->
            <path d="M85,145 Q60,180 60,220" stroke="#FFFFFF" stroke-width="20" stroke-linecap="round" fill="none" />
            <path d="M165,145 Q190,180 190,220" stroke="#FFFFFF" stroke-width="20" stroke-linecap="round" fill="none" />
            <!-- Hands -->
            <circle cx="60" cy="225" r="10" fill={skinTone} />
            <circle cx="190" cy="225" r="10" fill={skinTone} />
        </g>

        <!-- Stethoscope around Neck -->
        <g>
            <!-- Tube -->
            <path d="M110,120 Q125,160 140,120" stroke="#78909C" stroke-width="4" fill="none" />
            <!-- Headpiece hanging down -->
            <path d="M125,152 L125,170" stroke="#78909C" stroke-width="4" fill="none" />
            <circle cx="125" cy="175" r="8" fill="#B0BEC5" stroke="#78909C" stroke-width="2" />
            <!-- Ear pieces -->
            <path d="M110,120 L108,110" stroke="#78909C" stroke-width="2" fill="none" />
            <path d="M140,120 L142,110" stroke="#78909C" stroke-width="2" fill="none" />
        </g>

        <!-- Face Details -->
        <g>
            <circle cx="115" cy="75" r="4" fill="#333" />
            <circle cx="135" cy="75" r="4" fill="#333" />
            <!-- Glasses -->
            <rect x="103" y="68" width="18" height="14" rx="3" stroke="#374151" stroke-width="2.5" fill="none" />
            <rect x="129" y="68" width="18" height="14" rx="3" stroke="#374151" stroke-width="2.5" fill="none" />
            <line x1="121" y1="75" x2="129" y2="75" stroke="#374151" stroke-width="2.5" />
            <!-- Smile -->
            <path d="M117,92 Q125,97 133,92" stroke="#333" stroke-width="2" fill="none" />
        </g>

        <!-- Hair / Surgeon Cap -->
        <g>
            <!-- Surgical Cap -->
            <path d="M80,68 Q125,32 170,68 C172,55 160,35 125,35 C90,35 78,55 80,68 Z" fill="#00ACC1" />
            <rect x="82" y="55" width="86" height="10" rx="3" fill="#00838F" />
        </g>

        <!-- Shoes (Doctor Clogs) -->
        <path d="M93,372 L117,372 L119,384 L91,384 Z" fill="#ECEFF1" stroke="#CFD8DC" stroke-width="1" />
        <path d="M133,372 L157,372 L159,384 L131,384 Z" fill="#ECEFF1" stroke="#CFD8DC" stroke-width="1" />
    </svg>
</div>

<style>
    .avatar-container {
        display: inline-block;
        transform-origin: bottom center;
    }
    .doctor-preview {
        height: 400px;
        width: 300px;
        filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1));
    }
</style>
