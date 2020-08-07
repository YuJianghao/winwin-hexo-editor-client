<template>
  <q-page
    class="row overflow-hidden"
    :style-fn="pageStyle"
  >
    <hexo-nav-list
      v-show="!editorUi.full"
      style="max-width:200px;max-height:100%"
      :categoriesList="categoriesList"
      :tagsList="tagsList"
      :postsCount="articlesCount"
      :unCategoriesCount="categoriesCount"
    ></hexo-nav-list>
    <div
      v-show="!editorUi.full"
      class="col column"
      style=";flex:0 0 300px;border-right: 1px solid rgba(0, 0, 0, 0.12);"
    >
      <hexo-posts-list-bar></hexo-posts-list-bar>
      <!-- :articleList="articleList.map(e=>e)" 是为了让prop更新 -->
      <hexo-article-list
        style="max-width:300px;max-height:100%"
        :selected="article?article._id:''"
        :articleList="articleList.map(e=>e)"
      ></hexo-article-list>
    </div>
    <div
      class="col column"
      v-if="show"
    >
      <hexo-editor-bar></hexo-editor-bar>
      <hexo-article-editor
        style="max-height:100%"
        :article="article"
        @on-update="onArticleUpdate"
        @on-save="$store.dispatch('savePost')"
      ></hexo-article-editor>
    </div>
    <hexo-post-viewer style="max-height:100%"></hexo-post-viewer>
    <hexo-welcome style="max-height:100%"></hexo-welcome>
    <q-inner-loading :showing="editorUi.loading.show">
      <q-spinner-gears
        size="50px"
        color="primary"
      />
    </q-inner-loading>
  </q-page>
</template>

<script>
import '../css/hexo.scss'

import HexoPostsListBar from 'components/HexoToolBar/HexoPostsListBar'
import HexoEditorBar from 'components/HexoToolBar/HexoEditorBar'

import HexoNavList from 'components/HexoNavList'
import HexoArticleList from 'components/HexoArticleList'
import HexoArticleEditor from 'components/HexoArticleEditor'
import HexoPostViewer from 'components/HexoPostViewer'
import HexoWelcome from 'components/HexoWelcome'

import { mapState, mapGetters } from 'vuex'

export default {
  name: 'Hexo',
  components: {
    HexoArticleList,
    HexoPostsListBar,
    HexoPostViewer,
    HexoNavList,
    HexoWelcome,
    HexoArticleEditor,
    HexoEditorBar
  },
  data () {
    return {
      editorData: '',
      full: false
    }
  },
  computed: {
    ...mapState({
      article: state => state.editorCore.data.article,
      editorUi: state => state.editorUi
    }),
    ...mapGetters({
      show: 'editorUi/editing',
      articleList: 'editorSorter/postsList',
      tagsList: 'editorCore/dataTagsList',
      articlesCount: 'editorCore/dataPostsCount',
      categoriesCount: 'editorCore/dataUnCategoriesCount',
      categoriesList: 'editorCore/dataCategoriesList'
    })
  },
  methods: {
    pageStyle (offset, height) {
      return 'height:' + (window.innerHeight - offset) + 'px'
    },
    onArticleUpdate (article) {
      this.$store.dispatch('setPostByPost', article)
    }
  },
  async mounted () {
    this.$store.dispatch('init')
  },
  created () {
    document.getElementById('app-message').innerHTML = '加载编辑器...'
  },
  async beforeDestory () {
    this.$store.dispatch('destroy')
  }
}
</script>
