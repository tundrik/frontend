import { Metro } from "@/metro"
import { Article, DisplayLoader } from "../../ui"
import { Filter } from "./filter"
import { $edges, sudden, $pageInfo, moreSudden, more } from "./init"

export const FavoritePage = () => {
    const configMetro = {
        $edges,
        $pageInfo,
        moreSudden,
        more,
        Article,
    }
    return (
        <main className="sheet main">
            <div className="filter">
            <Filter />
            </div>
            <div className="f1">
                <DisplayLoader sudden={sudden}>
                    <Metro {...configMetro} />
                </DisplayLoader>
            </div>
        </main>
    )
}
