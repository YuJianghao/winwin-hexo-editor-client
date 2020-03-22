<template>
  <div
    class="col"
    v-show="!full"
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
            <q-badge :label="state.postsCount" />
          </q-item-section>
        </q-item>
        <q-expansion-item
          label="分类"
          default-opened
          expand-separator
        >
          <q-item
            v-for="(item,key) in state.categoriesList"
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
              <q-badge :label="state.uncategorizedPostsCount" />
            </q-item-section>
          </q-item>
        </q-expansion-item>
        <q-expansion-item
          label="标签"
          default-opened
          expand-separator
        >
          <q-item
            v-for="(item,key) in state.tagsList"
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
import { hexoEditorCore } from '../stores/editorStore'
import { editorUiStore } from '../stores/editorUiStore'
export default {
  name: 'HexoNavList',
  data () {
    return {
      state: hexoEditorCore.state,
      uiState: editorUiStore.state
    }
  },
  computed: {
    full () {
      return this.uiState.full
    },
    published () {
      // TODO 这个想办法挪到store里面去
      if (!this.state.post) return false
      else return this.state.post.published
    }
  },
  methods: {
    async filterByCategoriesId (_id) {
      await hexoEditorCore.filterByCategoriesId(_id)
    },
    async filterByTagsId (_id) {
      await hexoEditorCore.filterByTagsId(_id)
    },
    async filterByAll () {
      await hexoEditorCore.filterByAll()
    },
    async filterByUnCategorized () {
      await hexoEditorCore.filterByUnCategorized()
    },
    async deploy () {
      await hexoEditorCore.deploy()
    },
    async syncGit () {
      await hexoEditorCore.syncGit()
    },
    async saveGit () {
      await hexoEditorCore.saveGit()
    }
  }
}
</script>
