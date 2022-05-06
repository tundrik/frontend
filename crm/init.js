import { createDomain, guard, combine } from "effector"
import { getCookie } from "./utils"
import { host, host_base, fetchAlert, fetchAbort } from "./api"

const app = createDomain()

export const setCookie = app.createEvent()
export const $cookie = app.createStore(getCookie("jwt_token")).on(setCookie, (_, state) => state)

const INIT_PAGE = {
    cursor: null,
    ids: [],
    node_type: "",
}

const $pageInfo = app.createStore(INIT_PAGE)

const deleteId = app.createEvent()
$pageInfo.on(deleteId, (pageInfo, idx) => {
  console.log(pageInfo)
  const new_ids = pageInfo.ids.filter((n) => {return n != idx})
  return {
    ...pageInfo,
    ids: new_ids,
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

    const $edges = app
        .createStore({})
        .on(fetchFx.doneData, (_, newData) => newData.edges)
        .on(fetchMoreFx.doneData, (prewData, newData) => ({ ...prewData, ...newData.edges }))

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

const logautFx = app.createEffect(async () => {
    return await fetchAlert({ method: "delete", cursor: `${host_base}/login/` })
})

logautFx.done.watch(({ params, result }) => {
    console.log(result)
    setCookie(null)
})

const getViewerFx = app.createEffect(async () => {
    return await fetchAlert({ method: "get", cursor: `${host}/profile/viewer/` })
})

const $viewer = app.createStore({}).on(getViewerFx.doneData, (_, newData) => newData)

const deleteNodeFx = app.createEffect(async (node_code) => {
    return await fetchAlert({ cursor: `${host}/delete/${node_code}/` })
})

const getKitsFx = app.createEffect(async () => {
    return await fetchAlert({ method: "get", cursor: `${host}/profile/kit/` })
})

const getSavedFx = app.createEffect(async () => {
    return await fetchAlert({ method: "get", cursor: `${host}/profile/saved/` })
})
const deleteSavedFx = app.createEffect(async (node_code) => {
    return await fetchAlert({ cursor: `${host}/profile/saved/delete/${node_code}/` })
})

const sendFormKitFx = app.createEffect(async (e) => {
    const formData = new FormData(e.target)
    return await fetchAlert({ formData: formData, cursor: `${host}/profile/kit/` })
})

export { logautFx, getViewerFx, $viewer, getKitsFx, deleteNodeFx, sendFormKitFx, getSavedFx, deleteSavedFx, deleteId }
