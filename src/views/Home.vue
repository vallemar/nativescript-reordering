<script lang="ts" setup>
import { Color, View } from '@nativescript/core';
import { ref } from "nativescript-vue";
import Icon from '@/components/Icon.vue';
import Menu from '@/components/Menu.vue';
import ItemWeek from '@/components/ItemWeek.vue';
import Overlay from '@/components/Overlay.vue';
import Habit from '@/views/Habit.vue';
import { useHabitStore } from '@/stores/habitStore';
import { usePopover } from '~/usePopover';
import { HorizontalPosition } from "@nativescript-community/ui-popover"
import { Periodicity } from '~/types';
import type { CollectionView } from '@nativescript-community/ui-collectionview';

const collectionViewRef = ref();
const { habits, updateIndex } = useHabitStore();

const { isPresented: isPresentedMenu, open: openMenu } = usePopover(Menu, {
  horizPos: HorizontalPosition.ALIGN_LEFT
});

function onItemReordered(e: any) {
  const view = (e.view as View);
  view.opacity = 1;
  view.backgroundColor = new Color("white");
  updateIndex();
}

function onItemReorderStarting(e: any) {
  const view = (e.view as View);
  view.opacity = 0.7;
  view.backgroundColor = new Color("#2020201e");
}
</script>

<template>
  <Frame>
    <Page actionBarHidden="true" androidStatusBarBackground="white">
      <GridLayout>
        <StackLayout>
          <!-- HEADER -->
          <FlexboxLayout class="justify-between mx-2">
            <Icon icon="more_horiz" @tap="(event) => openMenu(event.object)"></Icon>
            <Icon icon="add"></Icon>
          </FlexboxLayout>

          <!-- HEADER weekdays -->
          <GridLayout columns="*,  155" height="70" class="mx-2">
            <Label text="Habits" class="font-bold text-2xl"></Label>
            <GridLayout paddingRight="5" col="2" horizontalAlignment="right" columns="30,30,30,30,30">
              <Label class="text-gray-400 text-right" text="So"></Label>
              <Label col="1" class="text-gray-400 text-right" text="Mo"></Label>
              <Label col="2" class="text-gray-400 text-right" text="Tu"></Label>
              <Label col="3" class="text-gray-400 text-right" text="We"></Label>
              <Label col="4" class="text-gray-400 text-right" text="Th"></Label>
            </GridLayout>
          </GridLayout>

          <!-- ITEM LIST -->
          <CollectionView ref="collectionViewRef" height="100%" :items="habits" rowHeight="100" reorderEnabled
            @itemReorderStarting="onItemReorderStarting" @itemReordered="onItemReordered" :reorderLongPressEnabled="true">
            <template #default="{ item }">
              <StackLayout class="mx-2 rounded-2xl" @tap="$navigateTo(Habit, { props: { id: item.id } })">
                <GridLayout paddingLeft="5" columns="68, *, 155" class="rounded-2xl">
                  <Label :text="item.icon" :backgroundColor="item.color" class="rounded-full text-center text-4xl"
                    height="68" width="68" />
                  <FlexboxLayout col="1" class="ml-2 flex-col justify-center">
                    <Label :text="item.title" class="font-bold text-base" />
                    <Label :text="item.periodicity === Periodicity.Day ? 'Every day' : 'Every Week'"
                      class="text-gray-400 text-base mt-1" />
                  </FlexboxLayout>
                  <GridLayout paddingRight="5" col="2" horizontalAlignment="right" columns="30,30,30,30,30">
                    <ItemWeek :size="item.normalizedWeek[0]" :color="item.color"></ItemWeek>
                    <ItemWeek col="1" :size="item.normalizedWeek[1]" :color="item.color"></ItemWeek>
                    <ItemWeek col="2" :size="item.normalizedWeek[2]" :color="item.color"></ItemWeek>
                    <ItemWeek col="3" :size="item.normalizedWeek[3]" :color="item.color"></ItemWeek>
                    <ItemWeek col="4" :size="item.normalizedWeek[4]" :color="item.color"></ItemWeek>
                  </GridLayout>
                </GridLayout>
              </StackLayout>
            </template>
          </CollectionView>
        </StackLayout>
        <Overlay :show="isPresentedMenu"></Overlay>
      </GridLayout>
    </Page>
  </Frame>
</template>
