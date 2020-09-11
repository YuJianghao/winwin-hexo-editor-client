<template>
  <q-item
    clickable
    dense
  >
    <q-item-section avatar>
      {{label}}
    </q-item-section>
    <q-item-section>
      <q-item-label>
        {{dateString}}
      </q-item-label>
    </q-item-section>
    <q-menu @before-hide="onBeforeHide">
      <div class="row items-start">
        <q-date
          v-model="dateModel"
          mask="YYYY-MM-DD HH:mm:ss"
          class="no-shadow"
        />
        <q-separator vertical />
        <q-time
          v-model="dateModel"
          mask="YYYY-MM-DD HH:mm:ss"
          class="no-shadow"
          now-btn
        />
      </div>
    </q-menu>
  </q-item>
</template>
<script>
import { date } from 'quasar'
export default {
  name: 'DateEditor',
  props: {
    date: {
      type: Number,
      default: null
    },
    label: {
      type: String,
      requried: true
    }
  },
  data () {
    return {
      dateModel: null
    }
  },
  computed: {
    dateString () {
      if (!this.date) return '无数据'
      return date.formatDate(new Date(this.date), 'YYYY年MM月DD日 HH:mm')
    }
  },
  watch: {
    date (v) {
      this.format(v)
    }
  },
  methods: {
    format (v) {
      this.dateModel = date.formatDate(v ? new Date(v) : new Date(), 'YYYY-MM-DD HH:mm:ss')
    },
    onBeforeHide () {
      this.$emit('on-change', new Date(this.dateModel).getTime())
    }
  },
  mounted () {
    this.format(this.date)
  }
}
</script>
