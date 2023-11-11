<script lang="ts" setup>
import { Color, FlexboxLayout, GridLayout, StackLayout, View } from '@nativescript/core';
import { ref } from 'nativescript-vue';
import { Habit, Periodicity } from '~/types';
import { getRandomColor } from '~/utils';
import { UUID } from '~/utils';
import PeriodicityHabit from './PeriodicityHabit.vue';
import AddHabitSteps from './AddHabitSteps.vue';
import { ColorPicker } from "@/native/ColorPicker"
import { unrefView } from '@nativescript-use/vue';
import Emoji from './Emoji.vue';
import { useBottomSheet } from '@nativescript-community/ui-material-bottomsheet/vue3';
import { useHabitStore } from '~/stores/habitStore';
import { getTodayDayFormat } from '~/utils/dateUtils';
import { getTextColorBasedOnBG } from '~/utils/colorUtils';

const emit = defineEmits(["finish"]);
const addHabitRef = ref();
const step = ref(0);
const { addItem } = useHabitStore();
const { showBottomSheet } = useBottomSheet();

const habit = ref<Habit>({
  id: UUID(),
  title: "",
  periodicity: Periodicity.Day,
  color: getRandomColor(),
  icon: "🚀",
  week: [{ date: getTodayDayFormat(), value: 1 }],
})
const colorPicker = new ColorPicker((color: Color) => {
  habit.value.color = color.hex
})

function pickerColor() {
  colorPicker.open(new Color(habit.value.color));
}

function updatePeriodicity(periodicity: Periodicity) {
  habit.value.periodicity = periodicity;
}

function openEmojiSheet() {
  showBottomSheet(Emoji, {
    view: unrefView(addHabitRef),
    ignoreBottomSafeArea: true,
    ignoreKeyboardHeight: false,
    peekHeight: 600,
    trackingScrollView: "collectionView",
    transparent: true, on: {
      select(emoji: string) {
        habit.value.icon = emoji;
      }
    }
  })
}
function selectedIndexChanged(event: { newIndex: number }) {
  step.value = event.newIndex;
}


function change(index: number) {
  if (index >= 0 && index <= 4) {
    step.value = index;
  }
}

function addHabit() {
  addItem(habit.value);
  emit("finish");
}

function loaded(args: any) {
  setTimeout(() => {
    (args.object as View)._onCssStateChange();
  }, 200);
}
</script>

<template>
  <Page actionBarHidden="true" backgroundColor="transparent" iosOverflowSafeArea="false" height="250">
    <GridLayout iosOverflowSafeArea="false" class="w-full pt-1 " height="250" ref="addHabitRef"
      verticalAlignment="bottom">
      <StackLayout class="w-full bg ios:rounded-t-3xl android:rounded-t-3xl" height="250">
        <MDTabs @selectedIndexChanged="selectedIndexChanged" :selectedIndex="step" :swipeEnabled="false" class="mt-4">
          <MDTabContentItem @loaded="loaded">

            <StackLayout class="px-3 android:mt-3 ios:mt-8 ">
              <Label text="Habit title" class="text-3xl font-bold uber text-center"></Label>
              <TextField v-model="habit.title" class="bg-secondary rounded-xl text-xl p-2 mt-3 "></TextField>
            </StackLayout>
          </MDTabContentItem>
          <MDTabContentItem>
            <StackLayout class="text-center android:mt-3 ios:mt-8" verticalAlignment="top">
              <Label text="Icon" class="text-3xl uber"></Label>
              <Label :text="`${habit.icon}`" class="text-4xl mt-4 text-center" @tap="openEmojiSheet"></Label>
            </StackLayout>
          </MDTabContentItem>


          <MDTabContentItem>
            <StackLayout class="px-3 android:mt-3 ios:mt-8 text-center">
              <Label text="Color" class="text-3xl uber"></Label>
              <FlexboxLayout class="mt-4 justify-center">
                <Label :text="habit.icon" class="text-4xl rounded-full h-[80] w-[80] text-center " @tap="pickerColor"
                  :backgroundColor="habit.color"></Label>
              </FlexboxLayout>
            </StackLayout>
          </MDTabContentItem>
          <MDTabContentItem>
            <StackLayout class="px-3 android:mt-3 ios:mt-8 text-center">
              <Label text="Periodicity" class="text-3xl uber"></Label>
              <PeriodicityHabit :habit="habit" @update="updatePeriodicity" class="mt-2"></PeriodicityHabit>
            </StackLayout>
          </MDTabContentItem>
          <MDTabContentItem>
            <GridLayout>
              <FlexboxLayout class="px-3 android:mt-3 ios:mt-8 text-center justify-center items-center flex-col" verticalAlignment="top">
                <Label text="Finish 🎉" class="text-center text-3xl uber"></Label>
                <Label @tap="addHabit" text="Add" class="text-2xl text-center mt-6 rounded-full px-16 h-[40]"
                  :backgroundColor="habit.color" :color="getTextColorBasedOnBG(habit.color)"></Label>
              </FlexboxLayout>
            </GridLayout>
          </MDTabContentItem>
        </MDTabs>

      </StackLayout>
      <AddHabitSteps iosOverflowSafeArea="false" @change="change" :index="step" :color="habit.color" :icon="habit.icon"
        horizontalAlignment="center" verticalAlignment="bottom"></AddHabitSteps>
    </GridLayout>
  </Page>
</template>