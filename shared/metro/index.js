import React, { useEffect } from "react"

import { useStore } from "effector-react"
import { LoaderButtom } from "@/ui"
import { useVirtual } from "./virtual"

const clientWidth = window.innerWidth && document.documentElement.clientWidth ? 
Math.min(window.innerWidth, document.documentElement.clientWidth) : 
window.innerWidth || 
document.documentElement.clientWidth || 
document.getElementsByTagName('body')[0].clientWidth


const getEstimateSize = (node_type) => {
  switch (node_type) {
    case "employee":
      return 70
    default:
      if (clientWidth < 660) {
        return (60 + 100 + 20 + (clientWidth /100 * 75))
      }
      return 248
  }
}


export const Metro = ({ $edges, $pageInfo, moreSudden, more, Article }) => {
  const { ids, node_type } = useStore($pageInfo)
  const { message, pending } = useStore(moreSudden)
  console.log(getEstimateSize(node_type))
  useEffect(() => {
   // window.scrollTo(0, 0)
  }, [])

  const { virtualItems, totalSize } = useVirtual({
    size: ids.length,
    overscan: 2,
    estimateSize: getEstimateSize(node_type),
  })

  const Atricles = virtualItems.map((virtualRow) => <Article store={$edges} id={ids[virtualRow.index]} key={ids[virtualRow.index]} />)

  let paddingBottom = totalSize - virtualItems[virtualItems.length - 1]?.end

  if (paddingBottom < 300 && !message && !pending) {
    more()
  }
  return (
    <>
      <div
        className="relativeExplorer"
        style={{
          paddingTop: `${virtualItems[0]?.start}px`,
          paddingBottom: `${paddingBottom}px`,
        }}
      >
        {Atricles}
      </div>
      <LoaderButtom message={message} pending={pending} />
    </>
  )
}
