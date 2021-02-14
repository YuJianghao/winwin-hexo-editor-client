<template>
  <q-page class="editor overflow-hidden" :style-fn="styleFn">
    <div v-if="!post" class="fit column">
      <q-toolbar>
        <q-btn
          size="x-small"
          color="primary"
          label="返回"
          :ripple="false"
          rounded
          @click="$router.push('/')"
        />
      </q-toolbar>
      <article-404 class="col"></article-404>
    </div>
    <template v-else>
      <q-splitter
        class="fit"
        v-model="splitter"
        unit="px"
        reverse
        separator-class="separator"
      >
        <template v-slot:before>
          <div class="main fit column">
            <q-toolbar>
              <q-btn
                size="x-small"
                color="primary"
                label="返回"
                :ripple="false"
                rounded
                @click="onBack"
              />
              <input
                class="title col"
                type="text"
                v-model="title"
                placeholder="请输入标题"
              />
              <q-btn
                v-if="post.__post && !post.published"
                size="x-small"
                class="q-ml-sm"
                icon="publish"
                :ripple="false"
                color="positive"
                flat
                round
              />
              <q-btn
                size="x-small"
                class="q-ml-sm"
                icon="save"
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
                icon="code"
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
            <div class="col"></div>
          </div>
        </template>
        <template v-slot:after>
          <div class="side fit column">
            <q-scroll-area class="col">
              <div class="column">
                <q-toolbar>
                  <div class="text-h6" style="padding-left:16px">
                    Frontmatters
                  </div>
                </q-toolbar>
                <q-list class="m-form">
                  <q-item>
                    <q-item-section>
                      <q-item-label caption>
                        发布于
                      </q-item-label>
                      <q-item-label class="row no-wrap">
                        <m-input
                          v-model="date"
                          :error="err.date"
                          class="col"
                        ></m-input>
                        <q-btn
                          size="x-small"
                          icon="date_range"
                          :ripple="false"
                          round
                        >
                          <q-menu>
                            <div class="row">
                              <q-date
                                v-model="date"
                                mask="YYYY-M-D H:mm:ss"
                                color="primary"
                                class="no-shadow"
                              />
                              <q-time
                                v-model="date"
                                mask="YYYY-M-D H:mm:ss"
                                color="primary"
                                class="no-shadow"
                                format24h
                              />
                            </div>
                          </q-menu>
                        </q-btn>
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section>
                      <q-item-label caption>
                        更新于
                      </q-item-label>
                      <q-item-label class="row no-wrap">
                        <m-input
                          v-model="updated"
                          :error="err.updated"
                          class="col"
                        ></m-input>
                        <q-btn
                          size="x-small"
                          icon="date_range"
                          :ripple="false"
                          round
                        >
                          <q-menu>
                            <div class="row">
                              <q-date
                                v-model="date"
                                mask="YYYY-M-D H:mm:ss"
                                color="primary"
                                class="no-shadow"
                              />
                              <q-time
                                v-model="date"
                                mask="YYYY-M-D H:mm:ss"
                                color="primary"
                                class="no-shadow"
                                format24h
                              />
                            </div>
                          </q-menu>
                        </q-btn>
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section>
                      <q-item-label caption>
                        标签
                      </q-item-label>
                      <q-item-label>
                        <q-chip
                          :label="tag"
                          v-for="(tag, idx) in tags"
                          :key="tag"
                          removable
                          clickable
                          size="x-small"
                          @remove="removeTag(idx)"
                          :ripple="false"
                        />
                        <q-chip
                          label="添加"
                          size="x-small"
                          clickable
                          @click="addTag"
                          :ripple="false"
                        />
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section>
                      <q-item-label caption>
                        分类
                      </q-item-label>
                      <q-item-label
                        v-for="(category, idx) in categories"
                        :key="category.join('')"
                      >
                        <template v-for="(cate, d) in category">
                          <q-chip
                            :label="cate"
                            :key="cate + d"
                            size="x-small"
                            removable
                            clickable
                            :ripple="false"
                            @remove="removeCategory(idx, d)"
                          />
                          <q-icon name="chevron_right" :key="'i' + cate + d" />
                        </template>
                        <q-chip
                          label="添加"
                          size="x-small"
                          clickable
                          :ripple="false"
                          @click="addCategory(idx)"
                        />
                      </q-item-label>
                      <q-item-label>
                        <q-chip
                          label="添加"
                          size="x-small"
                          clickable
                          :ripple="false"
                          @click="addCategory()"
                        />
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section>
                      <q-item-label caption class="row items-center">
                        其他
                        <q-icon name="help" class="q-ml-xs cursor-pointer">
                          <q-menu content-class="q-pa-sm pop">
                            <q-markdown
                              :src="helper.frontmatter"
                              style="max-width:400px"
                            >
                            </q-markdown>
                          </q-menu>
                        </q-icon>
                      </q-item-label>
                      <q-item-label>
                        <m-textarea
                          class="m-codearea"
                          v-model="fm"
                          :placeholder="'key: value'"
                        ></m-textarea
                      ></q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </div>
            </q-scroll-area>
          </div>
        </template>
      </q-splitter>
    </template>
  </q-page>
