<template>
  <q-scroll-area class="full-height" v-if="article">
    <meta-title title="基础信息"></meta-title>
    <category-editor
      :categories="article.categories"
      @on-update="e=>$emit('on-category-update',e)"
    ></category-editor>
    <tag-editor
      :tags="article.tags"
      @on-update="e=>$emit('on-tag-update',e)"
    ></tag-editor>
    <q-separator/>
    <meta-title title="Front-matters"></meta-title>
    <frontmatter-editor
      @on-update="e=>$emit('on-fm-update',e)"
    ></frontmatter-editor>
  </q-scroll-area>
</template>

<script>
import FrontmatterEditor from './FrontmatterEditor'
import TagEditor from './TagEditor'
import CategoryEditor from './CategoryEditor'
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
    TagEditor,
    CategoryEditor
  },
  data () {
    return {}
  }
}
</script>
