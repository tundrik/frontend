import { createEffect, createStore, createEvent, sample, combine, forward } from "effector"
import { fetchAlert, fetchAbort } from "../../api"
import { EditRoute, NavigatorRoute } from "../../router/config"
import { $files, setFiles } from "@/media/uploader"

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

const sendFormNodeFx = createEffect(async ({ e, files }) => {
    const formData = new FormData(e.target)
    for (let variable of files) {
        formData.append("image", variable.file)
    }
    return await fetchAlert({ formData: formData })
})

const onSubmitNode = createEvent()
onSubmitNode.watch((e) => {
    e.preventDefault()
})

sample({
    clock: onSubmitNode,
    source: $files,
    fn: (files, e) => ({ files, e }),
    target: sendFormNodeFx,
})

const responseFx = createEffect(async (value) => {
    NavigatorRoute.navigate({
        method: "replace",
        params: {
            node: value.type_node,
        },
    })
    setFiles([])
    return true
})

forward({
    from: sendFormNodeFx.doneData,
    to: responseFx,
})

export { $entity, sudden, onSubmitNode, sendFormNodeFx }
