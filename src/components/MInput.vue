<template>
  <div class="m-input" :class="{ error: error }">
    <div class="row items-center q-px-sm bg-grey-9 text-grey-3 main">
      <q-icon :name="icon" v-if="icon" />
      <input :type="type" class="col q-mx-xs text-grey-3" v-model="text" />
      <q-icon name="close" class="action" @click="onReset" />
    </div>
  </div>
</template>

<script>
export default {
  name: "MInput",
  props: {
    value: {
      type: String
    },
    type: {
      type: String
    },
    icon: {
      type: String
    },
    error: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      text: this.value
    };
  },
  computed: {
    classes() {
      const classes = [];
      classes.push("col");
      if (this.icon) classes.push("q-ml-sm");
      else classes.push("q-ml-md");
      classes.push("q-mr-sm");
      return classes;
    },
    styles() {
      const style = {};
      style["border-radius"] = "15px";
      return style;
    }
  },
  watch: {
    value(v) {
      this.text = v;
    },
    text(v) {
      this.$emit("input", v);
    }
  },
  methods: {
    onReset() {
      this.$emit("input", "");
      this.$refs.input.focus();
    }
  }
};
</script>
<style lang="scss">
.m-input {
  position: relative;
  &.error {
    .main {
      border: 1px solid $negative;
    }
  }
  .main {
    height: 30px;
    border-radius: 15px;
    .action {
      &:hover {
        cursor: pointer;
      }
    }
  }
  input {
    font-size: small;
    background: none;
    outline: none;
    border: none;
  }
}
</style>
