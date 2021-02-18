<template>
  <q-dialog
    ref="dialog"
    :persistent="advance"
    @hide="onDialogHide"
    @show="onShow"
  >
    <q-card class="new-article">
      <q-card-section>
        <div class="title text-h6 q-mb-md text-center">
          新建{{ layout === "page" ? "页面" : "文章" }}
        </div>
        <q-form @submit="onAdd" class="q-gutter-md">
          <table class="full-width">
            <tbody>
              <tr>
                <td>标题</td>
                <td><m-input v-model="title" ref="title"></m-input></td>
              </tr>
              <tr v-if="!advance">
                <td>页面</td>
                <td class="row items-center">
                  <q-toggle
                    :value="layout === 'page'"
                    @input="v => (layout = v ? 'page' : '')"
                  /><q-space />
                  <q-btn
                    icon="expand_more"
                    label="高级"
                    size="x-small"
                    rounded
                    flat
                    @click="advance = true"
                  />
                </td>
              </tr>
              <template v-else>
                <tr>
                  <td>layout</td>
                  <td><m-input v-model="layout"></m-input></td>
                </tr>
                <tr>
                  <td>path</td>
                  <td><m-input v-model="path"></m-input></td>
                </tr>
                <tr>
                  <td>slug</td>
                  <td><m-input v-model="slug"></m-input></td>
                </tr>
                <tr>
                  <td>随机slug</td>
                  <td class="row items-center">
                    <q-toggle v-model="randomSlug" /><q-space />
                  </td>
                </tr>
                <tr>
                  <td>replace</td>
                  <td class="row items-center">
                    <q-toggle v-model="replace" /><q-space />
                    <q-btn
                      icon="expand_less"
                      label="精简"
                      size="x-small"
                      rounded
                      flat
                      @click="advance = false"
                    />
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </q-form>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn label="取消" @click="onCancelClick" rounded dense />
        <q-btn
          color="primary"
          label="新建"
          @click="onAdd"
          rounded
          dense
          :disable="!title"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { fakeId } from "src/utils/common";
import MInput from "./UI/MInput";
export default {
  props: {
    // ...your custom props
  },
  components: {
    MInput
  },
  data() {
    return {
      fakeId: fakeId(),
      page: false,
      title: "",
      layout: "",
      path: "",
      slug: "",
      randomSlug: false,
      replace: false,
      advance: false
    };
  },

  methods: {
    async onAdd() {
      const opt = {};
      ["title", "layout", "path", "slug", "replace"].forEach(key => {
        if (this[key] !== undefined && this[key] !== "") opt[key] = this[key];
      });
      await this.$store.dispatch("hexo/newPostOrPage", {
        fakeId: this.fakeId,
        opt
      });
      const { trueId, page } = this.$store.state.hexo.creating[this.fakeId];
      this.$store.commit("hexo/clearFake", fakeId);
      if (page)
        this.$router.push({
          name: "edit",
          params: { type: "page", id: trueId }
        });
      else
        this.$router.push({
          name: "edit",
          params: { type: "post", id: trueId }
        });
      this.hide();
    },
    onShow() {
      this.$refs.title.focus();
    },
    // following method is REQUIRED
    // (don't change its name --> "show")
    show() {
      this.$refs.dialog.show();
    },

    // following method is REQUIRED
    // (don't change its name --> "hide")
    hide() {
      this.$refs.dialog.hide();
    },

    onDialogHide() {
      // required to be emitted
      // when QDialog emits "hide" event
      this.$emit("hide");
    },

    onOKClick() {
      // on OK, it is REQUIRED to
      // emit "ok" event (with optional payload)
      // before hiding the QDialog
      this.$emit("ok");
      // or with payload: this.$emit('ok', { ... })

      // then hiding dialog
      this.hide();
    },

    onCancelClick() {
      // we just need to hide dialog
      this.hide();
    }
  }
};
</script>
<style lang="scss">
.new-article {
  background-color: $light-3;
  min-width: 400px;
  table tr td:first-of-type {
    text-align: right;
    padding-right: 20px;
  }
  table tr td {
    padding: 5px 0;
  }
}
.body--dark .new-article {
  background-color: $dark-3;
}
</style>
