<template>
  <div @dblclick="$emit('on-edit')">
    <q-scroll-area class="full-height">
      <q-markdown
        class="q-pa-md q-pr-lg"
        style="max-width:768px;margin:0 auto"
        :src="mdtitle+content"
      >
      </q-markdown>
    </q-scroll-area>
  </div>
</template>

<script>
import { date } from 'quasar'
export default {
  name: 'HexoPostViewer',
  props: {
    title: {
      type: String
    },
    content: {
      type: String
    }
  },
  computed: {
    mdtitle () {
      return `# ${this.title}\n`
    }
  },
  methods: {
    getDateString (d) {
      return date.formatDate(d, 'YYYY年MM月DD日 HH:mm:ss')
    }
  }
}
</script>
