import React, { useEffect } from "react"

import { useStore } from "effector-react"

import { TabProject, TabEstate, TabDemand, TabEmployee, TabAdd, TabKit } from "./tabs"
import { Pic } from "../ui"

import { logautFx, getViewerFx, $viewer, getKitsFx, getSavedFx } from "../init"


export const Nav = () => {
  const viewer = useStore($viewer)

  useEffect(() => {
    getViewerFx()
    getKitsFx()
    getSavedFx()
  }, [])

  return (
    <>
      <nav className="tabs">
        <div className="viewer">
          <Pic mr={0} url={viewer.person?.pic} />
          <button className="butt" onClick={() => logautFx()}>
            Выйти
          </button>
        </div>

        <div>
          <TabDemand />
          <TabEstate />
          <TabProject />
          <TabAdd />
          <TabEmployee />
          <TabKit />
        </div>
      </nav>
      <div className="nav">

      </div>
    </>
  )
}
