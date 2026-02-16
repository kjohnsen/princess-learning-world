<script lang="ts">
    import { fade } from 'svelte/transition';
    import DressUp from './DressUp.svelte';
    import Garden from './Garden.svelte';
    import Kitchen from './Kitchen.svelte';
    import PetStore from './PetStore.svelte';
    import GroceryStore from './GroceryStore.svelte';
    import { Sparkles, Flower, Utensils, Cat, ShoppingBag } from 'lucide-svelte';

    let activeTab = 'dressup';

    const tabs = [
        { id: 'dressup', label: 'Dress Up', icon: Sparkles, color: '#FF6B97' },
        { id: 'garden', label: 'Garden', icon: Flower, color: '#4CAF50' },
        { id: 'kitchen', label: 'Kitchen', icon: Utensils, color: '#FF9800' },
        { id: 'petstore', label: 'Pet Store', icon: Cat, color: '#9C27B0' },
        { id: 'grocerystore', label: 'Grocery', icon: ShoppingBag, color: '#00BCD4' }
    ];
</script>

<div class="game-world">
    <nav class="game-nav">
        {#each tabs as tab}
            <button 
                class="nav-tab {activeTab === tab.id ? 'active' : ''}"
                style="--tab-color: {tab.color}"
                on:click={() => activeTab = tab.id}
            >
                <svelte:component this={tab.icon} size={24} />
                <span class="tab-label">{tab.label}</span>
            </button>
        {/each}
    </nav>

    <div class="game-content">
        {#if activeTab === 'dressup'}
            <div in:fade={{ duration: 300 }}>
                <DressUp />
            </div>
        {:else if activeTab === 'garden'}
            <div in:fade={{ duration: 300 }}>
                <Garden />
            </div>
        {:else if activeTab === 'kitchen'}
            <div in:fade={{ duration: 300 }}>
                <Kitchen />
            </div>
        {:else if activeTab === 'petstore'}
            <div in:fade={{ duration: 300 }}>
                <PetStore />
            </div>
        {:else if activeTab === 'bedroom'}
            <div in:fade={{ duration: 300 }}>
                <Bedroom />
            </div>
        {:else if activeTab === 'castle'}
            <div in:fade={{ duration: 300 }}>
                <Castle />
            </div>
        {:else if activeTab === 'grocerystore'}
            <div in:fade={{ duration: 300 }}>
                <GroceryStore />
            </div>
        {/if}
    </div>
</div>

<style>
    .game-world {
        width: 100%;
        max-width: 800px;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        gap: var(--spacing-lg);
    }

    .game-nav {
        display: flex;
        justify-content: center;
        gap: var(--spacing-md);
        flex-wrap: wrap;
    }

    .nav-tab {
        display: flex;
        align-items: center;
        gap: var(--spacing-sm);
        padding: var(--spacing-md) var(--spacing-lg);
        background: white;
        border: 2px solid #E5E7EB;
        border-radius: var(--radius-full, 999px);
        font-weight: bold;
        color: #6B7280;
        cursor: pointer;
        transition: all 0.2s ease;
        box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    }

    .nav-tab:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        border-color: var(--tab-color);
        color: var(--tab-color);
    }

    .nav-tab.active {
        background: var(--tab-color);
        border-color: var(--tab-color);
        color: white;
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    }

    .tab-label {
        font-size: 1rem;
    }

    .game-content {
        background: white;
        border-radius: var(--radius-xl, 24px);
        min-height: 500px; /* Ensure consistent height */
        padding: var(--spacing-lg);
        box-shadow: var(--shadow-lg, 0 10px 15px -3px rgba(0, 0, 0, 0.1));
        position: relative;
        overflow: hidden; 
    }
</style>
