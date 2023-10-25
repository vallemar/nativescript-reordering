<script lang="ts" setup>
  import { StackLayout } from "@nativescript/core";
  import Icon from "./Icon.vue";

  type MenuItem = {
    title: string;
    icon: string;
    class?: string;
    variant?: "info" | "danger" | "warning";
  };

  const menu: MenuItem[] = [
    { title: "Upgrade to Premium", icon: "workspace_premium" },
    { title: "Change App Icon", icon: "crop_square", class: "mt-[2]" },
    { title: "Share the App", icon: "ios_share", class: "mt-2" },
    { title: "Rate the App", icon: "star", class: "mt-[2]", variant: "info" },
    {
      title: "Send Feedback",
      icon: "chat_bubble",
      class: "mt-[2]",
      variant: "warning"
    },
    { title: "Privacy Policy", icon: "lock", class: "mt-2", variant: "danger" },
    {
      title: "Terms of Use",
      icon: "description",
      class: "mt-[2]",
      variant: "danger"
    }
  ];

  const hasVariant = (item: MenuItem) =>
    typeof item.variant === "string" && item.variant.length;

  const menuItemClasses = (item: MenuItem, index: number) => {
    return {
      "justify-between bg-white px-3 py-2": true,
      "bg-white": !hasVariant(item),
      "android:rounded-t-2xl pt-2": index == 0,
      "android:rounded-b-2xl pb-2": index == menu.length - 1,
      [item.class || ""]: !!item.class,
      "bg-red-50": item.variant === "danger",
      "bg-blue-50": item.variant === "info",
      "bg-orange-50": item.variant === "warning"
    };
  };

  const iconColor = (item: MenuItem) => {
    switch (item.variant) {
      case "info":
        return "text-blue-600";
      case "warning":
        return "text-orange-600";
      case "danger":
        return "text-red-600";

      default:
        return undefined;
    }
  };
</script>

<template>
  <StackLayout class="bg-gray-200 android:rounded-2xl">
    <FlexboxLayout
      v-for="(item, index) in menu"
      :key="index"
      :class="menuItemClasses(item, index)"
    >
      <Label :text="item.title" class="text-xl mr-3" />
      <Icon :icon="item.icon" :color="iconColor(item)" fontSize="28"></Icon>
    </FlexboxLayout>
  </StackLayout>
</template>
