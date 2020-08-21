<template>
  <q-scroll-area
    class="col"
    v-if="articleList"
  >
    <q-list>
      <q-item v-if="empty">
        <q-item-section>
          <q-item-label>没有文章</q-item-label>
        </q-item-section>
      </q-item>
      <list-item
        v-for="(item,key) in articleList"
        :key="key"
        :post="item"
        :selected="item._id===currentArticleId"
        @on-left="onLeft"
        @on-right="onRight"
        @on-click="viewPostById"
        @on-context-menu="contextMenuArticleId=item._id"
        @on-btn-click="editPostById"
        @on-btn2-click="deletePostById"
      ></list-item>
    </q-list>
    <list-item-context-menu
      :id="contextMenuArticleId"
      :contextMenuArticle="contextMenuArticle"
    ></list-item-context-menu>
  </q-scroll-area>
  <div v-else>
    Internal Error: articleList is required
  </div>
</template>

<script>
import { mapState } from 'vuex'
import pinyin from 'pinyin'

import ListItemContextMenu from './ListItemContextMenu'
import ListItem from './ListItem'
import * as actionTypes from 'src/store/dispatcher/action-types'
import { objectToList } from 'src/utils/common'
export default {
  name: 'HexoPostsList',
  components: {
    ListItemContextMenu,
    ListItem
  },
  data () {
    return {
      contextMenuArticleId: ''
    }
  },
  computed: {
    contextMenuArticle () {
      let article = null
      this.articleList.forEach(item => {
        if (item._id === this.contextMenuArticleId) article = item
      })
      return article
    },
    empty () {
      return this.articleList.length === 0
    },
    filterBy () {
      const by = this.$route.query.filterBy
      if (['all', 'categories', 'tags', 'uncategorized'].includes(by)) return by
      return 'all'
    },
    filterId () {
      return this.$route.query.filterId
    },
    sortBy () {
      const by = this.$route.query.sortBy
      if (['title', 'date'].includes(by)) return by
      return 'date'
    },
    sortAscend () {
      switch (this.$route.query.sortAscend) {
        case 'true':
          return true
        case 'false':
          return false
        default :
          return false
      }
    },
    articleList () {
      let articles = []
      // filter
      const allArticles = objectToList(this.articles)
      switch (this.filterBy) {
        case 'categories':
          articles = (() => {
            const category = this.categories[this.filterId]
            if (category && allArticles.length > 0) {
              return category.posts.map(_id => this.articles[_id])
            } else {
              return allArticles
            }
          })()
          break
        case 'tags':
          articles = (() => {
            const tag = this.tags[this.filterId]
            if (tag && allArticles.length > 0) {
              return tag.posts.map(_id => this.articles[_id])
            } else {
              return allArticles
            }
          })()
          break
        case 'uncategorized':
          articles = allArticles.filter(article => !article.categories)
          break
        default:
          articles = allArticles
      }
      // sort

      articles = articles.sort((a, b) => {
        if (typeof a[this.sortBy] === 'undefined') return -1
        let valueA = a[this.sortBy]
        let valueB = b[this.sortBy]
        if (typeof valueA === 'string') {
          valueA = pinyin(valueA, { style: pinyin.STYLE_NORMAL }).join('').toLowerCase()
          valueB = pinyin(valueB, { style: pinyin.STYLE_NORMAL }).join('').toLowerCase()
        }
        return valueA > valueB ^ !this.sortAscend ? 1 : -1
      })
      return articles
    },
    ...mapState({
      currentArticleId: state => state.editorCore.status.currentArticleId,
      categories: state => state.editorCore.data.categories,
      tags: state => state.editorCore.data.tags,
      articles: state => state.editorCore.data.articles
    })
  },
  methods: {
    onLeft ({ reset, _id }) {
      this.editPostById(_id)
      this.finalize(reset, 1)
    },
    onRight ({ reset, _id }) {
      this.deletePostById(_id)
      this.finalize(reset, 1)
    },
    viewPostById (_id) {
      this.$store.dispatch(actionTypes.viewPostById, { _id })
    },
    editPostById (_id) {
      this.$store.dispatch(actionTypes.editPostById, { _id })
    },
    deletePostById (_id) {
      this.$store.dispatch(actionTypes.deletePostById, { _id })
    },
    finalize (reset, duration) {
      this.timer = setTimeout(() => {
        reset()
      }, duration || 1000)
    }
  },
  beforeDestroy () {
    clearTimeout(this.timer)
  }
}
</script>
