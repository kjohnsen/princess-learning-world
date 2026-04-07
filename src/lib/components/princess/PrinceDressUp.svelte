<script lang="ts">
    import { inventory } from "$lib/stores/inventory";
    import {
        princeCapes,
        princeCrowns,
        princeHairCuts,
        princeHairStyles,
        princePants,
        princeShirts,
        princeState,
    } from "$lib/stores/princeState";
    import { RotateCcw } from "lucide-svelte";
    import PrinceAvatar from "./PrinceAvatar.svelte";

    function isUnlocked(itemId: string) {
        if (!itemId) return true;
        return $inventory.ownedItems.includes(itemId);
    }

    function getLockStatus(category: string, id: number) {
        if (id === 0) return false;
        if (category === "princeHair" || category === "princeHairCut")
            return false; // Colors and cuts are free
        // e.g. princeShirt_1
        const itemId = `${category}_${id}`;
        return !isUnlocked(itemId);
    }
</script>

<div class="game-container">
    <div class="preview-area">
        <PrinceAvatar
            skinTone={$princeState.skinTone}
            hairId={$princeState.hair}
            hairCutId={$princeState.hairCut}
            shirtId={$princeState.shirt}
            pantsId={$princeState.pants}
            capeId={$princeState.cape}
            crownId={$princeState.crown}
        />
    </div>

    <div class="controls-area">
        <div class="category">
            <h3>Hair Color</h3>
            <div class="options">
                {#each princeHairStyles as hair, i}
                    {@const locked = getLockStatus("princeHair", hair.id)}
                    <button
                        class="color-btn {$princeState.hair === i
                            ? 'active'
                            : ''} {locked ? 'locked' : ''}"
                        style="background-color: {hair.color}"
                        on:click={() => {
                            if (!locked) $princeState.hair = i;
                        }}
                        aria-label="Select hair style {hair.name}"
                        disabled={locked}
                    ></button>
                {/each}
            </div>
        </div>

        <div class="category">
            <h3>Hair Style</h3>
            <div class="options">
                {#each princeHairCuts as cut, i}
                    {@const locked = getLockStatus("princeHairCut", cut.id)}
                    <button
                        class="option-btn {$princeState.hairCut === i
                            ? 'active'
                            : ''} {locked ? 'locked' : ''}"
                        on:click={() => {
                            if (!locked) $princeState.hairCut = i;
                        }}
                        aria-label="Select hair cut {cut.name}"
                        disabled={locked}
                    >
                        {#if cut.id === 0}
                            ✂️
                        {:else if cut.id === 1}
                            💇‍♂️
                        {:else}
                            🧔‍♂️
                        {/if}
                    </button>
                {/each}
            </div>
        </div>

        <div class="category">
            <h3>Shirt</h3>
            <div class="options">
                {#each princeShirts as shirt, i}
                    {@const locked = getLockStatus("princeShirt", shirt.id)}
                    <button
                        class="color-btn {$princeState.shirt === i
                            ? 'active'
                            : ''} {locked ? 'locked' : ''}"
                        style="background-color: {shirt.color}"
                        on:click={() => {
                            if (!locked) $princeState.shirt = i;
                        }}
                        aria-label="Select shirt {shirt.name}"
                        disabled={locked}
                    ></button>
                {/each}
            </div>
        </div>

        <div class="category">
            <h3>Pants</h3>
            <div class="options">
                {#each princePants as pants, i}
                    {@const locked = getLockStatus("princePants", pants.id)}
                    <button
                        class="color-btn {$princeState.pants === i
                            ? 'active'
                            : ''} {locked ? 'locked' : ''}"
                        style="background-color: {pants.color}"
                        on:click={() => {
                            if (!locked) $princeState.pants = i;
                        }}
                        aria-label="Select pants {pants.name}"
                        disabled={locked}
                    ></button>
                {/each}
            </div>
        </div>

        <div class="category">
            <h3>Cape</h3>
            <div class="options">
                {#each princeCapes as cape, i}
                    {@const locked = getLockStatus("princeCape", cape.id)}
                    <button
                        class="color-btn {$princeState.cape === i
                            ? 'active'
                            : ''} {locked ? 'locked' : ''}"
                        style="background-color: {cape.color}"
                        on:click={() => {
                            if (!locked) $princeState.cape = i;
                        }}
                        aria-label="Select cape {cape.name}"
                        disabled={locked}
                    >
                        {#if cape.color === "transparent"}
                            <RotateCcw
                                size={20}
                                style="position: absolute; top: 12px; left: 12px; color: #888;"
                            />
                        {/if}
                    </button>
                {/each}
            </div>
        </div>

        <div class="category">
            <h3>Crown</h3>
            <div class="options">
                {#each princeCrowns as crown, i}
                    {@const locked = getLockStatus("princeCrown", crown.id)}
                    <button
                        class="color-btn {$princeState.crown === i
                            ? 'active'
                            : ''} {locked ? 'locked' : ''}"
                        style="background-color: {crown.color}"
                        on:click={() => {
                            if (!locked) $princeState.crown = i;
                        }}
                        aria-label="Select crown {crown.name}"
                        disabled={locked}
                    >
                        {#if crown.color === "transparent"}
                            <RotateCcw
                                size={20}
                                style="position: absolute; top: 12px; left: 12px; color: #888;"
                            />
                        {/if}
                    </button>
                {/each}
            </div>
        </div>
    </div>
</div>

<style>
    .game-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: var(--spacing-lg);
    }
    .preview-area {
        background: radial-gradient(circle, #fff, #f3f4f6);
        border-radius: var(--radius-lg);
        padding: var(--spacing-lg);
        box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.05);
        border: 4px solid white;
    }
    .controls-area {
        background: white;
        padding: var(--spacing-lg);
        border-radius: var(--radius-lg);
        box-shadow: var(--shadow-lg);
        width: 100%;
        max-width: 500px;
    }
    .category {
        margin-bottom: var(--spacing-lg);
    }
    .category h3 {
        margin-bottom: var(--spacing-sm);
        font-size: 1.1rem;
    }
    .options {
        display: flex;
        gap: var(--spacing-md);
        flex-wrap: wrap;
    }
    .color-btn {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 0 0 2px #e5e7eb;
        cursor: pointer;
        transition: transform 0.2s;
        position: relative;
    }
    .color-btn.active {
        box-shadow: 0 0 0 2px var(--color-primary);
        transform: scale(1.1);
    }
    .color-btn.locked {
        opacity: 0.5;
        cursor: not-allowed;
        background-image: repeating-linear-gradient(
            45deg,
            transparent,
            transparent 5px,
            rgba(0, 0, 0, 0.1) 5px,
            rgba(0, 0, 0, 0.1) 10px
        );
    }
    .color-btn.locked::after {
        content: "🔒";
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 1.2rem;
    }

    .option-btn {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        border: 2px solid #e5e7eb;
        background: white;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }

    .option-btn.active {
        border-color: var(--color-primary);
        color: var(--color-primary);
    }

    .option-btn.locked {
        opacity: 0.5;
        cursor: not-allowed;
    }

    .option-btn.locked::after {
        content: "🔒";
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 1.2rem;
    }
</style>
