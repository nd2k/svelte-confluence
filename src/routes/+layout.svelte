<script lang="ts">
    import '../styles/main.css';
	import Toast from '$lib/components/Toast.svelte'; 
	import Spinner from '$lib/components/Spinner.svelte';
	import { loadingStatus } from '$lib/store/store';

</script>

{#if $loadingStatus}
    <Spinner />
{/if}
<Toast />
<slot />
