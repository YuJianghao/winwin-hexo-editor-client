<template>
  <div
    class="col"
    v-show="!uiState.full"
  >
    <q-scroll-area
      class="full-height"
      style="border-right: 1px solid rgba(0, 0, 0, 0.12);"
    >
      <q-list>
        <q-item v-if="state.empty">
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
          @click="viewPostById(item._id)"
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
import { editorUiStore } from '../stores/editorUiStore'
export default {
  name: 'HexoPostsList',
  data () {
    return {
      state: hexoEditorCore.state,
      uiState: editorUiStore.state
    }
  },
  methods: {
    async viewPostById (_id) {
      await hexoEditorCore.loadPostById(_id, true)
      await editorUiStore.viewPost()
    },
    async editPostById (_id) {
      await hexoEditorCore.loadPostById(_id, true)
      await editorUiStore.editPost()
    },
    async deletePostById (_id) {
      try {
        await editorUiStore.deletePost(_id)
        await hexoEditorCore.deletePostById(_id)
      } catch (err) {
        if (hexoEditorCore.state.post) { await editorUiStore.viewPost() }
      }
    },
    getDateString (d) {
      return date.formatDate(d, 'YYYY年MM月DD日 HH:mm:ss')
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
