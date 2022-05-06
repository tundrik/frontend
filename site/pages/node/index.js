import React, { useState } from "react"
import { useStore } from "effector-react"

import { YMaps, Map, Panorama, Placemark } from "react-yandex-maps"
import { DetaliPresentation } from "@/media"
import { DisplayLoader, Pic } from "../../ui"
import { setContact } from "../../features"
import { ArrowIcon, LocationIcon, FavoriteActiveIcon, FavoriteIcon } from "@/svg"

import { sudden, $entity } from "./init"

const KontactButton = ({ person }) => (
    <>
        <span className="w4">•</span>
        <button className="b blue" onClick={() => setContact(person)}>
            Контакты
        </button>
    </>
)

const Header = ({ edge }) => {
    const { pic, name } = edge?.person
    return (
        <header className="contact-detals">
            <Pic size={32} url={pic} />
            <div>
                <div className="row">
                    <div className="b">{name}</div>
                    <KontactButton person={edge.person} />
                </div>
                <div className="subtitle"></div>
            </div>
            <div className="push"></div>
        </header>
    )
}

const Present = ({ present }) => (
    <div>
        <div className="present price big">
            <span>{present.price}</span>
            {present.priceSquare && <span>{present.priceSquare}</span>}
        </div>
        <div className="present square big">
            <span>{present.square}</span>
            <div className="squarePointer big"></div>
        </div>
    </div>
)

const placemarc = {
    preset: "islands#blackDotIcon",
}

const MediaTabs = ({ edge }) => {
    const { mediaImages, person, present, comment, caption, address, published, pk, lat, lng } = edge
    const [tab, setTab] = useState(0)
    return (
        <>
            <YMaps query={{ apikey: "8e802446-42a3-4c58-9137-da5007e86ae7" }}>
                <div className="tabs">
                    <div className={tab == 0 ? `tab active` : "tab"} onClick={() => setTab(0)}>Медиа</div>
                    <div className={tab == 1 ? `tab active` : "tab"} onClick={() => setTab(1)}>Карта</div>
                    <div className={tab == 2 ? `tab active` : "tab"} onClick={() => setTab(2)}>Понарама улиц</div>
                </div>
                <div className={tab == 0 ? `` : "none"}>
                    <DetaliPresentation images={mediaImages} />
                </div>
                <div className={tab == 1 ? `` : "none"}>
                    <Map height="600px" width="100%" defaultState={{ center: [lng, lat], zoom: 16 }}>
                        <Placemark geometry={[lng, lat]} options={placemarc} />
                    </Map>
                </div>
                <div className={tab == 2 ? `` : "none"}>
                    <Panorama height="600px" width="100%" point={[lng, lat]} />
                </div>

                <Present present={present} />
            </YMaps>
        </>
    )
}

const Body = () => {
    const edge = useStore($entity)
    const { mediaImages, person, present, comment, caption, address, published, pk, lat, lng } = edge

    return (
        <>
            <div className="filter gutter-15">
                <Header edge={edge} />
                <p className="mrt-20">{comment}</p>
            </div>

            <div className="f1 gutter-15">
                <div className="location-detals">
                    <LocationIcon size="18" />
                    {address}
                </div>
                <h1 className="title-detals">{caption}</h1>
                <MediaTabs edge={edge} />
            </div>
        </>
    )
}

export const NodePage = () => {
    return (
        <main className="sheet main">
            <DisplayLoader sudden={sudden}>
                <Body />
            </DisplayLoader>
        </main>
    )
}
