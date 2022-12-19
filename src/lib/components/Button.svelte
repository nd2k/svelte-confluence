<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    export let eventName: string = 'default-event';
    export let outline: boolean = false;
    export let disabled: boolean = false;
    export let active: boolean = false;
    export let rounded: number = 0;
    export let width: number = 3;
	export let height: number = 2;
    export let backgroundColor: string = '#52796f';
	export let color: string = 'white';
	export let borderColor: string = 'white';
	export let border: number = 0;
	export let fontSize: string = '1rem';
	export let type: string = 'button';
    $: style = outline ? 
	`--rounded: ${rounded}rem; --width: ${width}rem; --height: ${height}rem; --background: ${color}; 
	--color: ${backgroundColor}; --borderColor: ${borderColor}; --border: 1px;
	--hoverColor: ${backgroundColor}; --hooverBackgroundColor: ${color}; --fontSize: ${fontSize}`
	: `--rounded: ${rounded}rem; --width: ${width}rem; --height: ${height}rem; --background: ${backgroundColor}; 
	--color: ${color}; --borderColor: ${borderColor}; --border: ${border}px; --hoverColor: ${backgroundColor}; 
	--hooverBackgroundColor: ${color}; --fontSize: ${fontSize}`;
    const dispatch = createEventDispatcher();	
	function emitEvent() {
		dispatch(eventName);
	}
</script>

<button on:click={emitEvent} {type} {style} {disabled} class={active ? 'active' : ''}>
    <slot/>
</button>

<style>
    button {
        border-radius: var(--rounded);
		width: var(--width);
		height: var(--height);
		background-color: var(--background);
		color: var(--color);
		border-color: var(--borderColor);
		border: var(--border) solid;
		box-shadow: rgba(0, 0, 0, 0.15) 0px 15px 25px, rgba(0, 0, 0, 0.05) 0px 5px 10px;
		font-size: var(--fontSize);
		font-weight: 700;
        cursor: pointer;
        border: none;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
		outline: none;
    }
    button:hover {
		background-color: var(--hoverColor);
		color: var(--hooverBackgroundColor);
		border: var(--border) solid var(--hoverColor);
	}
	button:active {
		transform: translateY(3px);
	}
    .active {
        background-color: var(--hoverColor);
		color: var(--hooverBackgroundColor);
		border: var(--border) solid var(--hoverColor);
    }
	button:disabled {
		background-color: var(--tertiary-color);
		color: var(--white-color);
		cursor: not-allowed;
	}
	button:disabled:active {
		transform: translateY(0);
	}
</style>