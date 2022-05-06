import { compile, match } from "path-to-regexp"


const CACHE_SIZE_LIMIT = 1000
const cache = new Map()

const getMatcher = (path) => {
  let matcher = cache.get(path)

  if (!matcher) {
    matcher = match(path, { end: false })
    if (cache.size > CACHE_SIZE_LIMIT) {
      cache.clear()
    }

    cache.set(path, matcher)
  }

  return matcher 
};

export const matchPath = (
  pathname,
  path
) => {
  const matcher = getMatcher(path)
  const match = matcher(pathname)

  if (!match) {
    return null
  }
  
  const { path: url, params } = match

  return {
    params,
    isExact: url === pathname,
  }
}

export const getPathname = (
  path,
  params
) => {
  return compile(path)(params)
};

const addPrefix = (value, prefix) =>
  !value.startsWith(prefix) ? `${prefix}${value}` : value

export const getNavigateFxOptions = (
  location,
  path,
  options = {}
) => {
  const navigateFxOptions = {}

  if (options.method) {
    navigateFxOptions.method = options.method
  }

  if (options.state) {
    navigateFxOptions.state = options.state
  }

  if (options.search) {
    navigateFxOptions.search =
      options.search === true
        ? location.search
        : addPrefix(options.search, "?")
  }
  if (options.hash) {
    navigateFxOptions.hash =
      options.hash === true ? location.hash : addPrefix(options.hash, "#")
  }

  if (path) {
    //const currentParams =
   //   matchPath(location.pathname, path)?.params || {}
   // const params = { ...currentParams, ...options.params }
    navigateFxOptions.pathname = getPathname(path, options.params)
  } else {
    navigateFxOptions.pathname = location.pathname
  }

  return navigateFxOptions
}