<template>
  <div
    class="row no-wrap"
    :style="`height:${barHeight}`"
  >
    <q-toolbar
      class="col bg-grey-2 q-px-none"
      :style="navStyle"
      v-show="showLeft"
    >
      <q-toolbar-title class="text-grey" style="margin-left:14px;">
        HEXO
      </q-toolbar-title>
    </q-toolbar>
    <q-toolbar
      class="col bg-grey-2 q-px-none"
      :style="listStyle"
      v-show="showLeft"
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
    <q-toolbar
      class="col bg-grey-2 q-px-none"
      :style="contentStyle"
    >
      <q-btn
        flat
        stretch
        color="primary"
        :icon="showLeft?'chevron_left':'chevron_right'"
        @click="toggleFull"
        v-if="showRight"
      ></q-btn>
      <template v-if="showEdit">
        <q-btn
          flat
          stretch
          color="primary"
          icon="save"
          label="保存"
          @click="savePost"
        />
      </template>
      <template v-if="showRight">
        <q-btn
          flat
          stretch
          :icon="published?'close':'publish'"
          :color="published?'red':'primary'"
          v-if="showPublishButton"
          :label="published?'取消发布':'发布'"
          @click="onPublish"
        />
        <q-btn
          flat
          stretch
          color="red"
          icon="delete"
          label="删除"
          @click="deletePostById"
        />
      </template>
      <template v-if="showView && showRight">
        <q-btn
          stretch
          flat
          @click="editPostById"
        >
          分类：
          {{categories.length?'':'无'}}
          <q-badge
            v-for="(item,key) in categories"
            :key="key"
            color="primary"
            text-color="white"
            :label="item"
          />
        </q-btn>
        <q-btn
          stretch
          flat
          @click="editPostById"
        >
          标签：
          {{tags.length?'':'无'}}
          <q-badge
            v-for="(item,key) in tags"
            :key="key"
            color="primary"
            text-color="white"
            :label="item"
          />
        </q-btn>
      </template>
      <template v-if="showEdit">
        <q-btn-dropdown
          stretch
          flat
          v-model="showCatsMenu"
          :class="showCatsMenu?'bg-grey-4':''"
          style="transition:0.2s"
        >
          <template slot="label">
            分类：
            {{categories.length?'':'无'}}
            <q-badge
              v-for="(item,key) in categories"
              :key="key"
              color="primary"
              text-color="white"
              class="q-mr-xs"
              :label="item"
            />
          </template>
          <template>
            <hexo-cate-selector></hexo-cate-selector>
          </template>
        </q-btn-dropdown>
        <q-btn-dropdown
          stretch
          flat
          v-model="showTagsMenu"
          :class="showTagsMenu?'bg-grey-4':''"
          style="transition:0.2s"
        >
          <template slot="label">
            标签：
            {{tags.length?'':'无'}}
            <q-badge
              v-for="(item,key) in tags"
              :key="key"
              color="primary"
              text-color="white"
              class="q-mr-xs"
              :label="item"
            />
          </template>
          <template>
            <hexo-tag-selector></hexo-tag-selector>
          </template>
        </q-btn-dropdown>
      </template>
    </q-toolbar>
  </div>
</template>

<script>
import HexoCateSelector from './HexoCateSelector'
import HexoTagSelector from './HexoTagSelector'
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'HexoActionBar',
  components: {
    HexoCateSelector,
    HexoTagSelector
  },
  data () {
    return {
      showCatsMenu: false,
      showTagsMenu: false,
      sort: [
        { key: 'title', name: '标题' },
        { key: 'date', name: '编辑日期' }
      ],
      barHeight: '36px'
    }
  },
  computed: {
    sortMenuItems () {
      const items = []
      this.sort.map(item => {
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
    published () {
      return this.editorCoreDataPostPublished
    },
    showLeft () {
      return !this.editorUi.full
    },
    showRight () {
      return !!this.editorCoreData.post
    },
    showEdit () {
      return this.editorUiEditing
    },
    showView () {
      return !this.editorUiEditing
    },
    showPublishButton () {
      return !!this.editorCoreData.post
    },
    categories () {
      return this.editorCoreDataPostCategoriesList
    },
    tags () {
      return this.editorCoreDataPostTagsList
    },
    navStyle () {
      return {
        'min-height': this.barHeight,
        'max-width': '200px',
        'border-bottom': '1px solid rgba(0, 0, 0, 0.12)',
        'border-right': '1px solid rgba(0, 0, 0, 0.12)'
      }
    },
    listStyle () {
      return {
        'min-height': this.barHeight,
        'max-width': '300px',
        'border-bottom': '1px solid rgba(0, 0, 0, 0.12)',
        'border-right': '1px solid rgba(0, 0, 0, 0.12)'
      }
    },
    contentStyle () {
      return {
        'min-height': this.barHeight,
        'border-bottom': '1px solid rgba(0, 0, 0, 0.12)',
        width: '0'
      }
    },
    // externals
    ...mapState({
      editorUi: state => state.editorUi,
      editorCoreData: state => state.editorCore.data,
      editorSorter: state => state.editorSorter
    }),
    ...mapGetters({
      editorUiEditing: 'editorUi/editing',
      editorCoreDataPostTagsList: 'editorCore/dataPostTagsList',
      editorCoreDataPostCategoriesList: 'editorCore/dataPostCategoriesList',
      editorCoreDataPostPublished: 'editorCore/dataPostPublished'
    })
  },
  methods: {
    async addPostByDefault () {
      this.$store.dispatch('addPostByDefault')
    },
    async reload () {
      this.$store.dispatch('reload', true)
    },
    async editPostById () {
      this.$store.dispatch('editPostById')
    },
    async publishPostById () {
      this.$store.dispatch('publishPostById')
    },
    async unpublishPostById () {
      this.$store.dispatch('unpublishPostById')
    },
    async toggleFull () {
      this.$store.dispatch('toggleFull')
    },
    async deletePostById () {
      this.$store.dispatch('deletePostById')
    },
    async savePost () {
      this.$store.dispatch('savePost')
    },
    onPublish () {
      this.editorCoreDataPostPublished ? this.unpublishPostById() : this.publishPostById()
    },
    onSortBy (key, direction) {
      this.$store.dispatch('setSortKey', key)
      this.$store.dispatch('setSortDirection', direction)
    }
  }
}
</script>
