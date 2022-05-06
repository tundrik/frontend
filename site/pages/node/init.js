import { createEffect, createStore, sample, combine } from "effector"
import { fetchAbort } from "../../api"
import { NodeRoute } from "../../router/config"


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

export const { $entity, sudden } = createPage({ clock: NodeRoute.match })