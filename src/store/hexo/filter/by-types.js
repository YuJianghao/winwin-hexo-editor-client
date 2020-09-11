export const SET_FILTER = 'SET_FILTER'
export const POSTS = 'POSTS'
export const PAGES = 'PAGES'
export const DRAFTS = 'DRAFTS'
export const CATEGORIES = 'CATEGORIES'
export const TAGS = 'TAGS'
export const UNCATEGORIZED = 'UNCATEGORIZED'
export const ALL = 'ALL'
export function useId (t) {
  return [CATEGORIES, TAGS].includes(t)
}
