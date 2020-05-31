<template>
  <q-menu
    anchor="top middle"
    self="top middle"
    content-style="width: 300px;height:65vh"
    content-class="shadow-24 column no-wrap"
    v-model="show"
  >
    <q-input
      v-model="q"
      square
      borderless
      class="q-px-md"
      style="height:36px;border-bottom: 1px solid rgba(0, 0, 0, 0.12);"
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
    <div
      class="bg-blur col column"
      v-if="showResult"
    >
      <q-scroll-area class="col">
        <q-list>
          <q-item
            clickable
            v-close-popup
            v-for="item in result"
            :key="item._id+item.idx"
            @click="viewPostById(item._id)"
          >
            <q-item-section>
              <q-item-label class="text-bold">{{posts[item._id].title}}</q-item-label>
              <q-item-label caption>
                <span>{{item.str.slice(0,size)}}</span>
                <span
                  class="text-primary text-bold"
                  style="border-bottom: 2px solid;"
                >{{item.str.slice(size,size+serverQ.length)}}</span>
                <span>{{item.str.slice(-size)}}...</span>
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
import { mapState } from 'vuex'
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
