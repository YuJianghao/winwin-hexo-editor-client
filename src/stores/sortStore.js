import { hexoEditorCore } from './editorStore'
import { EventEmitter } from 'events'

import { Logger } from 'src/utils/logger'
const logger = new Logger({ prefix: 'SortStore' })

/**
 * 排序类型
 */
class SortByType {
  constructor (name, value) {
    this.name = name
    this.value = value
  }

  /**
   * 定义排序类型，可覆盖已有类型
   * @param {string} name 类型名称
   * @param {string} value 类型值，对应排序用到的key名称
   */
  static defineType (name, value) {
    SortByType[name] = new SortByType(name, value)
  }

  /**
   * 清空所有类型
   */
  static clear () {
    Object.keys(SortByType).map(t => delete SortByType[t])
  }

  /**
   * 检查类型是否存在
   * @param {SortByType || string || undefined} t 需要检查的类型
   */
  static hasType (t) {
    if (typeof t === 'undefined') return false
    if (t instanceof SortByType) return true
    if (typeof t === 'string') return Object.keys(SortByType).includes(t)
    else return false
  }
}

SortByType.defineType('TITLE', 'title')

class SortStore extends EventEmitter {
  constructor (hexoEditorCore) {
    super()
    this.hexoEditorCore = hexoEditorCore
    this._initState()
  }

  /**
   * 初始化
   * @param {object} opt 初始化选项
   * @param {SortByType} opt.sortBy 排序参数
   * @param {logLevel} [opt.logLevel] 是否关闭输出
   */
  init (opt = {}) {
    if (opt.logLevel)logger.setLogLevel(opt.logLevel)
    this.setSortBy(opt.sortBy)
  }

  /**
   * 初始化状态
   */
  _initState () {
    this.state = {
      sortBy: undefined
    }
  }

  /**
   * 设定排序参数
   * @param {SortByType} sortBy 排序参数
   */
  setSortBy (sortBy) {
    if (!SortByType.hasType(sortBy)) {
      logger.error('Invalid type', sortBy)
    } else {
      this.state.sortBy = sortBy
      logger.log('Changed sort type:', this.state.sortBy)
    }
  }

  /**
   * 销毁
   */
  destroy () {
    this._initState()
  }
}
const sortStore = new SortStore(hexoEditorCore)
export { sortStore, SortByType }
