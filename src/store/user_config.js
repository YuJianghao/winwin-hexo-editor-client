import _ from 'lodash'
import apis from 'src/api'
import { DirectionType } from 'src/components/HexoEditor/HexoEditorContent/types'
export class UserConfigMutationsType { }
UserConfigMutationsType.SET_UI_CONFIG = 'SET_UI_CONFIG'

export class UserConfigActionsType {}
UserConfigActionsType.INIT = 'INIT'
UserConfigActionsType.LOAD_UI_CONFIG = 'LOAD_UI_CONFIG'
UserConfigActionsType.SAVE_UI_CONFIG = 'SAVE_UI_CONFIG'

export class UserConfigGettersType {}
UserConfigGettersType.fullUiConfig = 'fullUiConfig'

/**
 * 格式化数据
 * @param {Object} obj 对象
 * @param {Object} schema 默认对象，每一个项目为部分对象或者 value => validatedValue 的函数
 */
const objparser = (obj = {}, schema, defaultObj) => {
  if (!schema) throw new Error('schema is required')
  if (!defaultObj) throw new Error('defaultObj is required')
  const newObj = _.merge({}, obj, defaultObj)
  Object.keys(newObj).map(key => {
    if (schema[key]) {
      if (typeof schema[key] === 'function') {
        if (obj) {
          newObj[key] = schema[key](obj[key]) ? obj[key] : defaultObj[key]
        } else {
          newObj[key] = defaultObj[key]
        }
      } else {
        newObj[key] = objparser(obj[key] ? obj[key] : {}, schema[key], defaultObj[key])
      }
    }
  })
  return newObj
}

const schema = {
  editor: {
    toolbar: {
      direction: v => DirectionType.hasType(v)
    }
  }
}

const defaultUiConfig = {
  editor: {
    toolbar: {
      direction: DirectionType.vertical
    }
  }
}

const mutations = {
  [UserConfigMutationsType.SET_UI_CONFIG] (state, ui) {
    state.ui = ui
  }
}

const getters = {
  [UserConfigGettersType.fullUiConfig] (state) {
    return objparser(state.ui, schema, defaultUiConfig)
  }
}

const actions = {
  async [UserConfigActionsType.INIT] ({ dispatch }) {
    return Promise.all([
      dispatch(UserConfigActionsType.LOAD_UI_CONFIG)
    ])
  },
  async [UserConfigActionsType.DESTORY] ({ commit }) {
    commit(UserConfigMutationsType.SET_UI_CONFIG, {})
  },
  async [UserConfigActionsType.LOAD_UI_CONFIG] ({ commit }) {
    const uiConfig = await apis.settings.ui.getUiConfig()
    commit(UserConfigMutationsType.SET_UI_CONFIG, uiConfig)
  },
  async [UserConfigActionsType.SAVE_UI_CONFIG] ({ state }) {
    await apis.settings.ui.setUiConfig(state.ui)
  }
}

export const store = {
  namespaced: true,
  state: {
    ui: { }
  },
  actions,
  mutations,
  getters
}
