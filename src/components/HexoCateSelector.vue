<template>
  <q-list
    dense
    style="min-width: 100px;user-select:none;"
  >
    <q-item
      clickable
      @click="onClick(false)"
      :class="{'bg-blue-1':postCategories.length===level}"
    >
      <q-item-section :class="postCategories.length===level?'text-blue-3':'text-grey-5'">
        <q-item-label>无</q-item-label>
      </q-item-section>
      <q-item-section
        :class="postCategories.length===level?'text-blue-3':'text-grey-5'"
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
        anchor="bottom right"
        self="bottom left"
        v-if="showChild"
        v-model="showMenu"
      >
        <hexo-cate-selector :level="level+1">
        </hexo-cate-selector>
      </q-menu>
    </q-item>
  </q-list>
</template>

<script>
// TODO 把这个做成公共组件，不要和store交互
import { hexoEditorCore } from '../stores/editorStore'
export default {
  name: 'HexoCateSelector',
  props: {
    level: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      state: hexoEditorCore.state,
      text: '',
      editing: false,
      showMenu: false
    }
  },
  computed: {
    postCategories () {
      return this.state.postCategoriesList
    },
    showChild () {
      return this.level < this.postCategories.length
    },
    availableCategories () {
      const ac = []
      ac.push.apply(ac, this.state.categoriesNameList)
      this.postCategories.map(pc => {
        if (!ac.includes(pc)) { ac.push(pc) }
      })
      return ac
    }
  },
  methods: {
    async setPostByCategoriesArray2d (cats) {
      this.$store.dispatch('setPostByCategoriesArray2d', cats)
    },
    selected (item) {
      return item === this.postCategories[this.level]
    },
    onClick (item) {
      const cats = this.postCategories.slice(0, this.level)
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
        const cats = this.postCategories.slice(0, this.level)
        cats.push(this.text)
        this.setPostByCategoriesArray2d([cats])
        this.editing = false
        this.text = ''
      }
    }
  }
}
</script>
