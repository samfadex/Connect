import { useEffect, useState } from "react";
import "./App.css";
import Landing from "./components/MainPage/Landing";
import Login from "./components/Login";
import MarketPlace from "./components/MainPage/MarketPlace";
import Messages from "./components/MainPage/Messages";
import Signup from "./components/Signup";

const getCurrentPage = () => {
    if (window.location.hash === "#messages") return "messages";
    if (window.location.hash === "#marketplace") return "marketplace";
    if (window.location.hash === "#signup") return "signup";
    if (window.location.hash === "#login") return "login";
    return "home";
};


function App() {
    const [page, setPage] = useState(getCurrentPage);

    useEffect(() => {
        const handleHashChange = () => {
            setPage(getCurrentPage());
        };

        window.addEventListener("hashchange", handleHashChange);
        return () => window.removeEventListener("hashchange", handleHashChange);
    }, []);

    if (page === "messages") return <Messages />;
    if (page === "marketplace") return <MarketPlace />;
    if (page === "signup") return <Signup />;
    if (page === "login") return <Login />;
    return <Landing />;
}

export default App;
