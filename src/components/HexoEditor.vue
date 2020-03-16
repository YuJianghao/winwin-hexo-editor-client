<template>
  <div
    class="col column"
    v-if="editing"
  >
    <div style="height:42px;">
      <q-input
        borderless
        :value="post.title"
        input-class="text-left"
        style="height:42px;"
        class="q-ml-md"
        @input="updateTitle"
      >
      </q-input>
    </div>
    <editor
      style="flex:1;height:0;"
      previewStyle="vertical"
      :value="post._content"
      :options="options"
      @input="updateContent"
    />
  </div>
</template>

<script>
import { Editor } from './VueTuiEditor/index'
export default {
  name: 'HexoEditor',
  components: {
    Editor
  },
  data () {
    return {
      options: {
        minHeight: '200px',
        language: 'zh_CN',
        useCommandShortcut: true,
        useDefaultHTMLSanitizer: true,
        usageStatistics: true,
        hideModeSwitch: true,
        exts: [
          'scrollSync'
        ]
      }
    }
  },
  methods: {
    updateTitle (e) {
      const post = {}
      Object.assign(post, this.post)
      Object.assign(post, { title: e })
      this.$store.commit('hexo/SET_POST', post)
    },
    updateContent (e) {
      const post = {}
      Object.assign(post, this.post)
      Object.assign(post, { _content: e })
      this.$store.commit('hexo/SET_POST', post)
    }
  },
  computed: {
    editing () {
      return this.$store.state.hexo.editing
    },
    post () {
      return this.$store.state.hexo.post
    }
  }
}
</script>
<style lang="scss" scoped>
.v-note-wrapper {
  z-index: 0;
}
</style>
