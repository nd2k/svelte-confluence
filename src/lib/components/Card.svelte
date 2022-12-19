<script lang="ts">
    export let title: boolean = false;
    export let footer: boolean = false;
    export let height: number = 10;
    export let width: number = 10;
    export let rounded: number = 2;
    export let backgroundColor: string = 'var(--tertiary-color)'

$: style = `--card-width:${width}rem; --card-height:${height}rem; --card-rounded:${rounded}rem; 
--card-background-color:${backgroundColor};`;
</script>

<div class="card" {style}>
    {#if title}
        <div class="card-title">
            <slot name="card-title" />
        </div>
    {/if}
    <div class="card-body">
        <slot name="card-body" />
    </div>
    {#if footer}
        <div class="card-footer">
            <slot name="card-footer" />
        </div>
    {/if}
</div>

<style>
    .card {
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
        padding: 1rem;
        width: var(--card-width);
        height: var(--card-height);
        position: relative;
        background-color: var(--card-background-color);
        border-radius: var(--card-rounded);
    }
</style>