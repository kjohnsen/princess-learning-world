import { writable } from 'svelte/store';

export type RoutinePhase = 'reading' | 'hygiene' | 'games';

interface SubPhase {
    id: string;
    title: string;
    completed: boolean;
}

interface RoutineState {
    currentPhase: RoutinePhase;
    reading: {
        completed: boolean;
    };
    hygiene: {
        completed: boolean;
        tasks: SubPhase[];
    };
    games: {
        unlocked: boolean;
    };
}

const initialState: RoutineState = {
    currentPhase: 'reading',
    reading: {
        completed: false
    },
    hygiene: {
        completed: false,
        tasks: [
            { id: 'teeth', title: 'Brush Teeth', completed: false },
            { id: 'wash', title: 'Wash Face', completed: false },
            { id: 'pajamas', title: 'Put on Pajamas', completed: false }
        ]
    },
    games: {
        unlocked: true
    }
};

function createRoutineStore() {
    const { subscribe, update, set } = writable<RoutineState>(initialState);

    return {
        subscribe,
        completeReading: () => update(s => {
            const newState = { ...s, reading: { ...s.reading, completed: true } };
            // Auto-advance if checking this manually, or just unlock next phase?
            // For kids app, maybe auto-advance or show a big "Next" button.
            // Let's just mark completed and let the UI handle the transition action.
            return newState;
        }),
        completeHygieneTask: (taskId: string) => update(s => {
            const newTasks = s.hygiene.tasks.map(t =>
                t.id === taskId ? { ...t, completed: !t.completed } : t
            );
            const allCompleted = newTasks.every(t => t.completed);
            return {
                ...s,
                hygiene: {
                    completed: allCompleted,
                    tasks: newTasks
                }
            };
        }),
        setPhase: (phase: RoutinePhase) => update(s => ({ ...s, currentPhase: phase })),
        unlockGames: () => update(s => ({ ...s, games: { unlocked: true } })),
        reset: () => set(initialState)
    };
}

export const routine = createRoutineStore();
