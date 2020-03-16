/* eslint-disable no-undef */
import { SET_POSTS, UPDATE_POSTS, DELETE_POSTS } from './mutations'

/**
 * SET_POSTS
 */

test('set from single', () => {
  const state = { posts: null }
  const posts = { _id: 'post1', data: 'data' }
  SET_POSTS(state, posts)
  expect(state.posts).toStrictEqual({
    post1: posts
  })
})

test('set from object', () => {
  const state = { posts: null }
  const posts = {
    post1: { _id: 'post1', data: 'data' },
    post2: { _id: 'post2', data: 'data' }
  }
  SET_POSTS(state, posts)
  expect(state.posts).toStrictEqual(posts)
})

test('set from array', () => {
  const state = { posts: null }
  const posts = [
    { _id: 'post1', data: 'data' },
    { _id: 'post2', data: 'data' }
  ]
  SET_POSTS(state, posts)
  expect(state.posts).toStrictEqual({
    post1: { _id: 'post1', data: 'data' },
    post2: { _id: 'post2', data: 'data' }
  })
})

/**
 * UPDATE_POSTS
 */

test('update from single', () => {
  const state = {
    posts: {
      post1: { _id: 'post1', data: 'data' },
      post2: { _id: 'post2', data: 'data' }
    }
  }
  const posts = { _id: 'post1', data: 'data2' }
  UPDATE_POSTS(state, posts)
  expect(state.posts).toStrictEqual(
    {
      post1: { _id: 'post1', data: 'data2' },
      post2: { _id: 'post2', data: 'data' }
    }
  )
})

test('update from object', () => {
  const state = {
    posts: {
      post1: { _id: 'post1', data: 'data' },
      post2: { _id: 'post2', data: 'data' }
    }
  }
  const posts = {
    post1: { _id: 'post1', data: 'data2' }
  }
  UPDATE_POSTS(state, posts)
  expect(state.posts).toStrictEqual(
    {
      post1: { _id: 'post1', data: 'data2' },
      post2: { _id: 'post2', data: 'data' }
    }
  )
})

test('update from array', () => {
  const state = {
    posts: {
      post1: { _id: 'post1', data: 'data' },
      post2: { _id: 'post2', data: 'data' }
    }
  }
  const posts = [
    { _id: 'post1', data: 'data2' }
  ]
  UPDATE_POSTS(state, posts)
  expect(state.posts).toStrictEqual(
    {
      post1: { _id: 'post1', data: 'data2' },
      post2: { _id: 'post2', data: 'data' }
    }
  )
})

/**
 * DELETE_POSTS
 */

test('delete from _id', () => {
  const state = {
    posts: {
      post1: { _id: 'post1', data: 'data' },
      post2: { _id: 'post2', data: 'data' }
    }
  }
  DELETE_POSTS(state, 'post1')
  expect(state.posts).toStrictEqual(
    {
      post2: { _id: 'post2', data: 'data' }
    }
  )
})

test('delete from _id array', () => {
  const state = {
    posts: {
      post1: { _id: 'post1', data: 'data' },
      post2: { _id: 'post2', data: 'data' }
    }
  }
  DELETE_POSTS(state, ['post1'])
  expect(state.posts).toStrictEqual(
    {
      post2: { _id: 'post2', data: 'data' }
    }
  )
})
