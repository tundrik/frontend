import { useStore } from "effector-react"
import { Article, DisplayLoader, Label } from "../../ui"
import { KitRoute } from "../../router/config"
import { $kits, setExtra } from "../../features/init"
import { $edges, sudden, $pageInfo, moreSudden, more } from "./init"
import { Metro } from "@/metro"
import { ExtraIcon } from "@/svg"

const ExtraButton = ({ node }) => (
    <button className="pointer" onClick={() => setExtra(node)}>
        <div className="extra">
            <ExtraIcon />
        </div>
    </button>
)

const to = (node_code) => {
    KitRoute.navigate({
        method: "replace",
        params: {
            node_code: node_code,
        },
    })
}

const Selected = ({ item, node_code }) => {
    return (
        <div className={node_code === item.node_code ? "item_selected active" : "item_selected"}>
            <div className="selected_label" onClick={() => to(item.node_code)}>
                {item.kit_name}
            </div>
            <ExtraButton node={item} />
        </div>
    )
}

const Kits = () => {
    const kits = useStore($kits)
    const match = useStore(KitRoute.match)
    const { node_code } = match?.params
    if (kits.length == 0) {
        return <div className="not_kit">У вас нет подборок</div>
    }
    return kits.map((item) => <Selected key={item.node_code} item={item} node_code={node_code} />)
}

export const KitPage = () => {
    const configMetro = {
        $edges,
        $pageInfo,
        moreSudden,
        more,
        Article,
        estimateSize: 248,
    }
    return (
        <>
            <div className="nav">
                <Label title="Ваши подборки" />
                <Kits />
            </div>
            <main className="main">
                <DisplayLoader sudden={sudden}>
                    <Metro {...configMetro} />
                </DisplayLoader>
            </main>
        </>
    )
}
