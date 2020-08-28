export default function () {
  return {
    data: {
      article: null,
      articles: {},
      categories: {},
      tags: {}
    },
    status: {
      saved: true,
      lastSavedAt: null,
      loading: false,
      ready: false
    }
  }
}
