<template>
  <q-scroll-area
    class="fit"
    v-if="articleList"
  >
    <q-list style="user-select:none">
      <q-item v-if="empty">
        <q-item-section>
          <q-item-label>没有内容</q-item-label>
        </q-item-section>
      </q-item>
      <list-item
        v-for="(item,key) in articleList"
        :key="key"
        :post="item"
        :selected="item._id===id"
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

import ListItemContextMenu from './ListItemContextMenu'
import ListItem from './ListItem'
import { objectToList, stringSort } from 'src/utils/common'
import * as filterByType from 'src/store/hexo/filter/by-types'
import DispatcherService from 'src/service/DispatcherService'

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
    articleList () {
      let articles = []
      // filter
      const allArticles = objectToList(this.articles)
      switch (this.filterBy) {
        case filterByType.POSTS:
          articles = allArticles.filter(article => article.layout !== 'page' && article.published)
          break
        case filterByType.PAGES:
          articles = allArticles.filter(article => article.layout === 'page')
          break
        case filterByType.DRAFTS:
          articles = allArticles.filter(article => article.layout !== 'page' && !article.published)
          break
        case filterByType.CATEGORIES:
          articles = (() => {
            const category = this.categories[this.filterId]
            if (category && allArticles.length > 0) {
              return category.posts.map(_id => this.articles[_id])
            } else {
              return allArticles
            }
          })()
          break
        case filterByType.TAGS:
          articles = (() => {
            const tag = this.tags[this.filterId]
            if (tag && allArticles.length > 0) {
              return tag.posts.map(_id => this.articles[_id])
            } else {
              return allArticles
            }
          })()
          break
        case filterByType.UNCATEGORIZED:
          articles = allArticles.filter(article => !article.categories)
          break
        default:
          articles = allArticles
      }
      // sort

      articles = articles.sort((a, b) => {
        if (typeof a[this.sortBy] === 'undefined') return -1
        const valueA = a[this.sortBy]
        const valueB = b[this.sortBy]
        if (typeof valueA === 'string') {
          return stringSort(valueA, valueB) * (this.sortDirection ? 1 : -1)
        }
        return (valueA > valueB ^ !this.sortDirection) ? 1 : -1
      })
      return articles
    },
    id () {
      return this.$route.params.id
    },
    ...mapState({
      categories: state => state.hexoCore.data.categories,
      tags: state => state.hexoCore.data.tags,
      articles: state => state.hexoCore.data.articles
    }),
    ...mapState('hexoFilter', {
      filterBy: state => state.by,
      filterId: state => state.id
    }),
    ...mapState('hexoSorter', {
      sortBy: state => state.by,
      sortDirection: state => state.direction
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
      if (this.$route.name !== 'view' || this.$route.params.id !== _id) {
        this.$router.push({
          name: 'view',
          params: {
            id: _id
          }
        })
      }
    },
    editPostById (_id) {
      if (this.$route.name !== 'edit' || this.$route.params.id !== _id) {
        this.$router.push({
          name: 'edit',
          params: {
            id: _id
          }
        })
      }
    },
    deletePostById (_id) {
      DispatcherService.deletePostById(_id)
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
