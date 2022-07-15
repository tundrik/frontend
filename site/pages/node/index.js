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
    <button className="contbut" onClick={() => setContact(person)}>
        Контакты
    </button>
)

const Kontact = ({ edge }) => {
    const { pic, name } = edge?.person
    return (
        <header className="contact-detals">
            <Pic size={48} url={pic} />
            <div>
                <div className="cc">
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

const MapMedia = ({ edge }) => {
    const { mediaImages, person, present, comment, caption, address, published, pk, lat, lng } = edge
    const [tab, setTab] = useState(0)
    return (
        <YMaps query={{ apikey: "8e802446-42a3-4c58-9137-da5007e86ae7" }}>
            <div className="tabs">
                <div className={tab == 0 ? `tab active` : "tab"} onClick={() => setTab(0)}>
                    Карта
                </div>
                <div className={tab == 1 ? `tab active` : "tab"} onClick={() => setTab(1)}>
                    Понарама
                </div>
            </div>
            <div className={tab == 0 ? `detale-cover` : "none"}>
                <Map height="500px" width="100%" defaultState={{ center: [lat, lng], zoom: 16 }}>
                    <Placemark geometry={[lat, lng]} options={placemarc} />
                </Map>
            </div>
            <div className={tab == 1 ? `detale-cover` : "none"}>
                <Panorama height="500px" width="100%" point={[lat, lng]} />
            </div>
        </YMaps>
    )
}

const ItemDt = ({item}) => (
    <div className="itemdt">
        <span className="tiit">{item.label} </span>{item.value}
    </div>
)



const Body = () => {
    const edge = useStore($entity)
    const { mediaImages, items, price, priceSquare, comment, caption, address } = edge
    const ItemsDt = items.map((item, index) => <ItemDt key={index} item={item}/>)
    return (
        <>
            <header className="batmen">
                <div className="linef"></div>
            </header>
            <main className="mn_2">
                <div className="dt">
                    <div className="media">
                        <DetaliPresentation images={mediaImages} />
                        <div className="pd016">
                            <h1 className="title-detals">{caption}</h1>
                            <div className="pri">{price} ₽</div>
                            <div className="pri2">{priceSquare}</div>
                            <Kontact edge={edge} />
                            <div>{ItemsDt}</div>
                            <h3 className="title-detals">Описание</h3>

                            <p className="truncate_2" dangerouslySetInnerHTML={{ __html: comment }}></p>

                            <h3 className="title-detals">Местоположение</h3>

                            <div className="location mrb-20 locate">
                                <LocationIcon size="18" />
                                {address}
                            </div>
                        </div>
                        <MapMedia edge={edge} />
                    </div>
                    <aside className="detals"></aside>
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
