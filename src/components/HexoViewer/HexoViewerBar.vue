<template>
  <div class="row" style="max-height:35px;flex-wrap: nowrap" v-if="article">
    <q-btn
      flat
      stretch
      color="primary"
      :icon="isFullscreen?'fullscreen_exit':'fullscreen'"
      @click="toggleFull"
    >
      <q-tooltip
        content-style="font-size: 14px"
        transition-show="none"
        transition-hide="none"
        anchor="bottom middle"
        self="center middle"
      >
        {{isFullscreen?'退出网页全屏':'网页全屏'}}
      </q-tooltip>
    </q-btn>
    <q-btn
      flat
      stretch
      :icon="published?'close':'publish'"
      :color="published?'red':'primary'"
      @click="onPublish"
    >
      <q-tooltip
        content-style="font-size: 14px"
        transition-show="none"
        transition-hide="none"
        anchor="bottom middle"
        self="center middle"
      >
        {{published?'取消发布':'发布'}}
      </q-tooltip>
    </q-btn>
    <q-btn
      flat
      stretch
      color="red"
      icon="delete"
      @click="deletePostById"
    >
      <q-tooltip
        content-style="font-size: 14px"
        transition-show="none"
        transition-hide="none"
        anchor="bottom middle"
        self="center middle"
      >删除
      </q-tooltip>
    </q-btn>
    <q-btn
      stretch
      flat
      @click="editPostById"
    >
      <span style="white-space:nowrap">
        分类：
        {{categories.length?'':'无'}}
        <q-badge
          v-for="(item,key) in categories"
          :key="key"
          color="primary"
          text-color="white"
          :label="item"
        />
      </span>
    </q-btn>
    <q-btn
      stretch
      flat
      @click="editPostById"
    >
      <span style="white-space:nowrap">
        标签：
        {{tags.length?'':'无'}}
        <q-badge
          v-for="(item,key) in tags"
          :key="key"
          color="primary"
          text-color="white"
          :label="item"
        />
      </span>
    </q-btn>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import * as actionTypes from 'src/store/dispatcher/action-types'
export default {
  name: 'HexoPostViewerBar',
  computed: {
    toolbarStyle () {
      return {
        height: '35px',
        'min-height': '35px',
        'min-width': '100%'
      }
    },
    // externals
    ...mapState({
      article: state => state.hexoCore.data.article,
      published: state => state.hexoCore.data.article.published,
      isFullscreen: state => state.hexoUi.full
    }),
    ...mapGetters({
      tags: 'hexoCore/dataPostTagsList',
      categories: 'hexoCore/dataPostCategoriesList'
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
