import { createPaginator } from "../../init"
import { NavigatorRoute } from "../../router/config"

const { fetchFx, fetchMoreFx, $pageInfo, $edges, more, sudden, moreSudden } = createPaginator({
    Route: NavigatorRoute,
    name: "navigator",
})


export { $pageInfo, $edges, more, sudden, moreSudden }