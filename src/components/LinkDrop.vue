<template>
  <div style="display:inline-block;padding:8px 0" class="drop-handler">
    {{ text }}
    <q-icon name="keyboard_arrow_down" />
    <slot />
  </div>
</template>

<script>
export default {
  name: "LinkDrop",
  props: ["text"],
  data() {
    return {};
  }
};
</script>
