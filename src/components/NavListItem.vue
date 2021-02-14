<template>
  <q-item
    class="item"
    clickable
    :class="{ selected }"
    @click="e => $emit('on-click', e)"
    style="min-height: 28px"
  >
    <q-item-section side style="padding-right: 8px">
      <q-icon
        :color="color"
        :name="icon"
        size="18px"
        :style="`margin-left:${indent * 16}px`"
      />
    </q-item-section>
    <q-item-section>
      <q-item-label class="ellipsis">
        <span>{{ title }}</span>
        <div
          class="count"
          style="font-size:smaller;display:inline-block;margin-left:4px"
        >
          {{ count }}
        </div>
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  name: "NavPartItem",
  props: {
    icon: {
      type: String,
      required: true
    },
    color: {
      type: String
    },
    title: {
      type: String,
      required: true
    },
    count: {
      type: Number,
      required: false
    },
    indent: {
      type: Number,
      default: 0
    },
    selected: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  }
};
</script>
