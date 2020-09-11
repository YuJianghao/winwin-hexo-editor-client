<template>
  <div class="fit column relative-position">
    <q-scroll-area
      class="col full-width bg-grey-2"
      style="flex:0 0 36px;border-bottom:1px solid rgba(0, 0, 0, 0.12)"
      :thumb-style="{right: '4px', height: '3px', opacity: 0.1}"
      horizontal
      v-if="scroll"
    >
      <q-toolbar
        class="q-px-none overflow-hidden"
        :style="toolbarStyle"
      >
        <slot name="bar" />
      </q-toolbar>
    </q-scroll-area>
    <div
      v-else
      class="col full-width bg-grey-2"
      style="flex:0 0 36px;border-bottom:1px solid rgba(0, 0, 0, 0.12)"
      :thumb-style="{right: '4px', height: '3px', opacity: 0.1}"
      horizontal
    >
      <q-toolbar
        class="q-px-none overflow-hidden"
        :style="toolbarStyle"
      >
        <slot name="bar" />
      </q-toolbar>
    </div>
    <div
      class="col"
      style="max-height:100%"
    >
      <slot name="content" />
    </div>
    <slot/>
  </div>
</template>

<script>
export default {
  name: 'BarContentLayout',
  props: {
    scroll: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    toolbarStyle () {
      return {
        height: '35px',
        'min-height': '35px',
        'min-width': '100%'
      }
    }
  }
}
</script>
