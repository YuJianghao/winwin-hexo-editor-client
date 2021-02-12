<template>
  <q-page class="row overflow-hidden" :style-fn="styleFn">
    <q-splitter
      v-model="nav"
      unit="px"
      separator-class="bg-dark-2"
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
          <template v-slot:after>
            <div class="view-part fit relative-position">
              <div class="fit flex flex-center">
                <div class="column items-center">
                  <svg
                    t="1613117280796"
                    class="icon"
                    viewBox="50 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="1731"
                    width="150"
                    height="150"
                  >
                    <path
                      d="M856.32 439.04c8.96 0 15.36-6.4 15.36-15.36V170.24c0-8.96-6.4-15.36-15.36-15.36H239.36c-8.96 0-15.36 6.4-15.36 15.36v185.6h-56.32c-8.96 0-15.36 6.4-15.36 15.36s6.4 15.36 15.36 15.36h56.32v241.92h-56.32c-8.96 0-15.36 6.4-15.36 15.36s6.4 15.36 15.36 15.36h56.32v194.56c0 8.96 6.4 15.36 15.36 15.36H857.6c8.96 0 15.36-6.4 15.36-15.36V600.32c0-8.96-6.4-15.36-15.36-15.36-39.68 0-72.96-33.28-72.96-72.96-1.28-39.68 32-72.96 71.68-72.96zM752.64 512c0 51.2 38.4 94.72 88.32 102.4v224H254.72v-179.2h56.32c8.96 0 15.36-6.4 15.36-15.36s-6.4-15.36-15.36-15.36h-56.32V386.56h56.32c8.96 0 15.36-6.4 15.36-15.36s-6.4-15.36-15.36-15.36h-56.32V185.6h587.52V409.6c-51.2 7.68-89.6 51.2-89.6 102.4z"
                      fill="#444"
                      p-id="1732"
                    ></path>
                    <path
                      d="M718.08 642.56h-345.6c-8.96 0-15.36 6.4-15.36 15.36s6.4 15.36 15.36 15.36H716.8c8.96 0 15.36-6.4 15.36-15.36 1.28-8.96-6.4-15.36-14.08-15.36zM718.08 738.56h-345.6c-8.96 0-15.36 6.4-15.36 15.36s6.4 15.36 15.36 15.36H716.8c8.96 0 15.36-6.4 15.36-15.36 1.28-8.96-6.4-15.36-14.08-15.36zM719.36 225.28c-2.56-2.56-6.4-5.12-10.24-5.12s-7.68 1.28-10.24 5.12L444.16 480c-1.28 1.28-2.56 2.56-2.56 3.84l-43.52 90.88c-2.56 6.4-1.28 12.8 2.56 17.92 2.56 2.56 6.4 5.12 10.24 5.12 2.56 0 5.12 0 6.4-1.28l90.88-43.52c1.28-1.28 2.56-1.28 3.84-2.56l254.72-256c6.4-6.4 6.4-15.36 0-21.76l-47.36-47.36zM492.8 524.8l-48.64 23.04 23.04-48.64 240.64-240.64 25.6 25.6L492.8 524.8z"
                      fill="#444"
                      p-id="1733"
                    ></path>
                  </svg>
                </div>
              </div>
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
<style lang="scss"></style>
