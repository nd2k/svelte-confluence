<script lang="ts">
	import { toastStatusStore } from "$lib/store/store";
	import { fade } from "svelte/transition";
</script>

{#if $toastStatusStore.isShown}
<div class="toast-message" class:isSuccess="{$toastStatusStore.isSuccess}" transition:fade={{ delay: 500 }}>
    {$toastStatusStore.message}
</div>
{/if}

<style>
    .toast-message {
        display: flex;
        justify-content: center;
        align-content: center;
        flex-wrap: wrap;
        position: fixed;
        top: 1rem;
        left: 5rem;
        right: 5rem;
        text-align: center;
        height: 8%;
        background-color: red;
        border-radius: 5rem;
        color: var(--white-color);
        font-size: 1.2rem;
        font-weight: 700;
        z-index: 100;
    }
    .isSuccess {
        background-color: green;
    }
</style>