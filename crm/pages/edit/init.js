import { createEffect, createStore, createEvent, sample, combine, forward } from "effector"
import { fetchAlert, fetchAbort } from "../../api"
import { EditRoute, NavigatorRoute } from "../../router/config"

const createPage = ({ clock }) => {
    const fetchFx = createEffect(async (match) => {
        return await fetchAbort({ key: "name" })
    })
    const $entity = createStore(null).on(fetchFx.doneData, (_, newData) => newData)
    sample({
        clock: clock,
        target: fetchFx,
    })
    const $message = createStore(null)
        .on(fetchFx.failData, (_, newData) => newData)
        .reset(fetchFx)

    const sudden = combine({
        message: $message,
        pending: fetchFx.pending,
    })
    return { $entity, sudden }
}

const { $entity, sudden } = createPage({ clock: EditRoute.match })


const sendFormNodeFx = createEffect(async (e) => {
    const formData = new FormData(e.target)
    return await fetchAlert({ formData: formData })
})


const onSubmitNode = createEvent()
onSubmitNode.watch((e) => {
    e.preventDefault()
})


forward({
    from: onSubmitNode,
    to: sendFormNodeFx,
})

const responseFx = createEffect(async (value) => {
    if (value.type_node) {
        NavigatorRoute.navigate({
            method: "replace",
            params: {
                node: value.type_node,
            },
        })
    }
    return true
})


forward({
    from: sendFormNodeFx.doneData,
    to: responseFx,
})

export { $entity, sudden, onSubmitNode, sendFormNodeFx }
