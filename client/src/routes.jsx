import Page from "./Page";
import ErrorPage from "./ErrorPage";

const routes = [
    {
        path:"/:currPage?",
        element: <Page></Page>,
        errorElement: <ErrorPage></ErrorPage>
    }
]

export default routes;