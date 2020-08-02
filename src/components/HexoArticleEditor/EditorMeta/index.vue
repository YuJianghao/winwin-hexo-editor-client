<template>
  <q-scroll-area class="full-height meta">
    <frontmatter-editor class="meta-item"></frontmatter-editor>
  </q-scroll-area>
</template>

<script>
import FrontmatterEditor from './FrontmatterEditor'
export default {
  name: 'EditorMeta',
  components: {
    FrontmatterEditor
  },
  data () {
    return {}
  }
}
</script>
<style lang="scss" scoped>
.meta .meta-item{
  border-bottom: 1px double rgba(0,0,0,0.12);
  &:last-child {
    border-bottom: none;
  }
}
</style>
