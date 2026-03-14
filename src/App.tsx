import { useEffect, useState } from "react";
import "./App.css";
import Landing from "./components/MainPage/Landing";
import Login from "./components/Login";
import MarketPlace from "./components/MainPage/MarketPlace";
import Messages from "./components/MainPage/Messages";
import Posts from "./components/MainPage/Posts";
import Faculty from "./components/Faculty";
import Signup from "./components/Signup";
import ForgotPassword from "./components/ForgotPassword";

type StudentProfile = {
    id: number;
    name: string | null;
    schoolEmail: string | null;
    username: string | null;
    studentId: number | null;
};

const getCurrentPage = () => {
    if (window.location.hash === "#home") return "home";
    if (window.location.hash === "#posts") return "posts";
    if (window.location.hash === "#messages") return "messages";
    if (window.location.hash === "#marketplace") return "marketplace";
    if (window.location.hash === "#faculties") return "faculties";
    if (window.location.hash === "#signup") return "signup";
    if (window.location.hash === "#login") return "login";
    if (window.location.hash === "#forgot-password") return "forgot-password";
    return "login";
};


function App() {
    const [page, setPage] = useState(getCurrentPage);
    const [currentStudent, setCurrentStudent] = useState<StudentProfile | null>(null);

    useEffect(() => {
        const handleHashChange = () => {
            setPage(getCurrentPage());
        };

        window.addEventListener("hashchange", handleHashChange);
        return () => window.removeEventListener("hashchange", handleHashChange);
    }, []);

    if (page === "messages") return <Messages />;
    if (page === "posts") return <Posts />;
    if (page === "marketplace") return <MarketPlace />;
    if (page === "faculties") return <Faculty currentStudent={currentStudent} />;
    if (page === "signup") return <Signup />;
    if (page === "forgot-password") return <ForgotPassword />;
    if (page === "login") return <Login onLoginSuccess={setCurrentStudent} />;
    if (page === "home") return <Landing currentStudent={currentStudent} />;
    return <Landing currentStudent={currentStudent} />;
}

export default App;
