<template>
  <div>
    <nav-list-item
      icon="folder"
      :title="node.name"
      color="yellow-6"
      :count="node.posts.length"
      :indent="indent"
      @on-click="setFilter({ type: 'category', id: node._id })"
      :selected="filter.type === 'category' && filter.id === node._id"
    ></nav-list-item>
    <category-item
      v-for="child in node._child"
      :key="child._id"
      :node="child"
      :indent="indent + 1"
    ></category-item>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import NavListItem from "./NavListItem";
export default {
  name: "CategoryItem",
  props: {
    node: {
      type: Object
    },
    indent: {
      type: Number,
      default: 0
    }
  },
  components: {
    NavListItem
  },
  data() {
    return {};
  },
  computed: {
    ...mapState("ui", ["filter"])
  },
  methods: {
    ...mapMutations("ui", ["setFilter"])
  }
};
</script>
