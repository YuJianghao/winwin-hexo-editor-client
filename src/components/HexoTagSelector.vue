<template>
  <q-list
    class="no-shadow"
    dense=""
  >
    <q-item v-if="!availableTags.length">
      <q-item-section>无</q-item-section>
    </q-item>
    <q-item
      tag="label"
      clickable
      v-for="(item,key) in availableTags"
      :key="key"
      :class="{'bg-blue-1':postTags.includes(item)}"
    >
      <q-item-section avatar="">
        <q-checkbox
          v-model="postTags"
          :val="item"
          dense
        />
      </q-item-section>
      <q-item-section>
        <q-item-label>{{item}}</q-item-label>
      </q-item-section>
    </q-item>
    <q-separator />
    <q-item
      class="bg-grey-2"
      @click="addTag"
    >
      <q-item-section>
        <q-input
          v-model="text"
          dense
          label="新标签"
          @keydown.enter="addTag"
        >
        </q-input>
      </q-item-section>
    </q-item>
    <q-item
      class="bg-grey-2"
      clickable
      @click="addTag"
    >
      <q-item-section>
        <q-item-label>添加标签</q-item-label>
      </q-item-section>
      <q-item-section avatar="">
        <q-icon name="add" />
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'HexoTagSelector',
  data () {
    return {
      text: ''
    }
  },
  computed: {
    ...mapState({
      editorCoreData: state => state.editorCore.data
    }),
    ...mapGetters({
      editorCoreDataPostTagsList: 'editorCore/dataPostTagsList',
      editorCoreDataTagsNameList: 'editorCore/dataTagsNameList'
    }),
    availableTags () {
      const at = []
      at.push.apply(at, this.editorCoreDataTagsNameList)
      this.postTags.map(tag => {
        if (!at.includes(tag)) at.push(tag)
      })
      return at
    },
    postTags: {
      get () {
        return this.editorCoreDataPostTagsList
      },
      set (v) {
        this.$store.dispatch('setPostByTags', v)
      }
    }
  },
  methods: {
    addTag () {
      const ct = JSON.parse(JSON.stringify(this.postTags))
      if (!ct.includes(this.text)) { ct.push(this.text) }
      this.$set(this, 'postTags', ct)
      this.text = ''
    }
  }
}
</script>
