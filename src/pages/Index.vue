<template>
  <q-page class="index overflow-hidden" :style-fn="styleFn">
    <q-splitter
      v-model="nav"
      unit="px"
      separator-class="separator-1"
      class="fit"
      :limits="[180, Infinity]"
    >
      <template v-slot:before>
        <nav-part></nav-part>
      </template>
      <template v-slot:after>
        <q-splitter
          v-model="list"
          unit="px"
          separator-class="separator-2"
          class="fit"
          :limits="[250, Infinity]"
        >
          <template v-slot:before>
            <list-part></list-part>
          </template>
          <template v-slot:after>
            <div class="view-part fit">
              <router-view></router-view>
            </div>
          </template>
        </q-splitter>
      </template>
    </q-splitter>
  </q-page>
</template>

<script>
import { mapGetters } from "vuex";
import NavPart from "../components/NavPart";
import ListPart from "../components/ListPart";

export default {
  name: "PageIndex",
  components: {
    NavPart,
    ListPart
  },
  data() {
    return {
      nav: 200,
      list: 320
    };
  },
  computed: {
    ...mapGetters("hexo", {
      treeNodes: "categoriesTreeNodes"
    })
  },
  methods: {
    styleFn(offset, height) {
      return {
        height: height + "px"
      };
    }
  }
};
</script>
<style lang="scss">
.index {
  background-color: $light-3;
  .separator-1 {
    background-color: $light-1;
  }
  .separator-2 {
    background-color: $light-3;
  }
  .nav-part {
    background-color: $light-1;
  }
  .list-part {
    background-color: $light-2;
  }
  .view-part {
    background-color: $light-3;
  }
}
.body--dark {
  .index {
    background-color: $dark-3;
    .separator-1 {
      background-color: $dark-1;
    }
    .separator-2 {
      background-color: $dark-3;
    }
    .nav-part {
      background-color: $dark-1;
    }
    .list-part {
      background-color: $dark-2;
    }
    .view-part {
      background-color: $dark-3;
    }
  }
}
</style>
