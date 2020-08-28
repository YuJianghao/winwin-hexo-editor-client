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
    <q-inner-loading :showing="editorUi.loading.show">
      <q-spinner-gears
        size="50px"
        color="primary"
      />
    </q-inner-loading>
  </q-page>
</template>
<script>
import { mapState, mapGetters } from 'vuex'

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
      obj.editor = this.editing
      obj.viewer = this.viewing
      obj.welcome = this.unselect
      return obj
    },
    ...mapState({
      editorUi: state => state.editorUi
    }),
    ...mapGetters({
      unselect: 'editorUi/unselect',
      viewing: 'editorUi/viewing',
      editing: 'editorUi/editing',
      tagsList: 'editorCore/dataTagsList',
      articlesCount: 'editorCore/dataPostsCount',
      categoriesCount: 'editorCore/dataUnCategoriesCount',
      categoriesList: 'editorCore/dataCategoriesList'
    })
  },
  methods: {
    pageStyle (offset, height) {
      return 'height:' + (window.innerHeight - offset) + 'px'
    }
  }
}
</script>
