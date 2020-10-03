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
        v-model="oldpassword"
        type="password"
        label="旧密码"
        error-message="旧密码错误"
        :error="oldpasswordErrored"
        filled
      />
      <q-input
        stack-label
        class="q-mb-md"
        v-model="password"
        type="password"
        label="新密码"
        filled
      />
      <q-input
        stack-label
        class="q-mb-md"
        v-model="confirmpassword"
        type="password"
        label="确认密码"
        error-message="密码不一致"
        :error="!!password&&!!confirmpassword&&(password!==confirmpassword)"
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
      usernameModel: '',
      oldpassword: '',
      password: '',
      confirmpassword: '',
      oldpasswordErrored: false
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
        await this.$apis.settings.user.updateUserInfo(this.usernameModel, this.oldpassword, this.password)
        this.$store.dispatch('user/info')
        message.success({ message: '保存成功' })
      } catch (err) {
        if (err.response.status === 403) {
          this.oldpasswordErrored = true
        } else {
          this.oldpasswordErrored = false
          message.error({ message: '保存失败', caption: err.message })
        }
      } finally {
        this.oldpassword = ''
        this.password = ''
        this.confirmpassword = ''
      }
    }
  },
  mounted () {
    this.usernameModel = this.username
  }
}
</script>
