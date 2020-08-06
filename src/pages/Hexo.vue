<template>
  <q-page
    class="row overflow-hidden"
    :style-fn="pageStyle"
  >
    <hexo-nav-list
      v-show="!editorUi.full"
      style="max-width:200px;max-height:100%"
      :categoriesList="editorCoreDataCategoriesList"
      :tagsList="editorCoreDataTagsList"
      :postsCount="editorCoreDataPostsCount"
      :unCategoriesCount="editorCoreDataUnCategoriesCount"
    ></hexo-nav-list>
    <div
      v-show="!editorUi.full"
      class="col column"
      style=";flex:0 0 300px;border-right: 1px solid rgba(0, 0, 0, 0.12);"
    >
      <hexo-posts-list-bar></hexo-posts-list-bar>
      <hexo-article-list
        style="max-width:300px;max-height:100%"
        :selected="editorCoreData.post?editorCoreData.post._id:''"
        :articleList="editorSorterPostsList"
        @on-item-click="viewPostById"
        @on-item-left="editPostById"
        @on-item-right="deletePostById"
      ></hexo-article-list>
    </div>
    <div
      class="col column"
      v-if="show"
    >
      <hexo-editor-bar></hexo-editor-bar>
      <hexo-article-editor
        style="max-height:100%"
        :article="editorCoreData.post"
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
import HexoArticleList from '../components/HexoArticleList'
import HexoPostsListBar from 'components/HexoPostsListBar'
import HexoPostViewer from '../components/HexoPostViewer'
import HexoNavList from '../components/HexoNavList'
import HexoWelcome from '../components/HexoWelcome'
import HexoArticleEditor from '../components/HexoArticleEditor'
import HexoEditorBar from 'components/HexoEditorBar'
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
    show () {
      return this.editorUiEditing
    },
    ...mapState({
      editorCoreData: state => state.editorCore.data,
      editorUi: state => state.editorUi
    }),
    ...mapGetters({
      editorUiEditing: 'editorUi/editing',
      editorSorterPostsList: 'editorSorter/postsList',
      editorCoreDataTagsList: 'editorCore/dataTagsList',
      editorCoreDataPostsCount: 'editorCore/dataPostsCount',
      editorCoreDataUnCategoriesCount: 'editorCore/dataUnCategoriesCount',
      editorCoreDataCategoriesList: 'editorCore/dataCategoriesList'
    })
  },
  methods: {
    pageStyle (offset, height) {
      return 'height:' + (window.innerHeight - offset) + 'px'
    },
    onArticleUpdate (article) {
      this.$store.dispatch('setPostByPost', article)
    },
    viewPostById (_id) {
      console.log(_id)
      this.$store.dispatch('viewPostById', { _id })
    },
    editPostById (_id) {
      this.$store.dispatch('editPostById', { _id })
    },
    deletePostById (_id) {
      this.$store.dispatch('deletePostById', { _id })
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
