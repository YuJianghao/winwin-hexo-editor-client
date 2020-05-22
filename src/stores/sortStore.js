import { hexoEditorCore } from './editorStore'
import { EventEmitter } from 'events'

import { Logger } from 'src/utils/logger'
const logger = new Logger({ prefix: 'SortStore' })
class SortByType {
  constructor (name, value) {
    this.name = name
    this.value = value
  }

  static defineType (name, value) {
    SortByType[name] = new SortByType(name, value)
  }

  static hasType (t) {
    return typeof t !== 'undefined' &&
    !['hasType', 'defineType'].includes(t) &&
    Object.keys(SortByType).includes(t.name)
  }
}

SortByType.defineType('TITLE', 'title')

class SortStore extends EventEmitter {
  constructor (hexoEditorCore) {
    super()
    this.hexoEditorCore = hexoEditorCore
    this.state = {
      sortBy: SortByType.DEFAULT
    }
  }

  /**
   *
   * @param {object} opt 初始化选项
   * @param {SortByType} opt.sortBy 排序参数
   * @param {logLevel} [opt.logLevel] 是否关闭输出
   */
  init (opt = {}) {
    if (opt.logLevel)logger.setLogLevel(opt.logLevel)
    this.setSortBy(opt.sortBy)
  }

  setSortBy (sortBy) {
    if (!SortByType.hasType(sortBy)) {
      logger.error(`Invalid type \`${sortBy}\``)
    } else {
      this.state.sortBy = sortBy
      logger.log('Changed sort type:', this.state.sortBy)
    }
  }
}
const sortStore = new SortStore(hexoEditorCore)
export { sortStore, SortByType }
