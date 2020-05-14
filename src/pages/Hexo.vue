<template>
  <q-page
    class="column overflow-hidden"
    :style-fn="pageStyle"
  >
    <!-- {{state.postsList}} -->
    <hexo-action-bar></hexo-action-bar>
    <div
      class="row"
      style="flex:1;height:0;"
    >
      <hexo-nav-list style="max-width:200px;max-height:100%"></hexo-nav-list>
      <hexo-posts-list style="max-width:300px;max-height:100%"></hexo-posts-list>
      <hexo-editor style="max-height:100%"></hexo-editor>
      <hexo-post-viewer style="max-height:100%"></hexo-post-viewer>
      <hexo-welcome style="max-height:100%"></hexo-welcome>
    </div>
  </q-page>
</template>

<script>
import '../css/hexo.scss'
import HexoPostsList from '../components/HexoPostsList'
import HexoPostViewer from '../components/HexoPostViewer'
import HexoNavList from '../components/HexoNavList'
import HexoWelcome from '../components/HexoWelcome'
import HexoEditor from '../components/HexoEditor'
import HexoActionBar from '../components/HexoActionBar'
import { hexoEditorCore } from '../stores/editorStore'
import * as editorDispatcher from '../stores/editorDispatcher'
import message from '../utils/message'
import { Loading } from 'quasar'
export default {
  name: 'Hexo',
  components: {
    HexoPostsList,
    HexoPostViewer,
    HexoNavList,
    HexoWelcome,
    HexoEditor,
    HexoActionBar
  },
  data () {
    return {
      editorData: '',
      full: false,
      state: hexoEditorCore.state
    }
  },
  methods: {
    pageStyle (offset, height) {
      return 'height:' + (window.innerHeight - offset) + 'px'
    }
  },
  async mounted () {
    // when hexo-editor started, init hexoEditorCore
    try {
      Loading.show()
      await editorDispatcher.init()
    } catch (err) {
      if (err.status === 401) return
      message.error({ message: '初始化失败', caption: err.message })
    } finally {
      Loading.hide()
    }
  },
  async beforeDestory () {
    await editorDispatcher.destroy()
  }
}
</script>
