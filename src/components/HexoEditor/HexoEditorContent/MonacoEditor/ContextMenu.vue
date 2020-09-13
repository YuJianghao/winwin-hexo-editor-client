<template>
  <q-menu v-model="open" touch-position context-menu transition-hide="none" transition-show="none">
    <q-list
      dense
      style="width:210px;user-select:none"
    >
      <context-menu-item name="保存" :keybind="getKey('Ctrl + S','⌘S')" @on-click="bus.$emit(EditorActionType.WINWIN_SAVE)"/>
      <q-separator inset/>
      <context-menu-item name="剪切" :keybind="getKey('Ctrl + X','⌘X')" @on-click="bus.$emit(EditorActionType.EDITOR_ACTION_CLIPBOARDCUTACTION)"/>
      <context-menu-item name="复制" :keybind="getKey('Ctrl + C','⌘C')" @on-click="bus.$emit(EditorActionType.EDITOR_ACTION_CLIPBOARDCOPYACTION)"/>
      <q-separator inset/>
      <context-menu-item name="标题升级" :keybind="getKey('Win + Shift + ]','⌃⇧]')" @on-click="bus.$emit(EditorActionType.MARKDOWN_EXTENSION_EDITING_TOGGLEHEADINGUP)"/>
      <context-menu-item name="标题降级" :keybind="getKey('Win + Shift + [','⌃⇧[')" @on-click="bus.$emit(EditorActionType.MARKDOWN_EXTENSION_EDITING_TOGGLEHEADINGDOWN)"/>
      <q-separator inset/>
      <context-menu-item name="加粗" :keybind="getKey('Ctrl + B','⌘B')" @on-click="bus.$emit(EditorActionType.MARKDOWN_EXTENSION_EDITING_TOGGLEBOLD)"/>
      <context-menu-item name="倾斜" :keybind="getKey('Ctrl + I','⌘I')" @on-click="bus.$emit(EditorActionType.MARKDOWN_EXTENSION_EDITING_TOGGLEITALIC)"/>
      <context-menu-item name="删除线" :keybind="getKey('Alt + S','⌥S')" @on-click="bus.$emit(EditorActionType.MARKDOWN_EXTENSION_EDITING_TOGGLESTRIKETHROUGH)"/>
      <context-menu-item name="切换列表" :keybind="getKey('Ctrl + L','⌘L')" @on-click="bus.$emit(EditorActionType.MARKDOWN_EXTENSION_EDITING_TOGGLELIST)"/>
      <q-separator inset/>
      <context-menu-item name="插入行内代码" :keybind="getKey('Ctrl + `','⌘`')" @on-click="bus.$emit(EditorActionType.MARKDOWN_EXTENSION_EDITING_TOGGLECODESPAN)"/>
      <context-menu-item name="插入行内公式" :keybind="getKey('Ctrl + M','⌘M')" @on-click="bus.$emit(EditorActionType.MARKDOWN_EXTENSION_EDITING_TOGGLEMATH)"/>
    </q-list>
  </q-menu>
</template>
<script>
import ContextMenuItem from './ContextMenuItem'
import { EditorActionType } from '../MonacoEditor/utils'
export default {
  name: 'ActionSidebarHelper',
  components: {
    ContextMenuItem
  },
  props: ['bus', 'value'],
  data () {
    return {
      EditorActionType,
      open: this.value
    }
  },
  watch: {
    value (v) {
      this.open = v
    },
    open (v) {
      this.$emit('input', v)
    }
  },
  methods: {
    getKey (win, mac) {
      return this.$q.platform.is.mac ? mac : win
    }
  }
}
</script>
