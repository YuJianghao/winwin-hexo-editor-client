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
        :postsCount="postsCount"
        :draftsCount="draftsCount"
        :pagesCount="pagesCount"
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
import { HexoArticleListBar, HexoArticleListContent } from 'components/HexoArticleList'

import HexoWelcome from 'components/HexoWelcome'
import HexoLoading from 'components/HexoLoading'

import { mapState, mapGetters } from 'vuex'

import DispatcherService from 'src/service/dispatcher_service'

export default {
  name: 'Hexo',
  components: {
    HexoLayout,
    BarContentLayout,
    HexoNavListBar,
    HexoNavListContent,
    HexoArticleListBar,
    HexoArticleListContent,
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
      article: state => state.hexoCore.data.article,
      hexoUi: state => state.hexoUi
    }),
    ...mapGetters({
      tagsList: 'hexoCore/dataTagsList',
      postsCount: 'hexoCore/dataPostsCount',
      draftsCount: 'hexoCore/dataDraftsCount',
      pagesCount: 'hexoCore/dataPagesCount',
      categoriesCount: 'hexoCore/dataUnCategoriesCount',
      categoriesList: 'hexoCore/dataCategoriesList'
    })
  },
  methods: {
    pageStyle (offset, height) {
      return 'height:' + (window.innerHeight - offset) + 'px'
    },
    onArticleUpdate (article) {
      DispatcherService.setPostByPost(article)
    },
    onSave () {
      DispatcherService.savePost()
    }
  },
  async mounted () {
    if (!this.$store.state.hexoCore.status.ready) {
      DispatcherService.init()
    }
  },
  created () {
    document.getElementById('app-message').innerHTML = '加载编辑器...'
  },
  async beforeDestory () {
    DispatcherService.destory()
  }
}
</script>
