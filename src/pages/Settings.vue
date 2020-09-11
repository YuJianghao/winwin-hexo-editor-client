<template>
  <q-page :style-fn="pageStyle">
    <div class="fit column">
      <q-tabs
        dense
        inline-label
        align="left"
        class="text-primary shadow-2"
        :breakpoint="0"
      >
        <q-route-tab
          :to="{name:'s_user'}"
          icon="person"
          label="账户"
        />
        <q-route-tab
          :to="{name:'s_hexo'}"
          icon="book"
          label="博客"
        />
        <q-route-tab
          :to="{name:'s_security'}"
          icon="security"
          label="安全"
        />
      </q-tabs>
      <div class="col">
        <router-view></router-view>
      </div>
    </div>
  </q-page>
</template>
<script>
export default {
  name: 'Setings',
  data () {
    return {
      tab: 'mails'
    }
  },
  methods: {
    pageStyle (offset, height) {
      return 'height:' + (window.innerHeight - offset) + 'px'
    }
  }
}
</script>
