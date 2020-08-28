<template>
  <q-page
    class="row"
    :style-fn="pageStyle"
  >
    <div
      class="col fit"
      style="flex:0 0 200px"
    >
      <slot name="nav-list" />
    </div>
    <div
      v-show="!editorUi.full"
      class="col column"
      style=";flex:0 0 300px;border-right: 1px solid rgba(0, 0, 0, 0.12);"
    >
      <slot name="article-list" />
    </div>
    <div
      class="col column"
      v-if="show"
    >
      <slot name="editor" />
    </div>
    <slot name="viewer" />
    <slot name="welcome" />
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
    ...mapState({
      editorUi: state => state.editorUi
    }),
    ...mapGetters({
      show: 'editorUi/editing',
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
