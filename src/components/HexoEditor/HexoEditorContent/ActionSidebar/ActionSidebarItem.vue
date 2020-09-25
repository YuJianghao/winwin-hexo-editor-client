<template>
  <q-btn
    color="grey-8"
    flat
    dense
    stretch
    @click="$emit('on-click')"
    style="width:30px;height:30px"
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
      :anchor="vertical?'center right':'bottom middle'"
      :self="vertical?'center left':'top middle'"
    >
      {{tip}}
    </q-tooltip>
  </q-btn>
</template>
<script>
import { DirectionType } from '../types'
export default {
  name: 'ActionSidebarItem',
  props: ['icon', 'tip', 'direction'],
  computed: {
    vertical () {
      return this.direction === DirectionType.vertical
    }
  }
}
</script>
