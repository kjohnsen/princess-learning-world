<script lang="ts">
  import '../app.css';
  import { page } from '$app/stores'; // Use $app/stores for page store
  import { fly } from 'svelte/transition';
</script>

<div class="app-shell">
  <!-- We'll add a persistent header/nav later if needed, 
       but for now we just wrap the content -->
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
