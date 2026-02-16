<script lang="ts">
    import { fade, fly } from 'svelte/transition';
    import { Check, RotateCcw } from 'lucide-svelte';
    import { princessState, dresses, hairStyles, crowns, makeupStyles } from '$lib/stores/princessState';
    import { inventory } from '$lib/stores/inventory';
    import PrincessAvatar from './PrincessAvatar.svelte';

    // Subscribe to stores
    // $princessState, $inventory

    // Helper to check if unlocked
    function isUnlocked(itemId: string) {
        if (!itemId) return true; // Default/None always unlocked
        // Basic items (id 0) are always unlocked, checked in store logic but good to double check
        return $inventory.ownedItems.includes(itemId);
    }

    function getLockStatus(category: string, id: number) {
        if (id === 0) return false;
        const itemId = `${category}_${id}`;
        return !isUnlocked(itemId);
    }
</script>

<div class="game-container">
    <div class="preview-area">
        <PrincessAvatar 
            skinTone={$princessState.skinTone}
            dressId={$princessState.dress}
            hairId={$princessState.hair}
            crownId={$princessState.crown}
            makeupId={$princessState.makeup}
        />
    </div>

    <div class="controls-area">
        <div class="category">
            <h3>Hair Style</h3>
            <div class="options">
                {#each hairStyles as hair, i}
                    {@const locked = getLockStatus('hair', hair.id)}
                    <button 
                        class="color-btn {$princessState.hair === i ? 'active' : ''} {locked ? 'locked' : ''}" 
                        style="background-color: {hair.color}"
                        on:click={() => { if (!locked) $princessState.hair = i; }}
                        aria-label="Select hair style {hair.name}"
                        disabled={locked}
                    ></button>
                {/each}
            </div>
        </div>

        <div class="category">
            <h3>Dress Color</h3>
            <div class="options">
                <button 
                    class="option-btn {$princessState.dress === 0 ? 'active' : ''}" 
                    on:click={() => $princessState.dress = 0}
                    aria-label="Remove dress"
                >
                    <RotateCcw size={20} />
                </button>
                {#each dresses.slice(1) as dress}
                    {@const locked = getLockStatus('dress', dress.id)}
                    <button 
                        class="color-btn {$princessState.dress === dress.id ? 'active' : ''} {locked ? 'locked' : ''}" 
                        style="background-color: {dress.color}"
                        on:click={() => { if (!locked) $princessState.dress = dress.id; }}
                        aria-label="Select dress color {dress.name}"
                        disabled={locked}
                    ></button>
                {/each}
            </div>
        </div>

        <div class="category">
            <h3>Crowns & Headwear</h3>
            <div class="options">
                <button 
                    class="option-btn {$princessState.crown === 0 ? 'active' : ''}" 
                    on:click={() => $princessState.crown = 0}
                    aria-label="Remove crown"
                >
                    <RotateCcw size={20} />
                </button>
                {#each crowns.slice(1) as crown}
                    {@const locked = getLockStatus('crown', crown.id)}
                    <button 
                        class="color-btn {$princessState.crown === crown.id ? 'active' : ''} {locked ? 'locked' : ''}" 
                        style="background-color: {crown.color}"
                        on:click={() => { if (!locked) $princessState.crown = crown.id; }}
                        aria-label="Select {crown.name}"
                         disabled={locked}
                    ></button>
                {/each}
            </div>
        </div>

        <div class="category">
            <h3>Makeup</h3>
            <div class="options">
                 {#each makeupStyles as makeup, i}
                    {@const locked = getLockStatus('makeup', makeup.id)}
                    <button 
                        class="makeup-btn {$princessState.makeup === i ? 'active' : ''} {locked ? 'locked' : ''}" 
                        on:click={() => { if (!locked) $princessState.makeup = i; }}
                        aria-label="Select makeup {makeup.name}"
                        disabled={locked}
                    >
                        <div class="makeup-preview" style="background: {i === 0 ? '#FFE0BD' : '#FFE0BD'};">
                            {#if i > 0}
                             <div class="blush" style="background: {makeup.blush}"></div>
                            {/if}
                        </div>
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
        box-shadow: inset 0 0 20px rgba(0,0,0,0.05);
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
        box-shadow: 0 0 0 2px #E5E7EB;
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
        background-image: repeating-linear-gradient(45deg, transparent, transparent 5px, rgba(0,0,0,0.1) 5px, rgba(0,0,0,0.1) 10px);
    }

    .color-btn.locked::after {
        content: '🔒';
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
        border: 2px solid #E5E7EB;
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
    
    .makeup-btn {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        border: 2px solid #E5E7EB;
        background: white;
        padding: 4px;
        cursor: pointer;
        position: relative;
    }

    .makeup-btn.active {
        border-color: var(--color-primary);
    }
    
    .makeup-btn.locked {
        opacity: 0.5;
        cursor: not-allowed;
    }
    
    .makeup-btn.locked::after {
        content: '🔒';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 1.2rem;
        z-index: 2;
    }

    .makeup-preview {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        position: relative;
        overflow: hidden;
    }
    
    .blush {
        position: absolute;
        bottom: 5px;
        left: 5px;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        filter: blur(2px);
    }
</style>
