import { Metro } from "@/metro"
import { Filter } from "./filter"
import { Article, DisplayLoader } from "../../ui"
 
import { $edges, sudden, $pageInfo, moreSudden, more } from "./init"

export const NavigatorPage = () => {
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
        <Filter />
      </div>
      <main className="main">
        <DisplayLoader sudden={sudden}>
          <Metro {...configMetro} />
        </DisplayLoader>
      </main>
    </>
  )
}
