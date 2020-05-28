<template>
  <div
    class="col"
    v-show="show"
    style=";flex:0 0 300px;"
  >
    <q-scroll-area
      class="full-height"
      style="border-right: 1px solid rgba(0, 0, 0, 0.12);"
    >
      <q-list>
        <q-item v-if="empty">
          <q-item-section>
            <q-item-label>没有文章</q-item-label>
          </q-item-section>
        </q-item>
        <q-slide-item
          v-for="(item,key) in postsList"
          left-color="blue"
          right-color="red"
          :key="key"
          @right="(e)=>{onRight(e,item._id)}"
          @left="(e)=>{onLeft(e,item._id)}"
          @click="viewPostById(item._id)"
          @contextmenu="contextMenuPostIdCache=item._id"
        >
          <template v-slot:left>
            <div class="row items-center">
              <q-icon
                left
                name="edit"
              /> 编辑
            </div>
          </template>
          <template v-slot:right>
            <div class="row items-center">
              删除
              <q-icon
                right
                name="delete"
              />
            </div>
          </template>
          <q-item
            clickable
            v-ripple
          >
            <q-item-section>
              <q-item-label>
                {{item.title}}
                <q-badge
                  color="grey"
                  v-if="!item.published"
                >草稿</q-badge>
              </q-item-label>
              <q-item-label
                caption
                lines="2"
                v-if="item.date"
              >{{getDateString(item.date)}}</q-item-label>
            </q-item-section>
            <q-item-section
              side
              top
            >
              <q-item-label caption>
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-slide-item>
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
import { getDatetimeStringDefault } from 'src/utils/post'
import { mapState, mapGetters } from 'vuex'
import PostContextMenu from 'components/PostContextMenu.vue'
export default {
  name: 'HexoPostsList',
  components: {
    PostContextMenu
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
    getDateString (d) {
      return getDatetimeStringDefault(d)
    },
    onLeft ({ reset }, _id) {
      this.editPostById(_id)
      this.finalize(reset, 1)
    },
    onRight ({ reset }, _id) {
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
