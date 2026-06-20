<script lang="ts">
    import { fade } from "svelte/transition";
    import { draggable } from "$lib/actions/draggable";
    import DoctorAvatar from "./DoctorAvatar.svelte";

    export let scaleRatio = 1;

    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let doctorPos = { x: 500, y: 140 };

    function handleDoctorDragStart(event: CustomEvent) {
        isDragging = false;
        startX = event.detail.x;
        startY = event.detail.y;
    }

    function handleDoctorDrag(event: CustomEvent) {
        doctorPos.x += event.detail.dx / scaleRatio;
        doctorPos.y += event.detail.dy / scaleRatio;
        if (Math.abs(event.detail.x - startX) > 5 || Math.abs(event.detail.y - startY) > 5) {
            isDragging = true;
        }
    }

    function handleDoctorClick() {
        if (!isDragging) {
            nextDialogue();
        }
    }

    // Dialogue text when talking to the doctor
    let doctorDialogue = "Hello! All four babies are doing wonderful today! Let's give them a check-up! 🩺";
    const dialogueOptions = [
        "Hello! All four babies are doing wonderful today! Let's give them a check-up! 🩺",
        "The twin sisters and twin brothers are so healthy and happy! 👶👶👶👶",
        "Drag the babies onto the baby scale to weigh them! ⚖️",
        "San Fermin festival is starting! Dress the babies in their white outfits and red sashes! 🧣"
    ];

    let currentDialogueIndex = 0;

    function nextDialogue() {
        currentDialogueIndex = (currentDialogueIndex + 1) % dialogueOptions.length;
        doctorDialogue = dialogueOptions[currentDialogueIndex];
    }

    // Active scale state
    let scaleWeight = "0.0";
    let scaleActive = false;

    // A simple interactive scale area
    function handleScaleClick() {
        scaleActive = !scaleActive;
        if (scaleActive) {
            scaleWeight = (3.0 + Math.random() * 1.5).toFixed(1);
        } else {
            scaleWeight = "0.0";
        }
    }
</script>

<div class="hospital-scene">
    <!-- Back wall decorations -->
    <div class="window">
        <div class="sky"></div>
        <div class="sun">☀️</div>
    </div>
    
    <div class="wall-decorations">
        <!-- Height Chart -->
        <div class="height-chart">
            <div class="ruler"></div>
            <span>📏 Height Chart</span>
        </div>

        <!-- Red Cross Sign -->
        <div class="red-cross">
            <div class="cross-v"></div>
            <div class="cross-h"></div>
        </div>

        <!-- Welcome Baby Banner -->
        <div class="baby-banner">
            🎉 Congratulations Twins! 🎉
        </div>
    </div>

    <!-- Bassinets/Cribs for the 4 babies -->
    <div class="bassinets-row">
        <div class="bassinet twin-girl">
            <div class="hood"></div>
            <div class="pillow"></div>
            <div class="blanket"></div>
            <span class="label">Lily's Bassinet</span>
        </div>
        <div class="bassinet twin-girl">
            <div class="hood"></div>
            <div class="pillow"></div>
            <div class="blanket"></div>
            <span class="label">Mia's Bassinet</span>
        </div>
        <div class="bassinet twin-boy">
            <div class="hood"></div>
            <div class="pillow"></div>
            <div class="blanket"></div>
            <span class="label">Leo's Bassinet</span>
        </div>
        <div class="bassinet twin-boy">
            <div class="hood"></div>
            <div class="pillow"></div>
            <div class="blanket"></div>
            <span class="label">Max's Bassinet</span>
        </div>
    </div>

    <!-- Scale for babies -->
    <button class="baby-scale {scaleActive ? 'active' : ''}" on:click={handleScaleClick}>
        <div class="scale-tray"></div>
        <div class="scale-base">
            <span class="weight-display">{scaleWeight} kg</span>
        </div>
        <span class="scale-label">Baby Scale ⚖️</span>
    </button>

    <!-- Floor -->
    <div class="floor"></div>

    <!-- Doctor Section (Interactive & Draggable) -->
    <div 
        class="doctor-wrapper" 
        style="left: {doctorPos.x}px; top: {doctorPos.y}px;"
        use:draggable
        on:dragstart={handleDoctorDragStart}
        on:dragmove={handleDoctorDrag}
        on:click={handleDoctorClick}
        on:keydown={(e) => e.key === 'Enter' && handleDoctorClick()}
        role="button"
        tabindex="0"
        aria-label="Talk to doctor"
    >
        <DoctorAvatar scale={0.6} />
        <div class="dialogue-bubble" in:fade>
            {doctorDialogue}
            <div class="bubble-arrow"></div>
        </div>
    </div>
</div>

