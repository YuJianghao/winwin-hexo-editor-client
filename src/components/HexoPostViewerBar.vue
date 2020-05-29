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
export default {
  name: 'HexoPostViewerBar',
  data () {
    return {
      showCatsMenu: false,
      showTagsMenu: false
    }
  },
  computed: {
    isFullscreen () {
      return this.editorUi.full
    },
    categories () {
      return this.editorCoreDataPostCategoriesList
    },
    tags () {
      return this.editorCoreDataPostTagsList
    },
    published () {
      return this.editorCoreDataPostPublished
    },
    toolbarHeight () {
      return this.editorUi.actionbar.height
    },
    toolbarStyle () {
      return {
        height: this.toolbarHeight,
        'min-height': this.toolbarHeight,
        'border-bottom': '1px solid rgba(0, 0, 0, 0.12)'
      }
    },
    // externals
    ...mapState({
      editorUi: state => state.editorUi,
      editorSorter: state => state.editorSorter
    }),
    ...mapGetters({
      editorCoreDataPostTagsList: 'editorCore/dataPostTagsList',
      editorCoreDataPostCategoriesList: 'editorCore/dataPostCategoriesList',
      editorCoreDataPostPublished: 'editorCore/dataPostPublished'
    })
  },
  methods: {
    async editPostById () {
      this.$store.dispatch('editPostById')
    },
    async publishPostById () {
      this.$store.dispatch('publishPostById')
    },
    async unpublishPostById () {
      this.$store.dispatch('unpublishPostById')
    },
    async toggleFull () {
      this.$store.dispatch('toggleFull')
    },
    async deletePostById () {
      this.$store.dispatch('deletePostById')
    },
    onPublish () {
      this.editorCoreDataPostPublished ? this.unpublishPostById() : this.publishPostById()
    }
  }
}
</script>
