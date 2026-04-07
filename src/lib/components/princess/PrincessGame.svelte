<script lang="ts">
    import { draggable } from "$lib/actions/draggable";
    import { princessState } from "$lib/stores/princessState";
    import { princeState } from "$lib/stores/princeState";
    import {
        Castle as CastleIcon,
        Cat,
        Church,
        Flower,
        Moon,
        ShoppingBag,
        Sparkles,
        Utensils,
    } from "lucide-svelte";
    import { fade } from "svelte/transition";
    import Bedroom from "./Bedroom.svelte";
    import Castle from "./Castle.svelte";
    import Cathedral from "./Cathedral.svelte";
    import DressUp from "./DressUp.svelte";
    import Garden from "./Garden.svelte";
    import GroceryStore from "./GroceryStore.svelte";
    import Kitchen from "./Kitchen.svelte";
    import PetStore from "./PetStore.svelte";
    import PrinceAvatar from "./PrinceAvatar.svelte";
    import PrinceDressUp from "./PrinceDressUp.svelte";
    import PrincessAvatar from "./PrincessAvatar.svelte";

    let activeTab = "dressup";

    let princessPos = { x: 50, y: 350 };
    let princePos = { x: 150, y: 350 };

    function handlePrincessDrag(event: CustomEvent) {
        princessPos.x += event.detail.dx;
        princessPos.y += event.detail.dy;
    }

    function handlePrinceDrag(event: CustomEvent) {
        princePos.x += event.detail.dx;
        princePos.y += event.detail.dy;
    }

    const tabs = [
        {
            id: "dressup",
            label: "Princess Dress Up",
            icon: Sparkles,
            color: "#FF6B97",
        },
        {
            id: "princedressup",
            label: "Prince Dress Up",
            icon: Sparkles,
            color: "#3B82F6",
        },
        { id: "garden", label: "Garden", icon: Flower, color: "#4CAF50" },
        { id: "kitchen", label: "Kitchen", icon: Utensils, color: "#FF9800" },
        { id: "petstore", label: "Pet Store", icon: Cat, color: "#9C27B0" },
        {
            id: "grocerystore",
            label: "Grocery",
            icon: ShoppingBag,
            color: "#00BCD4",
        },
        { id: "castle", label: "Castle", icon: CastleIcon, color: "#9C27B0" },
        { id: "bedroom", label: "Bedroom", icon: Moon, color: "#673AB7" },
        {
            id: "wedding",
            label: "Imperial Wedding",
            icon: Church,
            color: "#FFD700",
        },
    ];
</script>

<div class="game-world">
    <nav class="game-nav">
        {#each tabs as tab}
            <button
                class="nav-tab {activeTab === tab.id ? 'active' : ''}"
                style="--tab-color: {tab.color}"
                on:click={() => (activeTab = tab.id)}
            >
                <svelte:component this={tab.icon} size={24} />
                <span class="tab-label">{tab.label}</span>
            </button>
        {/each}
    </nav>

    <div class="game-content">
        {#if activeTab === "dressup"}
            <div in:fade={{ duration: 300 }}>
                <DressUp />
            </div>
        {:else if activeTab === "princedressup"}
            <div in:fade={{ duration: 300 }}>
                <PrinceDressUp />
            </div>
        {:else if activeTab === "garden"}
            <div in:fade={{ duration: 300 }}>
                <Garden />
            </div>
        {:else if activeTab === "kitchen"}
            <div in:fade={{ duration: 300 }}>
                <Kitchen />
            </div>
        {:else if activeTab === "petstore"}
            <div in:fade={{ duration: 300 }}>
                <PetStore />
            </div>
        {:else if activeTab === "bedroom"}
            <div in:fade={{ duration: 300 }}>
                <Bedroom />
            </div>
        {:else if activeTab === "castle"}
            <div in:fade={{ duration: 300 }}>
                <Castle />
            </div>
        {:else if activeTab === "grocerystore"}
            <div in:fade={{ duration: 300 }}>
                <GroceryStore />
            </div>
        {:else if activeTab === "wedding"}
            <div in:fade={{ duration: 300 }}>
                <Cathedral />
            </div>
        {/if}
    </div>

    <div
        class="global-avatar"
        style="left: {princessPos.x}px; top: {princessPos.y}px;"
        use:draggable
        on:dragmove={handlePrincessDrag}
    >
        <PrincessAvatar
            skinTone={$princessState.skinTone}
            dressId={$princessState.dress}
            hairId={$princessState.hair}
            hairCutId={$princessState.hairCut}
            crownId={$princessState.crown}
            makeup={$princessState.makeup}
            scale={0.45}
        />
    </div>

    <div
        class="global-avatar prince-avatar-global"
        style="left: {princePos.x}px; top: {princePos.y}px;"
        use:draggable
        on:dragmove={handlePrinceDrag}
    >
        <PrinceAvatar
            skinTone={$princeState.skinTone}
            hairId={$princeState.hair}
            hairCutId={$princeState.hairCut}
            shirtId={$princeState.shirt}
            pantsId={$princeState.pants}
            capeId={$princeState.cape}
            crownId={$princeState.crown}
            scale={0.45}
        />
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
        border: 2px solid #e5e7eb;
        border-radius: var(--radius-full, 999px);
        font-weight: bold;
        color: #6b7280;
        cursor: pointer;
        transition: all 0.2s ease;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    }

    .nav-tab:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        border-color: var(--tab-color);
        color: var(--tab-color);
    }

    .nav-tab.active {
        background: var(--tab-color);
        border-color: var(--tab-color);
        color: white;
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
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

    .global-avatar {
        position: absolute;
        z-index: 100;
        transform-origin: center center;
        pointer-events: none;
    }

    :global(.global-avatar svg) {
        pointer-events: none;
    }

    :global(.global-avatar svg *) {
        pointer-events: visiblePainted;
        cursor: grab;
    }

    :global(.global-avatar:active svg *) {
        cursor: grabbing;
    }
</style>
