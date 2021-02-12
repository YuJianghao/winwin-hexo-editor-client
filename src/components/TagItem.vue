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
      :color="dark ? 'grey-9' : 'grey-5'"
      :text-color="dark ? 'white' : 'black'"
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
    dark() {
      return this.$q.dark.isActive;
    },
    classes() {
      const classes = this.selected
        ? this.dark
          ? ["bg-grey-3", "text-grey-9"]
          : ["bg-grey-9", "text-grey-3"]
        : this.dark
        ? ["bg-grey-8", "text-grey-4"]
        : ["bg-grey-4", "text-grey-8"];
      return classes;
    }
  },
  methods: {
    ...mapMutations("ui", ["setFilter"])
  }
};
</script>
