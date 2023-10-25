<script lang="ts" setup>
  const props = defineProps({
    icon: String,
    color: {
      type: String,
      default: undefined
    }
  });
</script>

<template>
  <Label :text="props.icon" :class="['m-icon-round', color]"></Label>
</template>
