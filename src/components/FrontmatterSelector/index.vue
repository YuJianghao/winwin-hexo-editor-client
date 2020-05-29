<template>
  <div class="column full-height frontmatter">
    <q-toolbar :style="toolbarStyle">
      <q-toolbar-title style="font-size:1.2em">
        Front-matters
      </q-toolbar-title>
    </q-toolbar>
    <div class="col">
      <q-scroll-area class="full-height">
        <q-table
          dense
          flat
          square
          hide-bottom
          :data="frontmattersList"
          :columns="columns"
          row-key="name"
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
        >
          <q-item-section>
            <q-item-label>添加</q-item-label>
          </q-item-section>
          <q-item-section avatar="">
            <q-icon name="add" />
          </q-item-section>
        </q-item>
      </q-scroll-area>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { stringSort } from '../../utils/common'
export default {
  name: 'FrontmatterSelector',
  data () {
    return {
      toolbarHeight: '42px',
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
    toolbarStyle () {
      return {
        height: this.toolbarHeight,
        'min-height': this.toolbarHeight,
        'border-bottom': '1px solid rgba(0, 0, 0, 0.12)'
      }
    },
    ...mapGetters({
      editorCoreDataPostFrontmatters: 'editorCore/dataPostFrontmatters'
    })
  },
  methods: {
    updateFrontmatters (opt) {
      this.$store.dispatch('setPostByFrontmatters', { update: opt })
    },
    removeFrontmatters (keys) {
      this.$store.dispatch('setPostByFrontmatters', { remove: keys })
    },
    onDelete (key) {
      this.removeFrontmatters([key])
    },
    onEdit (key) {
      console.log(key)
      this.updateFrontmatters({ [key]: [123] })
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
