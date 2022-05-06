import { createRoute } from "."

export const HomeRoute = createRoute("/")

const navigator = "/explore/:node(estate|project)/"
const type_enum = ":type_enum(residential|house|ground|commercial)?/"

const price = "{price-min-:price_min/}?{price-max-:price_max/}?"

const square = "{square-min-:square_min/}?{square-max-:square_max/}?{square-ground-min-:square_ground_min/}?{square-ground-max-:square_ground_max/}?"

const sort = "{sort-:sort/}?"

export const NavigatorRoute = createRoute(
    navigator + type_enum  + price + square + sort
)

export const NodeRoute = createRoute("/node/:node_code/")
export const FavoriteRoute = createRoute("/favorite/:node_type(estate|project)/")