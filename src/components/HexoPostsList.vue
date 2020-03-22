<template>
  <div
    class="col"
    v-show="!full"
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
          v-for="(item,key) in state.filteredPostsList"
          left-color="blue"
          right-color="red"
          :key="key"
          @right="(e)=>{onRight(e,item._id)}"
          @left="(e)=>{onLeft(e,item._id)}"
          @click="viewPost(item._id,true)"
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
  </div>
</template>

<script>
import { date } from 'quasar'
import { hexoEditorCore } from '../stores/editorStore'
import { mapState, mapActions, mapGetters } from 'vuex'
export default {
  name: 'HexoPostsList',
  data () {
    return {
      state: hexoEditorCore.state
    }
  },
  computed: {
    ...mapState({
      posts: state => {
        const posts = state.hexo.posts
        return Object.keys(posts).map(key => posts[key])
      },
      full: state => state.hexo.full,
      empty: state => !Object.keys(state.hexo.posts).length
    }),
    ...mapGetters({
      filteredPosts: 'hexo/filteredPosts'
    })
  },
  methods: {
    ...mapActions({
      deletePost: 'hexo/deletePost',
      viewPost: 'hexo/viewPost',
      editPost: 'hexo/editPost'
    }),
    getDateString (d) {
      return date.formatDate(d, 'YYYY年MM月DD日 HH:mm:ss')
    },
    onLeft ({ reset }, _id) {
      this.editPost(_id)
      this.finalize(reset, 1)
    },
    onRight ({ reset }, _id) {
      this.deletePost(_id)
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
