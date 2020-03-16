<template>
  <div
    class="col column flex-center bg-blue-1"
    style="user-select:none"
    v-if="!post&&!editing"
    @dblclick="addPost"
  >
    <h2>
      {{empty?'':'选择或'}}新建一篇文章
    </h2>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'HexoWelcome',
  computed: {
    ...mapState({
      post: state => state.hexo.post,
      editing: state => state.hexo.editing,
      empty: state => !Object.keys(state.hexo.posts).length
    })
  },
  methods: {
    ...mapActions({
      addPost: 'hexo/addPost'
    })
  }
}
</script>
