<template>
  <q-item
    clickable
    v-ripple
    @click="$emit('on-click',_id)"
    @dblclick="$emit('on-toggle')"
    :class="{'text-primary':selected,'bg-blue-1':selected}"
    :style="style"
  >
    <q-tooltip
      anchor="bottom middle"
      self="center middle"
      transition-show="none"
      transition-hide="none"
      v-if="isOverflow"
    >
      {{label}}
    </q-tooltip>
    <q-item-section>
      <q-item-label
        class="ellipsis"
        ref="label"
      >
        <q-icon :name="isParent?'arrow_right':''" />
        {{label}}
      </q-item-label>
    </q-item-section>
    <q-item-section avatar>
      <q-badge
        :label="badge"
        class="bg-blue-7"
      />
    </q-item-section>
  </q-item>
</template>

<script>
import bus from 'src/utils/bus'
import { isOverflow } from 'src/utils/common'
export default {
  name: 'CategoryItem',
  data () {
    return {
      isOverflow: false
    }
  },
  props: {
    _id: {
      type: String
    },
    label: {
      type: String,
      required: true
    },
    badge: {},
    icon: {
      type: String
    },
    selected: {
      type: Boolean,
      default: false
    },
    isParent: {
      type: Boolean,
      default: false
    },
    level: {
      type: Number,
      default: 0
    }
  },
  computed: {
    style () {
      return {
        'padding-left': 8 + this.level * 12 + 'px'
      }
    }
  },
  methods: {
    updateOverflow () {
      try {
        this.isOverflow = isOverflow(this.$refs.label.$el)
      } catch (e) {
        console.log(e)
        this.isOverflow = true
      }
    }
  },
  mounted () {
    bus.$on('on-navlisttab-resize', this.updateOverflow)
  }
}
</script>
