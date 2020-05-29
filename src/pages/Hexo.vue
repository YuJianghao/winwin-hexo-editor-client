<template>
  <q-page
    class="row overflow-hidden"
    :style-fn="pageStyle"
  >
    <hexo-nav-list style="max-width:200px;max-height:100%"></hexo-nav-list>
    <hexo-posts-list style="max-width:300px;max-height:100%"></hexo-posts-list>
    <hexo-editor style="max-height:100%"></hexo-editor>
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
import HexoPostsList from '../components/HexoPostsList'
import HexoPostViewer from '../components/HexoPostViewer'
import HexoNavList from '../components/HexoNavList'
import HexoWelcome from '../components/HexoWelcome'
import HexoEditor from '../components/HexoEditor'
import { mapState } from 'vuex'
export default {
  name: 'Hexo',
  components: {
    HexoPostsList,
    HexoPostViewer,
    HexoNavList,
    HexoWelcome,
    HexoEditor
  },
  data () {
    return {
      editorData: '',
      full: false
    }
  },
  computed: {
    ...mapState({
      editorUi: state => state.editorUi
    })
  },
  methods: {
    pageStyle (offset, height) {
      return 'height:' + (window.innerHeight - offset) + 'px'
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
