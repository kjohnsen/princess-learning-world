<script lang="ts">
    import { inventory } from "$lib/stores/inventory";
    import {
        blushes,
        crowns,
        dresses,
        lipsticks,
        polishes,
        shadows,
    } from "$lib/stores/princessState";
    import {
        princeCapes,
        princeCrowns,
        princePants,
        princeShirts,
    } from "$lib/stores/princeState";
    import { Coins } from "lucide-svelte";

    // Combine all purchasable items
    const foodItems = [
        { id: "carrot", name: "Carrot 🥕", price: 5, category: "food" },
        { id: "pet_food", name: "Pet Food 🦴", price: 10, category: "food" },
        { id: "cake_kit", name: "Cake Kit 🎂", price: 20, category: "food" }, // Bundle of ingredients?
    ];

    // Helper to format store items from state
    const princessFashionItems = [
        ...dresses
            .filter((d) => d.price > 0)
            .map((d) => ({ ...d, category: "fashion", type: "dress" })),
        ...crowns
            .filter((c) => c.price > 0)
            .map((c) => ({ ...c, category: "fashion", type: "crown" })),
        ...blushes
            .filter((m) => m.price > 0)
            .map((m) => ({ ...m, category: "fashion", type: "blush" })),
        ...shadows
            .filter((m) => m.price > 0)
            .map((m) => ({ ...m, category: "fashion", type: "shadow" })),
        ...lipsticks
            .filter((m) => m.price > 0)
            .map((m) => ({ ...m, category: "fashion", type: "lipstick" })),
        ...polishes
            .filter((m) => m.price > 0)
            .map((m) => ({ ...m, category: "fashion", type: "polish" })),
    ];

    const princeFashionItems = [
        ...princeShirts
            .filter((d) => d.price > 0)
            .map((d) => ({ ...d, category: "princeShirt", type: "shirt" })),
        ...princePants
            .filter((d) => d.price > 0)
            .map((d) => ({ ...d, category: "princePants", type: "pants" })),
        ...princeCapes
            .filter((d) => d.price > 0)
            .map((d) => ({ ...d, category: "princeCape", type: "cape" })),
        ...princeCrowns
            .filter((d) => d.price > 0)
            .map((d) => ({ ...d, category: "princeCrown", type: "crown" })),
    ];

    let activeCategory = "princess";

    function buyItem(item: any) {
        if ($inventory.coins >= item.price) {
            // Use store methods for reactivity!
            inventory.spendCoins(item.price);

            // Construct ID based on source
            let itemId = item.id;
            if (item.category === "fashion") {
                itemId = `${item.type}_${item.id}`;
            } else if (
                item.category === "princeShirt" ||
                item.category === "princePants" ||
                item.category === "princeCape" ||
                item.category === "princeCrown"
            ) {
                itemId = `${item.category}_${item.id}`;
            }

            // Add to inventory store
            inventory.addItem(itemId);
        } else {
            // Shake animation or error feedback could go here
            alert("Not enough coins!");
        }
    }

    function isOwned(item: any) {
        let itemId = item.id;
        if (item.category === "fashion") {
            itemId = `${item.type}_${item.id}`;
        } else if (
            item.category === "princeShirt" ||
            item.category === "princePants" ||
            item.category === "princeCape" ||
            item.category === "princeCrown"
        ) {
            itemId = `${item.category}_${item.id}`;
        }
        return $inventory.ownedItems.includes(itemId);
    }
</script>

