import { useEffect, useState } from "react";
import "./App.css";
import Landing from "./components/MainPage/Landing";
import MarketPlace from "./components/MainPage/MarketPlace";
import Messages from "./components/MainPage/Messages";

const getCurrentPage = () => {
    if (window.location.hash === "#messages") return "messages";
    if (window.location.hash === "#marketplace") return "marketplace";
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
    return <Landing />;
}

export default App;
