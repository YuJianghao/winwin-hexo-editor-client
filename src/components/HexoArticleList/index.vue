<template>
  <q-scroll-area
    class="col"
    v-if="articleList"
  >
    <q-list>
      <q-item v-if="empty">
        <q-item-section>
          <q-item-label>没有文章</q-item-label>
        </q-item-section>
      </q-item>
      <list-item
        v-for="(item,key) in articleList"
        :key="key"
        :post="item"
        :selected="item._id===selected"
        @on-left="onLeft"
        @on-right="onRight"
        @on-click="onClick"
        @on-context-menu="contextMenuPostId=item._id"
      ></list-item>
    </q-list>
    <list-item-context-menu :id="contextMenuPostId"></list-item-context-menu>
  </q-scroll-area>
  <div v-else>
    Internal Error: articleList is required
  </div>
</template>

<script>
import ListItemContextMenu from './ListItemContextMenu'
import ListItem from './ListItem'
export default {
  name: 'HexoPostsList',
  props: {
    articleList: {
      type: Array,
      default: () => []
    },
    selected: {
      type: String,
      default: ''
    }
  },
  components: {
    ListItemContextMenu,
    ListItem
  },
  data () {
    return {
      contextMenuPostId: ''
    }
  },
  computed: {
    empty () {
      return this.articleList.length === 0
    }
  },
  methods: {
    onLeft ({ reset, _id }) {
      this.$emit('on-item-left', _id)
      this.finalize(reset, 1)
    },
    onRight ({ reset, _id }) {
      this.$emit('on-item-right', _id)
      this.finalize(reset, 1)
    },
    onClick (_id) {
      this.$emit('on-item-click', _id)
    },
    finalize (reset, duration) {
      this.timer = setTimeout(() => {
        reset()
      }, duration || 1000)
    }
  },
  beforeDestroy () {
    clearTimeout(this.timer)
  }
}
</script>
