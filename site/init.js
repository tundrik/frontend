import { createDomain, guard, combine, forward } from "effector"
import { host, host_base, fetchAlert, fetchAbort } from "./api"

const app = createDomain()

const INIT_PAGE = {
    cursor: null,
    ids: [],
    node_type: "",
}

const $pageInfo = app.createStore(INIT_PAGE)
const $edges = app.createStore({})

const fetchSaveFx = app.createEffect(async (node) => {
    return await fetchAlert({ cursor: `${host}/features/favorite/${node}/` })
})

export const saveEntity = app.createEvent()

forward({
    from: saveEntity,
    to: fetchSaveFx,
})

$edges.on(saveEntity, (list, idx) => {
    const item = list[idx]
    return {
        ...list,
        [idx]: { ...item, savedByViewer: !item.savedByViewer },
    }
})


export const createPaginator = ({ Route, name }) => {
    const fetchFx = app.createEffect(async () => {
        return await fetchAbort({ key: name })
    })
    const fetchMoreFx = app.createEffect(async ({ cursor }) => {
        return await fetchAbort({ key: name, cursor })
    })

    const more = app.createEvent()

    $pageInfo
        .on(fetchFx.doneData, (_, newData) => newData.pageInfo)
        .on(fetchMoreFx.doneData, (prewData, newData) => ({
            ...newData.pageInfo,
            ids: [...prewData.ids, ...newData.pageInfo.ids],
        }))
        .reset(fetchFx)

    $edges
        .on(fetchFx.doneData, (_, newData) => newData.edges)
        .on(fetchMoreFx.doneData, (prewData, newData) => ({ ...prewData, ...newData.edges }))
        .reset(fetchFx)

    guard({
        clock: Route.open,
        source: $pageInfo,
        filter: (pageInfo) => pageInfo.ids.length === 0,
        target: fetchFx,
    })

    guard({
        clock: Route.navigate,
        filter: (navigate) => !navigate.load,
        target: fetchFx,
    })

    guard({
        clock: more,
        source: $pageInfo,
        filter: (pageInfo) => pageInfo.cursor,
        target: fetchMoreFx,
    })

    const $message = app
        .createStore(null)
        .on(fetchFx.failData, (_, newData) => newData)
        .reset(fetchFx)

    const sudden = combine({
        message: $message,
        pending: fetchFx.pending,
    })

    const $moreMessage = app
        .createStore(null)
        .on(fetchMoreFx.failData, (_, newData) => newData)
        .reset(fetchFx)

    const moreSudden = combine({
        message: $moreMessage,
        pending: fetchMoreFx.pending,
    })

    return { fetchFx, fetchMoreFx, $pageInfo, $edges, more, sudden, moreSudden }
}


