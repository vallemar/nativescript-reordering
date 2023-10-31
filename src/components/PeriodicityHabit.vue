<script lang="ts" setup>
import { unrefView, useEventListener } from '@nativescript-use/vue';
import { AbsoluteLayout, GridLayout, Screen, View, isIOS } from '@nativescript/core';
import { ref } from 'nativescript-vue';
import { Periodicity } from '~/types';
import { animateView } from "@/utils/animation"
import { useHabitStore } from '~/stores/habitStore';

const { id } = defineProps({
  id: {
    type: String,
    required: true
  }
});

const { get, updateItem } = useHabitStore();
const habit = get(id);
const text = ref(habit.periodicity === Periodicity.Day ? "Every day" : "Every week");
const periodicityWrapRef = ref();
const shadowRef = ref();
const daySwitchRef = ref();
const weekSwitchRef = ref();


useEventListener(habit.periodicity === Periodicity.Day ? daySwitchRef : weekSwitchRef, {
  layoutChanged: (args) => {
    const shadowView = unrefView<View>(shadowRef);
    const periodicityWrapView = unrefView<GridLayout>(periodicityWrapRef);

    if (shadowView && periodicityWrapView) {
      shadowView.opacity = 1;
      if (habit.periodicity === Periodicity.Week) {
        shadowView.translateX = Screen.mainScreen.widthDIPs;
      }

      const location = args.object.getLocationRelativeTo(periodicityWrapView);
      animateView(shadowView, {
        translate: { x: location.x, y: location.y },
      });
    }
  }
})

const getTextColor = (periodicity: Periodicity) => habit.periodicity === periodicity ? 'white' : 'black';

function chagePeriodicity(event: { object: View }, periodicity: Periodicity) {
  habit.periodicity = periodicity;
  updateItem(habit);
  const shadowView = unrefView<View>(shadowRef);
  const periodicityWrapView = unrefView<GridLayout>(periodicityWrapRef);
  if (shadowView && periodicityWrapView) {
    const location = (event.object as View).getLocationRelativeTo(periodicityWrapView);
    animateView(shadowView, {
      translate: { x: location.x, y: location.y },
      size: { width: event.object.getActualSize().width, height: event.object.getActualSize().height },
      onBeforeStartAnimation: (view) => {
        if (isIOS)
          (view.ios as UIView).transform = CGAffineTransformIdentity
      }
    })
  }
}
</script>

<template>
  <AbsoluteLayout ref="periodicityWrapRef" height="80">
    <!-- GRAY BACKGROUND -->
    <FlexboxLayout class="justify-center my-4 w-full">
      <Label text="Every day" class="px-6 py-4 rounded-full  mr-2" color="transparent" backgroundColor="#e4e4e4"></Label>
      <Label text="Every week" class="px-6 py-4 rounded-full ml-2" color="transparent" backgroundColor="#e4e4e4"></Label>
    </FlexboxLayout>

    <!-- SHADOW ANIMATION -->
    <Label ref="shadowRef" originX="0" :text="text" class="px-6 py-4 rounded-full " :backgroundColor="habit.color"
      color="transparent"></Label>

    <!-- TEXT AND BUTTON -->
    <FlexboxLayout class="justify-center my-4 w-full">
      <Label ref="daySwitchRef" text="Every day" class="px-6 py-4 rounded-full  mr-2"
        :color="getTextColor(Periodicity.Day)" @tap="chagePeriodicity($event, Periodicity.Day)"></Label>
      <Label ref="weekSwitchRef" text="Every week" class="px-6 py-4  rounded-full ml-2"
        :color="getTextColor(Periodicity.Week)" @tap="chagePeriodicity($event, Periodicity.Week)"></Label>
    </FlexboxLayout>
  </AbsoluteLayout>
</template>
