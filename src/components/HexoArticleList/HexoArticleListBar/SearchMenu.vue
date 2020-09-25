<template>
  <q-menu
    anchor="top middle"
    self="top middle"
    content-class="shadow-24 flex column no-wrap"
    v-model="show"
    class="search-menu"
    fit
    @hide="onHide"
  >
    <div class="search-input bg-white">
      <q-input
        v-model="q"
        square
        borderless
        class="q-px-md"
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
    <q-list class="col">
      <q-item
        clickable
        v-close-popup
        v-for="item in resultByPost"
        :key="item._id+item.idx"
        @click="viewPostById(item._id)"
      >
        <q-item-section>
          <q-item-label class="text-bold">
            <q-icon
              name="insert_drive_file"
              color="grey'"
              class="q-mr-xs"
              v-if="articles[item._id].layout==='page'"
            />
            <q-icon
              name="drafts"
              color="grey'"
              class="q-mr-xs"
              v-else-if="!articles[item._id].published"
            />{{articles[item._id].title}}</q-item-label>
          <q-item-label
            caption
            class="ellipsis-3-lines"
          >
            <span
              v-for="o in item.result"
              :key="o._id+o.idx"
            >
              <span>{{o.str.slice(0,o.start)}}</span>
              <span class="text-primary text-bold bg-blue-1 q-px-xs">{{o.str.slice(o.start,o.start+serverQ.length)}}</span>
              <span>{{o.str.slice(o.start+serverQ.length)}}</span>
              ...
            </span>
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-menu>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import DispatcherService from 'src/service/DispatcherService'
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
    // externals
    ...mapState({
      articles: state => state.hexoCore.data.articles,
      result: state => state.hexoSearch.result,
      size: state => state.hexoSearch.size,
      serverQ: state => state.hexoSearch.q
    }),
    ...mapGetters({
      resultByPost: 'hexoSearch/resultByPost'
    })
  },
  methods: {
    onHide () {
      this.q = ''
      DispatcherService.search()
    },
    search () {
      this.showResult = true
      DispatcherService.search(this.q)
    },
    viewPostById (_id) {
      DispatcherService.viewPostById(_id)
    }
  }
}
</script>
<style lang="scss">
.search-input {
  z-index: 6001;
  position: sticky;
  top: 0;
  .q-field__control {
    height: 35px;
  }
  .q-field__marginal {
    height: 35px;
  }
}
</style>
