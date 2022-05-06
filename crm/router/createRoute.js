import React from "react"
import { createEvent, createStore, sample, split } from "effector"
import { useStore } from "effector-react"
import { $location, $pathname, navigateFx } from "./history"
import { getNavigateFxOptions, matchPath } from "./matchUtils"

export const createRoute = (path) => {
  const updateMatch = createEvent()
  const $match = createStore(null).on(updateMatch, (_state, match) => match)

  const $status = $match.map((match) => Boolean(match))
  const open = createEvent()
  const close = createEvent()

  split({
    source: sample({ clock: $status, source: $match }),
    match: (match) => (match ? "open" : "close"),
    cases: { open, close },
  })

  const navigate = createEvent()

  sample({
    clock: navigate,
    source: $location,
    fn: (location, options) => getNavigateFxOptions(location, path, options),
    target: navigateFx,
  })

  const Route = ({ exact, children }) => {
    const match = useStore($match)

    if (!match || (exact && !match.isExact)) {
      return null
    }

    return <>{typeof children === "function" ? children(match) : children}</>
  }

  Route.path = path
  Route.match = $match
  Route.open = open
  Route.close = close
  Route.status = $status
  Route.navigate = navigate

  setTimeout(() => {
    $pathname.watch((pathname) => {
      const match = matchPath(pathname, path)
      updateMatch(match)
    })
  })

  return Route
}
