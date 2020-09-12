<template>
  <div class="q-pa-lg fit">
    <div style="max-width:400px">
      <q-input
        stack-label
        class="q-mb-md"
        v-model="hexoRoot"
        type="text"
        label="博客相对路径"
        filled
        :error-message="errorMessage"
        :error="!!errorMessage"
      >
        <template v-slot:append>
          <q-btn
            flat
            color="grey"
            icon="refresh"
            @click="refreshHexoInfo"
          />
        </template>
      </q-input>
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
import DispatcherService from 'src/service/DispatcherService'
export default {
  name: 'SettingsHexo',
  data () {
    return {
      hexoRoot: '',
      errorMessage: ''
    }
  },
  methods: {
    async refreshHexoInfo () {
      this.hexoRoot = await this.$apis.settings.hexo.getHexoRoot()
    },
    async onSubmit () {
      try {
        await this.$apis.settings.hexo.setHexoRoot(this.hexoRoot)
        message.success({ message: '保存成功' })
        DispatcherService.destory().then(_ => {
          DispatcherService.init()
        })
        this.errorMessage = ''
      } catch (err) {
        if (err.response && err.response.status === 400) {
          this.errorMessage = `${err.response.data.data.path} 不是有效hexo博客`
        } else {
          message.error({ message: '保存失败', caption: err.message })
        }
      }
    }
  },
  mounted () {
    this.refreshHexoInfo()
  }
}
</script>
