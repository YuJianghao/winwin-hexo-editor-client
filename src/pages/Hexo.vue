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
      <hexo-nav-list style="max-width:200px"></hexo-nav-list>
      <hexo-posts-list style="max-width:300px"></hexo-posts-list>
      <hexo-editor></hexo-editor>
      <hexo-post-viewer></hexo-post-viewer>
      <hexo-welcome></hexo-welcome>
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
import { mapState, mapActions } from 'vuex'
import hexo from '@winwin/hexo-editor-sdk'
import request from '../api/request'
import { hexoEditorCore } from '../stores/editorStore'
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
  computed: {
    ...mapState({
      posts: state => state.hexo.posts,
      post: state => state.hexo.post,
      editing: state => state.hexo.editing
    }),
    actionBarType () {
      if (this.editing) return 'edit'
      if (this.post) return 'view'
      return ''
    }
  },
  methods: {
    ...mapActions({
      loadPosts: 'hexo/loadPosts',
      loadTags: 'hexo/loadTags',
      loadCategories: 'hexo/loadCategories',
      clearPosts: 'hexo/clearPosts',
      loadPost: 'hexo/loadPost',
      addPost: 'hexo/addPost',
      publishPost: 'hexo/publishPost',
      unpublishPost: 'hexo/unpublishPost',
      updatePost: 'hexo/updatePost'
    }),
    pageStyle (offset, height) {
      return 'height:' + (window.innerHeight - offset) + 'px'
    }
  },
  async mounted () {
    this.loadPosts()
    // when hexo-editor started, init hexoEditorCore
    try {
      Loading.show()
      await hexoEditorCore.init({
        api: hexo({
          baseUrl: process.env.HEXO_SERVER_BASE,
          axios: request
        }),
        debug: process.env.DEV
      })
    } catch (err) {
      message.error({ message: '初始化失败', caption: err.message })
    } finally {
      Loading.hide()
    }
  }
}
</script>
