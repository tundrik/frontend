import { createEvent, createEffect, createStore, sample, forward } from "effector"

import { deleteNodeFx, getKitsFx, sendFormKitFx, getSavedFx, deleteSavedFx, deleteId } from "../init"
import { EditRoute } from "../router/config"

export const setAlert = createEvent()
export const $alert = createStore(null).on(setAlert, (_, props) => props)

export const setExtra = createEvent()
export const $extra = createStore(null).on(setExtra, (_, props) => props)

export const setContact = createEvent()
export const $contact = createStore(null).on(setContact, (_, props) => props)

export const setSelected = createEvent()
export const $selected = createStore(null).on(setSelected, (_, props) => props)

export const setKits = createEvent()
const deleteKitEvent = createEvent()
export const $kits = createStore([])
    .on(getKitsFx.doneData, (_, newData) => newData.edges)
    .on(setKits, (prewData, props) => [...prewData, props])
    .on(deleteKitEvent, (prewData, idx) => {
        return prewData.filter((n) => {
            return n.node_code != idx
        })
    })

export const setSaved = createEvent()
export const deleteSaved = createEvent()
export const $saved = createStore({})
    .on(getSavedFx.doneData, (_, newData) => newData)
    .on(setSaved, (prewData, props) => ({ ...prewData, ...props }))
    .on(deleteSaved, (prewData, idx) => {
        delete prewData[idx]
        return {... prewData}
    })

forward({
    from: deleteSaved,
    to: deleteSavedFx,
})

const responseFormKitFx = createEffect(async (value) => {
    console.log(value)
    if (value.new_kit) {
        setKits(value.new_kit)
    }
    return true
})

forward({
    from: sendFormKitFx.doneData,
    to: responseFormKitFx,
})

export const submitFormKit = createEvent()
submitFormKit.watch((e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    let obj = {}
    obj[formData.get("node")] = true
    console.log(obj)
    setSaved(obj)
    setSelected(null)
})

sample({
    clock: submitFormKit,
    target: sendFormKitFx,
})

export const edit = (node) => {
    EditRoute.navigate({
        params: {
            node_code: node,
        },
    })
    setExtra(null)
}

export const deleteNode = (node_code) => {
    deleteNodeFx(node_code)
    deleteId(node_code)
    setExtra(null)
}

export const addKit = (node) => {
    setSelected(node)
    setExtra(null)
}

export const deleteKit = (node_code) => {
    deleteNodeFx(node_code)
    deleteKitEvent(node_code)
    setExtra(null)
}

export const copyText = (node_code) => {
    navigator.clipboard.writeText(`https://liberty-realty.ru/kit/${node_code}/`)
    setExtra(null)
}
