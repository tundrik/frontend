import { Metro } from "@/metro"
import { Article, DisplayLoader } from "../../ui"

import { $edges, sudden, $pageInfo, moreSudden, more } from "./init"

export const KitPage = () => {
    const configMetro = {
        $edges,
        $pageInfo,
        moreSudden,
        more,
        Article,
    }
    return (
        <>
            <aside className="st"></aside>
            <main className="mn">
                <div className="filter">
                    <div className="inter">
                        <div className="rsb lim">
                           <div className="ved">Подборка для вас</div> 
                        </div>
                    </div>
                </div>

                <div className="lim f1 rih">
                    <DisplayLoader sudden={sudden}>
                        <Metro {...configMetro} />
                    </DisplayLoader>
                </div>
            </main>
        </>
    )
}
