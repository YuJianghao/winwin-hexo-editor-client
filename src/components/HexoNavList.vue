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
        >
          <q-item-section @click="SELECT_ALL">全部</q-item-section>
          <q-item-section avatar>
            <q-badge :label="count" />
          </q-item-section>
        </q-item>
        <q-expansion-item
          label="分类"
          default-opened
          expand-separator
        >
          <q-item
            v-for="(item,key) in categories"
            :key="key"
            clickable
            v-ripple
            @click="SELECT_CATEGORIES(item)"
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
            @click="SELECT_CATEGORIES({posts:unCategorizedPosts.map(post=>post._id)})"
          >
            <q-item-section>
              未分类
            </q-item-section>
            <q-item-section avatar="">
              <q-badge :label="unCategorizedPosts.length" />
            </q-item-section>
          </q-item>
        </q-expansion-item>
        <q-expansion-item
          label="标签"
          default-opened
          expand-separator
        >
          <q-item
            v-for="(item,key) in tags"
            :key="key"
            clickable
            v-ripple
            @click="SELECT_TAGS(item)"
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
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
export default {
  name: 'HexoNavList',
  computed: {
    ...mapState({
      count: state => Object.keys(state.hexo.posts).length,
      post: state => state.hexo.post,
      full: state => state.hexo.full,
      categories: state => state.hexo.categories,
      tags: state => state.hexo.tags
    }),
    ...mapGetters({
      unCategorizedPosts: 'hexo/unCategorizedPosts'
    }),
    published () {
      if (!this.post) return false
      else return this.post.published
    }
  },
  methods: {
    ...mapMutations({
      SELECT_CATEGORIES: 'hexo/SELECT_CATEGORIES',
      SELECT_TAGS: 'hexo/SELECT_TAGS',
      SELECT_ALL: 'hexo/SELECT_ALL'
    }),
    ...mapActions({
      deploy: 'hexo/deploy',
      syncGit: 'hexo/syncGit',
      saveGit: 'hexo/saveGit'
    })
  }
}
</script>
