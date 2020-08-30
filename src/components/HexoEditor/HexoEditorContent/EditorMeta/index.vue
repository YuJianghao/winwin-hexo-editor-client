<template>
  <q-scroll-area
    class="full-height"
    v-if="article"
  >
    <meta-title title="详细信息"></meta-title>
    <date-editor
      label="发布"
      :date="article.date"
      @on-change="e=>$emit('on-date-update', e)"
    ></date-editor>
    <template v-if="article.layout!=='page'">
      <date-editor
        label="更新"
        :date="article.updated"
        @on-change="e=>$emit('on-updated-update', e)"
      ></date-editor>
      <category-editor
        :categories="article.categories"
        @on-update="e=>$emit('on-category-update',e)"
      ></category-editor>
      <tag-editor
        :tags="article.tags || []"
        @on-update="e=>$emit('on-tag-update',e)"
      ></tag-editor>
      <q-separator />
    </template>
    <meta-title title="Front-matters"></meta-title>
    <frontmatter-editor
      :frontmatters="article.frontmatters"
      @on-update="e=>$emit('on-fm-update',e)"
    ></frontmatter-editor>
  </q-scroll-area>
</template>

<script>
import FrontmatterEditor from './FrontmatterEditor'
import TagEditor from './TagEditor'
import CategoryEditor from './CategoryEditor'
import MetaTitle from './MetaTitle'
import DateEditor from './DateEditor'
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
    CategoryEditor,
    DateEditor
  }
}
</script>
