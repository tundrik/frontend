import { createEvent, createEffect, createStore, sample, forward } from "effector"
import { useStore } from "effector-react"

import { phone_site } from "../constant"
import { HomeRoute, NavigatorRoute, FavoriteRoute } from "./router/config"
import { PhoneIcon, FavoriteIcon, FavoriteActiveIcon } from "@/svg"

export const setMenu = createEvent()
export const $is_menu = createStore(false).on(setMenu, (_, props) => props)

$is_menu.watch((state) => {
    console.log(state)
    if (state) {
        document.documentElement.style.overflow = "hidden"
        document.body.style.overflow = "hidden"
    } else {
        document.documentElement.style.overflow = ""
        document.body.style.overflow = ""
    }
})

FavoriteRoute.navigate.watch(state => {
    setMenu(false)
})

HomeRoute.navigate.watch(state => {
    setMenu(false)
})

const navigateNavigator = (params) => {
    setMenu(false)
    NavigatorRoute.navigate({
        params: params,
    })
}

const MenuButton = ({ open }) => (
    <button className="menuicon" onClick={() => setMenu(!open)}>
        <span className={!open ? "bread bread-top" : "bread bread-top open"}>
            <span className={!open ? "bread-crust bread-crust-top" : "bread-crust bread-crust-top open"}></span>
        </span>
        <span className={!open ? "bread bread-bottom" : "bread bread-bottom open"}>
            <span className={!open ? "bread-crust bread-crust-bottom" : "bread-crust bread-crust-bottom open"}></span>
        </span>
    </button>
)

export const Header = () => {
    const match = useStore(NavigatorRoute.match)
    const is_favorite = useStore(FavoriteRoute.match)
    const isOpen = useStore($is_menu)

    return (
        <>
            <header className="global">
                <div className="sheet f1 row">
                    <MenuButton open={isOpen} />
                    <div className="logo" onClick={() => HomeRoute.navigate()}>
                        Liberty
                    </div>
                    <div className="glo">
                        <div
                            className={match?.params.node == "project" ? "lit act" : "lit"}
                            onClick={() => navigateNavigator({ node: "project" })}
                        >
                            Комплексы
                        </div>
                        <div
                            className={match?.params.type_enum == "residential" ? "lit act" : "lit"}
                            onClick={() => navigateNavigator({ node: "estate", type_enum: "residential" })}
                        >
                            Квартиры
                        </div>
                        <div
                            className={match?.params.type_enum == "house" ? "lit act" : "lit"}
                            onClick={() => navigateNavigator({ node: "estate", type_enum: "house" })}
                        >
                            Дома
                        </div>
                        <div
                            className={match?.params.type_enum == "ground" ? "lit act" : "lit"}
                            onClick={() => navigateNavigator({ node: "estate", type_enum: "ground" })}
                        >
                            Участки
                        </div>
                        <div
                            className={match?.params.type_enum == "commercial" ? "lit act" : "lit"}
                            onClick={() => navigateNavigator({ node: "estate", type_enum: "commercial" })}
                        >
                            Коммерция
                        </div>
                    </div>
            
                    <div className="phone">
                        <PhoneIcon />
                        <a className="phone-link" href={`tel:${phone_site}`}>
                            {phone_site}
                        </a>
                    </div>
                    <button className="favorite pointer" onClick={()=> FavoriteRoute.navigate({params:{ node_type: "estate"}})}>
                        {is_favorite ? <FavoriteActiveIcon /> : <FavoriteIcon />}
                    </button>
                </div>
            </header>

            <div className={isOpen ? "list-menu open" : "list-menu"}>
                <div className="glo-list">
                    <div className="phone2">
                        <PhoneIcon />
                        <a className="phone-link" href={`tel:${phone_site}`}>
                        {phone_site}
                        </a>
                    </div>

                    <div className="lip" onClick={() => navigateNavigator({ node: "project" })}>
                        Комплексы
                    </div>
                    <div
                        className="lip"
                        onClick={() => navigateNavigator({ node: "estate", type_enum: "residential" })}
                    >
                        Квартиры
                    </div>
                    <div className="lip" onClick={() => navigateNavigator({ node: "estate", type_enum: "house" })}>
                        Дома
                    </div>
                    <div className="lip" onClick={() => navigateNavigator({ node: "estate", type_enum: "ground" })}>
                        Участки
                    </div>
                    <div className="lip" onClick={() => navigateNavigator({ node: "estate", type_enum: "commercial" })}>
                        Коммерция
                    </div>
                </div>
            </div>
        </>
    )
}
