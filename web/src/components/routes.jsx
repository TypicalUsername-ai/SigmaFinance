import App from "../App"
import LoginPage from "../pages/LoginPage"
import RegistrationPage from "../pages/RegistrationPage"
import { CoinDetailsPage } from "../pages/CoinDetailsPage"
import { CoinsList } from "./CoinList"

const routes = [
    {
    path: "/",
    element: <App/> 
    },
    {
        path: "/register",
        element: <RegistrationPage/>
    },
    {
        path:"/login",
        element: <LoginPage/>
    },
    {
        path: "/coins",
        element: <CoinsList/>
    },
    {
    path: "/coin/:coin",
    element: <CoinDetailsPage/>  
    }
]

export default routes