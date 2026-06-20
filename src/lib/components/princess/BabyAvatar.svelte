<script lang="ts">
    export let scale = 1;
    export let skinTone = "#FFDFC4";
    export let swaddleColor = "#FFB6C1"; // Pink, blue, lavender, mint etc.
    export let clothing: 'onesie' | 'dress' | 'sanfermin' = "onesie";
    export let shoe: 'barefoot' | 'booties' | 'sanfermin' = "barefoot";
    export let accessory: 'none' | 'hairbow' | 'cap' | 'bandana' = "none";
    export let eyesClosed = false;
    export let gender: 'girl' | 'boy' = "girl";
</script>

<div class="avatar-container" style="transform: scale({scale});">
    <svg viewBox="0 0 160 210" class="baby-preview">
        <defs>
            <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
                <feDropShadow
                    dx="1"
                    dy="2"
                    stdDeviation="2"
                    flood-opacity="0.15"
                />
            </filter>
        </defs>

        <!-- Feet / Shoes (Bottom layer of body) -->
        <g>
            {#if shoe === "barefoot"}
                <!-- Bare feet -->
                <circle cx="62" cy="180" r="7" fill={skinTone} />
                <circle cx="98" cy="180" r="7" fill={skinTone} />
                <!-- Toes -->
                <circle cx="58" cy="177" r="2" fill={skinTone} />
                <circle cx="102" cy="177" r="2" fill={skinTone} />
            {:else if shoe === "booties"}
                <!-- Booties matching swaddle/outfit color -->
                <circle cx="62" cy="180" r="9" fill={clothing === "sanfermin" ? "#EF4444" : swaddleColor} />
                <circle cx="98" cy="180" r="9" fill={clothing === "sanfermin" ? "#EF4444" : swaddleColor} />
                <circle cx="62" cy="174" r="5" fill="#FFF" opacity="0.3" />
                <circle cx="98" cy="174" r="5" fill="#FFF" opacity="0.3" />
            {:else if shoe === "sanfermin"}
                <!-- San Fermin Alpargatas: White shoes with red straps -->
                <circle cx="62" cy="180" r="9" fill="#FFFFFF" stroke="#E5E7EB" stroke-width="0.5" />
                <circle cx="98" cy="180" r="9" fill="#FFFFFF" stroke="#E5E7EB" stroke-width="0.5" />
                <!-- Red ribbons/straps -->
                <path d="M57,175 L67,185 M67,175 L57,185" stroke="#EF4444" stroke-width="1.5" />
                <path d="M93,175 L103,185 M103,175 L93,185" stroke="#EF4444" stroke-width="1.5" />
            {/if}
        </g>

        <!-- Body / Clothing -->
        <g filter="url(#shadow)">
            {#if clothing === "onesie"}
                <!-- Regular Onesie/Swaddle -->
                <rect x="40" y="70" width="80" height="105" rx="40" fill={swaddleColor} />
                <!-- Swaddle lines -->
                <path d="M50,110 Q80,125 110,110" stroke="rgba(255,255,255,0.4)" stroke-width="3.5" fill="none" />
                <path d="M45,140 Q80,160 115,140" stroke="rgba(255,255,255,0.4)" stroke-width="3.5" fill="none" />
            {:else if clothing === "dress"}
                <!-- Dress Option -->
                <rect x="46" y="70" width="68" height="50" rx="12" fill={swaddleColor} />
                <!-- Flare skirt -->
                <path d="M46,115 L26,170 Q80,185 134,170 L114,115 Z" fill={swaddleColor} />
                <!-- Dress details / White lace trim -->
                <path d="M26,170 Q80,185 134,170" stroke="#FFF" stroke-width="3" fill="none" />
                <path d="M65,70 Q80,82 95,70" stroke="#FFF" stroke-width="3" fill="none" />
            {:else if clothing === "sanfermin"}
                <!-- San Fermin Clothing: White with red sash and neck bandana -->
                <rect x="40" y="70" width="80" height="105" rx="40" fill="#FFFFFF" stroke="#E5E7EB" stroke-width="1" />
                
                <!-- Red Waist Sash -->
                <rect x="40" y="115" width="80" height="12" fill="#EF4444" />
                <!-- Sash knot / ties hanging down -->
                <path d="M60,127 L57,150 L64,152 Z" fill="#D32F2F" />

                <!-- Red Neck Bandana -->
                <path d="M62,70 L80,88 L98,70 Z" fill="#EF4444" />
                <!-- Bandana knot -->
                <circle cx="80" cy="88" r="3" fill="#D32F2F" />
            {/if}

            <!-- Head -->
            <circle cx="80" cy="55" r="32" fill={skinTone} />
        </g>

        <!-- Hair Tuft/Curl (Placed behind accessories) -->
        <path d="M80,24 Q85,14 77,10 Q73,14 80,24" fill="#78350F" />

        <!-- Face Details -->
        <g>
            {#if eyesClosed}
                <!-- Closed/Sleeping Eyes -->
                <path d="M63,54 Q68,58 73,54" stroke="#333" stroke-width="2" fill="none" stroke-linecap="round" />
                <path d="M87,54 Q92,58 97,54" stroke="#333" stroke-width="2" fill="none" stroke-linecap="round" />
            {:else}
                <!-- Open Eyes -->
                <circle cx="68" cy="54" r="3" fill="#333" />
                <circle cx="92" cy="54" r="3" fill="#333" />
            {/if}

            <!-- Twin girls eyelashes -->
            {#if gender === "girl"}
                {#if eyesClosed}
                    <path d="M61,52 L58,48 M75,52 L78,48" stroke="#333" stroke-width="1.5" />
                    <path d="M85,52 L82,48 M99,52 L102,48" stroke="#333" stroke-width="1.5" />
                {:else}
                    <path d="M65,49 L62,45 M95,49 L98,45" stroke="#333" stroke-width="1.5" />
                {/if}
            {/if}

            <!-- Rosy Cheeks -->
            <circle cx="58" cy="62" r="5" fill="rgba(255, 105, 180, 0.4)" filter="blur(1px)" />
            <circle cx="102" cy="62" r="5" fill="rgba(255, 105, 180, 0.4)" filter="blur(1px)" />

            <!-- Pacifier -->
            <circle cx="80" cy="67" r="8" fill="#FFF" stroke="#DDD" stroke-width="1" />
            <circle cx="80" cy="67" r="5" fill={clothing === "sanfermin" ? "#EF4444" : swaddleColor} />
            <path d="M80,71 Q85,76 80,81" stroke="#FFF" stroke-width="1.8" fill="none" />
        </g>

        <!-- Accessories (Top Layer) -->
        <g>
            {#if accessory === "hairbow"}
                <!-- Pink Hair Bow -->
                <path d="M73,22 L63,16 L67,27 Z" fill="#FF6B97" />
                <path d="M79,22 L89,16 L85,27 Z" fill="#FF6B97" />
                <circle cx="76" cy="22" r="4.5" fill="#FFD700" />
            {:else if accessory === "cap"}
                <!-- Rounded Cap -->
                <path d="M51,44 Q80,16 109,44 A31,31 0 0,0 51,44 Z" fill={clothing === "sanfermin" ? "#EF4444" : swaddleColor} />
                <!-- Cap pompom -->
                <circle cx="80" cy="20" r="5.5" fill="#FFF" />
            {:else if accessory === "bandana"}
                <!-- Red Head Bandana/headband -->
                <path d="M52,38 Q80,28 108,38" stroke="#EF4444" stroke-width="5" fill="none" stroke-linecap="round" />
                <!-- Bandana side tie -->
                <path d="M51,36 L43,28 M51,36 L44,44" stroke="#EF4444" stroke-width="3.5" fill="none" stroke-linecap="round" />
            {/if}
        </g>
    </svg>
</div>

<style>
    .avatar-container {
        display: inline-block;
        transform-origin: center center;
    }
    .baby-preview {
        height: 120px;
        width: 100px;
    }
</style>
