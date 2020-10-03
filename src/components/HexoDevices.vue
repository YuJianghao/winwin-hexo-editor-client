<template>
  <q-btn
    flat
    stretch
    :label="isLoggedIn?'设备授权':'服务器地址'"
  >
    <q-menu
      v-model="showPanel"
      :fit="!isLoggedIn"
      :content-style="'user-select:none;'+(isLoggedIn?'min-width:300px':'')"
      transition-hide="none"
      transition-show="none"
      persistent
    >
      <template v-if="isLoggedIn">
        <q-toolbar
          class="bg-grey-2"
          style="min-height:36px"
        >
          <q-icon
            name="devices"
            size="sm"
          />
          <q-toolbar-title style="font-size:15px">
            已授权设备
          </q-toolbar-title>
          <q-btn
            flat
            dense
            icon="add"
            class="q-mr-xs"
            @click="onAddAPIKEY"
          />
          <q-btn
            flat
            dense
            icon="refresh"
            @click="refreshAPIKEYS"
          />
          <q-btn
            flat
            dense
            icon="close"
            @click="showPanel=false"
          />
        </q-toolbar>
        <q-list>
          <q-item
            v-if="!apikeys.length"
          >
            <q-item-section>
              <q-item-label>无设备</q-item-label>
            </q-item-section>
          </q-item>
          <q-item
            v-for="item in apikeys"
            :key="item.issuedAt"
          >
            <q-item-section>
              <q-item-label>{{`${item.deviceType} / ${item.deviceSystem}`}}</q-item-label>
              <q-item-label
                caption
                lines="2"
              >注册时间：{{formatDate(item.issuedAt)}}</q-item-label>
              <q-item-label
                caption
                lines="3"
              >最近登录：{{formatDate(item.lastUsedAt)}}</q-item-label>
            </q-item-section>
            <q-item-section side>
              <div class="text-grey-8 q-gutter-xs">
                <q-btn
                  class="gt-xs"
                  size="12px"
                  flat
                  dense
                  icon="delete"
                  @click="removeAPIKEY(item._id)"
                />
              </div>
            </q-item-section>
          </q-item>
          <q-item
            clickable
            dense
            v-close-popup
            class="bg-grey-2"
          >
            <q-item-section>
              <q-item-label>
                共 {{apikeys.length}} 台设备
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </template>
      <q-img
        :src="qrcode"
        :ratio="1"
        class="bg-grey-2"
        spinner-color="primary"
        v-else
      />
      <q-dialog
        v-model="requestApikeyDialog"
        persistent
      >
        <q-card style="max-width:300px;min-width:200px">
          <q-toolbar
            class="bg-grey-2"
            style="min-height:36px;user-select:none"
          >
            <q-toolbar-title style="font-size:15px">
              使用移动设备扫码登录
            </q-toolbar-title>
            <q-btn
              flat
              dense
              icon="close"
              v-close-popup
            />
          </q-toolbar>

          <q-img
            :src="apikeyImg"
            :ratio="1"
            class="bg-grey-2"
            spinner-color="primary"
          />
        </q-card>
      </q-dialog>
    </q-menu>

  </q-btn>
</template>
<script>
import { Logger } from '../utils/logger'
import { genQRCode } from '../utils/qrcode'
import apis from 'src/api'
import { date } from 'quasar'
export default {
  name: 'HexoDevices',
  data () {
    return {
      showPanel: false,
      qrcode: '',
      apikeys: [],
      apikeyToken: '',
      apikeyImg: '',
      requestApikeyDialog: false
    }
  },
  computed: {
    isLoggedIn () {
      return this.$store.state.user.isLoggedIn
    }
  },
  watch: {
    showPanel (v) {
      if (v) this.refreshAPIKEYS()
    }
  },
  methods: {
    formatDate (d) {
      return date.formatDate(new Date(d), 'YYYY年M月D日 H:mm') || '无'
    },
    async onAddAPIKEY () {
      this.apikeyToken = await apis.users.requestAPIKEY()
      this.apikeyImg = await genQRCode(JSON.stringify({
        url: window.location.origin,
        token: this.apikeyToken
      }))
      this.requestApikeyDialog = true
    },
    async removeAPIKEY (id) {
      await apis.users.removeAPIKEY(id)
      await this.refreshAPIKEYS()
    },
    async refreshAPIKEYS () {
      if (!this.isLoggedIn) return
      try {
        this.apikeys = await apis.users.listAPIKEY()
      } catch (_) {
        this.apikeys = []
      }
    }
  },
  async created () {
    const qrCodeLogger = new Logger({ prefix: 'QRCode' })
    try {
      qrCodeLogger.log(window.location.origin)
      this.qrcode = await genQRCode(window.location.origin)
    } catch (_) {

    }
  },
  async mounted () {
    this.refreshAPIKEYS()
  }
}
</script>
