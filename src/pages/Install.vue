<template>
  <div class="bg-primary fixed installer flex flex-center">
    <div
      class="wrapper full-width q-px-lg column"
      style="max-width:1200px"
    >
      <q-banner class="bg-primary text-white">
        <span class="text-h5"> winwin-hexo-editor </span>
      </q-banner>
      <q-stepper
        class="col"
        v-model="step"
        ref="stepper"
        color="primary"
        header-nav
        animated
        flat
        :contracted="$q.screen.lt.sm"
      >
        <q-step
          :name="1"
          title="欢迎"
          icon="flag"
          :done="step > 1"
        >
          <q-markdown
            :src="welcomemd"
            class="q-py-xl"
          ></q-markdown>
        </q-step>

        <q-step
          :name="2"
          title="用户"
          icon="person"
          :error="!isValid(step2) && step > 2"
          :done="step > 2"
        >
          <div class="input-wrapper">
            <q-input
              v-for="item in step2"
              :key="item.key"
              v-model="item.value"
              class="stepper-input"
              type="text"
              :label="item.label"
              :rules="item.rules"
              stack-label
              filled
            />
            <q-markdown
              class="col"
              :src="usermd"
            ></q-markdown>
          </div>
        </q-step>

        <q-step
          :name="3"
          title="博客"
          icon="book"
          :error="!isValid(step3) && step > 3"
          :done="step > 2"
        >
          <div class="input-wrapper">
            <q-input
              v-for="item in step3"
              :key="item.key"
              class="stepper-input"
              v-model="item.value"
              type="text"
              :label="item.label"
              :rules="item.rules"
              stack-label
              filled
            />
            <q-markdown
              class="col"
              :src="hexomd"
            ></q-markdown>
          </div>
        </q-step>

        <q-step
          :name="4"
          title="安全"
          icon="security"
        >
          <div class="input-wrapper">
            <q-input
              v-for="item in step4"
              :key="item.key"
              class="stepper-input"
              v-model="item.value"
              type="text"
              :label="item.label"
              :rules="item.rules"
              stack-label
              filled
            />
            <q-markdown
              class="col"
              :src="securitymd"
            ></q-markdown>
          </div>
        </q-step>
        <q-step
          :name="5"
          title="确认"
          icon="done"
        >
          <template v-if="!isAllValid">
            <div class="q-py-xl text-red text-bold">
              <q-icon
                name="close"
                size="xx-large"
                class="q-mr-sm"
              />
              <span>表单验证失败</span>
            </div>
          </template>
          <template v-else>
            <div class="input-wrapper">
              <div class="text-h6 q-mb-lg">以下是你的设置</div>
              <q-input
                v-for="item in checkInfo"
                :key="item.key"
                class="stepper-input"
                v-model="item.value"
                type="text"
                :label="item.label"
                stack-label
                filled
                disable
              />
            </div>
          </template>
        </q-step>

        <template v-slot:navigation>
          <q-stepper-navigation>
            <q-btn
              stretch
              @click="step === 5 ?doInstall():$refs.stepper.next()"
              color="primary"
              :label="step === 5 ? '完成' : '下一步'"
              :disable="step === 5 && !isAllValid"
            />
            <q-btn
              stretch
              v-if="step > 1"
              flat
              color="primary"
              @click="$refs.stepper.previous()"
              label="上一步"
              class="q-ml-sm"
            />
          </q-stepper-navigation>
        </template>
        <template v-slot:message>
          <q-banner
            v-if="step === 2"
            class="bg-blue text-white q-px-lg"
          >
            <template v-slot:avatar>
              <q-icon
                name="security"
                color="white"
              />
            </template>
            为了安全考虑请使用和其他应用不同的密码！
          </q-banner>
          <q-banner
            v-else-if="step === 5&&!isAllValid"
            class="bg-red text-white q-px-lg"
          >
            <template v-slot:avatar>
              <q-icon
                name="warning"
                color="white"
              />
            </template>
            检测到了一些问题，请更改后再试
          </q-banner>
        </template>
      </q-stepper>
    </div>
  </div>
</template>
<script>
import welcomemd from '../markdown/install/welcome.md'
import usermd from '../markdown/install/user.md'
import hexomd from '../markdown/install/hexo.md'
import securitymd from '../markdown/install/security.md'
import message from 'src/utils/message'
import { DialogService, DialogType } from 'src/service/DialogService'
import { Loading } from 'quasar'
export default {
  name: 'Install',
  data () {
    return {
      welcomemd,
      usermd,
      hexomd,
      securitymd,
      step: 1,
      validHexoRoot: true,
      serverHexoRoot: '',
      step2: [
        {
          key: 'username',
          label: '用户名（必填）',
          value: '',
          rules: [val => !!val || '必填项']
        },
        {
          key: 'password',
          label: '密码（必填）',
          value: '',
          rules: [val => !!val || '必填项']
        }
      ],
      step3: [{
        key: 'HEXO_ROOT',
        label: '博客相对目录（必填）',
        value: '',
        rules: [val => !!val || '必填项']
      }],
      step4: [
        {
          key: 'JWT_SECRET',
          label: 'JWT_SECRET',
          value: ''
        },
        {
          key: 'APIKEY_SECRET',
          label: 'APIKEY_SECRET',
          value: ''
        }
        // {
        //   key: 'JW_EXPIRE',
        //   label: 'JW_EXPIRE',
        //   value: ''
        // },
        // {
        //   key: 'JW_REFRESH',
        //   label: 'JW_REFRESH',
        //   value: ''
        // },
      ]
    }
  },
  computed: {
    allConfig () {
      return this.step2.concat(this.step3).concat(this.step4)
    },
    checkInfo () {
      return this.allConfig.filter(item => item.value)
    },
    isAllValid () {
      return this.isValid(this.allConfig)
    }
  },
  methods: {
    isValid (config) {
      return config.filter(item => item.rules && item.rules.length).filter(item => item.rules[0](item.value) !== true).length === 0
    },
    async doInstall () {
      const data = {}
      this.allConfig.filter(item => !!item.value).map(item => {
        data[item.key] = item.value
      })
      try {
        Loading.show({
          message: '正在安装'
        })
        await this.$apis.install.do(data)
        DialogService.create(DialogType.ConfirmDialog, {
          title: '安装成功'
        })
        this.$router.push('/')
      } catch (err) {
        Loading.hide()
        if (err.response && err.response.status === 400) {
          if (err.response.data.data.path) {
            this.serverHexoRoot = err.response.data.data.path
            DialogService.create(DialogType.ConfirmDialog, {
              title: '安装尝试失败',
              message: `请更改HEXO_ROOT\n${this.serverHexoRoot}不是有效的hexo博客`,
              okLabel: '确定'
            })
          }
        } else {
          message.error({ message: '安装尝试失败', caption: err.message })
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.installer {
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  .input-wrapper {
    padding: 50px 0;
    max-width: 500px;
    max-height: 400px;
    overflow-y: auto;
    margin: 0 auto;
  }
  .stepper-input {
    margin-bottom: 10px;
  }
}
</style>
