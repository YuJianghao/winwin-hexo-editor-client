<template>
  <q-btn
    color="grey-8"
    dense
    flat
    stretch
    @click="$emit('on-click')"
  >
    <q-icon
      :name="icon"
      size="large"
      v-if="icon"
    />
    <slot />
    <q-tooltip
      v-if="tip"
      transition-hide="none"
      transition-show="none"
      anchor="center right"
      self="center left"
    >
      {{tip}}
    </q-tooltip>
  </q-btn>
</template>
<script>
export default {
  name: 'ActionSidebarItem',
  props: ['icon', 'tip']
}
</script>
