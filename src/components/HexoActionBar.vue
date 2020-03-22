<template>
  <div
    class="row no-wrap"
    style="height:42px"
  >
    <q-toolbar
      class="col bg-grey-2 q-px-none"
      :style="navStyle"
      v-show="showLeft"
    >
      <q-toolbar-title class="q-ml-md text-grey">
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
        label="新建"
        @click="addPostByDefault"
      />
      <q-btn
        flat
        stretch
        color="primary"
        icon="refresh"
        label="刷新"
        @click="reload"
      />
    </q-toolbar>
    <q-toolbar
      class="col bg-grey-2 q-px-none"
      :style="contentStyle"
    >
      <q-btn
        flat
        stretch
        color="primary"
        icon="menu"
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
          v-if="post"
          :label="published?'取消发布':'发布'"
          @click="onPublish"
        />
        <q-btn
          flat
          stretch
          color="red"
          icon="delete"
          label="删除"
          @click="deletePost(post._id)"
        />
      </template>
      <template v-if="showView && showRight">
        <q-btn
          stretch
          flat
          @click="editPost()"
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
          @click="editPost()"
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
import { mapState, mapActions, mapGetters } from 'vuex'
import HexoCateSelector from './HexoCateSelector'
import HexoTagSelector from './HexoTagSelector'
import { hexoEditorCore } from '../stores/editorStore'
export default {
  name: 'HexoActionBar',
  components: {
    HexoCateSelector,
    HexoTagSelector
  },
  data () {
    return {
      showCatsMenu: false,
      showTagsMenu: false
    }
  },
  methods: {
    async addPostByDefault () {
      await hexoEditorCore.addPostByDefault()
    },
    async reload () {
      await hexoEditorCore.reload()
    },
    ...mapActions({
      editPost: 'hexo/editPost',
      deletePost: 'hexo/deletePost',
      savePost: 'hexo/savePost',
      publishPost: 'hexo/publishPost',
      unpublishPost: 'hexo/unpublishPost',
      toggleFull: 'hexo/toggleFull'
    }),
    onPublish () {
      this.published ? this.unpublishPost() : this.publishPost()
    }
  },
  computed: {
    ...mapState({
      post: state => state.hexo.post,
      full: state => state.hexo.full,
      editing: state => state.hexo.editing
    }),
    ...mapGetters({
      categoriesArray2d: 'hexo/categoriesArray2d'
    }),
    categories () {
      return this.categoriesArray2d[0]
    },
    published () {
      return this.post.published
    },
    showLeft () {
      return !this.full
    },
    showRight () {
      return !!this.post
    },
    showEdit () {
      return this.editing
    },
    showView () {
      return !this.editing
    },
    tags () {
      return this.post ? this.post.tags || [] : []
    },
    navStyle () {
      return {
        'min-height': '42px',
        'max-width': '200px',
        'border-bottom': '1px solid rgba(0, 0, 0, 0.12)',
        'border-right': '1px solid rgba(0, 0, 0, 0.12)'
      }
    },
    listStyle () {
      return Object.assign({
        'min-height': '42px',
        'max-width': '300px',
        'border-bottom': '1px solid rgba(0, 0, 0, 0.12)'
      }, this.showRight ? { 'border-right': '1px solid rgba(0, 0, 0, 0.12)' } : {})
    },
    contentStyle () {
      return {
        'min-height': '42px',
        'border-bottom': '1px solid rgba(0, 0, 0, 0.12)',
        width: '0'
      }
    }
  }
}
</script>
