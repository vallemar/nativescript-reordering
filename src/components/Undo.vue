<script lang="ts" setup>
import Icon from './Icon.vue';

const emit = defineEmits(["undo"])
const { bg } = defineProps({
  bg: {
    type: String,
    default: "#e5e7eb"
  }
})
</script>

<template>
  <FlexboxLayout verticalAlignment="bottom" class=" justify-center w-full mb-8">
    <FlexboxLayout class=" justify-between px-3 rounded-full" width="50%" @tap="emit('undo')" :backgroundColor="bg">
      <Label text="Undo" class="text-white text-lg"></Label>
      <Icon icon="undo"></Icon>
    </FlexboxLayout>
  </FlexboxLayout>
</template>