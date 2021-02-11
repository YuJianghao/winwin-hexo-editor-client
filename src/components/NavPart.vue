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
      <q-item class="text-grey-3 title">
        <q-item-section>
          <q-item-label class="ellipsis">操作</q-item-label>
        </q-item-section>
      </q-item>
    </div>

    <q-list class="full-width" dense>
      <nav-part-item
        icon="local_airport"
        title="部署"
        color="primary"
      ></nav-part-item>
      <nav-part-item
        icon="movie_filter"
        title="生成"
        color="primary"
      ></nav-part-item>
      <nav-part-item icon="toys" title="清理" color="red"></nav-part-item>
      <nav-part-item
        icon="flight_takeoff"
        title="同步到GIT"
        color="primary"
      ></nav-part-item>
      <nav-part-item
        icon="flight_land"
        title="从GIT同步"
        color="red"
      ></nav-part-item>
    </q-list>

    <q-scroll-area class="col full-width">
      <q-item class="text-grey-3 text-bold title">
        <q-item-section>
          <q-item-label class="ellipsis">筛选</q-item-label>
        </q-item-section>
      </q-item>
      <q-list dense>
        <nav-part-item
          icon="archive"
          title="全部"
          color="green"
          :count="16"
        ></nav-part-item>
        <nav-part-item
          icon="create"
          title="文章"
          color="primary"
          :count="16"
        ></nav-part-item>
        <nav-part-item
          icon="drafts"
          title="草稿"
          color="yellow-8"
          :count="16"
        ></nav-part-item>
        <nav-part-item
          icon="insert_drive_file"
          title="页面"
          color="cyan"
          :count="16"
        ></nav-part-item>
      </q-list>
      <q-item class="text-grey-3 text-bold title">
        <q-item-section>
          <q-item-label class="ellipsis">分类</q-item-label>
        </q-item-section>
      </q-item>
      <q-list dense>
        <nav-part-item
          icon="folder"
          title="代码"
          color="yellow-6"
          :count="16"
        ></nav-part-item>
        <nav-part-item
          icon="folder"
          title="代码"
          color="yellow-6"
          :count="16"
          :indent="1"
          selected
        ></nav-part-item>
      </q-list>
      <q-item class="text-grey-3 text-bold title">
        <q-item-section>
          <q-item-label class="ellipsis">标签云</q-item-label>
        </q-item-section>
      </q-item>
      <div class="tags">
        <q-chip
          square
          clickable
          class="bg-grey-8 text-grey-4"
          dense
          :ripple="false"
          size="small"
        >
          <q-avatar color="grey-9" text-color="white">50</q-avatar>
          vue3
        </q-chip>
      </div>
    </q-scroll-area>
    <div class="full-width">
      <q-btn color="primary" icon="logout" label="退出" @click="onClick" />
    </div>
    <div class="full-width">
      <q-item clickable>
        <q-item-section side>
          <q-avatar
            size="32px"
            color="primary"
            text-color="white"
            icon="person"
          />
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-grey-3 text-bold">Admin</q-item-label>
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
import NavPartItem from "./NavPartItem";
export default {
  name: "NavPart",
  components: {
    NavPartItem
  },
  data() {
    return {};
  },
  methods: {
    onClick() {
      this.$store.dispatch("user/logout");
    }
  }
};
</script>
