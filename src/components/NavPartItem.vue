<template>
  <q-item class="item" clickable :class="{ 'bg-grey-9': selected }">
    <q-item-section side>
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
          class="text-grey-6"
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
