<template>
  <q-item
    clickable
    :class="selected ? (dark ? 'bg-dark-3' : 'bg-light-1') : ''"
    @click="onClick"
    style="padding: 10px 16px;border-radius:6px"
    class="q-mx-sm q-my-xs"
  >
    <q-item-section>
      <q-item-label
        class="text-bold"
        :class="dark ? 'text-grey-3' : 'text-grey-9'"
      >
        <q-icon
          name="drafts"
          color="yellow-9"
          v-if="article.__post && !article.published"
        />
        <q-icon name="insert_drive_file" color="cyan" v-if="article.__page" />
        {{ article.title }}
      </q-item-label>
      <q-item-label
        caption
        lines="3"
        :class="dark ? 'text-grey-6' : 'text-grey-7'"
        >{{ article._content.slice(0, 100) }}
      </q-item-label>
      <q-item-label v-if="article.tags && article.tags.length > 0">
        <q-badge
          :color="dark ? 'grey-9' : 'grey-4'"
          :text-color="dark ? 'grey-6' : 'grey-8'"
          class="q-mr-xs"
          :label="tags[tag].data.name"
          v-for="tag in article.tags"
          :key="tag"
        />
      </q-item-label>
      <q-item-label class="text-blue q-pt-xs" style="font-size:xx-small">
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
    dark() {
      return this.$q.dark.isActive;
    },
    selected() {
      if (this.article._id !== this.$route.params.id) return false;
      if (this.$route.path.includes("page") && this.article.__page === true)
        return true;
      if (this.$route.path.includes("post") && this.article.__post === true)
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
