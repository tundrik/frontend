import { Switch } from "./router"
import { Nav } from "./nav"

import {
  NavigatorRoute,
  AddRoute,
  EditRoute,
  KitRoute,
} from "./router/config"


import { NavigatorPage } from "./pages/navigator"
import { AddPage } from "./pages/add"
import { EditPage } from "./pages/edit"
import { KitPage } from "./pages/kit"

import { Extra, Contact, Selected } from "./features"
import { Presentation } from "@/media"

function App() {
  return (
    <div className="row f1">
      <Nav />
      <Switch>
        <NavigatorRoute exact>
          <NavigatorPage />
        </NavigatorRoute>

        <AddRoute exact>
          <AddPage />
        </AddRoute>

        <EditRoute exact>
          <EditPage />
        </EditRoute>

        <KitRoute exact>
          <KitPage />
        </KitRoute>

      </Switch>
      <Extra />
      <Contact />
      <Selected />
      <Presentation />
    </div>
  )
}

export default App
