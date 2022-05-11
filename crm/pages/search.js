import { useStore } from "effector-react"
import { createEffect, createStore, createEvent, forward } from "effector"
import { debounce } from "patronum/debounce"

import { LoaderButtom } from "@/ui"
import { host, fetchAbort } from "../api"
import { AddRoute } from "../router/config"

export const createSearch = ({ label = "", defaultObject, name, placeholder }) => {
    const searchFx = createEffect(async (value) => {
        return await fetchAbort({ key: name, cursor: `${host}/search/${name}/?g=${value}` })
    })
    const setValue = createEvent()
    const setObject = createEvent()
    const $value = createStore(defaultObject)
        .on(setValue, (_, state) => ({ value: state }))
        .on(setObject, (_, state) => state)

    const handleChange = setValue.prepend((e) => e.target.value)

    const setSuggestions = createEvent()
    const resetSuggestions = createEvent()
    const $suggestions = createStore([])
        .on(setSuggestions, (_, state) => state.suggestions)
        .reset(resetSuggestions)

    const responseFx = createEffect(async (value) => {
        if (value.suggestions) {
            console.log(value)
            setSuggestions(value)
        }
        return true
    })

    forward({
        from: searchFx.doneData,
        to: responseFx,
    })

    debounce({
        source: setValue,
        timeout: 300,
        target: searchFx,
    })

    const SearchInput = () => {
        const { value, id } = useStore($value)
        const suggestions = useStore($suggestions)
        const pending = useStore(searchFx.pending)
        const handleClick = (item) => {
            console.log(item)
            setObject(item)
            resetSuggestions()
        }
        const items = suggestions.map((item, index) => {
            return (
                <li className="liadr" key={index} onClick={() => handleClick(item)}>
                    {item.value}
                </li>
            )
        })

        return (
            <div>
                <div className="lsy">{label}</div>
                <input
                    className="system din1 sE"
                    name="search_name"
                    type="text"
                    value={value}
                    onChange={(e) => handleChange(e)}
                    placeholder={placeholder}
                />
                <div>
                    <ul className="uladr">
                        {items}
                        {pending && <LoaderButtom pending={pending} />}
                    </ul>
                </div>
                <input readOnly className="none" name={name} value={id} />
            </div>
        )
    }
    return SearchInput
}


/*  Адрес */
const defaultData = {
    address: "",
    lat: "",
    lng: "",
    house: "",
    street: "",
    street_type: "",
}

const sendFx = createEffect(async (address) => {
    console.log(address)
    return await fetchAbort({ key: "location", cursor: `${host}/search/suggestions/?g=${address}` })
})

const setField = createEvent()
const setValue = createEvent()
const $addressItems = createStore(defaultData)
    .on(setField, (_, state) => ({ address: state }))
    .on(setValue, (_, state) => state)
    .reset(AddRoute.close)

const handleChange = setField.prepend((e) => e.target.value)

const setSuggestions = createEvent()
const resetSuggestions = createEvent()
const $suggestions = createStore([])
    .on(setSuggestions, (_, state) => state.suggestions)
    .reset(resetSuggestions)

const responseFx = createEffect(async (value) => {
    if (value.suggestions) {
        console.log(value)
        setSuggestions(value)
    }
    return true
})

forward({
    from: sendFx.doneData,
    to: responseFx,
})

debounce({
    source: setField,
    timeout: 400,
    target: sendFx,
})

export const Location = () => {
    const suggestions = useStore($suggestions)
    const addressItems = useStore($addressItems)
    const pending = useStore(sendFx.pending)
    const { address, lat, lng, house, street, street_type } = addressItems

    const HandleClick = (item) => {
        console.log(item)
        setValue({
            address: item.value,
            lat: item.data.geo_lat,
            lng: item.data.geo_lon,
            house: item.data.house,
            street_type: item.data.street_type_full,
            street: item.data.street,
        })
        resetSuggestions()
    }

    const items = suggestions.map((item, index) => {
        return (
            <li className="liadr" key={index} onClick={() => HandleClick(item)}>
                {item.value}
            </li>
        )
    })

    return (
        <div>
            <label className="lbl lab din1">Адрес</label>
            <input
                className="system din1 sE"
                name="address"
                type="text"
                value={address}
                onChange={handleChange}
                placeholder="Введите адрес"
            />

            <div>
                <ul className="uladr">
                    {items}
                    {pending && <LoaderButtom pending={pending} />}
                </ul>
            </div>
            <input readOnly className="none" name="lat" value={lat} />
            <input readOnly className="none" name="lng" value={lng} />
            <input readOnly className="none" name="house" value={house} />
            <input readOnly className="none" name="street" value={street} />
            <input readOnly className="none" name="street_type" value={street_type} />
        </div>
    )
}