<style>
    .hospital-scene {
        width: 100%;
        height: 500px;
        background: #E0F2F1; /* Soft teal walls */
        position: relative;
        border-radius: var(--radius-lg);
        overflow: hidden;
        user-select: none;
    }

    .floor {
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 120px;
        background: #B2DFDB; /* Clean mint floor */
        border-top: 8px solid #80CBC4;
        z-index: 1;
    }

    .window {
        position: absolute;
        top: 25px;
        left: 50px;
        width: 130px;
        height: 100px;
        background: #E0F7FA;
        border: 6px solid white;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: inset 0 0 10px rgba(0,0,0,0.05);
    }

    .sun {
        font-size: 2rem;
        position: absolute;
        right: 10px;
        top: 5px;
    }

    .wall-decorations {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
    }

    .height-chart {
        position: absolute;
        top: 40px;
        right: 40px;
        background: #FFF9C4;
        border: 3px solid #FBC02D;
        border-radius: 6px;
        padding: 5px 10px;
        display: flex;
        align-items: center;
        gap: 5px;
        font-weight: bold;
        color: #F57F17;
        font-size: 0.85rem;
    }

    .red-cross {
        position: absolute;
        top: 25px;
        left: 210px;
        width: 40px;
        height: 40px;
        background: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .cross-v, .cross-h {
        position: absolute;
        background: #EF5350;
    }
    .cross-v { width: 8px; height: 24px; }
    .cross-h { width: 24px; height: 8px; }

    .baby-banner {
        position: absolute;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: #FFF;
        border: 3px dashed #E0F2F1;
        border-radius: 12px;
        padding: 5px 20px;
        font-weight: bold;
        color: #00796B;
        box-shadow: 0 3px 6px rgba(0,0,0,0.05);
    }

    .bassinets-row {
        position: absolute;
        bottom: 70px;
        left: 20px;
        width: calc(100% - 250px);
        display: flex;
        justify-content: space-around;
        z-index: 2;
    }

    .bassinet {
        width: 90px;
        height: 120px;
        background: white;
        border-radius: 15px;
        border: 4px solid #B0BEC5;
        position: relative;
        box-shadow: 0 4px 8px rgba(0,0,0,0.08);
    }

    .bassinet.twin-girl {
        border-color: #F8BBD0;
        background: #FFF0F5;
    }
    .bassinet.twin-boy {
        border-color: #B3E5FC;
        background: #E8F5E9;
    }

    .hood {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 40px;
        border-radius: 11px 11px 0 0;
        background: rgba(0,0,0,0.03);
        border-bottom: 2px solid rgba(0,0,0,0.05);
    }
    .bassinet.twin-girl .hood { background: #FFD1DC; }
    .bassinet.twin-boy .hood { background: #B2EBF2; }

    .pillow {
        position: absolute;
        top: 15px;
        left: 50%;
        transform: translateX(-50%);
        width: 60px;
        height: 25px;
        background: white;
        border-radius: 6px;
        border: 1px solid rgba(0,0,0,0.05);
    }

    .blanket {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 60px;
        border-radius: 0 0 11px 11px;
        background: #CFD8DC;
    }
    .bassinet.twin-girl .blanket { background: #F8BBD0; }
    .bassinet.twin-boy .blanket { background: #B3E5FC; }

    .label {
        position: absolute;
        bottom: -22px;
        left: 50%;
        transform: translateX(-50%);
        white-space: nowrap;
        font-size: 0.75rem;
        font-weight: bold;
        color: #374151;
        background: white;
        padding: 1px 6px;
        border-radius: 8px;
        border: 1px solid #E5E7EB;
    }

    .baby-scale {
        position: absolute;
        bottom: 40px;
        right: 20px;
        width: 120px;
        background: none;
        border: none;
        display: flex;
        flex-direction: column;
        align-items: center;
        z-index: 2;
        padding: 0;
    }

    .scale-tray {
        width: 100px;
        height: 20px;
        background: #CFD8DC;
        border-radius: 20px 20px 0 0;
        border: 2px solid #90A4AE;
    }

    .scale-base {
        width: 70px;
        height: 50px;
        background: #90A4AE;
        border-radius: 0 0 10px 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 2px solid #78909C;
    }

    .weight-display {
        font-size: 0.9rem;
        font-weight: bold;
        color: #1A237E;
        background: #E8EAF6;
        padding: 2px 8px;
        border-radius: 4px;
        border: 1.5px solid #3F51B5;
        font-family: monospace;
    }

    .scale-label {
        font-size: 0.75rem;
        font-weight: bold;
        color: #374151;
        margin-top: 4px;
    }

    .baby-scale.active .scale-tray {
        background: #FFF;
        border-color: #EF5350;
    }
    .baby-scale.active .weight-display {
        color: #EF5350;
        border-color: #EF5350;
        background: #FFEBEE;
    }

    .doctor-wrapper {
        position: absolute;
        background: none;
        border: none;
        z-index: 2;
        cursor: grab;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 0;
        user-select: none;
        -webkit-user-select: none;
    }

    .doctor-wrapper:active {
        cursor: grabbing;
    }

    .doctor-wrapper:hover {
        transform: translateY(-2px);
        transition: transform 0.2s;
    }

    .dialogue-bubble {
        position: absolute;
        top: -120px;
        left: -130px;
        width: 240px;
        background: white;
        border: 3px solid #00838F;
        border-radius: 16px;
        padding: 10px 15px;
        font-size: 0.85rem;
        font-weight: bold;
        color: #006064;
        box-shadow: 0 8px 16px rgba(0,0,0,0.1);
        text-align: left;
    }

    .bubble-arrow {
        position: absolute;
        bottom: -15px;
        right: 40px;
        width: 0;
        height: 0;
        border-left: 12px solid transparent;
        border-right: 12px solid transparent;
        border-top: 15px solid #00838F;
    }

    .bubble-arrow::after {
        content: "";
        position: absolute;
        bottom: 3px;
        left: -10px;
        width: 0;
        height: 0;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-top: 12px solid white;
    }
</style>
