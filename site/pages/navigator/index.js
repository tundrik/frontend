import { Metro } from "@/metro"
import { Article, DisplayLoader } from "../../ui"
import { Filter } from "./filter"
import { $edges, sudden, $pageInfo, moreSudden, more } from "./init"

export const NavigatorPage = () => {
    const configMetro = {
        $edges,
        $pageInfo,
        moreSudden,
        more,
        Article,
    }
    return (
        <>
            <header className="batmen">
                <div className="linef"></div>
            </header>
            <Filter />
            <main className="mn">
                <div className="f1">
                    <DisplayLoader sudden={sudden}>
                        <Metro {...configMetro} />
                    </DisplayLoader>
                </div>
            </main>
        </>
    )
}
