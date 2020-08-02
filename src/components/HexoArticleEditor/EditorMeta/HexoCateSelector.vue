<template>
  <q-list
    dense
    style="min-width: 100px;user-select:none;"
  >
    <q-item
      clickable
      @click="onClick(false)"
      :class="{'bg-blue-1':categories.length===level}"
    >
      <q-item-section :class="categories.length===level?'text-blue-3':'text-grey-5'">
        <q-item-label>无</q-item-label>
      </q-item-section>
      <q-item-section
        :class="categories.length===level?'text-blue-3':'text-grey-5'"
        class="text-right"
      >
        <q-item-label>Lv.{{level+1}}</q-item-label>
      </q-item-section>
    </q-item>
    <q-item
      clickable
      v-for="(item,key) in availableCategories"
      :key="key"
      @click="onClick(item)"
      :class="{'bg-blue-1':selected(item)}"
    >
      <q-item-section>{{item}}</q-item-section>
    </q-item>
    <q-separator />
    <q-item
      class="bg-grey-2"
      @click="onNewCate"
    >
      <q-item-section>
        <q-input
          v-model="text"
          dense
          label="新类别"
          @keydown.enter="onAddCate"
        >
        </q-input>
      </q-item-section>
    </q-item>
    <q-item
      class="bg-grey-2"
      clickable
      @click="onAddCate"
    >
      <q-item-section>
        <q-item-label>添加分类</q-item-label>
      </q-item-section>
      <q-item-section avatar="">
        <q-icon name="add" />
      </q-item-section>
    </q-item>
    <q-item
      class="bg-grey-2"
      clickable
    >
      <q-item-section>
        <q-item-label>添加子分类</q-item-label>
      </q-item-section>
      <q-item-section avatar="">
        <q-icon name="arrow_right" />
      </q-item-section>
      <q-menu
        anchor="bottom left"
        self="bottom right"
        v-if="showChild"
        v-model="showMenu"
      >
        <hexo-cate-selector
          :level="level+1"
          :categories="categories"
          @on-update="e=>$emit('on-update',e)"
        >
        </hexo-cate-selector>
      </q-menu>
    </q-item>
  </q-list>
</template>

<script>
// TODO 把这个做成公共组件，不要和store交互
import { mapGetters } from 'vuex'
import { stringSort, postCategoriesArray2d2Raw } from 'src/utils/common'
export default {
  name: 'HexoCateSelector',
  props: {
    categories: {
      type: Array,
      default: () => []
    },
    level: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      text: '',
      editing: false,
      showMenu: false
    }
  },
  computed: {
    showChild () {
      return this.level < this.categories.length
    },
    availableCategories () {
      const ac = []
      ac.push.apply(ac, this.editorCoreDataCategoriesNameList)
      console.log(this.categories)
      this.categories.forEach(pc => {
        if (!ac.includes(pc)) { ac.push(pc) }
      })
      return ac.sort(stringSort)
    },
    // externals
    ...mapGetters({
      editorCoreDataCategoriesNameList: 'editorCore/dataCategoriesNameList'
    })
  },
  methods: {
    async setPostByCategoriesArray2d (cats) {
      this.$emit('on-update', postCategoriesArray2d2Raw(cats))
    },
    selected (item) {
      return item === this.categories[this.level]
    },
    onClick (item) {
      const cats = this.categories.slice(0, this.level)
      if (item) {
        cats.push(item)
      }
      this.setPostByCategoriesArray2d([cats])
    },
    onNewCate () {
      this.editing = true
    },
    onAddCate () {
      if (this.text) {
        const cats = this.categories.slice(0, this.level)
        cats.push(this.text)
        this.setPostByCategoriesArray2d([cats])
        this.editing = false
        this.text = ''
      }
    }
  }
}
</script>
