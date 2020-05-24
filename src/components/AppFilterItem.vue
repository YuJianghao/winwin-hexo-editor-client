<template>
  <q-item
    clickable
    v-ripple
    @click="onClick"
    :class="{'text-primary':selected,'bg-blue-1':selected}"
  >
    <q-item-section>
      <q-item-label class="q-pl-sm">
        {{label}}
      </q-item-label>
    </q-item-section>
    <q-item-section avatar>
        <q-badge
          :label="badge"
          class="bg-blue-7 q-ml-sm"
        />
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  name: 'AppFilterItem',
  data () {
    return {}
  },
  props: {
    label: {
      type: String,
      required: true
    },
    badge: { },
    icon: {
      type: String
    },
    onClick: {
      type: Function
    },
    selected: {
      type: Boolean,
      default: false
    }
  }
}
</script>
