import { writable } from 'svelte/store';

export interface BabyConfig {
    id: number;
    name: string;
    gender: 'girl' | 'boy';
    isTwin: boolean;
    swaddleColor: string;
    clothing: 'onesie' | 'dress' | 'sanfermin';
    shoe: 'barefoot' | 'booties' | 'sanfermin';
    accessory: 'none' | 'hairbow' | 'cap' | 'bandana';
    eyesClosed: boolean;
    x: number;
    y: number;
}

export const initialBabies: BabyConfig[] = [
    {
        id: 1,
        name: "Baby Lily",
        gender: "girl",
        isTwin: true,
        swaddleColor: "#FFB6C1",
        clothing: "onesie",
        shoe: "barefoot",
        accessory: "hairbow",
        eyesClosed: false,
        x: 230,
        y: 390
    },
    {
        id: 2,
        name: "Baby Mia",
        gender: "girl",
        isTwin: true,
        swaddleColor: "#E0B0FF",
        clothing: "dress",
        shoe: "booties",
        accessory: "hairbow",
        eyesClosed: true,
        x: 280,
        y: 390
    },
    {
        id: 3,
        name: "Baby Leo",
        gender: "boy",
        isTwin: true,
        swaddleColor: "#ADD8E6",
        clothing: "onesie",
        shoe: "barefoot",
        accessory: "cap",
        eyesClosed: false,
        x: 330,
        y: 390
    },
    {
        id: 4,
        name: "Baby Max",
        gender: "boy",
        isTwin: true,
        swaddleColor: "#98FB98",
        clothing: "onesie",
        shoe: "booties",
        accessory: "none",
        eyesClosed: true,
        x: 380,
        y: 390
    }
];

function createBabyStore() {
    const stored = typeof localStorage !== 'undefined' ? localStorage.getItem('princess_babies') : null;
    const startState = stored ? JSON.parse(stored) : initialBabies;

    const { subscribe, set, update } = writable<BabyConfig[]>(startState);

    if (typeof localStorage !== 'undefined') {
        subscribe(val => localStorage.setItem('princess_babies', JSON.stringify(val)));
    }

    return {
        subscribe,
        set,
        update,
        updateBaby: (id: number, config: Partial<BabyConfig>) => update(babies => {
            return babies.map(b => b.id === id ? { ...b, ...config } : b);
        }),
        updatePosition: (id: number, dx: number, dy: number) => update(babies => {
            return babies.map(b => b.id === id ? { ...b, x: b.x + dx, y: b.y + dy } : b);
        }),
        reset: () => set(initialBabies)
    };
}

export const babiesStore = createBabyStore();
