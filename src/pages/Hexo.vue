<template>
  <hexo-layout>
    <template slot="nav-list">
      <hexo-nav-list
        v-show="!editorUi.full"
        :categoriesList="categoriesList"
        :tagsList="tagsList"
        :postsCount="articlesCount"
        :unCategoriesCount="categoriesCount"
      ></hexo-nav-list>
    </template>
    <template slot="article-list">
      <hexo-posts-list-bar></hexo-posts-list-bar>
      <hexo-article-list style="max-width:300px;max-height:100%"></hexo-article-list>
    </template>
    <template slot="editor">
      <hexo-editor-bar></hexo-editor-bar>
      <hexo-article-editor
        style="max-height:100%"
        :article="article"
        @on-update="onArticleUpdate"
        @on-save="onSave"
      ></hexo-article-editor>
    </template>
    <template slot="viewer">
      <hexo-post-viewer style="max-height:100%"></hexo-post-viewer>
    </template>
    <template slot="welcome">
      <hexo-welcome style="max-height:100%"></hexo-welcome>
    </template>
  </hexo-layout>
</template>

<script>
import '../css/hexo.scss'

import HexoLayout from 'layouts/HexoLayout'

import HexoPostsListBar from 'components/HexoToolBar/HexoPostsListBar'
import HexoEditorBar from 'components/HexoToolBar/HexoEditorBar'

import HexoNavList from 'components/HexoNavList'
import HexoArticleList from 'components/HexoArticleList'
import HexoArticleEditor from 'components/HexoArticleEditor'
import HexoPostViewer from 'components/HexoPostViewer'
import HexoWelcome from 'components/HexoWelcome'

import { mapState, mapGetters } from 'vuex'

import * as actionTypes from 'src/store/dispatcher/action-types'

export default {
  name: 'Hexo',
  components: {
    HexoLayout,
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
      this.$store.dispatch(actionTypes.setPostByPost, article)
    },
    onSave () {
      this.$store.dispatch(actionTypes.savePost)
    }
  },
  async mounted () {
    this.$store.dispatch(actionTypes.init)
  },
  created () {
    document.getElementById('app-message').innerHTML = '加载编辑器...'
  },
  async beforeDestory () {
    this.$store.dispatch(actionTypes.destroy)
  }
}
</script>
