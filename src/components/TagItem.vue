<template>
  <q-chip
    square
    clickable
    :class="classes"
    :ripple="false"
    size="xx-small"
    @click="setFilter({ type: 'tag', id: tag._id })"
  >
    <q-avatar
      :color="selected ? 'grey-6' : 'grey-9'"
      text-color="white"
      class="q-mr-xs"
      >{{ tag.posts.length }}</q-avatar
    >
    {{ tag.name }}
  </q-chip>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "TagItem",
  props: {
    tag: {
      type: Object
    },
    selected: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  },
  computed: {
    ...mapState("ui", ["filter"]),
    classes() {
      const classes = this.selected
        ? ["bg-grey-3"]
        : ["bg-grey-8", "text-grey-4"];
      return classes;
    }
  },
  methods: {
    ...mapMutations("ui", ["setFilter"])
  }
};
</script>
