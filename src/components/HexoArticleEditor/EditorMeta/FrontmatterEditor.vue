<template>
  <div class="frontmatter">
    <q-table
      dense
      flat
      square
      hide-bottom
      :data="frontmattersList"
      :columns="columns"
      row-key="name"
      :pagination="{ rowsPerPage: 0 }"
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td
            auto-width
            key="action"
            :props="props"
          >
            <q-btn
              round
              size="xs"
              color="red"
              icon="delete"
              flat
              @click="onDelete(props.row.key)"
            />
            <q-btn
              round
              class="q-ml-xs"
              size="xs"
              color="primary"
              icon="edit"
              flat
              @click="onEdit(props.row.key)"
            />
          </q-td>
          <q-td
            auto-width
            key="key"
            :props="props"
          >
            {{ props.row.key }}
          </q-td>
          <q-td
            key="value"
            :props="props"
          >
            {{ props.row.value }}
          </q-td>
        </q-tr>
      </template>
    </q-table>
    <q-item
      clickable
      dense
      @click="onAdd"
    >
      <q-item-section>
        <q-item-label>添加</q-item-label>
      </q-item-section>
      <q-item-section avatar="">
        <q-icon name="add" size="small"/>
      </q-item-section>
    </q-item>
    <q-dialog
      v-model="editingDialog"
      persistent
    >
      <q-card style="min-width:500px">
        <q-card-section class="q-pb-none">
          <div class="text-h6">修改Frontmatter - {{tmpKey}}</div>
        </q-card-section>
        <q-card-section class="column items-center q-pt-sm">
          <q-input
            class="col full-width"
            v-model="currentKey"
            type="text"
            label="键（字符串）"
          />
          <q-input
            class="col full-width"
            v-model="currentValue"
            type="text"
            label="值（JSON格式）"
          />
        </q-card-section>
        <q-separator />
        <q-card-actions align="right">
          <q-btn
            flat
            label="取消"
            color="grey"
            @click="onCancel"
          />
          <q-btn
            flat
            label="完成"
            color="primary"
            @click="onSave"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { stringSort } from 'src/utils/common'
import stringRandom from 'string-random'
import message from 'src/utils/message'
export default {
  name: 'FrontmatterSelector',
  components: {
  },
  data () {
    return {
      editingDialog: false,
      tmpKey: null,
      currentKey: null,
      currentValue: null,
      columns: [
        { name: 'action', label: '操作', align: 'center' },
        { name: 'key', label: '键', field: row => row.key, align: 'left' },
        { name: 'value', label: '值', field: row => row.value, align: 'left' }
      ]
    }
  },
  computed: {
    frontmattersList: {
      get () {
        return Object.keys(this.frontmatters).map(key => {
          return {
            key, value: this.frontmatters[key]
          }
        }).sort((a, b) => {
          return stringSort(a.key, b.key)
        }).map(item => Object.assign(item, { action: null }))
      },
      set (v) {
        console.log(v)
      }
    },
    frontmatters () {
      return this.editorCoreDataPostFrontmatters
    },
    ...mapGetters({
      editorCoreDataPostFrontmatters: 'editorCore/dataPostFrontmatters'
    })
  },
  methods: {
    updateFrontmatters (opt) {
      let fm = Object.assign({}, this.frontmatters)
      fm = Object.assign(fm, opt)
      this.onUpdate(fm)
    },
    removeFrontmatters (keys) {
      const fm = Object.assign({}, this.frontmatters)
      keys.map(key => [
        delete fm[key]
      ])
      this.onUpdate(fm)
    },
    onUpdate (fm) {
      this.$emit('on-update', fm)
    },
    // buttons
    onDelete (key) {
      this.removeFrontmatters([key])
    },
    onEdit (key) {
      this.tmpKey = key
      this.currentKey = key
      this.currentValue = JSON.stringify(this.frontmatters[key])
      this.editingDialog = true
    },
    onAdd () {
      this.updateFrontmatters({ ['newKey' + stringRandom(4)]: 'value' })
    },
    // dialog buttons
    onCancel () {
      this.tmpKey = null
      this.currentKey = null
      this.currentValue = null
      this.editingDialog = false
    },
    async onSave () {
      try {
        JSON.parse(this.currentValue)
        if (this.tmpKey !== this.currentKey) {
          this.removeFrontmatters([this.tmpKey])
        }
        this.tmpKey = null
        await this.updateFrontmatters({ [this.currentKey]: JSON.parse(this.currentValue) })
        this.onCancel()
      } catch (_) {
        message.error({ message: '格式化失败', caption: '请检查【值】是否符合JSON格式', position: 'center', timeout: '1000' })
      }
    }
  }
}
</script>
<style lang="scss">
.frontmatter {
  .q-table--dense .q-table th:first-child,
  .q-table--dense .q-table td:first-child {
    padding-left: 5px;
  }
  .q-table tbody .q-tr:last-of-type .q-td {
    border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  }
}
</style>
