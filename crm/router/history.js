import history from "history/browser"
import { createEffect, createEvent, restore } from "effector"
import { getNavigateFxOptions } from "./matchUtils"

const changeLocation = createEvent()

export const $location = restore(changeLocation, history.location)
export const $pathname = $location.map((location) => location.pathname)
export const $search = $location.map((location) => {
  let params = new URLSearchParams(location.search) 
  return params.get("search") || ""
})

history.listen(({ location }) => changeLocation(location))

export const navigateFx = createEffect(({ method, state, ...options }) => {
  method === "replace" ? history.replace(options) : history.push(options, state)
})

