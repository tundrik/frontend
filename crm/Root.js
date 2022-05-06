import { useStore } from "effector-react"

import "./index.css"
import { Alert } from "./features"
import { $cookie } from "./init"

/* IMPORT LAZY */
//const App = React.lazy(() => import("./App"))
//const Login = React.lazy(() => import("./Login"))

import App from "./App"
import Login from "./Login"

export const Root = () => {
    const cookieValue = useStore($cookie)
    return (
        <>
            {cookieValue ? <App /> : <Login />}
            <Alert />
        </>
    )
}
