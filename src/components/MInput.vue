<template>
  <div class="m-input relative-position" :class="{ error: error }">
    <div class="bg row items-center q-px-sm main">
      <q-icon :name="icon" v-if="icon" />
      <input
        :type="type"
        :placeholder="placeholder"
        class="col q-mx-xs"
        v-model="text"
        ref="input"
      />
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
    placeholder: {
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
      this.text = "";
      this.$refs.input.focus();
    }
  }
};
</script>
<style lang="scss">
.m-input {
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
    color: $l-text-1;
  }
  .bg {
    background-color: $light-1;
  }
}
.body--dark {
  .m-input {
    input {
      color: $d-text-1;
    }
    .bg {
      background-color: $grey-9;
    }
  }
}
</style>
