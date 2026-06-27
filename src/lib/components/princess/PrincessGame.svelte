<script lang="ts">
    import { draggable } from "$lib/actions/draggable";
    import { princessState } from "$lib/stores/princessState";
    import { princeState } from "$lib/stores/princeState";
    import PrinceAvatar from "./PrinceAvatar.svelte";
    import PrinceDressUp from "./PrinceDressUp.svelte";
    import PrincessAvatar from "./PrincessAvatar.svelte";
    import Restaurant from "./Restaurant.svelte";
    import Hospital from "./Hospital.svelte";
    import BabyDressUp from "./BabyDressUp.svelte";
    import BabyAvatar from "./BabyAvatar.svelte";
    import FamilyPlanning from "./FamilyPlanning.svelte";
    import { babiesStore } from "$lib/stores/babyState";
    import {
        Castle as CastleIcon,
        Cat,
        Church,
        Coffee,
        Flower,
        Moon,
        ShoppingBag,
        Sparkles,
        Utensils,
        Baby,
        HeartPulse,
        Users,
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

    let activeTab = "dressup";

    let containerWidth = 800;
    $: scaleRatio = containerWidth ? Math.min(1, containerWidth / 800) : 1;
    let contentHeight = 500;
    $: scaledHeight = Math.max(500, contentHeight) * scaleRatio;

    let princessPos = { x: 50, y: 350 };
    let princePos = { x: 150, y: 350 };

    function handlePrincessDrag(event: CustomEvent) {
        princessPos.x = Math.max(40, Math.min(800 - 40, princessPos.x + event.detail.dx / scaleRatio));
        princessPos.y = Math.max(180, Math.min(500, princessPos.y + event.detail.dy / scaleRatio));
    }

    function handlePrinceDrag(event: CustomEvent) {
        princePos.x = Math.max(40, Math.min(800 - 40, princePos.x + event.detail.dx / scaleRatio));
        princePos.y = Math.max(180, Math.min(500, princePos.y + event.detail.dy / scaleRatio));
    }

    function handleBabyDrag(event: CustomEvent, babyId: number) {
        babiesStore.update(babies => {
            return babies.map(b => {
                if (b.id === babyId) {
                    const newX = Math.max(20, Math.min(800 - 20, b.x + event.detail.dx / scaleRatio));
                    const newY = Math.max(60, Math.min(500, b.y + event.detail.dy / scaleRatio));
                    return { ...b, x: newX, y: newY };
                }
                return b;
            });
        });
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
        {
            id: "babydressup",
            label: "Baby Dress Up",
            icon: Baby,
            color: "#FF8DA1",
        },
        {
            id: "familyplanning",
            label: "Family Planning",
            icon: Users,
            color: "#9C27B0",
        },
        {
            id: "hospital",
            label: "Hospital",
            icon: HeartPulse,
            color: "#009688",
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
        {
            id: "restaurant",
            label: "Restaurant",
            icon: Coffee,
            color: "#FF5722",
        },
    ];
</script>

<div class="game-world" bind:clientWidth={containerWidth}>
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

    <div class="game-content-wrapper" style="height: {scaledHeight}px;">
        <div class="game-content" style="transform: scale({scaleRatio});" bind:clientHeight={contentHeight}>
            {#if activeTab === "dressup"}
                <div in:fade={{ duration: 300 }}>
                    <DressUp />
                </div>
            {:else if activeTab === "princedressup"}
                <div in:fade={{ duration: 300 }}>
                    <PrinceDressUp />
                </div>
            {:else if activeTab === "babydressup"}
                <div in:fade={{ duration: 300 }}>
                    <BabyDressUp />
                </div>
            {:else if activeTab === "familyplanning"}
                <div in:fade={{ duration: 300 }}>
                    <FamilyPlanning />
                </div>
            {:else if activeTab === "hospital"}
                <div in:fade={{ duration: 300 }}>
                    <Hospital {scaleRatio} />
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
            {:else if activeTab === "restaurant"}
                <div in:fade={{ duration: 300 }}>
                    <Restaurant />
                </div>
            {/if}

            <div
                class="global-avatar"
                style="left: {princessPos.x}px; top: {princessPos.y}px; transform: translate(-50%, -90%) scale(0.45);"
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
                    shoeId={$princessState.shoe}
                    scale={1}
                />
            </div>

            <div
                class="global-avatar prince-avatar-global"
                style="left: {princePos.x}px; top: {princePos.y}px; transform: translate(-50%, -90%) scale(0.45);"
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
                    shoeId={$princeState.shoe}
                    scale={1}
                />
            </div>

            {#each $babiesStore as baby (baby.id)}
                <div
                    class="global-avatar baby-avatar-global"
                    style="left: {baby.x}px; top: {baby.y}px; transform: translate(-50%, -90%) scale(0.4);"
                    use:draggable
                    on:dragmove={(e) => handleBabyDrag(e, baby.id)}
                >
                    <BabyAvatar
                        clothing={baby.clothing}
                        swaddleColor={baby.swaddleColor}
                        shoe={baby.shoe}
                        accessory={baby.accessory}
                        eyesClosed={baby.eyesClosed}
                        gender={baby.gender}
                        ageGroup={baby.ageGroup}
                        scale={1}
                    />
                    <span class="baby-name-label">{baby.name}</span>
                </div>
            {/each}
        </div>
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
        user-select: none;
        -webkit-user-select: none;
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

    .game-content-wrapper {
        background: white;
        border-radius: var(--radius-xl, 24px);
        box-shadow: var(--shadow-lg, 0 10px 15px -3px rgba(0, 0, 0, 0.1));
        position: relative;
        overflow: visible;
        width: 100%;
    }

    .game-content {
        width: 800px;
        min-height: 500px;
        position: absolute;
        top: 0;
        left: 0;
        transform-origin: top left;
    }

    .global-avatar {
        position: absolute;
        z-index: 100;
        pointer-events: none;
        user-select: none;
        -webkit-user-select: none;
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

    .baby-name-label {
        display: block;
        text-align: center;
        font-size: 0.7rem;
        font-weight: bold;
        color: #374151;
        background: rgba(255, 255, 255, 0.85);
        border: 1px solid #E5E7EB;
        padding: 1px 5px;
        border-radius: var(--radius-sm, 6px);
        margin-top: -12px;
        pointer-events: none;
        box-shadow: 0 1px 3px rgba(0,0,0,0.05);
    }
</style>
