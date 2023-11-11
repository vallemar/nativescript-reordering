<script lang="ts" setup>
import { touchAnimationIcon } from '~/utils/touchManagerUtils';


const props = defineProps({ icon: String })
</script>

<template>
  <Label :text="props.icon" class="m-icon-round text-center" :touchAnimation="touchAnimationIcon"></Label>
</template>
