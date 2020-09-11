<template>
  <div class="q-pa-lg fit">
    <div style="max-width:400px">
      <q-input
      stack-label
        class="q-mb-md"
        v-model="usernameModel"
        type="text"
        label="用户名"
      />
      <q-input
      stack-label
        class="q-mb-md"
        v-model="password"
        type="password"
        label="密码"
      />
    </div>
    <q-page-sticky position="bottom-left" :offset="[18,18]" expand>
      <q-btn
        color="primary"
        icon="save"
        label="保存"
        stretch
        @click="onSubmit"
      />
    </q-page-sticky>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import settings from 'src/api/settings'
export default {
  name: 'SettingsUser',
  data () {
    return {
      usernameModel: this.username,
      password: null
    }
  },
  computed: {
    ...mapState('user', {
      username: state => state.username
    })
  },
  methods: {
    async onSubmit () {
      await settings.user.updateUserInfo(this.usernameModel, this.password)
      this.$store.dispatch('user/info')
    }
  }
}
</script>
