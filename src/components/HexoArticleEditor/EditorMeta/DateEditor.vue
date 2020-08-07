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
    <q-menu>
      <div class="row items-start">
        <q-date
          v-model="date"
          mask="YYYY-MM-DD HH:mm:ss"
          class="no-shadow"
        />
        <q-separator vertical />
        <q-time
          v-model="date"
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
    value: {
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
      date: date.formatDate(new Date(this.value), 'YYYY-MM-DD HH:mm:ss')
    }
  },
  computed: {
    dateString () {
      if (!this.value) return '无数据'
      return date.formatDate(new Date(this.value), 'YYYY年MM月DD日 HH:mm')
    }
  },
  watch: {
    value (v) {
      this.date = date.formatDate(new Date(v), 'YYYY-MM-DD HH:mm:ss')
    },
    date (v) {
      const stamp = new Date(v).getTime()
      if (stamp !== this.value) {
        this.$emit('input', stamp)
      }
    }
  }
}
</script>
