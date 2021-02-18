<template>
  <div class="list-part fit column">
    <q-toolbar class="toolbar">
      <m-input class="col" placeholder="搜索" clearable>
        <template v-slot:prepend>
          <q-icon name="search" class="q-mr-sm" />
        </template>
      </m-input>
      <q-btn
        color="primary"
        icon="add"
        round
        :ripple="false"
        size="x-small"
        class="q-ml-sm bg-whtie"
        @click="onNewArticle"
      />
    </q-toolbar>
    <div class="options row" style="padding:0 20px 0 24px;font-size:smaller">
      <link-drop :text="sortType(sort.key, sort.ascend)">
        <q-menu
          anchor="top middle"
          self="top middle"
          transition-hide="fade"
          transition-show="fade"
          content-style="border-radius:2px"
        >
          <q-list dense style="font-size:smaller">
            <q-item
              clickable
              v-close-popup
              @click="setSort(item.key, item.ascend)"
              v-for="item in sortTypesList"
              :key="item.key + item.ascend"
            >
              <q-item-section>
                <q-item-label>
                  {{ sortType(item.key, item.ascend) }}
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
          :key="article._id + article.__page"
          :article="article"
        ></article-list-item>
      </q-list>
    </q-scroll-area>
  </div>
</template>

<script>
import MInput from "../components/UI/MInput";
import LinkDrop from "../components/LinkDrop";
import ArticleListItem from "../components/ArticleListItem";
import NewArticle from "../components/NewArticle";
import { mapState, mapMutations } from "vuex";
import { array2dToArray1d, sortString } from "src/utils/common";
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
  data() {
    return {
      sortTypes: {
        date: { true: "最早创建的文章", false: "最新创建的文章" },
        updated: { true: "最早修改的文章", false: "最新修改的文章" },
        title: { true: "按名称 A-Z", false: "按名称 Z-A" }
      }
    };
  },
  computed: {
    ...mapState("hexo", {
      posts: state => obj2list(state.posts.data),
      pages: state => obj2list(state.pages.data)
    }),
    ...mapState("ui", {
      filter: state => state.filter,
      sort: state => state.sort
    }),
    sortTypesList() {
      return Object.keys(this.sortTypes)
        .map(key => {
          return [true, false].map(ascend => {
            return { key, ascend };
          });
        })
        .reduce((a, b) => a.concat(b), []);
    },
    articles() {
      const articles = this.posts.concat(this.pages);
      let result = [];
      switch (this.filter.type) {
        case "all":
          result = articles;
          break;
        case "post":
          result = this.posts;
          break;
        case "page":
          result = this.pages;
          break;
        case "draft":
          result = this.posts.filter(p => !p.published);
          break;
        case "tag":
          result = this.posts.filter(p => p.tags.includes(this.filter.id));
          break;
        case "category":
          result = this.posts.filter(p =>
            array2dToArray1d(p.categories).includes(this.filter.id)
          );
          break;
      }
      result.sort((a, b) => {
        switch (this.sort.key) {
          case "date":
            return (this.sort.ascend ? 1 : -1) * (a.date - b.date);
          case "updated":
            return (this.sort.ascend ? 1 : -1) * (a.updated - b.updated);
          case "title":
            return (this.sort.ascend ? 1 : -1) * sortString(a.title, b.title);
        }
        return 1;
      });
      return result;
    }
  },
  methods: {
    ...mapMutations("ui", {
      setSort: (commit, key, ascend) => {
        commit("setSort", { key, ascend });
      }
    }),
    sortType(key, ascend) {
      return this.sortTypes[key][ascend];
    },
    onNewArticle() {
      this.$q.dialog({
        component: NewArticle,
        parent: this
      });
    }
  }
};
</script>
<style lang="scss">
.list-part {
  .toolbar {
    color: $l-text-1;
  }
  .options {
    color: $l-text-2;
  }
}
.body--dark .list-part {
  .toolbar {
    color: $d-text-1;
  }
  .options {
    color: $d-text-2;
  }
}
</style>
