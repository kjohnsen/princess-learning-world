<script lang="ts">
    export let scale = 1;
    export let skinTone = "#FFDFC4";
    export let swaddleColor = "#FFB6C1"; // for clothing base
    export let clothing: 'onesie' | 'dress' | 'sanfermin' | 'tshirt' | 'pants' = "onesie";
    export let shoe: 'barefoot' | 'booties' | 'sneakers' | 'sanfermin' = "barefoot";
    export let accessory: 'none' | 'hairbow' | 'cap' | 'bandana' = "none";
    export let eyesClosed = false;
    export let gender: 'girl' | 'boy' = "girl";
    export let ageGroup: 'baby' | 'kid' | 'teenager' = "baby";
</script>

<div class="avatar-container" style="transform: scale({scale});">
    <svg viewBox="0 0 250 420" class="child-preview">
        <defs>
            <filter id="shadow" x="-15%" y="-15%" width="130%" height="130%">
                <feDropShadow dx="2" dy="3" stdDeviation="3" flood-opacity="0.18" />
            </filter>
        </defs>

        <!-- ==================== AGE: BABY ==================== -->
        {#if ageGroup === "baby"}
            <!-- Baby Body / Swaddle -->
            <g filter="url(#shadow)">
                {#if clothing === "sanfermin"}
                    <!-- White Swaddle -->
                    <rect x="85" y="270" width="80" height="110" rx="40" fill="#FFFFFF" stroke="#E5E7EB" stroke-width="1" />
                    <!-- Red sash -->
                    <rect x="85" y="315" width="80" height="12" fill="#EF4444" />
                    <path d="M102,327 L99,350 L106,352 Z" fill="#D32F2F" />
                    <!-- Red bandana -->
                    <path d="M107,260 L125,278 L143,260 Z" fill="#EF4444" />
                {:else if clothing === "dress"}
                    <!-- Baby Dress -->
                    <rect x="90" y="270" width="70" height="50" rx="12" fill={swaddleColor} />
                    <path d="M90,315 L70,375 Q125,390 180,375 L160,315 Z" fill={swaddleColor} />
                    <path d="M70,375 Q125,390 180,375" stroke="#FFF" stroke-width="3" fill="none" />
                {:else}
                    <!-- Onesie -->
                    <rect x="85" y="270" width="80" height="110" rx="40" fill={swaddleColor} />
                    <path d="M95,310 Q125,325 155,310" stroke="rgba(255,255,255,0.4)" stroke-width="3.5" fill="none" />
                    <path d="M90,340 Q125,360 160,340" stroke="rgba(255,255,255,0.4)" stroke-width="3.5" fill="none" />
                {/if}

                <!-- Baby Head -->
                <circle cx="125" cy="245" r="32" fill={skinTone} />
            </g>

            <!-- Hair Tuft -->
            <path d="M125,214 Q130,204 122,200 Q118,204 125,214" fill="#78350F" />

            <!-- Face Details -->
            <g>
                {#if eyesClosed}
                    <path d="M108,244 Q113,248 118,244" stroke="#333" stroke-width="2" fill="none" stroke-linecap="round" />
                    <path d="M132,244 Q137,248 142,244" stroke="#333" stroke-width="2" fill="none" stroke-linecap="round" />
                {:else}
                    <circle cx="113" cy="244" r="3" fill="#333" />
                    <circle cx="137" cy="244" r="3" fill="#333" />
                {/if}

                {#if gender === "girl"}
                    {#if eyesClosed}
                        <path d="M106,242 L103,238 M120,242 L123,238" stroke="#333" stroke-width="1.2" />
                        <path d="M130,242 L127,238 M144,242 L147,238" stroke="#333" stroke-width="1.2" />
                    {:else}
                        <path d="M110,239 L107,235 M140,239 L143,235" stroke="#333" stroke-width="1.2" />
                    {/if}
                {/if}

                <circle cx="103" cy="252" r="5" fill="rgba(255, 105, 180, 0.4)" filter="blur(1px)" />
                <circle cx="147" cy="252" r="5" fill="rgba(255, 105, 180, 0.4)" filter="blur(1px)" />

                <!-- Pacifier -->
                <circle cx="125" cy="257" r="8" fill="#FFF" stroke="#DDD" stroke-width="1" />
                <circle cx="125" cy="257" r="5" fill={clothing === "sanfermin" ? "#EF4444" : swaddleColor} />
                <path d="M125,261 Q130,266 125,271" stroke="#FFF" stroke-width="1.8" fill="none" />
            </g>

            <!-- Baby Shoes -->
            <g>
                {#if shoe === "booties"}
                    <circle cx="107" cy="380" r="9" fill={clothing === "sanfermin" ? "#EF4444" : swaddleColor} />
                    <circle cx="143" cy="380" r="9" fill={clothing === "sanfermin" ? "#EF4444" : swaddleColor} />
                {:else if shoe === "sanfermin"}
                    <circle cx="107" cy="380" r="9" fill="#FFFFFF" stroke="#E5E7EB" stroke-width="0.5" />
                    <circle cx="143" cy="380" r="9" fill="#FFFFFF" stroke="#E5E7EB" stroke-width="0.5" />
                    <path d="M102,375 L112,385 M112,375 L102,385" stroke="#EF4444" stroke-width="1.5" />
                    <path d="M138,375 L148,385 M148,375 L138,385" stroke="#EF4444" stroke-width="1.5" />
                {:else}
                    <!-- Barefoot -->
                    <circle cx="107" cy="380" r="7" fill={skinTone} />
                    <circle cx="143" cy="380" r="7" fill={skinTone} />
                {/if}
            </g>

            <!-- Baby Accessories -->
            <g>
                {#if accessory === "hairbow"}
                    <path d="M118,212 L108,206 L112,217 Z" fill="#FF6B97" />
                    <path d="M124,212 L134,206 L130,217 Z" fill="#FF6B97" />
                    <circle cx="121" cy="212" r="4.5" fill="#FFD700" />
                {:else if accessory === "cap"}
                    <path d="M96,234 Q125,206 154,234 A31,31 0 0,0 96,234 Z" fill={clothing === "sanfermin" ? "#EF4444" : swaddleColor} />
                    <circle cx="125" cy="210" r="5.5" fill="#FFF" />
                {:else if accessory === "bandana"}
                    <path d="M97,228 Q125,218 153,228" stroke="#EF4444" stroke-width="5" fill="none" stroke-linecap="round" />
                    <path d="M96,226 L88,218 M96,226 L89,234" stroke="#EF4444" stroke-width="3.5" fill="none" />
                {/if}
            </g>

        <!-- ==================== AGE: KID ==================== -->
        {:else if ageGroup === "kid"}
            <!-- Kid Legs / Pants -->
            <g filter="url(#shadow)">
                {#if clothing === "sanfermin"}
                    <path d="M102,280 L102,376 L148,376 L148,280 Z" fill="#FFFFFF" stroke="#E5E7EB" stroke-width="0.5" />
                    <!-- Red ribbon ankle wraps -->
                    {#if shoe === "sanfermin"}
                        <path d="M102,360 L114,370 M114,360 L102,370" stroke="#EF4444" stroke-width="1.5" />
                        <path d="M136,360 L148,370 M148,360 L136,370" stroke="#EF4444" stroke-width="1.5" />
                    {/if}
                {:else if clothing === "pants" || clothing === "tshirt" || clothing === "onesie"}
                    <path d="M102,280 L102,376 L148,376 L148,280 Z" fill="#475569" />
                {:else}
                    <!-- Dress (Bare skin legs show) -->
                    <path d="M102,280 L102,376 L148,376 L148,280 Z" fill={skinTone} />
                {/if}
            </g>

            <!-- Kid Torso / Clothing -->
            <g filter="url(#shadow)">
                {#if clothing === "dress"}
                    <path d="M92,180 Q125,170 158,180 L175,320 Q125,340 75,320 Z" fill={swaddleColor} />
                    <path d="M105,180 Q125,190 145,180" stroke="#FFF" stroke-width="3" fill="none" />
                {:else if clothing === "sanfermin"}
                    <path d="M92,180 Q125,170 158,180 L152,285 L98,285 Z" fill="#FFFFFF" />
                    <rect x="98" y="273" width="54" height="12" fill="#EF4444" />
                    <path d="M110,285 L106,305 L113,307 Z" fill="#D32F2F" />
                    <path d="M105,180 L125,200 L145,180 Z" fill="#EF4444" />
                {:else}
                    <path d="M92,180 Q125,170 158,180 L152,285 L98,285 Z" fill={swaddleColor} />
                {/if}

                <!-- Neck -->
                <rect x="113" y="150" width="24" height="30" fill={skinTone} />
                <!-- Head -->
                <circle cx="125" cy="130" r="36" fill={skinTone} />
            </g>

            <!-- Hair (Kid) -->
            <g>
                <path d="M89,120 Q125,85 161,120 Q161,105 151,95 Q125,80 99,95 Q89,105 89,120" fill="#78350F" />
            </g>

            <!-- Kid Arms -->
            <g>
                <path d="M92,185 Q72,215 70,240" stroke={skinTone} stroke-width="14" stroke-linecap="round" fill="none" />
                <path d="M158,185 Q178,215 180,240" stroke={skinTone} stroke-width="14" stroke-linecap="round" fill="none" />
                {#if clothing !== "dress"}
                    <path d="M92,185 L84,200" stroke={clothing === "sanfermin" ? "#FFF" : swaddleColor} stroke-width="14" stroke-linecap="round" />
                    <path d="M158,185 L166,200" stroke={clothing === "sanfermin" ? "#FFF" : swaddleColor} stroke-width="14" stroke-linecap="round" />
                {/if}
            </g>

            <!-- Face Details -->
            <g>
                <circle cx="113" cy="125" r="3.5" fill="#333" />
                <circle cx="137" cy="125" r="3.5" fill="#333" />
                <path d="M117,142 Q125,148 133,142" stroke="#333" stroke-width="2.5" fill="none" />
            </g>

            <!-- Kid Shoes -->
            <g>
                {#if shoe === "sneakers" || shoe === "booties"}
                    <rect x="94" y="370" width="20" height="12" rx="4" fill={clothing === "sanfermin" ? "#EF4444" : swaddleColor} />
                    <rect x="136" y="370" width="20" height="12" rx="4" fill={clothing === "sanfermin" ? "#EF4444" : swaddleColor} />
                {:else if shoe === "sanfermin"}
                    <rect x="94" y="370" width="20" height="12" rx="4" fill="#FFFFFF" stroke="#EF4444" stroke-width="1.5" />
                    <rect x="136" y="370" width="20" height="12" rx="4" fill="#FFFFFF" stroke="#EF4444" stroke-width="1.5" />
                {:else}
                    <!-- Barefoot -->
                    <circle cx="104" cy="376" r="6" fill={skinTone} />
                    <circle cx="146" cy="376" r="6" fill={skinTone} />
                {/if}
            </g>

            <!-- Kid Accessories -->
            <g>
                {#if accessory === "hairbow" && gender === "girl"}
                    <path d="M118,97 L108,91 L112,102 Z" fill="#FF6B97" />
                    <path d="M124,97 L134,91 L130,102 Z" fill="#FF6B97" />
                    <circle cx="121" cy="97" r="4.5" fill="#FFD700" />
                {:else if accessory === "cap"}
                    <path d="M93,115 Q125,87 157,115 A31,31 0 0,0 93,115 Z" fill={clothing === "sanfermin" ? "#EF4444" : swaddleColor} />
                    <circle cx="125" cy="88" r="5" fill="#FFF" />
                {:else if accessory === "bandana"}
                    <path d="M94,110 Q125,100 156,110" stroke="#EF4444" stroke-width="5" fill="none" stroke-linecap="round" />
                {/if}
            </g>

        <!-- ==================== AGE: TEENAGER ==================== -->
        {:else if ageGroup === "teenager"}
            <!-- Teenager Legs / Pants -->
            <g filter="url(#shadow)">
                {#if clothing === "sanfermin"}
                    <path d="M100,240 L100,376 L150,376 L150,240 Z" fill="#FFFFFF" stroke="#E5E7EB" stroke-width="0.5" />
                    {#if shoe === "sanfermin"}
                        <path d="M100,355 L116,368 M116,355 L100,368" stroke="#EF4444" stroke-width="1.8" />
                        <path d="M134,355 L150,368 M150,355 L134,368" stroke="#EF4444" stroke-width="1.8" />
                    {/if}
                {:else if clothing === "pants" || clothing === "tshirt" || clothing === "onesie"}
                    <path d="M100,240 L100,376 L150,376 L150,240 Z" fill="#334155" />
                {:else}
                    <path d="M100,240 L100,376 L150,376 L150,240 Z" fill={skinTone} />
                {/if}
            </g>

            <!-- Teenager Torso / Clothing -->
            <g filter="url(#shadow)">
                {#if clothing === "dress"}
                    <path d="M88,145 Q125,135 162,145 L180,340 Q125,365 70,340 Z" fill={swaddleColor} />
                    <path d="M100,145 Q125,155 150,145" stroke="#FFF" stroke-width="3.5" fill="none" />
                {:else if clothing === "sanfermin"}
                    <path d="M88,145 Q125,135 162,145 L156,250 L94,250 Z" fill="#FFFFFF" />
                    <rect x="94" y="240" width="62" height="15" fill="#EF4444" />
                    <path d="M108,252 L103,280 L111,283 Z" fill="#D32F2F" />
                    <path d="M102,142 L125,162 L148,142 Z" fill="#EF4444" />
                {:else}
                    <path d="M88,145 Q125,135 162,145 L156,250 L94,250 Z" fill={swaddleColor} />
                {/if}

                <!-- Neck -->
                <rect x="111" y="110" width="28" height="35" fill={skinTone} />
                <!-- Head -->
                <circle cx="125" cy="90" r="40" fill={skinTone} />
            </g>

            <!-- Hair (Teenager) -->
            <g>
                <path d="M85,82 Q125,45 165,82 Q165,65 153,55 Q125,38 97,55 Q85,65 85,82" fill="#78350F" />
            </g>

            <!-- Teenager Arms -->
            <g>
                <path d="M88,150 Q66,190 62,220" stroke={skinTone} stroke-width="16" stroke-linecap="round" fill="none" />
                <path d="M162,150 Q184,190 188,220" stroke={skinTone} stroke-width="16" stroke-linecap="round" fill="none" />
                {#if clothing !== "dress"}
                    <path d="M88,150 L80,170" stroke={clothing === "sanfermin" ? "#FFF" : swaddleColor} stroke-width="16" stroke-linecap="round" />
                    <path d="M162,150 L170,170" stroke={clothing === "sanfermin" ? "#FFF" : swaddleColor} stroke-width="16" stroke-linecap="round" />
                {/if}
            </g>

            <!-- Face Details -->
            <g>
                <circle cx="113" cy="85" r="4" fill="#333" />
                <circle cx="137" cy="85" r="4" fill="#333" />
                <path d="M116,104 Q125,110 134,104" stroke="#333" stroke-width="2.5" fill="none" />
            </g>

            <!-- Teenager Shoes -->
            <g>
                {#if shoe === "sneakers" || shoe === "booties"}
                    <rect x="91" y="370" width="23" height="13" rx="5" fill={clothing === "sanfermin" ? "#EF4444" : swaddleColor} />
                    <rect x="136" y="370" width="23" height="13" rx="5" fill={clothing === "sanfermin" ? "#EF4444" : swaddleColor} />
                {:else if shoe === "sanfermin"}
                    <rect x="91" y="370" width="23" height="13" rx="5" fill="#FFFFFF" stroke="#EF4444" stroke-width="1.8" />
                    <rect x="136" y="370" width="23" height="13" rx="5" fill="#FFFFFF" stroke="#EF4444" stroke-width="1.8" />
                {:else}
                    <!-- Barefoot -->
                    <circle cx="102" cy="376" r="7.5" fill={skinTone} />
                    <circle cx="148" cy="376" r="7.5" fill={skinTone} />
                {/if}
            </g>

            <!-- Teenager Accessories -->
            <g>
                {#if accessory === "hairbow" && gender === "girl"}
                    <path d="M118,52 L108,46 L112,57 Z" fill="#FF6B97" />
                    <path d="M124,52 L134,46 L130,57 Z" fill="#FF6B97" />
                    <circle cx="121" cy="52" r="4.5" fill="#FFD700" />
                {:else if accessory === "cap"}
                    <path d="M89,74 Q125,44 161,74 A34,34 0 0,0 89,74 Z" fill={clothing === "sanfermin" ? "#EF4444" : swaddleColor} />
                    <circle cx="125" cy="42" r="5.5" fill="#FFF" />
                {:else if accessory === "bandana"}
                    <path d="M90,70 Q125,58 160,70" stroke="#EF4444" stroke-width="5" fill="none" stroke-linecap="round" />
                {/if}
            </g>
        {/if}
    </svg>
</div>

<style>
    .avatar-container {
        display: inline-block;
        transform-origin: center center;
    }
    .child-preview {
        height: 400px;
        width: 250px;
        filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1));
    }
</style>
