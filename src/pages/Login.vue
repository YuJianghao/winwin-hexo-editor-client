<template>
  <q-page class="bg-primary row justify-center items-center">
    <div class="column">
      <div class="row">
        <h5 class="text-h5 text-white q-my-md">登录</h5>
      </div>
      <div class="row">
        <q-card
          square
          bordered
          class="q-pa-lg shadow-1"
        >
          <q-card-section>
            <q-form class="q-gutter-md">
              <q-input
                square
                filled
                clearable
                v-model="username"
                type="text"
                label="用户名"
                hint="默认: admin"
              />
              <q-input
                square
                filled
                clearable
                v-model="password"
                type="password"
                label="密码"
                hint="默认: admin"
              />
            </q-form>
          </q-card-section>
          <q-card-actions class="q-px-md">
            <q-btn
              unelevated
              color="primary"
              size="lg"
              class="full-width"
              label="登录"
              :loading="logging"
              @keydown.enter="onLogin"
              @click="onLogin"
            />
          </q-card-actions>
          <q-card-section class="text-center q-pa-none">
            <p class="text-grey-6">Login Form Card By <a href="https://gist.github.com/justinatack/39ec7f37064b2e9fa61fbd450cba3826">justinatack</a> STAR HIM ❤</p>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import users from '../api/users'
import message from '../utils/message'
export default {
  name: 'Login',
  data () {
    return {
      username: '',
      password: '',
      logging: false
    }
  },
  methods: {
    async onLogin () {
      try {
        this.logging = true
        await users.getLoginToken(this.username, this.password)
        this.$store.commit('SET_LOGIN', true)
        this.$router.push('/')
      } catch (err) {
        if (err.status === 401) {
          message.error({ message: '用户名或密码错误', position: 'top' })
        } else {
          message.error({ message: '登陆失败', caption: err.message, position: 'top' })
        }
      } finally {
        this.logging = false
      }
    }
  }
}
</script>

<style>
.q-card {
  width: 360px;
}
</style>
