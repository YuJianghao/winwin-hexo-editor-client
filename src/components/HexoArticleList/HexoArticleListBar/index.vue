<template>
  <div class="fit row">
    <q-btn
      flat
      stretch
      color="primary"
      icon="add"
      @click="addPostByDefault"
    >
      <q-tooltip
        content-style="font-size: 14px"
        transition-show="none"
        transition-hide="none"
        anchor="bottom middle"
        self="center middle"
      >
        新建文章
      </q-tooltip>
    </q-btn>
    <q-space />
    <q-btn
      flat
      stretch
      color="primary"
      icon="refresh"
      @click="reload"
    >
      <q-tooltip
        content-style="font-size: 14px"
        transition-show="none"
        transition-hide="none"
        anchor="bottom middle"
        self="center middle"
      >
        刷新文章列表
      </q-tooltip>
    </q-btn>
    <q-btn
      flat
      stretch
      color="primary"
      icon="search"
      id="search-button"
      @click="showSearchMenu=true"
    >
    </q-btn>
    <q-btn
      flat
      stretch
      color="primary"
      icon="unfold_more"
    >
      <q-tooltip
        content-style="font-size: 14px"
        transition-show="none"
        transition-hide="none"
        anchor="bottom middle"
        self="center middle"
      >
        排序
      </q-tooltip>
      <q-menu
        anchor="bottom right"
        self="top right"
        transition-show="none"
        transition-hide="none"
      >
        <q-list
          style="min-width: 100px"
          dense
        >
          <q-item
            clickable
            v-close-popup
            v-for="item in sortMenuItems"
            :key="item.key+item.direction"
            @click="onSortBy(item.key,item.direction)"
            :class="{'bg-blue-1':item.selected}"
          >
            <q-item-section>按照{{item.name}}{{item.direction?'升序':'降序'}}</q-item-section>
            <q-item-section avatar>
              <q-icon :name="item.direction?'expand_less':'expand_more'" />
            </q-item-section>
          </q-item>
          <q-separator />
        </q-list>
      </q-menu>
    </q-btn>
    <div
      style="position:absolute;top:0;left:0"
      class="full-width"
    >
      <search-menu v-model="showSearchMenu"></search-menu>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import SearchMenu from './SearchMenu'
import * as actionTypes from 'src/store/dispatcher/action-types'
import * as sorterByTypes from 'src/store/hexo/sorter/by-types'
import * as sorterMutationTypes from 'src/store/hexo/sorter/mutation-types'
export default {
  name: 'HexoPostsListBar',
  components: {
    SearchMenu
  },
  data () {
    return {
      showSearchMenu: false,
      sortOptions: [
        { key: sorterByTypes.TITLE, name: '标题' },
        { key: sorterByTypes.DATE, name: '编辑日期' }
      ]
    }
  },
  computed: {
    toolbarStyle () {
      return {
        height: '36px',
        'min-height': '36px',
        'border-bottom': '1px solid rgba(0, 0, 0, 0.12)'
      }
    },
    sortMenuItems () {
      const items = []
      this.sortOptions.map(item => {
        [true, false].map(direction => {
          items.push(Object.assign({},
            Object.assign(item, {
              direction: direction,
              selected: this.sortBy === item.key && this.sortDirection === direction
            })))
        })
      })
      return items
    },
    ...mapState('hexoSorter', {
      sortBy: state => state.by,
      sortDirection: state => state.direction
    })
  },
  methods: {
    uniqueRouterPush (fullPath) {
      if (this.$route.fullPath !== fullPath) { this.$router.push(fullPath) }
    },
    async addPostByDefault () {
      this.$store.dispatch(actionTypes.addPostByDefault)
    },
    async reload () {
      this.$store.dispatch(actionTypes.reload, true)
    },
    onSortBy (by, direction) {
      this.setSorter({ by, direction })
    },
    ...mapMutations('hexoSorter', {
      setSorter: sorterMutationTypes.SET_SORTER
    })
  }
}
</script>
