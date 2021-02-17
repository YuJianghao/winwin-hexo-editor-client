<template>
  <div class="tag-editor column">
    <q-expansion-item @show="onShow">
      <template v-slot:header>
        <!-- <q-item> -->
        <q-item-section>
          <q-item-label caption>
            标签
          </q-item-label>
          <q-item-label>
            <span v-if="tags.length < 1">无</span>
            <q-badge v-for="tag in tags" :key="tag" rounded class="q-mr-xs">{{
              tag
            }}</q-badge>
          </q-item-label>
        </q-item-section>
        <!-- </q-item> -->
      </template>
      <q-list dense style="padding:1px 0">
        <!-- <q-item v-for="tag in allTags" :key="tag" clickable>{{ tag }}</q-item> -->
        <q-item>
          <q-item-section>
            <q-item-label>
              <q-badge
                v-for="tag in allTags"
                :key="tag"
                rounded
                class="q-mr-xs q-mb-xs cursor-pointer"
                :class="{ unselected: !tags.includes(tag) }"
                @click="toggle(tag)"
              >
                {{ tag }}
              </q-badge>
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <m-input v-model="newTag" ref="input" @keydown.enter="onEnter">
              <template v-slot:prepend>
                <q-icon name="add" class="q-mr-sm" />
              </template>
              <template v-slot:append>
                <q-icon
                  name="done"
                  class="q-ml-sm cursor-pointer"
                  @click="add"
                />
              </template>
            </m-input>
          </q-item-section>
        </q-item>
      </q-list>
    </q-expansion-item>
  </div>
</template>

<script>
import { sortString } from "src/utils/common";
import MInput from "../UI/MInput";
export default {
  name: "TagEditor",
  props: {
    post: Object,
    getObj: Function,
    localUpdate: Function,
    existTags: Array
  },
  components: {
    MInput
  },
  data() {
    return {
      newTag: ""
    };
  },
  methods: {
    onEnter() {
      console.log(this.$refs.input.composition);
      if (!this.$refs.input.composition) this.add();
    },
    toggle(tag) {
      if (this.tags.includes(tag)) {
        this.tags = this.tags.filter(t => t !== tag);
      } else {
        this.tags = [tag].concat(this.tags);
      }
    },
    add() {
      if (this.newTag && !this.tags.includes(this.newTag)) {
        this.tags = [this.newTag].concat(this.tags);
      }
      this.newTag = "";
      this.$refs.input.focus();
    },
    onShow() {
      this.$nextTick(() => {
        this.$refs.input.focus();
      });
    }
  },
  computed: {
    tags: {
      get() {
        return this.post.tags.map(t => t).sort(sortString);
      },
      set(v) {
        let obj = this.getObj();
        obj.tags = v;
        this.localUpdate(obj);
      }
    },
    allTags() {
      const allTags = [];
      this.tags.forEach(t => allTags.push(t));
      this.existTags
        .filter(t => !allTags.includes(t))
        .forEach(t => allTags.push(t));
      return allTags.sort(sortString);
    }
  }
};
</script>
<style lang="scss">
.tag-editor {
  .q-badge.unselected {
    background-color: $light-3;
    color: $l-text-1;
  }
}
.body--dark .tag-editor {
  .q-badge.unselected {
    background-color: $dark-3;
    color: $d-text-1;
  }
}
</style>
