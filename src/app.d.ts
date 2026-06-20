// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export { };

declare module 'svelte/elements' {
	interface HTMLAttributes<T> {
		'on:dragmove'?: (event: any) => void;
		'on:dragstart'?: (event: any) => void;
		'on:dragend'?: (event: any) => void;
	}
}