<div class="store-container">
    <div class="header">
        <h2>Store</h2>
        <div class="wallet">
            <Coins size={24} color="#FFD700" />
            <span class="coin-count">{$inventory.coins}</span>
        </div>
    </div>

    <div class="category-tabs">
        <button
            class="cat-tab {activeCategory === 'princess' ? 'active' : ''}"
            on:click={() => (activeCategory = "princess")}>Princess</button
        >
        <button
            class="cat-tab {activeCategory === 'prince' ? 'active' : ''}"
            on:click={() => (activeCategory = "prince")}>Prince</button
        >
        <button
            class="cat-tab {activeCategory === 'misc' ? 'active' : ''}"
            on:click={() => (activeCategory = "misc")}>Miscellaneous</button
        >
    </div>

    <div class="shelves">
        {#if activeCategory === "princess"}
            {#each princessFashionItems as item}
                <div class="item-card {isOwned(item) ? 'owned' : ''}">
                    <div
                        class="item-icon"
                        style="background-color: {item.color || '#eee'}"
                    >
                        {#if item.type === "blush" || item.type === "shadow" || item.type === "lipstick" || item.type === "polish"}
                            💄
                        {:else if item.type === "crown"}
                            👑
                        {:else}
                            👗
                        {/if}
                    </div>
                    <div class="item-info">
                        <span class="name">{item.name}</span>
                        <span class="price">
                            {isOwned(item) ? "Owned" : `${item.price} 💰`}
                        </span>
                    </div>
                    <button
                        class="buy-btn"
                        disabled={isOwned(item) ||
                            $inventory.coins < item.price}
                        on:click={() => buyItem(item)}
                    >
                        {isOwned(item) ? "Purchased" : "Buy"}
                    </button>
                </div>
            {/each}
        {:else if activeCategory === "prince"}
            {#each princeFashionItems as item}
                <div class="item-card {isOwned(item) ? 'owned' : ''}">
                    <div
                        class="item-icon"
                        style="background-color: {item.color || '#eee'}"
                    >
                        {#if item.type === "crown"}
                            👑
                        {:else if item.type === "cape"}
                            🦸
                        {:else if item.type === "shirt"}
                            👕
                        {:else if item.type === "pants"}
                            👖
                        {/if}
                    </div>
                    <div class="item-info">
                        <span class="name">{item.name}</span>
                        <span class="price">
                            {isOwned(item) ? "Owned" : `${item.price} 💰`}
                        </span>
                    </div>
                    <button
                        class="buy-btn"
                        disabled={isOwned(item) ||
                            $inventory.coins < item.price}
                        on:click={() => buyItem(item)}
                    >
                        {isOwned(item) ? "Purchased" : "Buy"}
                    </button>
                </div>
            {/each}
        {:else if activeCategory === "misc"}
            {#each foodItems as item}
                <div class="item-card {isOwned(item) ? 'owned' : ''}">
                    <div class="item-icon food-icon">
                        {item.name.split(" ")[1]}
                    </div>
                    <div class="item-info">
                        <span class="name">{item.name.split(" ")[0]}</span>
                        <span class="price">
                            {isOwned(item) ? "Owned" : `${item.price} 💰`}
                        </span>
                    </div>
                    <button
                        class="buy-btn"
                        disabled={isOwned(item) ||
                            $inventory.coins < item.price}
                        on:click={() => buyItem(item)}
                    >
                        {isOwned(item) ? "Purchased" : "Buy"}
                    </button>
                </div>
            {/each}
        {/if}
    </div>
</div>

<style>
    .store-container {
        padding: 20px;
        background: #f8f9fa;
        border-radius: 20px;
        height: 500px;
        overflow-y: auto;
    }

    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
        padding-bottom: 20px;
        border-bottom: 2px solid #e9ecef;
    }

    .wallet {
        background: #fff;
        padding: 10px 20px;
        border-radius: 30px;
        display: flex;
        align-items: center;
        gap: 10px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
        border: 2px solid #ffd700;
        font-weight: bold;
        font-size: 1.2rem;
    }

    .shelves {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
        gap: 20px;
    }

    .item-card {
        background: white;
        border-radius: 15px;
        padding: 15px;
        display: flex;
        flex-direction: column;
        gap: 10px;
        align-items: center;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
        transition: transform 0.2s;
    }

    .item-card:hover {
        transform: translateY(-3px);
    }
    .item-card.owned {
        opacity: 0.7;
    }

    .item-icon {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2rem;
        box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.05);
    }

    .food-icon {
        background: #fff3e0;
    }

    .item-info {
        text-align: center;
        display: flex;
        flex-direction: column;
    }

    .name {
        font-weight: bold;
        font-size: 0.9rem;
        margin-bottom: 5px;
    }
    .price {
        font-size: 0.9rem;
        color: #666;
    }

    .buy-btn {
        width: 100%;
        padding: 8px;
        background: var(--color-primary);
        color: white;
        border: none;
        border-radius: 8px;
        font-weight: bold;
        cursor: pointer;
    }

    .buy-btn:disabled {
        background: #ccc;
        cursor: not-allowed;
    }
</style>
