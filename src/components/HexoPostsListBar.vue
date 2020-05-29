<template>
  <q-toolbar
    class="bg-grey-2 q-px-none"
    :style="toolbarStyle"
  >
    <q-btn
      flat
      stretch
      color="primary"
      icon="add"
      @click="addPostByDefault"
    >
      <q-tooltip
        content-style="font-size: 14px"
        transition-show="jump-down"
        transition-hide="jump-up"
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
        transition-show="jump-down"
        transition-hide="jump-up"
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
      icon="unfold_more"
    >
      <q-menu
        anchor="bottom right"
        self="top right"
        transition-show="jump-down"
        transition-hide="jump-up"
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
  </q-toolbar>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'HexoPostsListBar',
  data () {
    return {
      sortOptions: [
        { key: 'title', name: '标题' },
        { key: 'date', name: '编辑日期' }
      ]
    }
  },
  computed: {
    toolbarHeight () {
      return this.editorUi.actionbar.height
    },
    toolbarStyle () {
      return {
        height: this.toolbarHeight,
        'min-height': this.toolbarHeight,
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
              selected: this.editorSorter.key === item.key && this.editorSorter.direction === direction
            })))
        })
      })
      return items
    },
    // externals
    ...mapState({
      editorUi: state => state.editorUi,
      editorSorter: state => state.editorSorter
    })
  },
  methods: {
    async addPostByDefault () {
      this.$store.dispatch('addPostByDefault')
    },
    async reload () {
      this.$store.dispatch('reload', true)
    },
    onSortBy (key, direction) {
      this.$store.dispatch('setSortKey', key)
      this.$store.dispatch('setSortDirection', direction)
    }
  }
}
</script>
