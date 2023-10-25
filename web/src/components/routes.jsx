import App from "../App"
import RegistrationPage from "../pages/RegistrationPage"

const routes = [
    {
    path: "/",
    element: <App/> 
    },
    {
        path: "/register",
        element: <RegistrationPage/>
    }
]

export default routes