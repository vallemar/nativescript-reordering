<script lang="ts" setup>

const { size, color } = defineProps({ size: Number, color: String })

</script>

<template>
  <FlexboxLayout height="30" width="30" class="justify-center items-center">
    <StackLayout :height="size" :width="size" :backgroundColor="color" class="rounded-sm" />
  </FlexboxLayout>
</template>
