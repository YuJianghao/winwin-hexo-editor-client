<template>
  <div
    class="col column full-height"
    style="border-right: 1px solid rgba(0, 0, 0, 0.12);user-select:none;flex:0 0 200px;"
  >
    <q-toolbar
      class="bg-grey-2 q-px-none"
      :style="toolbarStyle"
    >
      <q-toolbar-title class="text-grey" style="margin-left:14px;">
        HEXO
      </q-toolbar-title>
    </q-toolbar>
    <q-list
      class="bg-grey-2 q-py-xs full-width"
      dense
    >
      <q-item
        clickable
        class="text-blue"
        @click="deploy"
      >
        <q-item-section style="margin-left:-2px;">部署</q-item-section>
        <q-item-section avatar>
          <q-icon name="local_airport" />
        </q-item-section>
      </q-item>
      <q-item
        clickable
        class="text-blue"
        @click="saveGit"
      >
        <q-item-section style="margin-left:-2px;">同步到GIT</q-item-section>
        <q-item-section avatar>
          <q-icon name="flight_takeoff" />
        </q-item-section>
      </q-item>
      <q-item
        clickable
        class="text-red"
        @click="syncGit"
      >
        <q-item-section style="margin-left:-2px;">从GIT同步</q-item-section>
        <q-item-section avatar>
          <q-icon name="flight_land" />
        </q-item-section>
      </q-item>
    </q-list>
    <q-separator style="flex:0 0 1px" />
    <div class="col">
      <q-scroll-area
        class="full-height bg-grey-2"
        content-style="min-height:100%;display:flex;flex-direction:column"
      >
        <q-list
          dense
          class="q-py-xs"
        >
          <app-filter-item
            label="全部"
            :badge="postsCount"
            @on-click="filterByAll"
            :selected="selectedAll"
          ></app-filter-item>
          <nav-categories-tree
            :nodes="categoriesTreeList"
            node_key="_id"
            children_key="_child"
            label_key="name"
            :selected="selectedCategoriesId"
            @on-click="filterByCategoriesId"
          ></nav-categories-tree>
          <app-filter-item
            label="未分类"
            :badge="unCategoriesCount"
            @on-click="filterByUnCategorized"
            :selected="selectedUncategoriezed"
          ></app-filter-item>
        </q-list>
        <q-space />
        <template v-if="haveTags">
          <q-separator style="flex:0;" />
          <q-list
            class="q-pa-sm tag-cloud"
            dense
          >
            <q-chip
              clickable
              square
              size="sm"
              :outline="selectedTagsId!==item._id"
              v-for="(item,key) in sortedTagsList"
              :key="key"
              @click="filterByTagsId(item._id)"
              :class="selectedTagsId===item._id?'text-white bg-primary selected':'text-primary'"
            >
              <q-avatar square>{{item.length}}</q-avatar>
              {{item.name.toUpperCase()}}
            </q-chip>
          </q-list>
        </template>
      </q-scroll-area>
    </div>
  </div>
</template>

<script>
import LTT from 'list-to-tree'
import { mapState } from 'vuex'
import AppFilterItem from 'components/AppFilterItem'
import NavCategoriesTree from 'components/NavCategoriesTree'
import { stringSort } from 'src/utils/common'
export default {
  name: 'HexoNavList',
  props: {
    categoriesList: {
      type: Array,
      default: () => []
    },
    tagsList: {
      type: Array,
      default: () => []
    },
    postsCount: {
      type: Number,
      default: 0
    },
    unCategoriesCount: {
      type: Number,
      default: 0
    }
  },
  components: {
    AppFilterItem,
    NavCategoriesTree
  },
  computed: {
    toolbarStyle () {
      return {
        'min-height': '36px',
        'border-bottom': '1px solid rgba(0, 0, 0, 0.12)'
      }
    },
    haveTags () {
      return this.tagsList.length > 0
    },
    sortedTagsList () {
      const list = this.tagsList
      return list.sort((a, b) => stringSort(a.name, b.name))
    },
    categoriesTreeList () {
      const list = this.categoriesList.map(category => {
        const newObj = {}
        if (!category.parent)newObj.parent = 0
        return Object.assign(newObj, category)
      })
      const ltt = new LTT(list, {
        key_id: '_id',
        key_parent: 'parent',
        key_child: '_child'
      })
      return ltt.GetTree() || []
    },
    selectedAll () {
      return this.editorFilter.type === 'all'
    },
    selectedUncategoriezed () {
      return this.editorFilter.type === 'uncategorized'
    },
    selectedCategoriesId () {
      return this.editorFilter.type === 'categories' ? this.editorFilter._id : null
    },
    selectedTagsId () {
      return this.editorFilter.type === 'tags' ? this.editorFilter._id : null
    },
    // externals
    ...mapState({
      editorUi: state => state.editorUi,
      editorFilter: state => state.editorFilter
    })
  },
  methods: {
    async filterByCategoriesId (_id) {
      this.$store.dispatch('filterByCategoriesId', _id)
    },
    async filterByTagsId (_id) {
      this.$store.dispatch('filterByTagsId', _id)
    },
    async filterByAll () {
      this.$store.dispatch('filterByAll')
    },
    async filterByUnCategorized () {
      this.$store.dispatch('filterByUnCategorized')
    },
    async deploy () {
      this.$store.dispatch('deploy')
    },
    async syncGit () {
      this.$store.dispatch('syncGit')
    },
    async saveGit () {
      this.$store.dispatch('saveGit')
    }
  }
}
</script>
<style lang="scss">
.tag-cloud .q-chip .q-avatar__content {
  border-right: 1px solid;
}
.tag-cloud .q-chip.selected .q-avatar__content {
  border-right: 1px solid mix($primary, $grey-2, 50);
}
</style>
