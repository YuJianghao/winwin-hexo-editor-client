<template>
  <div
    class="fit column"
    style="user-select:none;"
  >
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
            :badge="articleCount"
            @on-click="filterByAll"
            :selected="selectedAll"
          ></category-item>
          <category-item
            label="文章"
            :badge="postsCount"
            @on-click="filterByPost"
            :selected="selectedPost"
          ></category-item>
          <category-item
            label="草稿"
            :badge="draftsCount"
            @on-click="filterByDraft"
            :selected="selectedDraft"
          >
            <q-icon
              class="q-ml-xs"
              :class="selectedDraft?'':'text-grey'"
              name="drafts"
            />
          </category-item>
          <category-item
            label="页面"
            :badge="pagesCount"
            @on-click="filterByPages"
            :selected="selectedPages"
          >
            <q-icon
              class="q-ml-xs"
              :class="selectedPages?'':'text-grey'"
              name="insert_drive_file"
            />
          </category-item>
          <q-separator spaced />
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
import CategoryItem from './CategoryItem'
import TagItem from './TagItem'
import CategoryTree from './CategoryTree'
import { stringSort } from 'src/utils/common'
import { mapMutations, mapState } from 'vuex'

import * as filterMutationTypes from 'src/store/hexo/filter/mutation-types'
import * as filterByType from 'src/store/hexo/filter/by-types'
import DispatcherService from 'src/service/dispatcher_service'

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
    pagesCount: {
      type: Number,
      default: 0
    },
    postsCount: {
      type: Number,
      default: 0
    },
    draftsCount: {
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
    articleCount () {
      return this.postsCount + this.draftsCount + this.pagesCount
    },
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
      return !this.selectedPost &&
        !this.selectedDraft &&
        !this.selectedPages &&
        !this.selectedUncategoriezed &&
        !this.selectedCategoriesId &&
        !this.selectedTagsId
    },
    selectedPost () {
      return this.filterBy === filterByType.POSTS
    },
    selectedDraft () {
      return this.filterBy === filterByType.DRAFTS
    },
    selectedPages () {
      return this.filterBy === filterByType.PAGES
    },
    selectedUncategoriezed () {
      return this.filterBy === filterByType.UNCATEGORIZED
    },
    selectedCategoriesId () {
      return this.filterBy === filterByType.CATEGORIES ? this.filterId : null
    },
    selectedTagsId () {
      return this.filterBy === filterByType.TAGS ? this.filterId : null
    },
    ...mapState('hexoFilter', {
      filterBy: state => state.by,
      filterId: state => state.id
    })
  },
  methods: {
    async filterByCategoriesId (_id) {
      this.setFilter({ by: filterByType.CATEGORIES, id: _id })
    },
    async filterByTagsId (_id) {
      this.setFilter({ by: filterByType.TAGS, id: _id })
    },
    async filterByPost () {
      this.setFilter({ by: filterByType.POSTS })
    },
    async filterByDraft () {
      this.setFilter({ by: filterByType.DRAFTS })
    },
    async filterByAll () {
      this.setFilter({ by: filterByType.ALL })
    },
    async filterByPages () {
      this.setFilter({ by: filterByType.PAGES })
    },
    async filterByUnCategorized () {
      this.setFilter({ by: filterByType.UNCATEGORIZED })
    },
    async deploy () {
      DispatcherService.deploy()
    },
    async clean () {
      DispatcherService.clean()
    },
    async generate () {
      DispatcherService.generate()
    },
    async syncGit () {
      DispatcherService.syncGit()
    },
    async saveGit () {
      DispatcherService.saveGit()
    },
    ...mapMutations('hexoFilter', {
      setFilter: filterMutationTypes.SET_FILTER
    })
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
