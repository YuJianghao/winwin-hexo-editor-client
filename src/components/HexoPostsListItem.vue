<template>
  <q-slide-item
    left-color="blue"
    right-color="red"
    v-if="post"
    @right="(e)=>{onRight(e,post._id)}"
    @left="(e)=>{onLeft(e,post._id)}"
    @click="onClick(post._id)"
    @contextmenu="$emit('on-context-menu')"
  >
    <template v-slot:left>
      <div class="row items-center">
        <q-icon
          left
          name="edit"
        /> 编辑
      </div>
    </template>
    <template v-slot:right>
      <div class="row items-center">
        删除
        <q-icon
          right
          name="delete"
        />
      </div>
    </template>
    <q-item
      clickable
      :class="{'bg-blue-1':selected}"
    >
      <q-item-section>
        <q-item-label class="row">
          <q-badge
            :color="selected?'grey-8':'grey'"
            class="q-mr-xs"
            v-if="!post.published"
          >草稿</q-badge>
          <span class="text-bold" :class="selected?'text-primary':'text-grey-10'">
            {{post.title}}
          </span>
          <q-space />
          <span
            class="text-grey-5"
            style="font-size:12px"
            v-if="post.date"
          >
            {{getDateString(post.date)}}
          </span>
        </q-item-label>
        <q-item-label
          caption
          class="ellipsis-3-lines"
        >
          {{brief}}
        </q-item-label>
        <q-item-label
          v-if="post.tags"
          caption
        >
          <q-badge
            v-for="tag in post.tags"
            :key="tag"
            :color="selected?'primary':'grey-3'"
            :text-color="selected?'white':'grey'"
            :label="tag"
            class="itemtag"
          />
        </q-item-label>
      </q-item-section>
    </q-item>
  </q-slide-item>
</template>

<script>
import { getReadableStringFromNow } from 'src/utils/post'
export default {
  name: 'HexoPostsListItem.vue',
  data () {
    return {}
  },
  props: {
    post: {
      type: Object,
      default: null
    },
    selected: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    brief () {
      const brief = this.post.brief
      return brief || '没有内容'
    }
  },
  methods: {
    onRight ({ reset }, _id) {
      this.$emit('on-right', { reset, _id })
    },
    onLeft ({ reset }, _id) {
      this.$emit('on-left', { reset, _id })
    },
    onClick (_id) {
      this.$emit('on-click', _id)
    },
    getDateString (d) {
      return getReadableStringFromNow(d)
    }
  }
}
</script>
<style lang="scss" scoped>
.itemtag {
  padding: 1px 5px;
  margin-right: 5px;
  &::before {
    content: "#";
  }
}
</style>
