<template>
  <div
    class="col column"
    v-show="show"
    style=";flex:0 0 300px;border-right: 1px solid rgba(0, 0, 0, 0.12);"
  >
    <hexo-posts-list-bar></hexo-posts-list-bar>
    <q-scroll-area class="col">
      <q-list>
        <q-item v-if="empty">
          <q-item-section>
            <q-item-label>没有文章</q-item-label>
          </q-item-section>
        </q-item>
        <hexo-posts-list-item
          v-for="(item,key) in postsList"
          :key="key"
          :post="item"
          :selected="editorCoreData.post?item._id===editorCoreData.post._id:false"
          @on-left="onLeft"
          @on-right="onRight"
          @on-click="viewPostById"
          @on-context-menu="contextMenuPostIdCache=item._id"
        ></hexo-posts-list-item>
      </q-list>
    </q-scroll-area>
    <post-context-menu
      :id="contextMenuPostId"
      @on-before-hide="onCMBeforeHide"
      @on-before-show="onCMBeforeShow"
    ></post-context-menu>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import PostContextMenu from 'components/PostContextMenu'
import HexoPostsListBar from 'components/HexoPostsListBar'
import HexoPostsListItem from 'components/HexoPostsListItem'
export default {
  name: 'HexoPostsList',
  components: {
    PostContextMenu,
    HexoPostsListBar,
    HexoPostsListItem
  },
  data () {
    return {
      contextMenuPostId: '',
      contextMenuPostIdCache: ''
    }
  },
  computed: {
    show () {
      return !this.editorUi.full
    },
    postsList () {
      return this.editorSorterPostsList
    },
    empty () {
      return this.postsList.length === 0
    },
    // externals
    ...mapState({
      editorCoreData: state => state.editorCore.data,
      editorUi: state => state.editorUi
    }),
    ...mapGetters({
      editorSorterPostsList: 'editorSorter/postsList'
    })
  },
  methods: {
    onCMBeforeShow () {
      this.contextMenuPostId = this.contextMenuPostIdCache
      this.contextMenuPostIdCache = ''
    },
    onCMBeforeHide () {
      this.contextMenuPostId = ''
    },
    async viewPostById (_id) {
      this.$store.dispatch('viewPostById', { _id })
    },
    async editPostById (_id) {
      this.$store.dispatch('editPostById', { _id })
    },
    async deletePostById (_id) {
      this.$store.dispatch('deletePostById', { _id })
    },
    onLeft ({ reset, _id }) {
      this.editPostById(_id)
      this.finalize(reset, 1)
    },
    onRight ({ reset, _id }) {
      this.deletePostById(_id)
      this.finalize(reset, 1)
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
