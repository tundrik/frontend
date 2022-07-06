import React, { memo } from "react"
import history from "history/browser"
import { useStoreMap, useStore } from "effector-react"

import { EditRoute } from "./router/config"
import { setExtra, setContact, addKit, $saved, deleteSaved } from "./features/init"
import { SmallPresentation } from "@/media"
import { ExtraIcon, SavedIcon, SavedActiveIcon, LocationIcon,  ArrowIcon } from "@/svg"
import { LoadingIcon } from "@/svg/Loading"

export const BackButton = () => (
    <button className="pointer back" onClick={() => history.back()}>
        <ArrowIcon />
    </button>
)

export const Pic = ({ size = 56, mr = 12, url = "https://storage.yandexcloud.net/graph/profile/User.jpeg" }) => (
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

export const Label = ({ title }) => <label className="lbl lab din1">{title}</label>

export const Switch = ({ label, name, value, event }) => (
    <label className="system din1" htmlFor={name}>
        {label}
        <input id={name} type="checkbox" name={name} checked={value} onChange={event} />
        <label className="switch" htmlFor={name}></label>
    </label>
)

export const SwitchStatic = ({ label, name, value }) => (
    <label className="system din1" htmlFor={name}>
        {label}
        <input id={name} type="checkbox" name={name} defaultChecked={value} />
        <label className="switch" htmlFor={name}></label>
    </label>
)

export const Select = ({ label = "", name, value, options, event }) => (
    <label className="systemSel din1" htmlFor={name}>
        <div className="lsysel">{label}</div>
        <select className="sel" id={name} name={name} value={value} onChange={event}>
            {options.map(({ value, label }) => (
                <option key={value} value={value}>
                    {label}
                </option>
            ))}
        </select>
    </label>
)

export const SelectStatic = ({ label = "", name, value, options }) => (
    <label className="systemSel din1" htmlFor={name}>
        <div className="lsysel">{label}</div>
        <select className="sel" id={name} name={name} defaultValue={value}>
            {options.map(({ value, label }) => (
                <option key={value} value={value}>
                    {label}
                </option>
            ))}
        </select>
    </label>
)

export const Input = ({ placeholder = "", label, type, name, value }) => (
    <label className="system din1">
        <div className="lsy">{label}</div>
        <input className="tre" type={type} name={name} defaultValue={value} placeholder={placeholder} />
    </label>
)

const Text = ({ name, value }) => <textarea type="text" className="dcript din1" name={name} defaultValue={value} />

const renderSwitchControl = (param) => {
    switch (param) {
        case "text":
            return Input

        case "number":
            return Input

        case "checkbox":
            return SwitchStatic

        case "select":
            return SelectStatic

        case "textarea":
            return Text

        default:
            return Text
    }
}

export const Form = ({ form }) => {
    const items = form.map((props) => {
        const Component = renderSwitchControl(props.type)
        return (
            <div key={props.name}>
                {props.title && <Label title={props.title} />}
                <Component {...props} />
            </div>
        )
    })

    return items
}

const SaveButton = ({ edge }) => {
    const { node } = edge
    const saved = useStoreMap({
        store: $saved,
        keys: [node],
        fn: (items, [pk]) => items[pk] || null,
    })
    const action = saved ? deleteSaved : addKit
    return (
        <button className="pointer" onClick={() => action(node)}>
            {saved ? <SavedActiveIcon size={22} /> : <SavedIcon size={22} />}
        </button>
    )
}

const KontactButton = ({ person }) => (
    <>
        <span className="w4">•</span>
        <button className="b blue" onClick={() => setContact(person)}>
            Контакты
        </button>
    </>
)

const edit = (node) => {
    EditRoute.navigate({
        params: {
            node_code: node,
        },
    })
}

const EditButton = ({ edge }) => (
    <>
        {edge.has_edit && (
            <button className="pointer" onClick={() => edit(edge.node)}>
                <div className="selectIcon outgoing">
                    <ArrowIcon />
                </div>
            </button>
        )}
    </>
)

const ExtraButton = ({ edge }) => (
    <>
        {edge.has_edit && (
            <button className="pointer" onClick={() => setExtra(edge)}>
                <div className="extra">
                    <ExtraIcon />
                </div>
            </button>
        )}
    </>
)

const Header = ({ edge }) => {
    const { pic, name } = edge?.person
    return (
        <header className="contact">
            <Pic size={32} url={pic} />
            <div>
                <div className="row">
                    <div className="b cp">{name}</div>
                    <KontactButton person={edge.person} />
                </div>
                <div className="subtitle"></div>
            </div>
            <div className="push"></div>
            <ExtraButton edge={edge} />
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

const DemandItem = ({ edge }) => {
    const { present, comment, caption, published, pk, mediaImages } = edge
    return (
        <article className="item">
            <div className="pres">
                <img className="slide serpia" src={mediaImages} width="100%" height="100%" decoding="auto" alt="alt" />

                <Present present={present} />
            </div>
            <div className="body f1">
                <Header edge={edge} />
                <div className="truncate" dangerouslySetInnerHTML={{__html: comment}}></div>
                <section className="itemAction">
                    <div className="h3">{caption}</div>
                </section>
                <div className="footer">
                    <div className="location"></div>
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

const EstateItem = ({ edge }) => {
    const { node_type, mediaImages, present, comment, caption, address, published, pk } = edge
    return (
        <article className="item">
            <div className="pres">
                <SmallPresentation images={mediaImages} />
                <Present present={present} />
            </div>
            <div className="body f1">
                <Header edge={edge} />
                <div className="truncate" dangerouslySetInnerHTML={{__html: comment}}></div>
                <section className="itemAction">
                    <div className="h3">{caption}</div>
                    {node_type == "estate" && <SaveButton edge={edge} />}
                </section>
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

const EmployeeItem = ({ edge }) => (
    <article className="item">
        <header className="user">
            <Pic url={edge.person.pic} />
            <div>
                <div className="b cp">{edge.person.name}</div>
                <div className="userCaption">
                        {edge.sub}
                </div>
            </div>
            <div className="push"></div>
            <EditButton edge={edge} />
        </header>
    </article>
)

const getItemArticle = (node_type) => {
    switch (node_type) {
        case "employee":
            return EmployeeItem

        case "demand":
            return DemandItem

        default:
            return EstateItem
    }
}

export const Article = memo(({ id, store }) => {
    const edge = useStoreMap({
        store: store,
        keys: [id],
        fn: (items, [node]) => items[node] || null,
    })
    if (!edge) return null
    const Item = getItemArticle(edge.node_type)
    return <Item edge={edge} />
})
