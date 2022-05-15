import { createRoute } from "."

const navigator = "/navigator/:node(estate|demand|project|employee)/"
const type_enum = ":type_enum(residential|house|ground|commercial)?/"
const deal = "{:deal(bay|rent)/}?"

const has = "{has-main-:has_main/}?{has-site-:has_site/}?{has-avito-:has_avito/}?"
          + "{has-yandex-:has_yandex/}?{has-cian-:has_cian/}?"
          + "{has-domclick-:has_domclick/}?"

const price = "{price-min-:price_min/}?{price-max-:price_max/}?"

const square = "{square-min-:square_min/}?{square-max-:square_max/}?{square-ground-min-:square_ground_min/}?{square-ground-max-:square_ground_max/}?"

const sort = "{sort-:sort/}?"

export const NavigatorRoute = createRoute(
    navigator + type_enum + deal + has + price + square + sort
)


export const AddRoute = createRoute("/add/:node(estate|demand|project|employee)/")
export const EditRoute = createRoute("/mutate/:node_code/")

export const KitRoute = createRoute("/profile/kit/:node_code?/")
