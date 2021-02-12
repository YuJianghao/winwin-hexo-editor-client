<template>
  <div class="list-part fit column">
    <q-toolbar>
      <m-input
        icon="search"
        class="col"
        :class="dark ? 'text-white' : 'text-grey-9'"
        placeholder="搜索"
      ></m-input>
      <q-btn
        color="primary"
        icon="add"
        round
        :ripple="false"
        size="x-small"
        class="q-ml-sm bg-whtie"
      />
    </q-toolbar>
    <div
      :class="dark ? 'text-grey-5' : 'text-grey-6'"
      class="row"
      style="padding:0 20px 0 24px;font-size:smaller"
    >
      <link-drop text="最新文章">
        <q-menu
          anchor="top middle"
          self="top middle"
          transition-hide="fade"
          transition-show="fade"
          content-style="border-radius:2px"
        >
          <q-list dense style="font-size:smaller">
            <q-item clickable v-close-popup>
              <q-item-section>
                <q-item-label>
                  最新文章
                </q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable v-close-popup>
              <q-item-section>
                <q-item-label>
                  最旧文章
                </q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable v-close-popup>
              <q-item-section>
                <q-item-label>
                  按名称 A-Z
                </q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable v-close-popup>
              <q-item-section>
                <q-item-label>
                  按名称 Z-A
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </link-drop>
    </div>
    <q-scroll-area
      class="full-width col q-pb-xs"
      :thumb-style="{ width: '6px', borderRadius: '3px' }"
    >
      <q-list class="article-list">
        <article-list-item
          v-for="article in articles"
          :key="article._id + article.__post"
          :article="article"
        ></article-list-item>
      </q-list>
    </q-scroll-area>
  </div>
</template>

<script>
import MInput from "../components/MInput";
import LinkDrop from "../components/LinkDrop";
import ArticleListItem from "../components/ArticleListItem";
import { mapState } from "vuex";
function obj2list(obj) {
  return Object.keys(obj).map(key => obj[key].data);
}
export default {
  name: "ListPart",
  components: {
    MInput,
    LinkDrop,
    ArticleListItem
  },
  computed: {
    ...mapState("hexo", {
      posts: state => obj2list(state.posts.data),
      pages: state => obj2list(state.pages.data)
    }),
    ...mapState("ui", {
      filter: state => state.filter
    }),
    dark() {
      return this.$q.dark.isActive;
    },
    articles() {
      const articles = this.posts.concat(this.pages);
      const result = [];
      if (this.filter.type === "all") return articles;
      if (this.filter.type === "post") return this.posts;
      if (this.filter.type === "page") return this.pages;
      if (this.filter.type === "draft")
        return this.posts.filter(p => !p.published);
      if (this.filter.type === "tag")
        return this.posts.filter(p => p.tags.includes(this.filter.id));
      if (this.filter.type === "category")
        return this.posts.filter(p => p.categories.includes(this.filter.id));
      return result;
    }
  },
  data() {
    return {};
  }
};
</script>
