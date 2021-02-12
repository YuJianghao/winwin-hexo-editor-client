<template>
  <q-page class="row overflow-hidden" :style-fn="styleFn">
    <q-splitter
      v-model="nav"
      unit="px"
      :separator-class="$q.dark.isActive ? 'bg-dark-1' : 'bg-light-1'"
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
          :separator-class="$q.dark.isActive ? 'bg-dark-3' : 'bg-light-3'"
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
.nav-part {
  background-color: $light-1;
}
.list-part {
  background-color: $light-2;
}
.view-part {
  background-color: $light-3;
}
.body--dark {
  background-color: $dark-3;
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
</style>
