<template>
  <q-page :style-fn="styleFn" class="bg-dark-2 column overflow-auto no-wrap">
    <div class="flex flex-center" style="flex:1 0 0">
      <q-form
        @submit="onSubmit"
        @reset="onReset"
        class="q-gutter-md"
        style="min-width:250px"
      >
        <div>
          <img
            src="~/assets/logo.png"
            style="max-width:100px;margin:0 auto;display:block"
          />
        </div>
        <p class="text-grey-6 text-center text-no-wrap" style="font-size:large">
          登录到 Hexo editor
        </p>
        <m-input
          v-model="name"
          type="text"
          :error="error"
          icon="person"
        ></m-input>
        <m-input
          v-model="pass"
          type="password"
          :error="error"
          icon="security"
        ></m-input>
        <div class="row">
          <q-btn
            color="primary"
            label="登录"
            rounded
            size="x-small"
            class="col"
            type="submit"
            style="height:30px"
            :ripple="false"
          />
        </div>
        <div class="row">
          <q-btn
            color="grey-6"
            label="忘记密码"
            flat
            rounded
            size="x-small"
            class="col"
            style="height:30px"
            :ripple="false"
          />
        </div>
      </q-form>
    </div>
    <div
      class="text-center text-grey-6 text-h6 text-no-wrap"
      style="font-size:x-small"
    >
      ©️ 2019 ~ {{ year }} winwin_2011
    </div>
  </q-page>
</template>

<script>
import MInput from "../components/MInput";
import { mapState } from "vuex";
export default {
  name: "Login",
  data() {
    return {
      name: "",
      pass: ""
    };
  },
  components: {
    MInput
  },
  computed: {
    year() {
      return new Date().getFullYear();
    },
    ...mapState("user", {
      error: state => state.err.indexOf("wrong") >= 0
      // TODO: 处理详细的错误代码
    })
  },
  methods: {
    styleFn(offset, height) {
      return {
        height: height + "px"
      };
    },
    onReset() {},
    async onSubmit() {
      await this.$store.dispatch("user/login", {
        name: this.name,
        pass: this.pass
      });
    }
  }
};
</script>
