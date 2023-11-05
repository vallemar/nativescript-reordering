<script lang="ts" setup>
import Icon from './Icon.vue';

const emit = defineEmits(["undo"])
</script>

<template>
  <FlexboxLayout verticalAlignment="bottom" class=" justify-center w-full mb-8">
    <FlexboxLayout class=" justify-between px-3 rounded-full  bg-gray-200" width="50%" @tap="emit('undo')">
      <Label text="Undo" class=" text-lg"></Label>
      <Icon icon="undo" lass="text-white"></Icon>
    </FlexboxLayout>
  </FlexboxLayout>
</template>

