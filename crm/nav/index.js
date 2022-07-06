import React, { useEffect } from "react"

import { useStore } from "effector-react"

import { TabProject, TabEstate, TabDemand, TabEmployee, TabAdd, TabKit } from "./tabs"
import { Pic } from "../ui"

import { logautFx, getViewerFx, $viewer, getKitsFx, getSavedFx, $theme, setTheme } from "../init"

const ButtonTheme = () => {
    const theme = useStore($theme)
    return (
        <button
            className="theme-toggle"
            onClick={() => setTheme(!theme)}
        >
            <svg className="sun-and-moon" aria-hidden="true" width="24" height="24" viewBox="0 0 24 24">
                <mask className="moon" id="moon-mask">
                    <rect x="0" y="0" width="100%" height="100%" fill="white"></rect>
                    <circle cx="24" cy="10" r="6" fill="black"></circle>
                </mask>
                <circle className="sun" cx="12" cy="12" r="6" mask="url(#moon-mask)" fill="currentColor"></circle>
                <g className="sun-beams" stroke="currentColor">
                    <line x1="12" y1="1" x2="12" y2="3"></line>
                    <line x1="12" y1="21" x2="12" y2="23"></line>
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                    <line x1="1" y1="12" x2="3" y2="12"></line>
                    <line x1="21" y1="12" x2="23" y2="12"></line>
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                </g>
            </svg>
        </button>
    )
}

export const Nav = () => {
    const viewer = useStore($viewer)
    console.log(viewer)
    useEffect(() => {
        getViewerFx()
        getKitsFx()
        getSavedFx()
    }, [])

    return (
        <>
            <nav className="tabs">
                <div className="viewer">
                    <Pic mr={0} url={viewer.pic} />
                    <button className="butt" onClick={() => logautFx()}>
                        Выйти
                    </button>
                </div>

                <div>
                    <TabDemand />
                    <TabEstate />
                    <TabProject />
                    <TabKit />
                    {viewer?.role === "boss" &&   <TabEmployee />}
                    <TabAdd />
                </div>
                <ButtonTheme />
            </nav>
            <div className="nav"></div>
        </>
    )
}
