<template>
  <q-item
    clickable
    v-ripple
    class="q-mr-md"
    @click="onClick"
  >
    <q-item-section>
      <q-item-label class="q-pl-sm">
        {{label}}
        <q-badge
          :label="badge"
          class="bg-grey-4 q-ml-sm"
        />
      </q-item-label>
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
    }
  }
}
</script>
