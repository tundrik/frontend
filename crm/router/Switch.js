import React from "react"
import { useStore } from "effector-react"
import { $pathname } from "./history"
import { matchPath } from "./matchUtils"

export const Switch = ({ children }) => {
  const pathname = useStore($pathname)

  return (
    (React.Children.toArray(children).find((child) => {
      if (!React.isValidElement(child)) {
        return false
      }

      const path = (child.type)?.path || null

      if (!path) {
        return true
      }

      const match = matchPath(pathname, path)

      if (!match) {
        return false
      }

      return (child.props)?.exact ? match.isExact : true
    })) || null
  )
}
