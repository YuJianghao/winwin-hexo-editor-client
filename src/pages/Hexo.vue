<template>
  <q-page
    class="column overflow-hidden"
    :style-fn="pageStyle"
  >
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
      full: false
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
  mounted () {
    this.loadPosts()
    this.loadTags()
    this.loadCategories()
  }
}
</script>
