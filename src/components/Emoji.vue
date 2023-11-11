<script lang="ts" setup>
import { useBottomSheet } from '@nativescript-community/ui-material-bottomsheet/vue3';
import { GridLayout, Screen, StackLayout } from '@nativescript/core';
import { computed, ref } from 'nativescript-vue';
import { emojiList } from "@/utils/emoji"

const emit = defineEmits<{
  (e: 'select', value: string): void
}>()

//https://gist.github.com/oliveratgithub/0bf11a9aff0d6da7b46f1490f86a71eb
const fullEmoji = ref(emojiList);
const q = ref("");
const emojiFilter = computed(() => q ? fullEmoji.value.filter(emoji => emoji.name.toLowerCase().includes(q.value.toLowerCase())) : fullEmoji);
const { closeBottomSheet } = useBottomSheet();

function onSelect(emoji: string) {
  emit("select", emoji);
  closeBottomSheet();
}
</script>

<template>
  <GridLayout class="bg rounded-t-3xl  p-2 pt-8 " :height="Screen.mainScreen.heightDIPs">
    <StackLayout>
      <CollectionView id="collectionView" ref="collectionViewRef" height="100%" :items="emojiFilter" rowHeight="50" colWidth="15%"
        class="android:mt-[80] ios:mt-[80] android:pb-[160] ios:pb-[300]">
        <template #default="{ item }">
          <StackLayout>
            <Label :text="item.emoji" class="text-3xl text-center" @tap="onSelect(item.emoji)"></Label>
          </StackLayout>
        </template>
      </CollectionView>
    </StackLayout>
    <TextField v-model="q" verticalAlignment="top" hint="🔎 Search" class="bg-secondary rounded-xl text-xl  p-4 mt-2 " width="100%"  :editable="true">
    </TextField>
  </GridLayout>
</template>

