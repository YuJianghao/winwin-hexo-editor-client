<template>
  <q-scroll-area class="full-height meta">
    <meta-title title="基础信息"></meta-title>
    <tag-editor
      class="meta-item"
      :tags="article.tags"
      @on-update="e=>$emit('on-tag-update',e)"
    ></tag-editor>
    <meta-title title="Front-matters"></meta-title>
    <frontmatter-editor
      class="meta-item"
      @on-update="e=>$emit('on-fm-update',e)"
    ></frontmatter-editor>
  </q-scroll-area>
</template>

<script>
import FrontmatterEditor from './FrontmatterEditor'
import TagEditor from './TagEditor'
import MetaTitle from './MetaTitle'
export default {
  name: 'EditorMeta',
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  components: {
    MetaTitle,
    FrontmatterEditor,
    TagEditor
  },
  data () {
    return {}
  }
}
</script>
<style lang="scss" scoped>
.meta .meta-item {
  border-bottom: 1px double rgba(0, 0, 0, 0.12);
  &:last-child {
    border-bottom: none;
  }
}
</style>
