<template>
  <div
    class="col"
    v-show="show"
  >
    <q-scroll-area
      class="full-height bg-grey-2"
      style="border-right: 1px solid rgba(0, 0, 0, 0.12);"
    >
      <q-list>
        <q-item
          clickable
          class="text-blue"
          @click="deploy"
        >
          <q-item-section>部署</q-item-section>
          <q-item-section avatar>
            <q-icon name="local_airport" />
          </q-item-section>
        </q-item>
        <q-item
          clickable
          class="text-blue"
          @click="saveGit"
        >
          <q-item-section>同步到GIT</q-item-section>
          <q-item-section avatar>
            <q-icon name="flight_takeoff" />
          </q-item-section>
        </q-item>
        <q-item
          clickable
          class="text-red"
          @click="syncGit"
        >
          <q-item-section>从GIT同步</q-item-section>
          <q-item-section avatar>
            <q-icon name="flight_land" />
          </q-item-section>
        </q-item>
        <q-separator />
        <q-item
          clickable
          v-ripple
          @click="filterByAll"
        >
          <q-item-section>全部</q-item-section>
          <q-item-section avatar>
            <q-badge
              :label="postsCount"
              class="bg-grey"
            />
          </q-item-section>
        </q-item>
        <q-expansion-item
          label="分类"
          default-opened
          expand-separator
        >
          <q-list
            dense
          >
            <app-filter-item
              v-for="(item,key) in categoriesList"
              :key="key"
              :label="item.name"
              :badge="item.length"
              :onClick="()=>filterByCategoriesId(item._id)"
            > </app-filter-item>
            <app-filter-item
              label="未分类"
              :badge="unCategoriesCount"
              :onClick="filterByUnCategorized"
            ></app-filter-item>
          </q-list>
        </q-expansion-item>
        <q-item>
          <q-item-section>标签云</q-item-section>
        </q-item>
        <q-list class="q-px-md q-pb-md">
          <q-chip
            dense
            clickable
            square
            v-for="(item,key) in tagsList"
            :key="key"
            @click="filterByTagsId(item._id)"
            class="bg-grey-3"
          >
            <q-avatar
              color="grey-4"
              text-color="white"
              square
            >{{item.length}}</q-avatar>
            {{item.name}}
          </q-chip>
        </q-list>
      </q-list>
    </q-scroll-area>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import AppFilterItem from 'components/AppFilterItem'
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
    tagsList () {
      const list = this.editorCoreDataTagsList
      return list.sort()
    },
    categoriesList () {
      return this.editorCoreDataCategoriesList
    },
    unCategoriesCount () {
      return this.editorCoreDataUnCategoriesCount
    },
    // externals
    ...mapState({
      editorUi: state => state.editorUi
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
