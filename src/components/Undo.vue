<script lang="ts" setup>
import { getTextColorBasedOnBG } from '~/utils/colorUtils';
import Icon from './Icon.vue';

const emit = defineEmits(["undo"])
const { bg } = defineProps({
  bg: {
    type: String,
    default: "#e5e7eb"
  }
})
const textColor = getTextColorBasedOnBG(bg);
</script>

<template>
  <FlexboxLayout verticalAlignment="bottom" class="justify-center w-full mb-8">
    <FlexboxLayout class="justify-between px-3 rounded-full" width="50%" @tap="emit('undo')" :backgroundColor="bg">
      <Label text="Undo" class="text-lg" :color="textColor"></Label>
      <Icon icon="undo" :color="textColor"></Icon>
    </FlexboxLayout>
  </FlexboxLayout>
</template>