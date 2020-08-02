<template>
  <div>
    <q-item
      clickable
      dense
      style="padding-top:5px;padding-bottom:5px"
    >
      <q-item-section avatar>
        标签
      </q-item-section>
      <q-item-section>
        <q-item-label>
          {{tags.length?'':'无'}}
          <q-badge
            v-for="(item,key) in tags"
            :key="key"
            color="primary"
            text-color="white"
            class="q-mr-xs"
            :label="item"
          />
        </q-item-label>
      </q-item-section>
      <q-menu fit>
        <hexo-tag-selector></hexo-tag-selector>
      </q-menu>
    </q-item>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import HexoTagSelector from './HexoTagSelector'
export default {
  name: 'TagEditor',
  components: {
    HexoTagSelector
  },
  data () {
    return {
      showTagsMenu: false
    }
  },
  computed: {
    tags () {
      return this.editorCoreDataPostTagsList
    },
    ...mapGetters({
      editorCoreDataPostTagsList: 'editorCore/dataPostTagsList'
    })
  }
}
</script>
