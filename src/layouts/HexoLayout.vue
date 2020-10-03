<template>
  <q-page :style-fn="pageStyle">
    <q-splitter
      class="fit"
      :limits="full?[0,0]:[155,600]"
      v-model="nav"
      unit="px"
      @input="onNavListTabResize"
    >
      <template
        v-slot:before
        :class="full?'overflow-hidden;width:0':''"
      >
        <slot name="nav-list" />
      </template>
      <template v-slot:after>
        <q-splitter
          v-model="list"
          :limits="full?[0,0]:[250,600]"
          unit="px"
          @input="onArticleListTabResize"
        >
          <template v-slot:before>
            <slot name="article-list" />
          </template>
          <template v-slot:after>
            <div class="fit row">
              <div class="col full-height overflow-hidden">
                <router-view />
              </div>
            </div>
          </template>
        </q-splitter>
      </template>
    </q-splitter>

    <q-inner-loading :showing="showLoading">
      <q-spinner-gears
        size="50px"
        color="primary"
      />
    </q-inner-loading>
  </q-page>
</template>
<script>
import { mapState } from 'vuex'
import bus from 'src/utils/bus'

export default {
  name: 'HexoLayout',
  components: {
  },
  data () {
    return {
      editorData: '',
      nav: 200,
      list: 300,
      tmp: {
        nav: 0,
        list: 0
      }
    }
  },
  computed: {
    ...mapState({
      showLoading: state => state.hexoUi.loading.show,
      full: state => state.hexoUi.full,
      loading: state => state.hexoCore.status.loading
    })
  },
  watch: {
    full (v) {
      if (v) {
        this.tmp.nav = this.nav
        this.tmp.list = this.list
        this.nav = 0
        this.list = 0
      } else {
        this.nav = this.tmp.nav
        this.list = this.tmp.list
        this.saveSizeToStorage()
      }
    }
  },
  methods: {
    pageStyle (offset, height) {
      return 'height:' + (window.innerHeight - offset) + 'px'
    },
    onNavListTabResize (e) {
      bus.$emit('on-navlisttab-resize', e)
      this.saveSizeToStorage()
    },
    onArticleListTabResize (e) {
      bus.$emit('on-articlelisttab-resize', e)
      this.saveSizeToStorage()
    },
    saveSizeToStorage () {
      localStorage.setItem('navlisttab-size', this.nav)
      localStorage.setItem('articlelisttab-size', this.list)
    },
    getSizeFromStorage () {
      this.nav = parseInt(localStorage.getItem('navlisttab-size') || 200)
      this.list = parseInt(localStorage.getItem('articlelisttab-size') || 200)
    }
  },
  created () {
    this.getSizeFromStorage()
  }
}
</script>
