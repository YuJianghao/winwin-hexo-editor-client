<template>
  <q-toolbar
    class="bg-grey-2 q-px-none"
    :style="toolbarStyle"
  >
    <q-btn
      flat
      stretch
      color="primary"
      :icon="isFullscreen?'fullscreen_exit':'fullscreen'"
      @click="toggleFull"
    ></q-btn>
    <q-btn
      flat
      stretch
      :icon="published?'close':'publish'"
      :color="published?'red':'primary'"
      :label="published?'取消发布':'发布'"
      @click="onPublish"
    />
    <q-btn
      flat
      stretch
      color="red"
      icon="delete"
      label="删除"
      @click="deletePostById"
    />
    <q-btn
      stretch
      flat
      @click="editPostById"
    >
      分类：
      {{categories.length?'':'无'}}
      <q-badge
        v-for="(item,key) in categories"
        :key="key"
        color="primary"
        text-color="white"
        :label="item"
      />
    </q-btn>
    <q-btn
      stretch
      flat
      @click="editPostById"
    >
      标签：
      {{tags.length?'':'无'}}
      <q-badge
        v-for="(item,key) in tags"
        :key="key"
        color="primary"
        text-color="white"
        :label="item"
      />
    </q-btn>
  </q-toolbar>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import * as actionTypes from 'src/store/dispatcher/action-types'
export default {
  name: 'HexoPostViewerBar',
  computed: {
    toolbarStyle () {
      return {
        height: '36px',
        'min-height': '36px',
        'border-bottom': '1px solid rgba(0, 0, 0, 0.12)'
      }
    },
    // externals
    ...mapState({
      published: state => state.editorCore.data.article.published,
      isFullscreen: state => state.editorUi.full
    }),
    ...mapGetters({
      tags: 'editorCore/dataPostTagsList',
      categories: 'editorCore/dataPostCategoriesList'
    })
  },
  methods: {
    async editPostById () {
      this.$store.dispatch(actionTypes.editPostById)
    },
    async publishPostById () {
      this.$store.dispatch(actionTypes.publishPostById)
    },
    async unpublishPostById () {
      this.$store.dispatch(actionTypes.unpublishPostById)
    },
    async toggleFull () {
      this.$store.dispatch(actionTypes.toggleFull)
    },
    async deletePostById () {
      this.$store.dispatch(actionTypes.deletePostById)
    },
    onPublish () {
      this.published ? this.unpublishPostById() : this.publishPostById()
    }
  }
}
</script>
