<template>
  <div
    class="col column full-height"
    style="border-right: 1px solid rgba(0, 0, 0, 0.12);user-select:none;flex:0 0 200px;"
  >
    <q-toolbar
      class="bg-grey-2 q-px-none"
      :style="toolbarStyle"
    >
      <q-toolbar-title
        class="text-grey"
        style="margin-left:14px;"
      >
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
      <template v-if="showMore">
        <q-item
          clickable
          class="text-blue"
          @click="generate"
        >
          <q-item-section style="margin-left:-2px;">生成</q-item-section>
          <q-item-section avatar>
            <q-icon name="movie_filter" />
          </q-item-section>
        </q-item>
        <q-item
          clickable
          class="text-blue"
          @click="clean"
        >
          <q-item-section style="margin-left:-2px;">清理</q-item-section>
          <q-item-section avatar>
            <q-icon name="toys" />
          </q-item-section>
        </q-item>
      </template>
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
      <template v-if="showMore">
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
      </template>
      <q-item
        clickable
        class="text-grey"
        @click="showMore=!showMore"
      >
        <q-item-section>{{showMore?'更少':'更多'}}</q-item-section>
        <q-item-section avatar>
          <q-icon :name="showMore?'keyboard_arrow_up':'keyboard_arrow_down'" />
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
          <category-item
            label="全部"
            :badge="postsCount"
            @on-click="filterByAll"
            :selected="selectedAll"
          ></category-item>
          <category-tree
            :nodes="categoriesTreeList"
            node_key="_id"
            children_key="_child"
            label_key="name"
            :selected="selectedCategoriesId"
            @on-click="filterByCategoriesId"
          ></category-tree>
          <category-item
            label="未分类"
            :badge="unCategoriesCount"
            @on-click="filterByUnCategorized"
            :selected="selectedUncategoriezed"
          ></category-item>
        </q-list>
        <q-space />
        <template v-if="haveTags">
          <q-separator style="flex:0;" />
          <q-list
            class="q-pa-sm tag-cloud"
            dense
          >
            <tag-item
              v-for="(item,key) in sortedTagsList"
              :key="key"
              :name="item.name"
              :count="item.length"
              :selected="selectedTagsId===item._id"
              @click="filterByTagsId(item._id)"
            ></tag-item>
          </q-list>
        </template>
      </q-scroll-area>
    </div>
  </div>
</template>

<script>
import LTT from 'list-to-tree'
import { mapState } from 'vuex'
import CategoryItem from 'components/HexoNavList/CategoryItem'
import TagItem from 'components/HexoNavList/TagItem'
import CategoryTree from 'components/HexoNavList/CategoryTree'
import { stringSort } from 'src/utils/common'
import * as actionTypes from 'src/store/dispatcher/action-types'
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
  data () {
    return {
      showMore: false
    }
  },
  components: {
    CategoryItem,
    CategoryTree,
    TagItem
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
        if (!category.parent) newObj.parent = 0
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
      this.$router.push(`${this.$route.path}?filterBy=categories&filterId=${_id}`)
    },
    async filterByTagsId (_id) {
      this.$router.push(`${this.$route.path}?filterBy=tags&filterId=${_id}`)
    },
    async filterByAll () {
      this.$router.push(`${this.$route.path}?filterBy=all`)
    },
    async filterByUnCategorized () {
      this.$router.push(`${this.$route.path}?filterBy=uncategorized`)
    },
    async deploy () {
      this.$store.dispatch(actionTypes.deploy)
    },
    async clean () {
      this.$store.dispatch(actionTypes.clean)
    },
    async generate () {
      this.$store.dispatch(actionTypes.generate)
    },
    async syncGit () {
      this.$store.dispatch(actionTypes.syncGit)
    },
    async saveGit () {
      this.$store.dispatch(actionTypes.saveGit)
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
