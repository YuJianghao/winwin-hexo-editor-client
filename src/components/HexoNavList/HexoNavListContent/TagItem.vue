<template>
  <q-chip
    clickable
    square
    size="sm"
    :outline="!selected"
    :class="selected?'text-white bg-primary selected':'text-primary'"
    class="ellipsis"
    @click="$emit('click')"
    ref="label"
  >
    <q-avatar square>{{count}}</q-avatar>
    {{name.toUpperCase()}}
    <q-tooltip
      anchor="bottom middle"
      self="center middle"
      transition-show="none"
      transition-hide="none"
      v-if="isOverflow"
    >
      {{name.toUpperCase()}}
    </q-tooltip>
  </q-chip>
</template>
<script>
import { isOverflow } from 'src/utils/common'
export default {
  name: 'TagItem',
  props: {
    name: {
      type: String,
      required: true
    },
    count: {
      type: Number,
      required: true
    },
    selected: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      isOverflow: false
    }
  },
  mounted () {
    this.isOverflow = isOverflow(this.$refs.label.$el)
  },
  updated () {
    this.isOverflow = isOverflow(this.$refs.label.$el)
  }
}
</script>
