<script lang="ts" setup>
import { ref, watch } from 'nativescript-vue';
import { unrefView, useEventListener } from '@nativescript-use/vue';
import Icon from './Icon.vue';
import { animateView } from '~/utils/animation';
import { View } from '@nativescript/core';

const emit = defineEmits(["change"])
const props = defineProps({
  color: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  index: {
    type: Number,
    required: true
  }
})

const stepAnimationRef = ref();
const stepsRef = ref();
const wrapStepsAnimationRef = ref();

function change(index: number) {
  if (index >= 0 && index <= 4) {
    emit("change", index);
  }
}

watch(() => props.index, () => {
  animateStep(props.index);
})


useEventListener(stepAnimationRef, {
  layoutChanged(args: { object: View }) {
    animateStep(0);
  }
})

function animateStep(index: number) {
  const stepAnimationView = unrefView<View>(stepAnimationRef);
  const wrapStepsAnimationView = unrefView<View>(wrapStepsAnimationRef);
  const targetView = stepsRef.value[index]?.nativeView;
  if (stepAnimationView && wrapStepsAnimationView && targetView) {
    const locationTarget = targetView.getLocationRelativeTo(wrapStepsAnimationView);
    animateView(stepAnimationView, {
      translate: {
        x: locationTarget.x,
        y: locationTarget.y
      }
    })
  }

}
</script>

<template>
  <AbsoluteLayout ref="wrapStepsAnimationRef" horizontalAlignment="center" verticalAlignment="bottom">
    <StackLayout class="text-center mb-12" orientation="horizontal">
      <Icon icon="arrow_back_ios" fontSize="22" @tap="change(props.index - 1)"
        :color="props.index == 0 ? '#e9e9e9' : props.color">
      </Icon>
      <StackLayout ref="stepsRef" v-for="(index) in 5" :key="index" class="rounded-full h-[16] w-[16] mx-2 bg-secondary"
         @tap="change(index - 1)">
      </StackLayout>
      <Icon icon="arrow_forward_ios" fontSize="22" @tap="change(props.index + 1)"
        :color="props.index == 4 ? '#e9e9e9' : props.color">
      </Icon>
    </StackLayout>
    <FlexboxLayout ref="stepAnimationRef" class="rounded-full h-[16] w-[16] justify-center" top="0" left="0" originX="0"
      :backgroundColor="props.color">
      <Label :text="props.icon" fontSize="8" class="text-center" verticalAlignment="center"></Label>
    </FlexboxLayout>
  </AbsoluteLayout>
</template>
