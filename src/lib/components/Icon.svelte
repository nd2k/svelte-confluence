<script lang="ts">
    import Icon from '@iconify/svelte';

    export let icon: string = 'mdi:user-circle';
    export let width: string|number = 1;
    export let height: string|number = 1;
    export let color: string = "var(--primary-color)";
</script>

<Icon {icon} {width} {height} {color} />