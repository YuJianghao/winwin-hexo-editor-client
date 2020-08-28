<template>
  <q-page :style-fn="pageStyle">
    <q-splitter
      class="fit"
      :limits="[155,600]"
      v-model="nav"
      unit="px"
      @input="onNavListTabResize"
    >
      <template v-slot:before>
        <slot name="nav-list" />
      </template>
      <template v-slot:after>
        <q-splitter
          v-model="list"
          :limits="[250,600]"
          unit="px"
          @input="onArticleListTabResize"
        >
          <template v-slot:before>
            <slot name="article-list" />
          </template>
          <template v-slot:after>
            <div class="fit row">
              <div
                class="col full-height"
                v-if="show.editor"
              >
                <slot name="editor" />
              </div>
              <div
                class="col full-height"
                v-if="show.viewer"
              >
                <slot name="viewer" />
              </div>
              <div
                class="col full-height"
                v-if="show.welcome"
              >
                <slot name="welcome" />
              </div>
              <div
                class="col full-height"
                v-if="show.loading"
              >
                <slot name="loading" />
              </div>
            </div>
          </template>
        </q-splitter>
      </template>
    </q-splitter>

    <q-inner-loading :showing="editorUi.loading.show">
      <q-spinner-gears
        size="50px"
        color="primary"
      />
    </q-inner-loading>
  </q-page>
</template>
<script>
import { mapState } from 'vuex'
import bus from 'src/utils/bus'

export default {
  name: 'HexoLayout',
  components: {
  },
  data () {
    return {
      editorData: '',
      full: false,
      nav: 200,
      list: 300
    }
  },
  computed: {
    show () {
      const obj = {}
      obj.editor = this.$route.query.mode === 'edit' && this.$route.query.id && !this.loading
      obj.viewer = this.$route.query.mode === 'view' && this.$route.query.id && !this.loading
      obj.loading = ['edit', 'view'].includes(this.$route.query.mode) && this.$route.query.id && this.loading
      obj.welcome = !obj.editor && !obj.viewer && !obj.loading
      return obj
    },
    ...mapState({
      editorUi: state => state.editorUi,
      loading: state => state.editorCore.status.loading
    })
  },
  methods: {
    pageStyle (offset, height) {
      return 'height:' + (window.innerHeight - offset) + 'px'
    },
    onNavListTabResize (e) {
      bus.$emit('on-navlisttab-resize', e)
      localStorage.setItem('navlisttab-size', e)
    },
    onArticleListTabResize (e) {
      bus.$emit('on-articlelisttab-resize', e)
      localStorage.setItem('articlelisttab-size', e)
    }
  },
  created () {
    this.nav = parseInt(localStorage.getItem('navlisttab-size') || 200)
    this.list = parseInt(localStorage.getItem('articlelisttab-size') || 200)
  }
}
</script>
