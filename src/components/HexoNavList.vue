<template>
  <div
    class="col column"
    v-show="show"
    style="border-right: 1px solid rgba(0, 0, 0, 0.12);"
  >
    <q-scroll-area
      class="full-height bg-grey-2"
      content-style="min-height:100%;display:flex;flex-direction:column"
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
      <q-separator style="flex:0;" />
      <q-list
        dense
        class="q-py-xs"
      >
        <app-filter-item
          label="全部"
          :badge="postsCount"
          :onClick="filterByAll"
          isParent
          :selected="selectedAll"
        ></app-filter-item>
        <app-filter-item
          v-for="(item,key) in categoriesList"
          :key="key"
          :label="item.name"
          :badge="item.length"
          :onClick="()=>filterByCategoriesId(item._id)"
          :selected="item._id===selectedCategoriesId"
          :isParent="!item.parent"
        > </app-filter-item>
        <app-filter-item
          label="未分类"
          :badge="unCategoriesCount"
          :onClick="filterByUnCategorized"
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
            v-for="(item,key) in tagsList"
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
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import AppFilterItem from 'components/AppFilterItem'
import { stringSort } from '../utils/common'
export default {
  name: 'HexoNavList',
  components: {
    AppFilterItem
  },
  computed: {
    show () {
      return !this.editorUi.full
    },
    postsCount () {
      return this.editorCoreDataPostsCount
    },
    haveTags () {
      return this.tagsList.length > 0
    },
    tagsList () {
      const list = this.editorCoreDataTagsList
      return list.sort((a, b) => stringSort(a.name, b.name))
    },
    categoriesList () {
      const list = this.editorCoreDataCategoriesList
      return list.sort((a, b) => stringSort(a.name, b.name))
    },
    unCategoriesCount () {
      return this.editorCoreDataUnCategoriesCount
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
    }),
    ...mapGetters({
      editorCoreDataPostsCount: 'editorCore/dataPostsCount',
      editorCoreDataTagsList: 'editorCore/dataTagsList',
      editorCoreDataCategoriesList: 'editorCore/dataCategoriesList',
      editorCoreDataUnCategoriesCount: 'editorCore/dataUnCategoriesCount'
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
