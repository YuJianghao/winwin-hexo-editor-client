<template>
  <div class="nav-part fit column overflow-hidden">
    <q-toolbar class="text-white">
      <div class="text-h6" style="padding-left:18px">Hexo</div>
      <q-space />
      <q-btn
        flat
        round
        dense
        icon="help_outline"
        size="xx-small"
        color="grey-5"
      />
    </q-toolbar>
    <div class="full-width">
      <q-item class="title">
        <q-item-section>
          <q-item-label class="ellipsis">操作</q-item-label>
        </q-item-section>
      </q-item>
    </div>

    <q-list class="full-width" dense>
      <nav-list-item
        icon="local_airport"
        title="部署"
        color="primary"
      ></nav-list-item>
      <nav-list-item
        icon="movie_filter"
        title="生成"
        color="primary"
      ></nav-list-item>
      <nav-list-item icon="toys" title="清理" color="red"></nav-list-item>
      <nav-list-item
        icon="flight_takeoff"
        title="同步到GIT"
        color="primary"
      ></nav-list-item>
      <nav-list-item
        icon="flight_land"
        title="从GIT同步"
        color="red"
      ></nav-list-item>
    </q-list>

    <q-scroll-area class="col full-width">
      <q-item class="text-bold title">
        <q-item-section>
          <q-item-label class="ellipsis">筛选</q-item-label>
        </q-item-section>
      </q-item>
      <q-list dense>
        <nav-list-item
          icon="archive"
          title="全部"
          color="green"
          :count="totalCount"
        ></nav-list-item>
        <nav-list-item
          icon="create"
          title="文章"
          color="primary"
          :count="postCount"
        ></nav-list-item>
        <nav-list-item
          icon="drafts"
          title="草稿"
          color="yellow-8"
          :count="draftCount"
        ></nav-list-item>
        <nav-list-item
          icon="insert_drive_file"
          title="页面"
          color="cyan"
          :count="pageCount"
        ></nav-list-item>
      </q-list>
      <q-item class="text-bold title">
        <q-item-section>
          <q-item-label class="ellipsis">分类</q-item-label>
        </q-item-section>
      </q-item>
      <q-list dense>
        <category-item
          v-for="node in categoriesTreeNodes"
          :key="node._id"
          :node="node"
        ></category-item>
      </q-list>
      <q-item class="text-bold title">
        <q-item-section>
          <q-item-label class="ellipsis">标签云</q-item-label>
        </q-item-section>
      </q-item>
      <div class="tags">
        <q-chip
          square
          clickable
          class="bg-grey-8 text-grey-4"
          :ripple="false"
          size="xx-small"
          v-for="tag in tagsList"
          :key="tag._id"
        >
          <q-avatar color="grey-9" text-color="white" class="q-mr-xs">{{
            tag.posts.length
          }}</q-avatar>
          {{ tag.name }}
        </q-chip>
      </div>
    </q-scroll-area>
    <div class="full-width">
      <q-item clickable @click="onSettings">
        <q-item-section side>
          <q-avatar
            size="32px"
            color="primary"
            text-color="white"
            icon="person"
          />
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-grey-3 text-bold">{{
            $store.state.user.info.data.name
          }}</q-item-label>
          <q-item-label class="text-grey-6" caption>已登录</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-icon name="double_arrow" />
        </q-item-section>
      </q-item>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import NavListItem from "./NavListItem";
import CategoryItem from "./CategoryItem";
import Settings from "./Settings";
export default {
  name: "NavPart",
  components: {
    NavListItem,
    CategoryItem
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters("hexo", [
      "categoriesTreeNodes",
      "tagsList",
      "postCount",
      "pageCount",
      "totalCount",
      "draftCount"
    ])
  },
  methods: {
    onSettings() {
      this.$q.dialog({
        component: Settings,

        // optional if you want to have access to
        // Router, Vuex store, and so on, in your
        // custom component:
        parent: this // becomes child of this Vue node
        // ("this" points to your Vue component)
        // (prop was called "root" in < 1.1.0 and
        // still works, but recommending to switch
        // to the more appropriate "parent" name)
      });
    }
  }
};
</script>
