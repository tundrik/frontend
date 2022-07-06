import history from "history/browser"
import React, { useState } from "react"
import { useStore } from "effector-react"

import { YMaps, Map, Panorama, Placemark } from "react-yandex-maps"
import { DetaliPresentation } from "@/media"
import { DisplayLoader, Pic } from "../../ui"
import { setContact } from "../../features"
import { ArrowLineIcon, LocationIcon, FavoriteActiveIcon, FavoriteIcon } from "@/svg"

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
        <div className="present price">
            <span>{present.price}</span>
            {present.priceSquare && <span>{present.priceSquare}</span>}
        </div>
        <div className="present square">
            <span>{present.square}</span>
            <div className="squarePointer"></div>
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
        <YMaps query={{ apikey: "8e802446-42a3-4c58-9137-da5007e86ae7" }}>
            <div className="tabs">
                <div className={tab == 0 ? `tab active` : "tab"} onClick={() => setTab(0)}>
                    Фото
                </div>
                <div className={tab == 1 ? `tab active` : "tab"} onClick={() => setTab(1)}>
                    Карта
                </div>
                <div className={tab == 2 ? `tab active` : "tab"} onClick={() => setTab(2)}>
                    Понарама
                </div>
            </div>

            <div className={tab == 0 ? `detale-cover` : "none"}>
                <DetaliPresentation images={mediaImages} />
            </div>
            <div className={tab == 1 ? `detale-cover` : "none"}>
                <Map height="600px" width="100%" defaultState={{ center: [lng, lat], zoom: 16 }}>
                    <Placemark geometry={[lng, lat]} options={placemarc} />
                </Map>
            </div>
            <div className={tab == 2 ? `detale-cover` : "none"}>
                <Panorama height="600px" width="100%" point={[lng, lat]} />
            </div>
            <Present present={present} />
        </YMaps>
    )
}



const Body = () => {
    const edge = useStore($entity)
    const { mediaImages, person, present, comment, caption, address, published, pk, lat, lng } = edge

    return (
        <>
            <header className="batmen">
                <div className="linef"></div>
            </header>
            <main className="mn_2">
                <div className="back" onClick={() => history.back()}>
                    ← Вернуться
                </div>

                <div className="dt">
                    <div className="media">
                        <MediaTabs edge={edge} />
                    </div>
                    <aside className="detals">
                        <Header edge={edge} />

                        <div className="pud">
                            <p className="truncate_2">{comment}</p>
                        </div>


                        <div className="huder">
                            <h1 className="title-detals">{caption}</h1>
                            <div className="location mrb-20 locate">
                                <LocationIcon size="18" />
                                {address}
                            </div>
                        </div>

                    </aside>
                </div>
            </main>
        </>
    )
}

export const NodePage = () => {
    return (
        <>
            <DisplayLoader sudden={sudden}>
                <Body />
            </DisplayLoader>
        </>
    )
}
