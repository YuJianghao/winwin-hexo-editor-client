<template>
  <div class="fit">
    <q-scroll-area
      class="fit"
      :horizontal="!vertical"
      :style="vertical?'min-width:30px':'min-height:30px'"
      :thumb-style="{height: '3px',width:'3px', opacity: 0.1}"
    >
      <div :class="vertical?'column':'row'" :style="vertical?'':'flex-wrap: nowrap;'">
        <action-sidebar-item
          icon="save"
          tip="保存"
          :direction="direction"
          @on-click="bus.$emit(EditorActionType.WINWIN_SAVE)"
        />
        <q-separator style="flex: 0 0 1px" :vertical="!vertical"/>
        <action-sidebar-item
          icon="content_cut"
          tip="剪切"
          :direction="direction"
          @on-click="bus.$emit(EditorActionType.EDITOR_ACTION_CLIPBOARDCUTACTION)"
        />
        <action-sidebar-item
          :direction="direction"
          icon="content_copy"
          tip="复制"
          @on-click="bus.$emit(EditorActionType.EDITOR_ACTION_CLIPBOARDCOPYACTION)"
        />
        <q-separator style="flex: 0 0 1px" :vertical="!vertical"/>
        <action-sidebar-item
          :direction="direction"
          tip="标题升级"
          @on-click="bus.$emit(EditorActionType.MARKDOWN_EXTENSION_EDITING_TOGGLEHEADINGUP)"
        >
          H+
        </action-sidebar-item>
        <action-sidebar-item
          :direction="direction"
          tip="标题降级"
          @on-click="bus.$emit(EditorActionType.MARKDOWN_EXTENSION_EDITING_TOGGLEHEADINGDOWN)"
        >
          H-
        </action-sidebar-item>
        <q-separator style="flex: 0 0 1px" :vertical="!vertical"/>
        <action-sidebar-item
          :direction="direction"
          icon="format_bold"
          tip="加粗"
          @on-click="bus.$emit(EditorActionType.MARKDOWN_EXTENSION_EDITING_TOGGLEBOLD)"
        />
        <action-sidebar-item
          :direction="direction"
          icon="format_italic"
          tip="倾斜"
          @on-click="bus.$emit(EditorActionType.MARKDOWN_EXTENSION_EDITING_TOGGLEITALIC)"
        />
        <action-sidebar-item
          :direction="direction"
          icon="format_strikethrough"
          tip="删除线"
          @on-click="bus.$emit(EditorActionType.MARKDOWN_EXTENSION_EDITING_TOGGLESTRIKETHROUGH)"
        />
        <action-sidebar-item
          :direction="direction"
          icon="format_list_bulleted"
          tip="切换各种列表"
          @on-click="bus.$emit(EditorActionType.MARKDOWN_EXTENSION_EDITING_TOGGLELIST)"
        />
        <q-separator style="flex: 0 0 1px" :vertical="!vertical"/>
        <action-sidebar-item
          :direction="direction"
          icon="code"
          tip="插入行内代码"
          @on-click="bus.$emit(EditorActionType.MARKDOWN_EXTENSION_EDITING_TOGGLECODESPAN)"
        />
        <action-sidebar-item
          :direction="direction"
          icon="functions"
          tip="插入行内公式"
          @on-click="bus.$emit(EditorActionType.MARKDOWN_EXTENSION_EDITING_TOGGLEMATH)"
        />
        <!-- <q-separator style="flex: 0 0 1px" :vertical="!vertical"/>
        <action-sidebar-item
          :direction="direction"
          icon="help"
          tip="帮助"
        >
        </action-sidebar-item> -->
      </div>
    </q-scroll-area>
  </div>
</template>
<script>
import ActionSidebarItem from './ActionSidebarItem'
import { EditorActionType } from '../MonacoEditor/utils'
import { DirectionType } from '../types'
export default {
  name: 'ActionSidebar',
  components: {
    ActionSidebarItem
  },
  props: {
    bus: {
      type: Object,
      required: true
    },
    direction: {
      type: String,
      default: DirectionType.vertical,
      validator: v => DirectionType.hasType(v)
    }
  },
  data () {
    return {
      EditorActionType
    }
  },
  computed: {
    vertical () {
      return this.direction === DirectionType.vertical
    }
  }
}
</script>
