<template>
  <hexo-loading-fail v-if="fail"></hexo-loading-fail>
  <bar-content-layout v-else-if="article">
    <hexo-editor-bar slot="bar"></hexo-editor-bar>
    <hexo-editor-content
      slot="content"
      :article="article"
      @on-update="onArticleUpdate"
      @on-save="onSave"
    ></hexo-editor-content>
    <q-inner-loading :showing="loading">
      <q-spinner-gears size="50px" color="primary" />
      <h2>正在加载...</h2>
    </q-inner-loading>
  </bar-content-layout>
  <hexo-loading v-else-if="loading"></hexo-loading>
  <div v-else>Errored</div>
</template>
<script>
import { mapState } from 'vuex'
import BarContentLayout from 'layouts/BarContentLayout'
import HexoEditorBar from './HexoEditorBar'
import HexoEditorContent from './HexoEditorContent'
import HexoLoading from 'components/HexoLoading'
import HexoLoadingFail from 'components/HexoLoadingFail'

import DispatcherService from 'src/service/dispatcher_service'

export default {
  name: 'HexoEditor',
  components: {
    BarContentLayout,
    HexoEditorBar,
    HexoEditorContent,
    HexoLoading,
    HexoLoadingFail
  },
  computed: {
    ...mapState({
      article: state => state.hexoCore.data.article
    })
  },
  data () {
    return {
      fail: false,
      loading: true
    }
  },
  watch: {
    $route (to, from) {
      const reg = /^.*\/edit\/((?:[^/]+?))(?:\/(?=$))?$/i
      if (reg.test(to.path)) {
        this.editPostById(to.params.id)
      }
    }
  },
  methods: {
    onArticleUpdate (article) {
      DispatcherService.setPostByPost(article)
    },
    onSave () {
      DispatcherService.savePost()
    },
    async editPostById (_id) {
      this.fail = false
      this.loading = true
      try {
        await DispatcherService.editPostById(_id)
      } catch (err) {
        this.fail = true
      } finally {
        this.loading = false
      }
    }
  },
  mounted () {
    this.editPostById(this.$route.params.id)
  }
}
</script>
