import { Switch } from "./router"

import { Aside } from "./Header"
import { HomeRoute, NavigatorRoute, NodeRoute, FavoriteRoute, KitRoute } from "./router/config"
import { HomePage } from "./pages/home"
import { NavigatorPage } from "./pages/navigator"
import { FavoritePage } from "./pages/favorite"
import { NodePage } from "./pages/node"
import { KitPage } from "./pages/kit"
import { Presentation } from "@/media"
import { Alert, Contact, ModalForm } from "./features"

import "./css/core.css"
import "./css/home.css"
import "./css/item.css"
import "./css/system.css"
import "./css/modal.css"
import "./css/media.css"


export const Root = () => {
    return (
        <>
            <div className="coup">
                <Aside />
                <Switch>
                    <HomeRoute exact>
                        <HomePage />
                    </HomeRoute>

                    <NavigatorRoute exact>
                        <NavigatorPage />
                    </NavigatorRoute>

                    <NodeRoute exact>
                        <NodePage />
                    </NodeRoute>

                    <FavoriteRoute exact>
                        <FavoritePage />
                    </FavoriteRoute>

                    <KitRoute exact>
                        <KitPage />
                    </KitRoute>
                </Switch>
            </div>
            <ModalForm />
            <Alert />
            <Contact />
            <Presentation />
        </>
    )
}
