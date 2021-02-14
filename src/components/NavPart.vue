<template>
  <div class="nav-part fit column overflow-hidden">
    <q-toolbar class="toolbar">
      <div class="text-h6" style="padding-left:20px">Hexon</div>
      <q-space />
      <q-btn flat round dense icon="help_outline" size="xx-small" class="btn" />
    </q-toolbar>

    <q-scroll-area
      class="col full-width"
      :thumb-style="{ width: '6px', borderRadius: '3px' }"
    >
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
          @on-click="setFilter({ type: 'all' })"
          :selected="filter.type === 'all'"
        ></nav-list-item>
        <nav-list-item
          icon="create"
          title="文章"
          color="primary"
          :count="postCount"
          @on-click="setFilter({ type: 'post' })"
          :selected="filter.type === 'post'"
        ></nav-list-item>
        <nav-list-item
          icon="drafts"
          title="草稿"
          color="yellow-8"
          :count="draftCount"
          @on-click="setFilter({ type: 'draft' })"
          :selected="filter.type === 'draft'"
        ></nav-list-item>
        <nav-list-item
          icon="insert_drive_file"
          title="页面"
          color="cyan"
          :count="pageCount"
          @on-click="setFilter({ type: 'page' })"
          :selected="filter.type === 'page'"
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
        <tag-item
          v-for="tag in tagsList"
          :key="tag._id"
          :tag="tag"
          :selected="filter.type === 'tag' && filter.id === tag._id"
        ></tag-item>
      </div>
    </q-scroll-area>
    <div class="full-width corner">
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
          <q-item-label class="title text-bold">{{
            $store.state.user.info.data.name
          }}</q-item-label>
          <q-item-label class="caption" caption>已登录</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-icon name="double_arrow" class="icon" />
        </q-item-section>
      </q-item>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import NavListItem from "./NavListItem";
import TagItem from "./TagItem";
import CategoryItem from "./CategoryItem";
import Settings from "./Settings";
export default {
  name: "NavPart",
  components: {
    NavListItem,
    TagItem,
    CategoryItem
  },
  data() {
    return {};
  },
  computed: {
    ...mapState("ui", ["filter"]),
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
    ...mapMutations("ui", ["setFilter"]),
    onSettings() {
      // TODO: 以后选项多了，这里要弹出菜单给常用选项，然后菜单里有去设置的选项
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
<style lang="scss">
.nav-part {
  .toolbar {
    color: $l-text-1;
    .btn {
      color: $l-text-2;
    }
  }
  .q-item.item,
  .q-item.title {
    margin: 2px 8px 2px 16px;
    padding: 0 2px 0 16px;
    border-radius: 6px;
    color: $l-text-1;
  }
  .q-item.title {
    font-weight: bolder;
  }
  .q-item.item.selected {
    background-color: $grey-4;
  }
  .count {
    color: $l-text-2;
    font-size: smaller;
  }
  .count::before {
    content: " ";
  }
  .tags {
    margin-left: 28px;
  }
  .corner {
    .title {
      color: $l-text-1;
    }
    .caption,
    .icon {
      color: $l-text-2;
    }
  }
}
.body--dark .nav-part {
  .toolbar {
    color: $d-text-1;
    .btn {
      color: $d-text-2;
    }
  }
  // 旧的
  .count {
    color: $d-text-2;
  }
  .q-item.item,
  .q-item.title {
    color: $d-text-1;
  }
  .q-item.item.selected {
    background-color: $grey-9;
  }
  .corner {
    .title {
      color: $d-text-1;
    }
    .caption,
    .icon {
      color: $d-text-2;
    }
  }
}
</style>
