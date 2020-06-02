<template>
  <q-menu
    anchor="top middle"
    self="top middle"
    content-style="width: 300px;height:65vh"
    content-class="shadow-24 column no-wrap"
    v-model="show"
    class="search-menu"
  >
    <div>

      <q-input
        v-model="q"
        square
        borderless
        class="q-px-md search-input"
        style="border-bottom: 1px solid rgba(0, 0, 0, 0.12);"
        @keyup.enter="search"
        autofocus
      >
        <template v-slot:append>
          <q-icon
            name="search"
            @click="search"
          />
        </template>
      </q-input>
    </div>
    <div
      class="bg-blur col column"
      v-if="showResult"
    >
      <q-scroll-area class="col">
        <q-list>
          <q-item
            clickable
            v-close-popup
            v-for="item in resultByPost"
            :key="item._id+item.idx"
            @click="viewPostById(item._id)"
          >
            <q-item-section>
              <q-item-label class="text-bold">{{posts[item._id].title}}</q-item-label>
              <q-item-label
                caption
                class="ellipsis-3-lines"
              >
                <span
                  v-for="o in item.result"
                  :key="o._id+o.idx"
                >
                  <span>{{o.str.slice(0,o.start)}}</span>
                  <span
                    class="text-primary text-bold bg-blue-1 q-px-xs"
                  >{{o.str.slice(o.start,o.start+serverQ.length)}}</span>
                  <span>{{o.str.slice(o.start+serverQ.length)}}</span>
                  ...
                </span>
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </div>
    <div
      v-else
      class="fit flex flex-center bg-grey-1"
    >
      <q-icon
        name="search"
        style="font-size:100px"
        class="text-white"
      />
    </div>
  </q-menu>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'SearchMenu',
  props: {
    value: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      show: false,
      q: '',
      showResult: false
    }
  },
  watch: {
    value (v) {
      this.show = v
    },
    show (v) {
      this.$emit('input', v)
    }
  },
  computed: {
    result () {
      return this.editorSearch.result
    },
    size () {
      return this.editorSearch.size
    },
    serverQ () {
      return this.editorSearch.q
    },
    posts () {
      return this.editorCoreData.posts
    },
    // externals
    ...mapState({
      editorCoreData: state => state.editorCore.data,
      editorSearch: state => state.editorSearch
    }),
    ...mapGetters({
      resultByPost: 'editorSearch/resultByPost'
    })
  },
  methods: {
    search () {
      this.showResult = true
      this.$store.dispatch('search', { q: this.q })
    },
    viewPostById (_id) {
      this.$store.dispatch('viewPostById', { _id })
    }
  }
}
</script>
<style lang="scss">
.search-input {
  .q-field__control {
    height: 35px;
  }
  .q-field__marginal {
    height: 35px;
  }
}
</style>
