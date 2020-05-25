<template>
  <q-menu
    touch-position
    context-menu
    no-refocus
    @before-hide="$emit('on-before-hide')"
    @before-show="$emit('on-before-show')"
    transition-show="jump-right"
    transition-hide="jump-right"
    anchor="center right"
    self="top left"
    @contextmenu.prevent=""
  >
    <template v-if="show">
      <q-list
        dense
        class="bg-grey-2 q-pt-sm"
        style="width: 250px;user-select:none"
      >
        <q-item class="q-mb-sm">
          <q-item-section style="font-size:large;font-weight:400;letter-spacing: 0.05em;">
            {{post.title}}</q-item-section>
        </q-item>
        <q-separator />
        <q-item v-if="date">
          <q-item-section avatar>发布于</q-item-section>
          <q-item-section>
            {{date}}
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section avatar>分类</q-item-section>
          <q-item-section>
            <div v-if="post.categories">
              <q-badge
                v-for="(item,key) in post.categories"
                :key="key"
                color="primary"
                text-color="white"
                class="q-mr-xs"
                :label="item"
              />
            </div>
            <div v-else>无</div>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section avatar>标签</q-item-section>
          <q-item-section>
            <div v-if="post.tags">
              <q-badge
                v-for="(item,key) in post.tags"
                :key="key"
                color="primary"
                text-color="white"
                class="q-mr-xs"
                :label="item"
              />
            </div>
            <div v-else>无</div>
          </q-item-section>
        </q-item>
      </q-list>
      <q-list
        dense
        style="width: 250px;user-select:none"
      >
        <q-separator />
        <q-item
          clickable
          v-close-popup
          @click="onView"
        >
          <q-item-section>查看</q-item-section>
        </q-item>
        <q-item
          clickable
          v-close-popup
          @click="onEdit"
        >
          <q-item-section>编辑</q-item-section>
        </q-item>
        <q-item
          clickable
          v-close-popup
          @click="onPublish"
          :class="{'text-red':published}"
        >
          <q-item-section>{{published?'取消发布':'发布'}}</q-item-section>
        </q-item>
        <q-separator />
        <q-item
          clickable
          v-close-popup
          class="text-red"
          @click="onDelete"
        >
          <q-item-section>删除</q-item-section>
        </q-item>
        <q-separator />
        <q-item
          clickable
          v-close-popup
          class="text-grey"
        >
          <q-item-section>关闭菜单</q-item-section>
        </q-item>
      </q-list>
    </template>
    <template v-else>
      <q-list bordered>
        <q-item
          clickable
          v-ripple
          v-close-popup
          @click="onAdd"
          style="user-select:none"
        >
          <q-item-section>新建一篇文章？</q-item-section>
          <q-item-section avatar>
            <q-icon
              color="primary"
              name="add"
            />
          </q-item-section>
        </q-item>
        <q-separator />
        <q-item
          clickable
          v-close-popup
          dense
          class="text-grey"
        >
          <q-item-section>点错了</q-item-section>
        </q-item>
      </q-list>
    </template>
  </q-menu>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { getDatetimeStringNoSec } from '../utils/post'
export default {
  name: 'PostContextMenu',
  props: {
    id: {
      type: String,
      required: true
    }
  },
  computed: {
    show () {
      return this.id && this.posts[this.id]
    },
    post () {
      return this.posts[this.id]
    },
    date () {
      return getDatetimeStringNoSec(this.post.date)
    },
    posts () {
      return this.editorCoreData.posts
    },
    published () {
      return this.post.published
    },
    // externals
    ...mapState({
      editorCoreData: state => state.editorCore.data
    })
  },
  data () {
    return {}
  },
  methods: {
    onAdd () {
      this.$store.dispatch('addPostByDefault')
      // TODO 需要处理新建文章的分类逻辑
    },
    onView () {
      this.$store.dispatch('viewPostById', { _id: this.id })
    },
    onEdit () {
      this.$store.dispatch('editPostById', { _id: this.id })
    },
    onPublish () {
      if (this.published) {
        this.unpublishPostById({ _id: this.id })
      } else {
        this.publishPostById({ _id: this.id })
      }
    },
    onDelete () {
      this.$store.dispatch('deletePostById', { _id: this.id })
    },
    // externals
    ...mapActions([
      'publishPostById',
      'unpublishPostById'
    ])
  }
}
</script>
