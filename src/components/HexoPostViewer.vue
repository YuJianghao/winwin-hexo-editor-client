<template>
  <div
    class="col"
    v-if="show"
    @dblclick="editPostById"
  >
    <q-scroll-area class="full-height">
      <q-markdown
      class="q-pa-md q-pr-lg"
      :src="title+post._content">
      </q-markdown>
    </q-scroll-area>
  </div>
</template>

<script>
import { date } from 'quasar'
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'HexoPostViewer',
  computed: {
    show () {
      return this.editorUiViewing || this.editorUiEditing
    },
    post () {
      return this.editorCoreData.post
    },
    title () {
      return `# ${this.post.title}\n${this.post.date
      ? this.getDateString(this.post.date) : ''}\n`
    },
    // externals
    ...mapState({
      editorCoreData: state => state.editorCore.data
    }),
    ...mapGetters({
      editorUiViewing: 'editorUi/viewing',
      editorUiEditing: 'editorUi/editing'
    })
  },
  methods: {
    async editPostById () {
      this.$store.dispatch('editPostById')
    },
    getDateString (d) {
      return date.formatDate(d, 'YYYY年MM月DD日 HH:mm:ss')
    }
  }
}
</script>
