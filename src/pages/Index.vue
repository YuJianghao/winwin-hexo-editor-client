<template>
  <q-page class="row overflow-hidden" :style-fn="styleFn">
    <q-splitter
      v-model="nav"
      unit="px"
      separator-class="bg-dark-3"
      class="split fit"
      :limits="[180, Infinity]"
    >
      <template v-slot:before>
        <nav-part></nav-part>
      </template>
      <template v-slot:after>
        <q-splitter
          v-model="list"
          unit="px"
          separator-class="bg-dark-3"
          class="fit"
          :limits="[250, Infinity]"
        >
          <template v-slot:before>
            <list-part></list-part>
          </template>
          <template v-slot:after><div class="view-part fit"></div></template>
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
<style lang="scss"></style>
