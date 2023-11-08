import App from "../App"
import LoginPage from "../pages/LoginPage"
import RegistrationPage from "../pages/RegistrationPage"

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
    }
]

export default routes