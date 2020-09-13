<template>
  <div class="column">
    <action-sidebar-item
      icon="save"
      tip="保存"
      @on-click="bus.$emit(EditorActionType.WINWIN_SAVE)"
    />
    <q-separator style="flex: 0 0 1px" />
    <action-sidebar-item
      icon="content_cut"
      tip="剪切"
      @on-click="bus.$emit(EditorActionType.EDITOR_ACTION_CLIPBOARDCUTACTION)"
    />
    <action-sidebar-item
      icon="content_copy"
      tip="复制"
      @on-click="bus.$emit(EditorActionType.EDITOR_ACTION_CLIPBOARDCOPYACTION)"
    />
    <q-separator style="flex: 0 0 1px" />
    <action-sidebar-item
      tip="标题升级"
      @on-click="bus.$emit(EditorActionType.MARKDOWN_EXTENSION_EDITING_TOGGLEHEADINGUP)"
    >
      H+
    </action-sidebar-item>
    <action-sidebar-item
      tip="标题降级"
      @on-click="bus.$emit(EditorActionType.MARKDOWN_EXTENSION_EDITING_TOGGLEHEADINGDOWN)"
    >
      H-
    </action-sidebar-item>
    <q-separator style="flex: 0 0 1px" />
    <action-sidebar-item
      icon="format_bold"
      tip="加粗"
      @on-click="bus.$emit(EditorActionType.MARKDOWN_EXTENSION_EDITING_TOGGLEBOLD)"
    />
    <action-sidebar-item
      icon="format_italic"
      tip="倾斜"
      @on-click="bus.$emit(EditorActionType.MARKDOWN_EXTENSION_EDITING_TOGGLEITALIC)"
    />
    <action-sidebar-item
      icon="format_strikethrough"
      tip="删除线"
      @on-click="bus.$emit(EditorActionType.MARKDOWN_EXTENSION_EDITING_TOGGLESTRIKETHROUGH)"
    />
    <action-sidebar-item
      icon="format_list_bulleted"
      tip="切换各种列表"
      @on-click="bus.$emit(EditorActionType.MARKDOWN_EXTENSION_EDITING_TOGGLELIST)"
    />
    <q-separator style="flex: 0 0 1px" />
    <action-sidebar-item
      icon="code"
      tip="插入行内代码"
      @on-click="bus.$emit(EditorActionType.MARKDOWN_EXTENSION_EDITING_TOGGLECODESPAN)"
    />
    <action-sidebar-item
      icon="functions"
      tip="插入行内公式"
      @on-click="bus.$emit(EditorActionType.MARKDOWN_EXTENSION_EDITING_TOGGLEMATH)"
    />
    <q-separator style="flex: 0 0 1px" />
    <action-sidebar-item
      icon="help"
      tip="帮助"
    >
    </action-sidebar-item>
  </div>
</template>
<script>
import ActionSidebarItem from './ActionSidebarItem'
import { EditorActionType } from '../MonacoEditor/utils'
export default {
  name: 'ActionSidebar',
  components: {
    ActionSidebarItem
  },
  props: {
    bus: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      EditorActionType
    }
  }
}
</script>
