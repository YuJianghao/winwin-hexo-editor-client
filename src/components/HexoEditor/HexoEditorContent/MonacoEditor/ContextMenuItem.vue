<template>
  <q-item
    style="font-size:small"
    clickable
    @click="$emit('on-click')"
  >
    <q-item-section>
      <q-item-label class="ellipsis">
        {{name}}
      </q-item-label>
    </q-item-section>
    <q-item-section class="text-right">
      <q-item-label :style="$q.platform.is.mac?'letter-spacing:2px':''">
       {{keybind}}
      </q-item-label>
    </q-item-section>
  </q-item>
</template>
<script>
export default {
  name: 'HelperItem',
  props: ['name', 'keybind']
}
</script>
