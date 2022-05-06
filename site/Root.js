import { Switch } from "./router"

import { Header } from "./Header"
import { HomeRoute, NavigatorRoute, NodeRoute, FavoriteRoute } from "./router/config"
import { HomePage } from "./pages/home"
import { NavigatorPage } from "./pages/navigator"
import { FavoritePage } from "./pages/favorite"
import { NodePage } from "./pages/node"
import { Presentation } from "@/media"
import { Alert, Contact, ModalForm } from "./features"
import "./index.css"


export const Root = () => {
    return (
        <>
            <Header />
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
            </Switch>
            <ModalForm />
            <Alert />
            <Contact />
            <Presentation />
        </>
    )
}
