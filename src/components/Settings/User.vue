<template>
  <div class="q-pa-lg fit">
    <div style="max-width:400px">
      <q-input
        stack-label
        class="q-mb-md"
        v-model="usernameModel"
        type="text"
        label="用户名"
        filled
      />
      <q-input
        stack-label
        class="q-mb-md"
        v-model="password"
        type="password"
        label="密码"
        filled
      />
      <q-btn
        color="primary"
        icon="save"
        label="保存"
        stretch
        @click="onSubmit"
      />
    </div>
  </div>
</template>
<script>
import message from 'src/utils/message'
import { mapState } from 'vuex'
export default {
  name: 'SettingsUser',
  data () {
    return {
      usernameModel: null,
      password: null
    }
  },
  computed: {
    ...mapState('user', {
      username: state => state.username
    })
  },
  watch: {
    username (v) {
      this.usernameModel = v
    }
  },
  methods: {
    async onSubmit () {
      try {
        await this.$apis.settings.user.updateUserInfo(this.usernameModel, this.password)
        this.$store.dispatch('user/info')
        this.password = null
        message.success({ message: '保存成功' })
      } catch (err) {
        message.error({ message: '保存成功', caption: err.message })
      }
    }
  },
  mounted () {
    this.usernameModel = this.username
  }
}
</script>