</template>

<script>
import { date } from "quasar";
import { mapGetters } from "vuex";
import Article404 from "../components/Article404";
import MInput from "../components/MInput";
import MTextarea from "../components/MTextarea";
import { DATE_FORMAT } from "src/utils/constants";
import frontmatter from "src/markdown/helper/frontmatter.md";
export default {
  name: "Editor",
  data() {
    return {
      err: {
        date: false,
        updated: false
      },
      splitter: 300,
      tags: ["t1", "t2", "t3", "t4", "t5", "t6"],
      categories: [["c11", "c12"], ["c2"], ["c3"]],
      fm: "",
      helper: {
        frontmatter
      }
    };
  },
  components: {
    Article404,
    MInput,
    MTextarea
  },
  watch: {
    date(v) {
      this.err.date = this.date && isNaN(new Date(this.date).getTime());
    },
    updated(v) {
      this.err.updated =
        this.updated && isNaN(new Date(this.updated).getTime());
    }
  },
  computed: {
    date: {
      get() {
        return this.post.date;
      },
      set(v) {
        let obj = this.getObj();
        obj.date = v;
        this.localUpdate(obj);
      }
    },
    updated: {
      get() {
        return this.post.updated;
      },
      set(v) {
        let obj = this.getObj();
        obj.updated = v;
        this.localUpdate(obj);
      }
    },
    title: {
      get() {
        return this.post.title;
      },
      set(v) {
        const obj = this.getObj();
        obj.title = v;
        this.localUpdate(obj);
      }
    },
    strdate: {
      get() {
        return this.formatDate(this.date);
      },
      set(v) {
        this.date = new Date(v).valueOf();
      }
    },
    strupdated: {
      get() {
        return this.formatDate(this.updated);
      },
      set(v) {
        this.updated = new Date(v).valueOf();
      }
    },
    ...mapGetters("hexo", ["modifiedPost", "modifiedPage"]),
    modify() {
      if (this.$route.params.type === "post")
        return this.$store.state.hexo.posts.data[this.$route.params.id].modify;
      if (this.$route.params.type === "page")
        return this.$store.state.hexo.pages.data[this.$route.params.id].modify;
      return {};
    },
    post() {
      if (this.$route.params.type === "post")
        return this.modifiedPost(this.$route.params.id);
      if (this.$route.params.type === "page")
        return this.modifiedPage(this.$route.params.id);
      return null;
    }
  },
  methods: {
    localUpdate(obj) {
      this.$store.commit("hexo/localUpdatePost", { id: this.post._id, obj });
    },
    // 获取一个包含原始数据且叠加已更改数据的文章对象
    getObj() {
      let obj = Object.assign({}, this.post.fm);
      obj = Object.assign(obj, this.modify);
      return obj;
    },
    addCategory(idx) {
      if (idx === undefined) this.categories.push(["new cate"]);
      else this.categories[idx].push("new cate");
    },
    removeCategory(idx, d) {
      console.log(idx, d, this.categories[idx]);
      if (d === 0) this.categories.splice(idx, 1);
      else this.$set(this.categories, idx, this.categories[idx].slice(0, d));
    },
    addTag() {
      this.tags.push("new tag");
    },
    removeTag(idx) {
      this.tags.splice(idx, 1);
    },
    styleFn(offset, height) {
      return {
        height: height + "px"
      };
    },
    onBack() {
      // TODO: 检查是否需要保存
      this.$router.push({ name: "view", params: this.$route.params });
    },
    formatDate(timestramp) {
      return date.formatDate(timestramp, DATE_FORMAT);
    }
  }
};
</script>
<style lang="scss">
.editor {
  color: $l-text-1;
  input.title {
    border: none;
    outline: none;
    padding: 0 16px;
    font-size: large;
    font-weight: bold;
    color: $l-text-1;
    background: none;
  }
  .main {
    background-color: $light-3;
  }
  .separator {
    background-color: $light-3;
  }
  .side {
    background-color: $light-1;
  }
}
.body--dark .editor {
  color: $d-text-1;
  input.title {
    color: $d-text-1;
  }
  .main {
    background-color: $dark-3;
  }
  .separator {
    background-color: $dark-3;
  }
  .side {
    background-color: $dark-1;
    .q-list--dark,
    .q-item--dark {
      color: $d-text-1;
    }
  }
}
</style>
