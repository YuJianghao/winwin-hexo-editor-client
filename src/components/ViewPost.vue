<template>
  <div class="viewpost fit">
    <div v-if="!post" class="fit column flex-center">
      <svg
        width="150"
        height="150"
        viewBox="5 0 200 200"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        xml:space="preserve"
        xmlns:serif="http://www.serif.com/"
        style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;"
      >
        <path
          d="M167.25,85.75C169,85.75 170.25,84.5 170.25,82.75L170.25,33.25C170.25,31.5 169,30.25 167.25,30.25L46.75,30.25C45,30.25 43.75,31.5 43.75,33.25L43.75,69.5L32.75,69.5C31,69.5 29.75,70.75 29.75,72.5C29.75,74.25 31,75.5 32.75,75.5L43.75,75.5L43.75,122.75L32.75,122.75C31,122.75 29.75,124 29.75,125.75C29.75,127.5 31,128.75 32.75,128.75L43.75,128.75L43.75,166.75C43.75,168.5 45,169.75 46.75,169.75L167.5,169.75C169.25,169.75 170.5,168.5 170.5,166.75L170.5,117.25C170.5,115.5 169.25,114.25 167.5,114.25C159.75,114.25 153.25,107.75 153.25,100C153,92.25 159.5,85.75 167.25,85.75ZM147,100C147,110 154.5,118.5 164.25,120L164.25,163.75L49.75,163.75L49.75,128.75L60.75,128.75C62.5,128.75 63.75,127.5 63.75,125.75C63.75,124 62.5,122.75 60.75,122.75L49.75,122.75L49.75,75.5L60.75,75.5C62.5,75.5 63.75,74.25 63.75,72.5C63.75,70.75 62.5,69.5 60.75,69.5L49.75,69.5L49.75,36.25L164.5,36.25L164.5,80C154.5,81.5 147,90 147,100Z"
          :style="`fill:${color};fill-rule:nonzero;`"
        />
        <path
          d="M140.25,125.5L72.75,125.5C71,125.5 69.75,126.75 69.75,128.5C69.75,130.25 71,131.5 72.75,131.5L140,131.5C141.75,131.5 143,130.25 143,128.5C143.25,126.75 141.75,125.5 140.25,125.5ZM140.25,144.25L72.75,144.25C71,144.25 69.75,145.5 69.75,147.25C69.75,149 71,150.25 72.75,150.25L140,150.25C141.75,150.25 143,149 143,147.25C143.25,145.5 141.75,144.25 140.25,144.25Z"
          :style="`fill:${color};fill-rule:nonzero;`"
        />
        <g transform="matrix(1,0,0,1,8.38873,-7.45011)">
          <path
            d="M109.5,71C112.25,73.5 113.5,76.75 113.5,81C113.5,84.25 112.5,87 110.75,89.5C110,90.25 108.25,92.25 105,95C103.5,96.25 102.5,97.5 101.75,99C100.75,100.5 100.5,102.25 100.5,104.25L100.5,106L94.75,106L94.75,104.25C94.75,101.75 95.25,99.75 96,98C96.75,96 99.25,93.25 103.25,89.75L105.75,87.25C107.25,85.5 107.75,83.5 107.75,81.5C107.75,78.75 107,76.5 105.5,74.75C103.75,73 101.5,72.25 98.5,72.25C95,72.25 92.25,73.5 90.5,75.75C89,77.75 88.25,80.5 88.25,84L82.5,84C82.5,79 84,75 86.75,72C89.75,68.75 93.75,67.25 98.75,67.25C103,67.25 106.75,68.5 109.5,71ZM100.5,112C101.25,112.75 101.75,113.75 101.75,115C101.75,116.25 101.25,117.25 100.5,118C99.5,118.75 98.5,119.25 97.5,119.25C96.25,119.25 95.25,118.75 94.5,118C93.75,117.25 93.25,116 93.25,115C93.25,113.75 93.75,112.75 94.5,112C95.25,111.25 96.25,110.75 97.5,110.75C98.5,111 99.75,111.25 100.5,112Z"
            :style="`fill:${color};fill-rule:nonzero;`"
          />
        </g>
      </svg>
      <div class="text-bold" :style="`font-size:large;color:${text}`">
        没找到对应文章，你是不是没写？
      </div>
    </div>
    <template v-else>
      <div class="main fit column">
        <q-toolbar>
          <q-space />
          <q-btn
            size="x-small"
            class="q-ml-sm"
            icon="edit"
            color="primary"
            :ripple="false"
            flat
            round
          />
          <q-btn
            size="x-small"
            class="q-ml-sm"
            icon="delete"
            color="negative"
            :ripple="false"
            flat
            round
          />
          <q-btn
            size="x-small"
            class="q-ml-sm"
            icon="more_horiz"
            :ripple="false"
            flat
            round
          />
        </q-toolbar>
        <q-scroll-area
          class="col content"
          :thumb-style="{ width: '6px', borderRadius: '3px' }"
        >
          <div style="padding-bottom:50px">
            <div class="container">
              <div class="header">
                <div class="title">
                  {{ post.title }}
                </div>
                <div class="info">
                  <span class="date">
                    <q-icon
                      name="date_range"
                      class="icon"
                      style="transform:translateY(-1px)"
                    />
                    <span>{{ date }}</span>
                  </span>
                  <span class="categories" v-if="category2d.length > 0">
                    <q-icon name="folder" class="icon" />
                    <span
                      v-for="categories in category2d"
                      :key="'s' + categories.map(c => c._id).join('')"
                      class="category"
                    >
                      <template v-for="(category, idx) in categories">
                        <span :key="'t' + category._id">{{
                          category.name
                        }}</span>
                        <q-icon
                          name="chevron_right"
                          style="margin:0 -2px"
                          :key="'i' + category._id"
                          v-if="idx < categories.length - 1"
                        />
                      </template>
                    </span>
                  </span>
                  <span
                    class="tags"
                    v-if="post.tags && post.tags.length && post.tags.length > 0"
                  >
                    <q-icon name="sell" class="icon" />
                    <span v-for="tag in post.tags" :key="tag" class="tag">{{
                      tags[tag].data.name
                    }}</span>
                  </span>
                </div>
                <!-- TODO: 日期，分类，标签 的显示 -->
                <!-- TODO: frontmatter要显示么 -->
                <!-- TODO: 草稿和页面标识 -->
              </div>
            </div>
            <q-markdown :src="post._content" class="container"></q-markdown>
          </div>
        </q-scroll-area>
      </div>
    </template>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import LTT from "list-to-tree";
