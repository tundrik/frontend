import React, { memo } from "react"
import { useStoreMap, useStore } from "effector-react"
import { SmallPresentation } from "@/media"
import { LoadingIcon } from "@/svg/Loading"
import { ArrowIcon, LocationIcon, FavoriteActiveIcon, FavoriteIcon } from "@/svg"
import { NodeRoute } from "./router/config"
import { setContact } from "./features"
import { saveEntity } from "./init"

export const Pic = ({ size = 56, mr = 12, url = "https://storage.yandexcloud.net/graph/User.jpg" }) => (
    <div className="pic" style={{ minWidth: size + 2, height: size + 2, marginRight: mr }}>
        <img className="picImage" alt="Фото профиля" height={size} width={size} src={url} />
    </div>
)

const Notifier = ({ message }) => (
    <section className="loaderDisplay">
        {message ? <div className="messageDisplay">{message}</div> : <LoadingIcon />}
    </section>
)

export const DisplayLoader = ({ sudden, children }) => {
    const { message, pending } = useStore(sudden)
    return pending || message ? <Notifier message={message} /> : children
}

export const StaticLoader = ({ style = "loaderDisplay" }) => (
    <section className={style}>
        <LoadingIcon />
    </section>
)

const FavoriteButton = ({ edge }) => (
    <button className="pointer" onClick={() => saveEntity(edge.node)}>
        {edge.savedByViewer ? <FavoriteActiveIcon style={{color: "#ed4956"}}/> : <FavoriteIcon />}
    </button>
)

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
        <header className="contact">
            <Pic size={32} url={pic} />
            <div>
                <div className="row">
                    <div className="b">{name}</div>
                    <KontactButton person={edge.person} />
                </div>
                <div className="subtitle"></div>
            </div>
            <div className="push"></div>
            <FavoriteButton edge={edge}/>
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

const EstateItem = ({ edge }) => {
    const { node, node_type, mediaImages, present, comment, caption, address, published, pk } = edge
    return (
        <article className="item">
            <Header edge={edge} />
            <div className="pres">
                <SmallPresentation images={mediaImages} />
                <Present present={present} />
            </div>
            <div className="body f1">
                <div className="truncate">{comment}</div>
                <div className="h3" onClick={() => NodeRoute.navigate({ params: { node_code: node } })}>
                    {caption}
                    <i className="arrow right"></i>
                </div>

                <div className="footer">
                    <div className="location">
                        <LocationIcon />
                        {address}
                    </div>
                    <div className="time">
                        {published}
                        <div className="push"></div>
                        {pk}
                    </div>
                </div>
            </div>
        </article>
    )
}

export const Article = memo(({ id, store }) => {
    const edge = useStoreMap({
        store: store,
        keys: [id],
        fn: (items, [node]) => items[node] || null,
    })
    if (!edge) return null
    return <EstateItem edge={edge} />
})

export const Label = ({ title }) => <label className="lab">{title}</label>

export const Switch = ({ label, name, value, event }) => (
    <label className="system din1" htmlFor={name}>
        {label}
        <input id={name} type="checkbox" name={name} defaultChecked={value} onChange={event} />
        <label className="switch" htmlFor={name}></label>
    </label>
)

export const Select = ({ name, value, options, event }) => (
    <div>
        <select className="system din1 tap" name={name} value={value} onChange={event}>
            {options.map(({ value, label }) => (
                <option key={value} value={value}>
                    {label}
                </option>
            ))}
        </select>
        <div className="selectIcon">
            <ArrowIcon />
        </div>
    </div>
)
