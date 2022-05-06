import { createPaginator } from "../../init"
import { KitRoute } from "../../router/config"

const { fetchFx, fetchMoreFx, $pageInfo, $edges, more, sudden, moreSudden } = createPaginator({
    Route: KitRoute,
    name: "kit",
})

export { $pageInfo, $edges, more, sudden, moreSudden }


