<script lang="ts">
    import { draggable } from "$lib/actions/draggable";

    interface Food {
        id: number;
        name: string;
        icon: string;
        x: number;
        y: number;
    }

    let foods: Food[] = [
        { id: 1, name: "Pizza", icon: "🍕", x: 30, y: 80 },
        { id: 2, name: "Burger", icon: "🍔", x: 100, y: 80 },
        { id: 3, name: "Spaghetti", icon: "🍝", x: 170, y: 80 },
        { id: 4, name: "Juice", icon: "🥤", x: 240, y: 80 },
        { id: 5, name: "Cake", icon: "🍰", x: 310, y: 80 },
        { id: 6, name: "Salad", icon: "🥗", x: 380, y: 80 },
    ];

    function handleFoodDrag(event: CustomEvent, id: number) {
        const idx = foods.findIndex((f) => f.id === id);
        if (idx !== -1) {
            foods[idx].x += event.detail.dx;
            foods[idx].y += event.detail.dy;
        }
    }
</script>

<div class="restaurant-scene">
    <div class="background">
        <div class="window">
            <div class="sky"></div>
            <div class="sun">☀️</div>
        </div>
        <div class="wall-decor">
            <div class="painting">Special Menu 📜</div>
        </div>
    </div>

    <div class="tables-area">
        <div class="table-group">
            <div class="chair left"></div>
            <div class="table"></div>
            <div class="chair right"></div>
        </div>
        <div class="table-group">
            <div class="chair left"></div>
            <div class="table"></div>
            <div class="chair right"></div>
        </div>
        <div class="table-group">
            <div class="chair left"></div>
            <div class="table"></div>
            <div class="chair right"></div>
        </div>
    </div>

    <!-- Counter area -->
    <div class="counter-area">
        <div class="counter-surface"></div>
        <div class="chef-character">👨‍🍳</div>
        <div class="plant">🪴</div>
    </div>

    <div class="floor"></div>

    {#each foods as food (food.id)}
        <div
            class="food-item"
            style="left: {food.x}px; top: {food.y}px;"
            use:draggable
            on:dragmove={(e) => handleFoodDrag(e, food.id)}
        >
            {food.icon}
        </div>
    {/each}
</div>

<style>
    .restaurant-scene {
        width: 100%;
        height: 500px;
        background: #ffe0b2; /* Warm peach walls */
        position: relative;
        border-radius: var(--radius-lg);
        overflow: hidden;
        user-select: none;
    }

    .background {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        z-index: 1;
    }

    .floor {
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 180px;
        background: repeating-linear-gradient(
            45deg,
            #d7ccc8 0,
            #d7ccc8 20px,
            #8d6e63 20px,
            #8d6e63 40px
        ); /* Checkered floor */
        z-index: 1;
        opacity: 0.5;
    }

    .window {
        position: absolute;
        top: 30px;
        left: 250px;
        width: 180px;
        height: 120px;
        background: #81d4fa;
        border: 8px solid #a1887f;
        border-radius: 8px;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.1);
    }

    .sun {
        font-size: 3rem;
        position: absolute;
        top: 10px;
        right: 10px;
        animation: spin 30s linear infinite;
    }

    @keyframes spin {
        100% {
            transform: rotate(360deg);
        }
    }

    .wall-decor {
        position: absolute;
        top: 40px;
        right: 120px;
        width: 140px;
        height: 200px;
        background: #eefece;
        border: 6px solid #8d6e63;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        color: #4e342e;
        box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
        font-size: 1.1rem;
        text-align: center;
        padding: 10px;
    }

    .tables-area {
        position: absolute;
        bottom: 40px;
        left: 0;
        width: 100%;
        display: flex;
        justify-content: space-around;
        padding: 0 40px;
        z-index: 2;
    }

    .table-group {
        position: relative;
        width: 140px;
        height: 100px;
        display: flex;
        align-items: flex-end;
        justify-content: center;
    }

    .table {
        width: 100px;
        height: 60px;
        background: #8d6e63;
        border-radius: 10px 10px 0 0;
        position: relative;
        z-index: 3;
        border-top: 5px solid #5d4037;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3);
    }

    .table::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(
            to bottom,
            rgba(255, 255, 255, 0.1),
            transparent
        );
        border-radius: 10px 10px 0 0;
    }

    .chair {
        width: 40px;
        height: 80px;
        background: #d84315;
        position: absolute;
        bottom: 10px;
        border-radius: 10px 10px 0 0;
        border-top: 4px solid #bf360c;
        box-shadow: 2px 0 5px rgba(0, 0, 0, 0.2);
    }

    .chair.left {
        left: 0;
        z-index: 2;
    }

    .chair.right {
        right: 0;
        z-index: 2;
    }

    .counter-area {
        position: absolute;
        top: 150px;
        left: -10px;
        width: 800px;
        height: 70px;
        background: transparent;
        z-index: 4;
        pointer-events: none;
    }

    .counter-surface {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 600px;
        height: 20px;
        background: #795548;
        border-radius: 0 20px 20px 0;
        border-bottom: 30px solid #5d4037;
        border-right: 5px solid #4e342e;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        pointer-events: auto;
    }

    .chef-character {
        font-size: 5rem;
        position: absolute;
        bottom: 40px;
        left: 100px;
    }

    .plant {
        font-size: 3rem;
        position: absolute;
        bottom: 40px;
        left: 520px;
        z-index: 5;
    }

    .food-item {
        position: absolute;
        font-size: 3rem;
        cursor: grab;
        z-index: 100;
        filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.4));
        transition: transform 0.1s;
    }

    .food-item:hover {
        transform: scale(1.1);
    }

    .food-item:active {
        cursor: grabbing;
        transform: scale(1.2);
        filter: drop-shadow(0 8px 12px rgba(0, 0, 0, 0.5));
    }
</style>
