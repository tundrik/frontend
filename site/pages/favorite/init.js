import { createPaginator } from "../../init"
import { FavoriteRoute } from "../../router/config"

const { fetchFx, fetchMoreFx, $pageInfo, $edges, more, sudden, moreSudden } = createPaginator({
    Route: FavoriteRoute,
    name: "navigator",
})

export { $pageInfo, $edges, more, sudden, moreSudden }