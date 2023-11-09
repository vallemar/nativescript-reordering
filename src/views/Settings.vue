<script lang="ts" setup>
import { unrefView, useDark } from '@nativescript-use/vue';
import { StackLayout, View } from '@nativescript/core';
import GlobalPage from '~/components/GlobalPage.vue';
import switchTheme from 'react-native-theme-switch-animation';
import "setimmediate"
import Icon from '~/components/Icon.vue';
import { ref } from 'nativescript-vue';

const isDark = useDark()
const pageRef = ref();

function onChageTheme(args: { object: View }) {
  const page = unrefView<View>(pageRef);
  if (page) {
    const position = args.object?.getLocationRelativeTo(page);
    switchTheme({
      switchThemeFunction: () => {
        isDark.value = !isDark.value;
      },
      animationConfig: {
        type: 'circular',
        duration: 700,
        startingPoint: {
          cy: position.y + args.object.getActualSize().height,
          cx: (position.x + (args.object.getActualSize().width / 2)),
        }
      },
    });
  }
}

</script>

<template>
  <GlobalPage ref="pageRef">
    <StackLayout class="p-3">
      <Label text="Settings" class="text-2xl mt-4 font-bold"></Label>
      <StackLayout class="bg-secondary rounded-xl p-2 mt-6">
        <FlexboxLayout class=" justify-between">
          <Label text="Theme" class="text-xl"></Label>
          <Icon :icon="isDark ? 'dark_mode' : 'light'" @tap="onChageTheme"></Icon>
        </FlexboxLayout>
      </StackLayout>
    </StackLayout>
  </GlobalPage>
</template>