import { date } from "quasar";

function expand(category) {
  if (!category._child) return [category];
  return [category].concat(expand(category._child[0]));
}
export default {
  name: "ViewPost",
  data() {
    return {};
  },
  computed: {
    ...mapState("hexo", {
      posts: state => state.posts.data,
      tags: state => state.tags.data
    }),
    ...mapGetters("hexo", ["categoriesList"]),
    dark() {
      return this.$q.dark.isActive;
    },
    post() {
      const obj = this.posts[this.$route.params.id];
      return obj ? obj.data : null;
    },
    date() {
      return date.formatDate(this.post.date, "YYYY-M-D H:m:s");
    },
    color() {
      return this.$q.dark.isActive ? "#444" : "#eee";
    },
    text() {
      return this.$q.dark.isActive ? "#555" : "#ddd";
    },
    category2d() {
      const list = this.categoriesList
        .map(obj => {
          if (obj.parent === undefined) obj.parent = 0;
          return obj;
        })
        .filter(c => this.post.categories.includes(c._id));
      const ltt = new LTT(list, {
        key_id: "_id",
        key_parent: "parent",
        key_child: "_child"
      });
      return (ltt.GetTree() || []).map(expand);
    }
  }
};
</script>
<style lang="scss" scoped>
// TODO: 整理下各种CSS吧，太乱了
.content,
.content * {
  user-select: text;
}
.container {
  margin: 0 auto;
  max-width: 768px;
}
.header {
  margin-bottom: 20px;
}
.title {
  font-size: xx-large;
  font-weight: bold;
}
.info {
  margin: 10px 0;
  color: $l-text-2;
  font-weight: 500;
  align-items: center;
  .icon {
    margin-right: 4px;
  }
  .date,
  .tags,
  .categories {
    margin-right: 8px;
  }
  .tags,
  .categories {
    display: inline-block;
  }
  .tags .tag::after,
  .categories .category::after {
    content: ", ";
  }
  .tags .tag:last-of-type::after,
  .categories .category:last-of-type::after {
    content: "";
  }
}
.viewpost .main {
  color: $grey-9;
}
.body--dark {
  .info {
    color: $l-text-2;
  }
  .viewpost .main {
    color: $grey-3;
  }
}
</style>
<style lang="scss">
// markdown样式覆盖
.q-markdown {
  color: $grey-9;
}
.body--dark .q-markdown {
  color: $grey-3;
}
.q-markdown--note,
blockquote.q-markdown--note,
.q-markdown--line-numbers-wrapper,
.body--dark .q-markdown .q-markdown--note,
.body--dark .q-markdown blockquote.q-markdown--note,
.body--dark .q-markdown .q-markdown--line-numbers-wrapper {
  border: none;
  border-radius: 6px;
}
.q-markdown--link {
  color: $primary;
  border-bottom: none;
}
.q-markdown .q-markdown--token {
  border-color: $grey-5;
}
.body--dark .q-markdown .q-markdown--token {
  border-color: $grey-7;
}
.q-markdown--table,
.q-markdown--table thead tr th,
.q-markdown--table tbody td,
.q-markdown--table tbody th {
  border-style: none;
}
.footnote-backref,
.footnote-backref a,
.footnote-ref,
.footnote-ref a {
  color: $primary;
}
</style>
