<script lang="ts">
    import { createEventDispatcher } from 'svelte';
	import { FieldValidation } from "$lib/interfaces/types";
    import { fade } from 'svelte/transition';
	import Icon from "./Icon.svelte";

    export let id: string = 'field';
    export let type: string = 'text';
    export let label: string = 'Label';
    export let value: string = '';
    export let width: number = 18;
    export let height: number = 2;
    export let rounded: number = 10;
    export let fontSize: number = 1;
    export let color: string = 'var(--primary-color)';
    export let backgroundColor: string = 'var(--secondary-color)';
    export let fieldValidation: FieldValidation = new FieldValidation(false, null);
    export let icon: string = "ic:baseline-email";

    const dispatch = createEventDispatcher();
    let active: boolean = false;

    $: style = `--field-width:${width}rem; --field-height:${height}rem; --field-rounded: ${rounded}rem; --field-color:${color};
    --field-background-color:${backgroundColor}; --field-border-color:${backgroundColor}; --field-font-size:${fontSize}rem;`;

    function typeAction(node: HTMLInputElement) {
		node.type = type;
	}

    function activeIcon() {
        active = true;
    }

    function deactiveIcon() {
        active = false;
    }
</script>

<div class="field" {style}>
    {#if active}
        <Icon {icon} width="2rem" height="2rem" color="var(--fourthary-color)" />
    {:else}
        <Icon {icon} width="2rem" height="2rem" color="var(--tertiary-color)" />
    {/if}
    <div class="field-input">
        <input 
            {id} 
            name={id} 
            required 
            autocomplete="" 
            use:typeAction 
            bind:value 
            on:focus={activeIcon} 
            on:blur={deactiveIcon}
            on:input={() => dispatch('input-validation', { value, id })}/>
        <label for={id}>{label}</label>
        {#if !fieldValidation.isValid && fieldValidation.errorMessage != null}
            <div class="field-error" transition:fade>
                {fieldValidation.errorMessage}
            </div>
        {/if}
    </div>
</div>

<style>
    .field {
        display: flex;
        align-content: center;
        justify-content: center;
        flex-direction: row;
        width: var(--field-width);
        height: var(--field-height);
        gap: 0.5rem;
    }
    .field-input {
        position: relative;
        display: flex;
        align-content: center;
        width: var(--field-width);
    }
    .field-input label {
        position: absolute;
        top: 0.35rem;
        left: 0.5rem;
        font-size: var(--field-font-size);
        color: var(--field-color);	
        pointer-events: none;
        transition: all 0.5s ease-in-out;
        font-weight: 700;
    }
    .field-input input { 
        border: 1px solid var(--field-background-color); 
        border-radius: 5rem; 
        background: transparent;
        width: 100%;
        font-size: var(--field-font-size);
        background-color: var(--field-background-color);
        font-weight: 700;
        padding-left: 0.7rem;
    }
    .field-input input:focus { 
        border: none;	
        outline: none;
        border: 2px solid var(--field-color);
        background-color: var(--field-color);
        color: var(--field-background-color);
    } 
    .field-input input:focus ~ label,
    .field-input input:valid ~ label {
        top: -1.2rem;
        font-size: 0.8rem;
        color: var(--field-color);
    }
    .field-error {
        color: red;
        position: absolute;
        top: 2rem;
        font-size: 0.8rem;
        font-weight: 500;
        padding-left: 0.5rem;
    }

</style>