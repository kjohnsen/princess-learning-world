<script lang="ts">
  import '../app.css';
  import { page } from '$app/stores'; // Use $app/stores for page store
  import { fly } from 'svelte/transition';
  import { base } from '$app/paths';
</script>

<div class="app-shell">
  <header class="app-header">
    <a href="{base}/" class="logo">
      <span class="crown">👑</span>
      <h1>Princess Learning World</h1>
    </a>
  </header>
  <main>
    {#key $page.url.pathname}
        <div 
            class="transition-wrapper"
            in:fly={{ x: -20, duration: 300, delay: 300 }}
            out:fly={{ x: 20, duration: 300 }}
        >
            <slot />
        </div>
    {/key}
  </main>
</div>

<style>
  .app-shell {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    overflow-x: hidden;
  }

  .app-header {
    background: var(--color-surface);
    padding: var(--spacing-sm) var(--spacing-md);
    box-shadow: var(--shadow-sm);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;
  }

  .logo {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    text-decoration: none;
    color: var(--color-primary);
  }

  .logo h1 {
    font-size: 1.5rem;
    margin: 0;
    font-family: 'Fredoka', cursive, system-ui; /* Assuming a playful font is available or fallbacks */
    font-weight: 700;
  }

  .crown {
    font-size: 1.8rem;
  }
  
  main {
    flex: 1;
    display: flex;
    flex-direction: column;
    position: relative;
  }

  .transition-wrapper {
    flex: 1;
    display: flex;
    flex-direction: column;
    width: 100%;
  }
</style>
