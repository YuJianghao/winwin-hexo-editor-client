<template>
  <q-item
    clickable
    :class="selected ? 'bg-dark-3' : ''"
    @click="onClick"
    style="padding: 10px 16px;border-radius:6px"
    class="q-mx-sm q-my-xs"
  >
    <q-item-section>
      <q-item-label class="text-grey-3 text-bold">
        <q-icon
          name="drafts"
          color="yellow-9"
          v-if="article.__post && !article.published"
        />
        <q-icon name="insert_drive_file" color="cyan" v-if="article.__page" />
        {{ article.title }}
      </q-item-label>
      <q-item-label caption lines="3" class="text-grey-5"
        >{{ article._content.slice(0, 100) }}
      </q-item-label>
      <q-item-label>
        <q-badge
          color="grey-9"
          text-color="grey-6"
          class="q-mr-xs"
          :label="tags[tag].data.name"
          v-for="tag in article.tags"
          :key="tag"
        />
      </q-item-label>
      <q-item-label class="text-blue q-pt-sm" style="font-size:xx-small">
        {{ readable(new Date().valueOf() - article.date) }}
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
import { mapState } from "vuex";
function readable(diff) {
  let remaining = diff / 1000;
  const year = Math.floor(remaining / 365 / 86400);
  remaining -= year * 365 * 86400;
  if (year > 0) return `${year}年前`;
  const month = Math.floor(remaining / 30 / 86400);
  remaining -= month * 30 * 86400;
  if (month > 0) return `${month}个月前`;
  const day = Math.floor(remaining / 86400);
  remaining -= day * 86400;
  if (day > 0) return `${day}天前`;
  const hour = Math.floor(remaining / 3600);
  remaining -= hour * 3600;
  if (hour > 0) return `${hour}小时前`;
  const minute = Math.floor(remaining / 60);
  remaining -= minute * 60;
  if (minute > 0) return `${minute}分钟前`;
  return `${remaining}秒前`;
}
export default {
  name: "ArticleListItem",
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  data() {
    return {};
  },
  computed: {
    ...mapState("hexo", {
      tags: state => state.tags.data,
      categories: state => state.categories.data
    }),
    selected() {
      if (this.article._id !== this.$route.params.id) return false;
      if (this.$route.params.type === "page" && this.article.__page === true)
        return true;
      if (this.$route.params.type === "post" && this.article.__post === true)
        return true;
      return false;
    }
  },
  methods: {
    readable: readable,
    onClick() {
      const path =
        (this.article.__post ? "/post" : "/page") + "/" + this.article._id;
      if (this.$route.path === path) this.$router.push("/");
      else this.$router.push(path);
    }
  }
};
</script>
