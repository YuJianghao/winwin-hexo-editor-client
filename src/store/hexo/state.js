export default function () {
  return {
    posts: {
      loading: false,
      data: {
        // xxx: {
        //   status: 'ready', // 'edited', 'loading'
        //   data: {
        //     xxx: xxx
        //   }
        // }
      },
      err: ''
    },
    pages: {
      loading: false,
      data: {},
      err: ''
    },
    tags: {
      loading: false,
      data: {},
      err: ''
    },
    categories: {
      loading: false,
      data: {},
      err: ''
    },
  }
}
