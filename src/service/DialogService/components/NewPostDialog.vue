<template>
  <q-dialog
    ref="dialog"
    @hide="onDialogHide"
  >
    <q-card class="q-dialog-plugin">
      <q-card-section>
        <div class="text-h6">新建{{isPage?'页面':'文章'}}</div>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <q-input
          v-model="title"
          type="text"
          :label="titleLabel"
          stack-label
          @keyup="title=title.trimLeft()"
        />
        <template v-if="!isPage">
          <q-input
            v-model="slug"
            type="text"
            :label="slugLabel"
            :disable="useRandomSlug"
            ref="slug"
            stack-label
            @keyup="slug=slug.trimLeft()"
          />
        </template>
        <q-toggle
          v-model="isPage"
          :label="isPage?'新页面':'新文章'"
          left-label
        />
        <template v-if="!isPage">
          <q-toggle
            v-model="useRandomSlug"
            :label="useRandomSlug?'随机slug':'默认slug'"
            left-label
          />
        </template>
      </q-card-section>

      <!-- 按钮示例 -->
      <q-card-actions align="right">
        <q-btn
          color="primary"
          label="新建"
          @click="onOKClick"
          flat
          :disable="!valideOptions"
        />
        <q-btn
          color="grey"
          label="取消"
          @click="onCancelClick"
          flat
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import stringRandom from 'string-random'
export default {
  data () {
    return {
      title: '',
      slug: '',
      useRandomSlug: true,
      isPage: false
    }
  },
  props: {
    // ...你自定义的属性
  },
  watch: {
    useRandomSlug (v) {
      if (v) this.slug = stringRandom(16)
      else this.slug = ''
    }
  },
  mounted () {
    this.slug = stringRandom(16)
  },
  computed: {
    valideOptions () {
      if (this.useRandomSlug) return true
      if (!this.title.trim()) return false
      if (this.slug === '') return true
      if (this.slug.trim()) return true
      return false
    },
    titleLabel () {
      let str = '标题'
      if (this.isPage)str += '（必填且不可更改）'
      else if (this.useRandomSlug)str += '（可选）'
      return str
    },
    slugLabel () {
      return `slug${this.useRandomSlug ? '' : '（可选）'}`
    }
  },
  methods: {
    // 以下方法是必需的
    // (不要改变它的名称 --> "show")
    show () {
      this.$refs.dialog.show()
    },

    // 以下方法是必需的
    // (不要改变它的名称 --> "hide")
    hide () {
      this.$refs.dialog.hide()
    },

    onDialogHide () {
      // QDialog发出“hide”事件时
      // 需要发出
      this.$emit('hide')
    },

    onOKClick () {
      // 按OK，在隐藏QDialog之前
      // 发出“ok”事件（带有可选的有效负载）
      // 是必需的
      const options = {}
      if (this.title.trim()) options.title = this.title.trim()
      if (!this.isPage) {
        if (this.slug.trim()) options.slug = this.slug.trim()
      } else {
        options.layout = 'page'
      }
      this.$emit('ok', options)
      // 或带有有效负载：this.$emit('ok', { ... })

      // 然后隐藏对话框
      this.hide()
    },

    onCancelClick () {
      // 我们只需要隐藏对话框
      this.hide()
    }
  }
}
</script>
