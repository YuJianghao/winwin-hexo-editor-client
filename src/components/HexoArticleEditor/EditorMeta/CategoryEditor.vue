<template>
  <div>
    <q-item
      clickable
      dense
      style="padding-top:5px;padding-bottom:5px"
    >
      <q-item-section avatar>
        分类
      </q-item-section>
      <q-item-section>
        <q-item-label>
          {{categoriesList.length?'':'无'}}
          <q-badge
            v-for="(item,key) in categoriesList"
            :key="key"
            color="primary"
            text-color="white"
            class="q-mr-xs"
            :label="item"
          />
        </q-item-label>
      </q-item-section>
      <q-menu fit>
        <hexo-cate-selector @on-update="e=>$emit('on-update',e)" :categories="categoriesList"></hexo-cate-selector>
      </q-menu>
    </q-item>
  </div>
</template>
<script>
import HexoCateSelector from './HexoCateSelector'
import { postCategoriesRaw2Array2d } from 'src/utils/common'
export default {
  name: 'CategoryEditor',
  props: {
    categories: {
      default: () => []
    }
  },
  components: {
    HexoCateSelector
  },
  data () {
    return {
      showTagsMenu: false
    }
  },
  computed: {
    categoriesList () {
      return postCategoriesRaw2Array2d(this.categories)[0]
    }
  }
}
</script>
