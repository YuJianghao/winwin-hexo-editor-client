<template>
  <hexo-loading-fail v-if="fail"></hexo-loading-fail>
  <bar-content-layout v-else-if="article">
    <hexo-viewer-bar slot="bar"></hexo-viewer-bar>
    <hexo-viewer-content
      slot="content"
      :article="article"
      @on-save="onSave"
    ></hexo-viewer-content>
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
import HexoViewerBar from './HexoViewerBar'
import HexoViewerContent from './HexoViewerContent'
import HexoLoading from 'components/HexoLoading'
import HexoLoadingFail from 'components/HexoLoadingFail'

import DispatcherService from 'src/service/DispatcherService'
export default {
  name: 'HexoEditor',
  components: {
    BarContentLayout,
    HexoViewerBar,
    HexoViewerContent,
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
      const reg = /^.*\/view\/((?:[^/]+?))(?:\/(?=$))?$/i
      if (reg.test(to.path)) {
        this.viewPostById(to.params.id)
      }
    }
  },
  methods: {
    onSave () {
      DispatcherService.savePost()
    },
    async viewPostById (_id) {
      this.fail = false
      this.loading = true
      try {
        await DispatcherService.viewPostById(_id)
      } catch (err) {
        this.fail = true
      } finally {
        this.loading = false
      }
    }
  },
  mounted () {
    this.viewPostById(this.$route.params.id)
  }
}
</script>
