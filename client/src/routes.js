import Base from "./components/Base.jsx";
import HomePage from "./components/HomePage.jsx";
import LoginPage from "./containers/LoginPage.jsx";
import SignUpPage from "./containers/SignUpPage.jsx";

const routes = {
    // Base component (wrapper for the whole applications).
    component: Base,
    // Child routes.
    childRoutes: [
        {
            // Index route.
            path: "/",
            component: HomePage
        },
        {
            // Log in route.
            path: "/login",
            component: LoginPage
        },
        {
            // Sign up route.
            path: "/signup",
            component: SignUpPage
        }
    ]
};

export default routes;