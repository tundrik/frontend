import React from "react"
import { useStore } from "effector-react"
import { createEffect, createStore, createEvent, forward } from "effector"
import { YMaps, withYMaps } from "react-yandex-maps"
import { AddRoute } from "../router/config"
import { debounce } from "patronum/debounce"
import { CloseIcon } from "@/svg"

import { StaticLoader } from "../ui"
import { host, fetchAbort } from "../api"

const setInput = createEvent()
const resetInput = createEvent()
const $input = createStore("")
    .on(setInput, (_, state) => state)
    .reset(resetInput)

forward({
    from: [AddRoute.navigate, AddRoute.open],
    to: resetInput,
})
const setSuggestions = createEvent()
const $suggestions = createStore([]).on(setSuggestions, (_, state) => state)

export const Suggest = () => {
    const input = useStore($input)
    const suggestions = useStore($suggestions)
    const handle = (e) => {
        const value = e.target.value
        setInput(value)
        ymaps.suggest("город Сочи " + value).then(function (items) {
            console.log(items)
            setSuggestions(items)
        })
    }
    const handleClick = (item) => {
        const value = item.displayName.replace(", Краснодарский край, Россия", '')
        const value2 = value.replace(", городской округ Сочи", '')
        const value3 = value2.replace(", Сочи", '')
        setInput(value3)
        setSuggestions([])
    }
    const items = suggestions.map((item, index) => {
        const value = item.displayName.replace(", Краснодарский край, Россия", '')
        const value2 = value.replace(", городской округ Сочи", '')
        const value3 = value2.replace(", Сочи", '')
        return (
            <li className="liadrauto" key={index} onClick={() => handleClick(item)}>
                {value3}
            </li>
        )
    })

    return (
        <div>
            <label className="system din1">
                <div className="lsy">Адрес</div>
                <input
                    className="tre smal"
                    type="text"
                    value={input}
                    onChange={handle}
                    name="address"
                    placeholder="Введите адрес"
                />
            </label>
            <ul className="suggest">{items}</ul>
        </div>
    )
}

const SelectedSceleton = ({ isOpen, children }) => (
    <div className={isOpen ? "modalOpenMask modalMask" : "modalMask"}>
        <div className={isOpen ? "modal fullmax modalOpen" : "modal fullmax"}>{isOpen ? children : null}</div>
    </div>
)

const createModalSearch = ({ name }) => {
    const setOpen = createEvent()
    const $has_open = createStore(null).on(setOpen, (_, state) => state)

    const searchFx = createEffect(async (value) => {
        return await fetchAbort({ key: name, cursor: `${host}/search/${name}/?g=${value}` })
    })
    const setInput = createEvent()
    const $input = createStore("").on(setInput, (_, state) => state)

    const handleChange = setInput.prepend((e) => e.target.value)

    const setSuggestions = createEvent()
    const $suggestions = createStore([]).on(setSuggestions, (_, state) => state)

    const responseFx = createEffect(async (value) => {
        console.log(value)
        setSuggestions(value)
        return true
    })

    forward({
        from: searchFx.doneData,
        to: responseFx,
    })

    debounce({
        source: setInput,
        timeout: 300,
        target: searchFx,
    })
    const ModalSearch = ({ handleClick, placeholder = "" }) => {
        const has_open = useStore($has_open)
        const input = useStore($input)
        const suggestions = useStore($suggestions)
        const pending = useStore(searchFx.pending)

        const items = suggestions.map((item, index) => {
            return (
                <li className="liadr" key={index} onClick={() => handleClick(item)}>
                    {item.value}
                </li>
            )
        })
        return (
            <SelectedSceleton isOpen={has_open}>
                <>
                    <div>
                        <header className="batwen din1">
                            <div className="L basisHeader">
                                <button className="pointer" onClick={() => setOpen(null)}>
                                    <CloseIcon size="18" />
                                </button>
                            </div>
                            <div className="b s">Поиск</div>
                            <div className="R basisHeader"></div>
                        </header>
                    </div>
                    <div>
                        <div className="inputSelected">
                            <input
                                className="sE mr-14"
                                name="search_name"
                                type="text"
                                value={input}
                                onChange={(e) => handleChange(e)}
                                placeholder={placeholder}
                            />
                        </div>

                        <ul className="bodySelected">
                            {items}
                            {pending && <StaticLoader />}
                        </ul>
                    </div>
                </>
            </SelectedSceleton>
        )
    }

    ModalSearch.setOpen = setOpen

    return ModalSearch
}

export const createSelectProject = () => {
    const ModalSearch = createModalSearch({ name: "project" })
    const setObject = createEvent()
    const defaultObject = {
        value: "",
        id: "",
    }
    const $object = createStore(defaultObject).on(setObject, (_, state) => state)
    const handleClick = (item) => {
        setObject(item)
        ModalSearch.setOpen(null)
    }
    const SelectProject = () => {
        const { value, id } = useStore($object)
        return (
            <div>
                <label className="system din1">
                    <div className="lsy">Комплекс</div>
                    {value ? (
                        <div className="row">
                            {value}
                            <div className="delete" onClick={() => setObject(defaultObject)}>
                                <CloseIcon size="15" />
                            </div>
                        </div>
                    ) : (
                        <div className="point" onClick={() => ModalSearch.setOpen(true)}>
                            Выбрать
                        </div>
                    )}
                </label>
                <input readOnly className="none" name="project" value={id} />
                <ModalSearch handleClick={handleClick} placeholder="Введите название" />
            </div>
        )
    }
    return SelectProject
}

export const createSelectAddress = () => {
    const ModalSearch = createModalSearch({ name: "suggestions" })
    const setObject = createEvent()
    const defaultObject = {
        value: "",
        lat: "",
        lng: "",
        house: "",
        street: "",
        street_type: "",
    }
    const $object = createStore(defaultObject).on(setObject, (_, state) => state)
    const handleClick = (item) => {
        setObject(item)
        ModalSearch.setOpen(null)
    }
    const SelectAddress = () => {
        const { value, lat, lng, house, street_type, street } = useStore($object)
        return (
            <div>
                <label className="system din1">
                    <div className="lsy">Адрес</div>
                    {value ? (
                        <div className="row">
                            {value}
                            <div className="delete" onClick={() => setObject(defaultObject)}>
                                <CloseIcon size="15" />
                            </div>
                        </div>
                    ) : (
                        <div className="point" onClick={() => ModalSearch.setOpen(true)}>
                            Выбрать
                        </div>
                    )}
                </label>
                <input readOnly className="none" name="address" value={value} />
                <input readOnly className="none" name="lat" value={lat} />
                <input readOnly className="none" name="lng" value={lng} />
                <input readOnly className="none" name="house" value={house} />
                <input readOnly className="none" name="street" value={street} />
                <input readOnly className="none" name="street_type" value={street_type} />
                <ModalSearch handleClick={handleClick} placeholder="Введите адрес" />
            </div>
        )
    }
    return SelectAddress
}
