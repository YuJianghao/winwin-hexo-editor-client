<template>
  <div class="q-pa-lg fit">
    <div style="max-width:400px">
      <div class="text-h6">编辑器工具栏样式</div>
      <div class="q-gutter-md q-pa-md">
        <q-radio
          dense
          v-model="direction"
          val="vertical"
          label="竖直"
        />
        <q-radio
          dense
          v-model="direction"
          val="horizontal"
          label="水平"
        />
      </div>
      <div style="width:400px;border:1px solid #ddd" class="row padding">
        <div class="col column">
          <div class="margin bg-grey-4" style="height:15px"></div>
          <template v-if="vertical">
          <div class="col row">
            <div class="margin bg-grey-2" style="width:15px">
              <div class="bg-primary full-width" style="height:60%"></div>
            </div>
            <div class="margin bg-grey-2 col"></div>
          </div>
          </template>
          <template v-else>
            <div class="margin bg-grey-2" style="height:15px">
              <div class="bg-primary full-height" style="width:60%"></div>
            </div>
            <div class="margin bg-grey-2 col"></div>
          </template>
        </div>
        <div class="column" style="width:80px">
          <div class="margin bg-grey-4" style="height:15px"></div>
          <div class="margin bg-grey-2 col" style="min-height:200px"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import message from 'src/utils/message'
import { UserConfigGettersType } from 'src/store/user_config'
import DispatcherService from 'src/service/DispatcherService'
import { DirectionType } from '../HexoEditor/HexoEditorContent/types'
import { cloneDeep } from 'lodash'
export default {
  name: 'SettingsHexo',
  computed: {
    vertical () {
      return this.direction === DirectionType.vertical
    },
    direction: {
      get () {
        return this.$store.getters['userConfig/' + UserConfigGettersType.fullUiConfig].editor.toolbar.direction
      },
      async set (v) {
        const config = cloneDeep(this.$store.state.userConfig.ui)
        config.editor.toolbar.direction = v
        await DispatcherService.setUiConfig(config)
        await this.onSubmit()
      }
    }
  },
  methods: {
    async onSubmit () {
      try {
        await DispatcherService.saveUiConfig()
        message.success({ message: '保存成功' })
      } catch (err) {
        message.error({ message: '保存失败', caption: err.message })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.padding{
  padding-right: 5px;
  padding-bottom: 5px;
}
.margin{
  margin-left: 5px;
  margin-top: 5px;
}
</style>
