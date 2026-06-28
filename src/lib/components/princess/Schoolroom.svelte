<script lang="ts">
    import { draggable } from "$lib/actions/draggable";
    import { onMount } from "svelte";

    export let scaleRatio = 1;

    // 7 days of the week, 0 is Sunday, 1 is Monday, etc.
    const lunchMenu = [
        { name: "Carrot", icon: "🥕" },
        { name: "Broccoli with Cheese", icon: "🥦🧀" },
        { name: "Apple", icon: "🍎" },
        { name: "Pizza", icon: "🍕" },
        { name: "Sandwich", icon: "🥪" },
        { name: "Bento Box", icon: "🍱" },
        { name: "Hot Dog", icon: "🌭" }
    ];

    let todayFood = lunchMenu[0];

    onMount(() => {
        const day = new Date().getDay();
        todayFood = lunchMenu[day];
    });

    // Draggable items state
    let items = [
        { id: 'backpack1', icon: '🎒', x: 80, y: 170, color: '#FF6B97', label: 'Backpack' },
        { id: 'backpack2', icon: '🎒', x: 120, y: 170, color: '#3B82F6', label: 'Backpack' },
        { id: 'globe', icon: '🌍', x: 620, y: 260, color: '#4CAF50', label: 'Globe' },
        { id: 'book1', icon: '📘', x: 450, y: 350, color: '#2196F3', label: 'Math Book' },
        { id: 'book2', icon: '📕', x: 490, y: 350, color: '#F44336', label: 'Reading Book' },
        { id: 'pencil', icon: '✏️', x: 400, y: 360, color: '#FFEB3B', label: 'Pencil' },
        { id: 'ruler', icon: '📏', x: 380, y: 350, color: '#FF9800', label: 'Ruler' },
        { id: 'teacher_apple', icon: '🍎', x: 230, y: 320, color: '#F44336', label: 'Apple' },
    ];

    // Add lunch to items
    let lunchItem = { id: 'lunch', icon: '🍱', x: 550, y: 340, color: '#FF9800', label: 'Lunch' };

    // Reactive update for lunch item after mount sets todayFood
    $: {
        lunchItem.icon = todayFood.icon;
        lunchItem.label = todayFood.name;
    }

    function handleItemDrag(event: CustomEvent, id: string) {
        const dx = event.detail.dx / scaleRatio;
        const dy = event.detail.dy / scaleRatio;

        if (id === 'lunch') {
            lunchItem.x = Math.max(0, Math.min(800 - 40, lunchItem.x + dx));
            lunchItem.y = Math.max(0, Math.min(500 - 40, lunchItem.y + dy));
            lunchItem = { ...lunchItem };
        } else {
            const index = items.findIndex(item => item.id === id);
            if (index !== -1) {
                items[index].x = Math.max(0, Math.min(800 - 40, items[index].x + dx));
                items[index].y = Math.max(0, Math.min(500 - 40, items[index].y + dy));
                items = [...items];
            }
        }
    }

    let boardTextIndex = 0;
    const boardTexts = [
        "Welcome to Class! 🌟",
        "1 + 2 = 3",
        "A B C D E F G",
        "Draw a happy face ☺",
        "Recess at 12:00! 🏃‍♂️",
        "Be kind! ❤️"
    ];

    function changeBoardText() {
        boardTextIndex = (boardTextIndex + 1) % boardTexts.length;
    }
</script>

