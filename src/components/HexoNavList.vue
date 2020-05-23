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
            <q-badge :label="postsCount" />
          </q-item-section>
        </q-item>
        <q-expansion-item
          label="分类"
          default-opened
          expand-separator
        >
          <q-item
            v-for="(item,key) in categoriesList"
            :key="key"
            clickable
            v-ripple
            @click="filterByCategoriesId(item._id)"
          >
            <q-item-section>
              {{item.name}}
            </q-item-section>
            <q-item-section avatar="">
              <q-badge :label="item.length" />
            </q-item-section>
          </q-item>
          <q-item
            clickable
            v-ripple
            @click="filterByUnCategorized"
          >
            <q-item-section>
              未分类
            </q-item-section>
            <q-item-section avatar="">
              <q-badge :label="unCategoriesCount" />
            </q-item-section>
          </q-item>
        </q-expansion-item>
        <q-expansion-item
          label="标签"
          default-opened
          expand-separator
        >
          <q-item
            v-for="(item,key) in tagsList"
            :key="key"
            clickable
            v-ripple
            @click="filterByTagsId(item._id)"
          >
            <q-item-section>
              {{item.name}}
            </q-item-section>
            <q-item-section avatar="">
              <q-badge :label="item.length" />
            </q-item-section>
          </q-item>
        </q-expansion-item>
      </q-list>
    </q-scroll-area>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'HexoNavList',
  computed: {
    show () {
      return !this.editorUi.full
    },
    postsCount () {
      return this.editorCoreDataPostsCount
    },
    tagsList () {
      return this.editorCoreDataTagsList
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
