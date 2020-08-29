<template>
  <hexo-layout>
    <bar-content-layout
      :scroll="false"
      slot="nav-list"
    >
      <hexo-nav-list-bar slot="bar"></hexo-nav-list-bar>
      <hexo-nav-list-content
        slot="content"
        :categoriesList="categoriesList"
        :tagsList="tagsList"
        :postsCount="articlesCount"
        :unCategoriesCount="categoriesCount"
      ></hexo-nav-list-content>
    </bar-content-layout>
    <bar-content-layout
      :scroll="false"
      slot="article-list"
    >
      <hexo-article-list-bar slot="bar"></hexo-article-list-bar>
      <hexo-article-list-content slot="content"></hexo-article-list-content>
    </bar-content-layout>
    <bar-content-layout slot="editor">
      <hexo-editor-bar slot="bar"></hexo-editor-bar>
      <hexo-editor-content
        slot="content"
        :article="article"
        @on-update="onArticleUpdate"
        @on-save="onSave"
      ></hexo-editor-content>
    </bar-content-layout>
    <bar-content-layout slot="viewer">
      <hexo-viewer-bar slot="bar"></hexo-viewer-bar>
      <hexo-viewer-content slot="content"></hexo-viewer-content>
    </bar-content-layout>
    <template slot="welcome">
      <hexo-welcome></hexo-welcome>
    </template>
    <template slot="loading">
      <hexo-loading></hexo-loading>
    </template>
  </hexo-layout>
</template>

<script>
import '../css/hexo.scss'

import HexoLayout from 'layouts/HexoLayout'
import BarContentLayout from 'layouts/BarContentLayout'

import { HexoNavListBar, HexoNavListContent } from 'components/HexoNavList'
import { HexoEditorBar, HexoEditorContent } from 'components/HexoEditor'
import { HexoViewerBar, HexoViewerContent } from 'components/HexoViewer'
import { HexoArticleListBar, HexoArticleListContent } from 'components/HexoArticleList'

import HexoWelcome from 'components/HexoWelcome'
import HexoLoading from 'components/HexoLoading'

import { mapState, mapGetters } from 'vuex'

import * as actionTypes from 'src/store/dispatcher/action-types'

export default {
  name: 'Hexo',
  components: {
    HexoLayout,
    BarContentLayout,
    HexoNavListBar,
    HexoNavListContent,
    HexoArticleListBar,
    HexoArticleListContent,
    HexoEditorBar,
    HexoEditorContent,
    HexoViewerBar,
    HexoViewerContent,
    HexoWelcome,
    HexoLoading
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
    if (!this.$store.state.editorCore.status.ready) { this.$store.dispatch(actionTypes.init) }
  },
  created () {
    document.getElementById('app-message').innerHTML = '加载编辑器...'
  },
  async beforeDestory () {
    this.$store.dispatch(actionTypes.destroy)
  }
}
</script>