<div class="schoolroom-scene">
    <div class="wall">
        <!-- Decorations -->
        <div class="garland">
            <span>🎉</span><span>🎈</span><span>⭐</span><span>🎊</span><span>🎈</span><span>🎉</span>
        </div>
        <div class="posters">
            <div class="poster poster-1">
                <span class="poster-icon">🎨</span>
                <span>Art!</span>
            </div>
            <div class="poster poster-2">
                <span class="poster-icon">🔤</span>
                <span>ABC</span>
            </div>
            <div class="poster poster-3">
                <span class="poster-icon">🔢</span>
                <span>123</span>
            </div>
        </div>

        <div class="blackboard" on:click={changeBoardText} on:keydown={(e) => e.key === 'Enter' && changeBoardText()} role="button" tabindex="0">
            <div class="chalk-ledge"></div>
            <p class="board-text">{boardTexts[boardTextIndex]}</p>
            <p class="board-hint">(Tap to change)</p>
        </div>

        <div class="hooks-container">
            <div class="hooks">
                <div class="hook"></div>
                <div class="hook"></div>
                <div class="hook"></div>
                <div class="hook"></div>
            </div>
            <span class="hooks-label">Backpacks</span>
        </div>
    </div>

    <div class="floor">
        <div class="rug"></div>

        <div class="desks">
            <div class="teacher-desk"></div>
            <div class="student-desk"></div>
            <div class="student-desk"></div>
        </div>
    </div>

    <!-- Draggable items -->
    {#each items as item (item.id)}
        <div
            class="draggable-item"
            style="left: {item.x}px; top: {item.y}px;"
            use:draggable
            on:dragmove={(e) => handleItemDrag(e, item.id)}
        >
            <div class="item-icon">{item.icon}</div>
        </div>
    {/each}

    <!-- Lunch item -->
    <div
        class="draggable-item lunch-item"
        style="left: {lunchItem.x}px; top: {lunchItem.y}px;"
        use:draggable
        on:dragmove={(e) => handleItemDrag(e, 'lunch')}
    >
        <div class="item-icon">{lunchItem.icon}</div>
        <div class="lunch-label">{lunchItem.label}</div>
    </div>
</div>

<style>
    .schoolroom-scene {
        width: 100%;
        height: 500px;
        background: #e0f7fa; /* Turquoise tint */
        position: relative;
        border-radius: var(--radius-lg);
        overflow: hidden;
        user-select: none;
    }

    .wall {
        position: absolute;
        top: 0;
        width: 100%;
        height: 350px;
        background: #b2ebf2; /* Light turquoise */
        border-bottom: 8px solid #80deea;
    }

    .floor {
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 150px;
        background: #ffe0b2; /* Wooden floor tint */
    }

    .rug {
        position: absolute;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%) perspective(200px) rotateX(45deg);
        width: 450px;
        height: 150px;
        background: repeating-linear-gradient(
            45deg,
            #ff4081,
            #ff4081 20px,
            #ffeb3b 20px,
            #ffeb3b 40px,
            #00bcd4 40px,
            #00bcd4 60px
        );
        border-radius: 20px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        border: 4px solid #fff;
    }

    .garland {
        display: flex;
        justify-content: space-around;
        width: 100%;
        font-size: 1.8rem;
        padding-top: 15px;
    }

    .posters {
        display: flex;
        justify-content: space-between;
        padding: 20px 60px;
    }

    .poster {
        width: 90px;
        height: 110px;
        background: white;
        border: 3px solid #ccc;
        box-shadow: 2px 2px 5px rgba(0,0,0,0.1);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        font-size: 1rem;
        transform: rotate(-3deg);
    }

    .poster-2 {
        transform: rotate(2deg);
        border-color: #ff9800;
        color: #ff9800;
    }

    .poster-3 {
        transform: rotate(-1deg);
        border-color: #4caf50;
        color: #4caf50;
    }

    .poster-1 {
        border-color: #e91e63;
        color: #e91e63;
    }

    .poster-icon {
        font-size: 2.5rem;
    }

    .blackboard {
        position: absolute;
        top: 70px;
        left: 50%;
        transform: translateX(-50%);
        width: 320px;
        height: 180px;
        background: #2e7d32;
        border: 8px solid #795548;
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }

    .chalk-ledge {
        position: absolute;
        bottom: -8px;
        left: -8px;
        right: -8px;
        height: 12px;
        background: #5d4037;
        border-radius: 2px;
    }

    .chalk-ledge::after {
        content: '';
        position: absolute;
        bottom: 2px;
        left: 20px;
        width: 15px;
        height: 5px;
        background: white;
        border-radius: 2px;
        box-shadow: 25px 0 0 #ffeb3b, 50px 0 0 #ff4081;
    }

    .board-text {
        color: white;
        font-family: 'Comic Sans MS', cursive, sans-serif;
        font-size: 1.6rem;
        text-align: center;
        padding: 10px;
        margin: 0;
    }

    .board-hint {
        color: rgba(255,255,255,0.5);
        font-size: 0.8rem;
        position: absolute;
        bottom: 10px;
    }

    .hooks-container {
        position: absolute;
        top: 150px;
        left: 60px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 5px;
    }

    .hooks {
        width: 120px;
        height: 20px;
        background: #d7ccc8;
        border-radius: 10px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .hooks-label {
        font-size: 0.8rem;
        font-weight: bold;
        color: #795548;
    }

    .hook {
        width: 8px;
        height: 12px;
        background: #8d6e63;
        border-radius: 4px;
        margin-top: 10px;
        box-shadow: 1px 1px 2px rgba(0,0,0,0.2);
    }

    .desks {
        position: absolute;
        bottom: 20px;
        width: 100%;
        display: flex;
        justify-content: space-around;
        padding: 0 50px;
        align-items: flex-end;
    }

    .teacher-desk {
        width: 160px;
        height: 90px;
        background: #795548;
        border-radius: 5px;
        position: relative;
        box-shadow: 0 5px 10px rgba(0,0,0,0.2);
    }

    .teacher-desk::before, .teacher-desk::after {
        content: '';
        position: absolute;
        bottom: -20px;
        width: 15px;
        height: 20px;
        background: #5d4037;
    }
    .teacher-desk::before { left: 15px; }
    .teacher-desk::after { right: 15px; }

    .student-desk {
        width: 120px;
        height: 70px;
        background: #ffb74d;
        border-radius: 5px;
        position: relative;
        margin-bottom: -10px;
        box-shadow: 0 5px 10px rgba(0,0,0,0.2);
    }

    .student-desk::before, .student-desk::after {
        content: '';
        position: absolute;
        bottom: -20px;
        width: 12px;
        height: 20px;
        background: #f57c00;
    }
    .student-desk::before { left: 10px; }
    .student-desk::after { right: 10px; }

    .draggable-item {
        position: absolute;
        z-index: 50;
        cursor: grab;
        display: flex;
        flex-direction: column;
        align-items: center;
        filter: drop-shadow(0 4px 6px rgba(0,0,0,0.2));
        transition: transform 0.1s;
    }

    .draggable-item:active {
        cursor: grabbing;
        transform: scale(1.1);
    }

    .item-icon {
        font-size: 2.8rem;
        user-select: none;
    }

    .lunch-item .item-icon {
        font-size: 3rem;
    }

    .lunch-label {
        background: white;
        padding: 2px 8px;
        border-radius: 10px;
        font-size: 0.75rem;
        font-weight: bold;
        color: #333;
        margin-top: -5px;
        border: 2px solid #ff9800;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
</style>
