<template>
  <div>
    <q-list
      v-for="node in nodes"
      :key="node[node_key]"
      dense
    >
      <category-item
        :_id="node[node_key]"
        :label="node[label_key]"
        :badge="node.length"
        :isParent="!!node[children_key]"
        :level="level"
        :selected="selected===node[node_key]"
        @on-click="e=>$emit('on-click',e)"
        @on-toggle="onToggle"
      ></category-item>
      <category-tree
        v-if="node[children_key]"
        :key="node[node_key]"
        :nodes="node[children_key]"
        :node_key="node_key"
        :children_key="children_key"
        :label_key="label_key"
        :level="level+1"
        :style="contentStyle"
        :selected="selected"
        @on-click="e=>$emit('on-click',e)"
      ></category-tree>
    </q-list>
  </div>
</template>

<script>
import CategoryItem from 'components/HexoNavList/CategoryItem'
export default {
  name: 'CategoryTree',
  components: {
    CategoryItem
  },
  props: {
    nodes: {
      type: Array,
      default () {
        return []
      }
    },
    node_key: {
      type: String,
      required: true
    },
    label_key: {
      type: String,
      default: 'label'
    },
    children_key: {
      type: String,
      default: 'children'
    },
    level: {
      type: Number,
      default: 0
    },
    selected: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      expand: true,
      contentStyle () {
        return {}
      },
      duration: 500
    }
  },
  methods: {
    async onToggle () {
      // TODO: 实现展开动画
    }
  }
}
</script>
