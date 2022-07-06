import { createEvent, createStore } from "effector"
import { useStore } from "effector-react"
import { HomeRoute, NavigatorRoute, FavoriteRoute } from "./router/config"
import { FavoriteIcon, FavoriteActiveIcon, LineIcon } from "@/svg"
import { phone_site, email_site, office_site } from "../constant"
import { setModalForm } from "./features"

export const setMenu = createEvent()
export const $is_menu = createStore(false).on(setMenu, (_, props) => props)

const ButtonAction = () => (
    <button className="acti mrb-20" onClick={() => setModalForm({})}>
        <LineIcon />
        <span className="cs uperline">ОСТАВИТЬ ЗАЯВКУ</span>
    </button>
)

$is_menu.watch((state) => {
    if (state) {
        document.documentElement.classList.add("hidden")
        document.body.classList.add("hidden")
    } else {
        document.documentElement.classList.remove("hidden")
        document.body.classList.remove("hidden")
    }
})

FavoriteRoute.navigate.watch((state) => {
    setMenu(false)
})

HomeRoute.navigate.watch((state) => {
    setMenu(false)
    window.scrollTo(0, 0)
})

const navigateProject = () => {
    setMenu(false)
    NavigatorRoute.navigate({
        params: { node: "project" },
    })
}
const navigateEstate = (type_enum) => {
    setMenu(false)
    NavigatorRoute.navigate({
        params: { node: "estate", type_enum: type_enum },
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

export const FavoriteButton = ({ className }) => {
    const is_favorite = useStore(FavoriteRoute.match)
    return (
        <button className={className} onClick={() => FavoriteRoute.navigate({ params: { node_type: "estate" } })}>
            {is_favorite ? <FavoriteActiveIcon size="21" /> : <FavoriteIcon size="21" />}
        </button>
    )
}

export const Aside = () => {
    const match = useStore(NavigatorRoute.match)
    const isOpen = useStore($is_menu)
    return (
        <header className={isOpen ? "nv open" : "nv mode"}>
            <div className="content">
                <nav className="log">
                    <header className="mobile">
                        <MenuButton open={isOpen} />
                        <a className="cs logo" onClick={() => HomeRoute.navigate()}>
                            Liberty
                        </a>
                        <FavoriteButton className="menuicon" />
                    </header>

                    <div className={isOpen ? "lift open" : "lift"}>
                        <div className="menu">
                            <a
                                className={match?.params.node == "project" ? "nav-link act" : "nav-link"}
                                onClick={navigateProject}
                            >
                                Комплексы
                            </a>
                            <a
                                className={match?.params.type_enum == "residential" ? "nav-link act" : "nav-link"}
                                onClick={() => navigateEstate("residential")}
                            >
                                Квартиры
                            </a>
                            <a
                                className={match?.params.type_enum == "house" ? "nav-link act" : "nav-link"}
                                onClick={() => navigateEstate("house")}
                            >
                                Дома
                            </a>
                            <a
                                className={match?.params.type_enum == "ground" ? "nav-link act" : "nav-link"}
                                onClick={() => navigateEstate("ground")}
                            >
                                Участки
                            </a>
                            <a
                                className={match?.params.type_enum == "commercial" ? "nav-link act" : "nav-link"}
                                onClick={() => navigateEstate("commercial")}
                            >
                                Коммерция
                            </a>
                            <FavoriteButton className="h-f is-dec" />
                        </div>

                        <div className="knt">
                            <ButtonAction />
                            <p className="mrb fw5">{office_site}</p>
                            <a className="mrb-20 line" target="_blank" href="https://goo.gl/maps/Vpjmc2tiTsmjVDfU6">
                                Смотреть на карте
                            </a>
                            <a className="mrb line fw5" href={`tel:${phone_site}`}>
                                {phone_site}
                            </a>
                            <a className="line" href={`mailto:${email_site}`}>
                                {email_site}
                            </a>
                        </div>

                    </div>
                </nav>
            </div>
        </header>
    )
}
