<script lang="ts" setup>
import { StackLayout } from '@nativescript/core';
import Icon from './Icon.vue';
import { $navigateTo } from 'nativescript-vue';
import Settings from '~/views/Settings.vue';
import { usePopover } from '~/composables/usePopover';

const { close } = usePopover();

const menu = [
  {
    title: "Setting", icon: "settings", onTap: () => {
      close()
      $navigateTo(Settings)
    }
  },
  /*   { title: "Upgrade to Premium", icon: "workspace_premium" },
    { title: "Change App Icon", icon: "crop_square", class: "mt-[2]" },
    { title: "Share the App", icon: "ios_share", class: "mt-2" },
    { title: "Rate the App", icon: "star", class: "mt-[2]" },
    { title: "Send Feedback", icon: "chat_bubble", class: "mt-[2]" },
    { title: "Privacy Policy", icon: "lock", class: "mt-2" },
    { title: "Terms of Use", icon: "description", class: "mt-[2]" }, */
]


</script>

<template>
  <StackLayout class="bg-secondary android:rounded-2xl">
    <FlexboxLayout class="justify-between bg-secondary px-3 py-2" v-for="item, index in menu" :key="index"
      :class="[index == 0 ? 'android:rounded-2xl pt-2' : index == menu.length - 1 ? 'android:rounded-b-2xl pb-2' : '', item.class]"
      @tap="item.onTap">
      <Label :text="item.title" class="text-xl mr-3" />
      <Icon :icon="item.icon" fontSize="28"></Icon>
    </FlexboxLayout>
  </StackLayout>
</template>
