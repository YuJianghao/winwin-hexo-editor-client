<template>
  <q-page
    class="row"
    :style-fn="pageStyle"
  >
    <div
      class="col full-height"
      style="flex:0 0 200px"
      v-show="!editorUi.full"
    >
      <slot name="nav-list" />
    </div>
    <div
      class="col full-height"
      v-show="!editorUi.full"
      style="flex:0 0 300px"
    >
      <slot name="article-list" />
    </div>
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

export default {
  name: 'HexoLayout',
  components: {
  },
  data () {
    return {
      editorData: '',
      full: false
    }
  },
  computed: {
    show () {
      const obj = {}
      obj.editor = this.$route.query.mode === 'edit' && this.$route.query.id && !this.loading
      obj.viewer = this.$route.query.mode === 'view' && this.$route.query.id && !this.loading
      obj.loading = ['edit', 'view'].includes(this.$route.query.mode) && this.loading
      obj.welcome = !obj.editor && !obj.viewer && !obj.loading
      if (obj.welcome) { console.log(obj, this.editorUi) }
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
    }
  }
}
</script>
