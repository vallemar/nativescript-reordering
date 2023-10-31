<script lang="ts" setup>
import { unrefView, useEventListener } from '@nativescript-use/vue';
import { GridLayout, StackLayout, isAndroid } from '@nativescript/core';
import { computed, ref } from 'nativescript-vue';
import Icon from '~/components/Icon.vue';
import PeriodicityHabit from '~/components/PeriodicityHabit.vue';
import { animateView } from "@/utils/animation"
import { useHabitStore } from '~/stores/habitStore';
import { maxCountDayRange } from '~/mockData';

const { id } = defineProps({
  id: {
    type: String,
    required: true
  }
});

const { get, updateItemWeek } = useHabitStore();
const habit = get(id);
const habitCountRef = ref();

let rotations = 0;
const dayPositionInArray = habit.week.length - 1;

const currentDayValue = computed(() => habit.week[dayPositionInArray]);

useEventListener(habitCountRef, {
  loaded: () => applyScale(currentDayValue.value > 0)
})

function add() {
  if (habit.week[dayPositionInArray] < maxCountDayRange) {
    updateItemWeek(id, dayPositionInArray, currentDayValue.value + 1);
    applyScale();
  }
}

function remove() {
  if (habit.week[dayPositionInArray] > 0) {
    updateItemWeek(id, dayPositionInArray, currentDayValue.value - 1);
    applyScale(false);
  }
}

function applyScale(plus = true) {
  const view = unrefView<StackLayout>(habitCountRef) as StackLayout;
  animateView(view, {
    scale: {
      x: currentDayValue.value * 1.2,
      y: currentDayValue.value * 1.2,
    }
  })

  rotations += plus ? 1 : -1;
  const viewRotation = isAndroid ? view : view?.getChildAt(0);
  animateView(viewRotation, {
    rotation: rotations * 180
  })
}
</script>

<template>
  <Page actionBarHidden="true" androidStatusBarBackground="white">
    <GridLayout rows="auto, *">
      <!-- PERIOCITY HABIT SWITCH -->
      <StackLayout class="mt-16">
        <Label verticalAlignment="top" horizontalAlignment="center" :text="habit?.title"
          class="font-bold text-4xl"></Label>
        <PeriodicityHabit :id="id"></PeriodicityHabit>
      </StackLayout>

      <!-- HABIT ANIMATION COUNT -->
      <GridLayout row="1" class="mb-24 ">
        <FlexboxLayout verticalAlignment="middle" ref="habitCountRef" row="1" horizontalAlignment="center" height="50"
          width="50">
          <StackLayout class="rounded-2xl p-8" height="100%" width="100%" :backgroundColor="habit?.color">
          </StackLayout>
        </FlexboxLayout>
        <label :text="currentDayValue" verticalAlignment="middle" horizontalAlignment="center" class="text-2xl font-bold"
          :class="[currentDayValue === 0 ? 'text-black' : 'text-white']"></label>
      </GridLayout>

      <!-- HABIT BUTTONS -->
      <FlexboxLayout row="2" verticalAlignment="bottom" horizontalAlignment="center" class="mb-16 flex-col items-center">
        <StackLayout class="text-center" orientation="horizontal">
          <label text="Today" class="text-lg"></label>
          <Label :text="habit?.title.toLowerCase()" class="text-lg ml-1"></Label>
        </StackLayout>
        <FlexboxLayout class="bg-gray-200 rounded-2xl justify-between items-center mt-2" height="80" width="200">
          <Icon icon="add" @tap="add" width="50%"></Icon>
          <label class="border-r-2"></label>
          <Icon icon="remove" @tap="remove" width="50%"></Icon>
        </FlexboxLayout>
      </FlexboxLayout>
    </GridLayout>
  </Page>
</template>
