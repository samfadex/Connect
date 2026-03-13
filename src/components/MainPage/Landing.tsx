import ClickableCard from "../ClickableCard";
import Title from "../Title";
import Notification from "../Notification";

const navigationItems = [
    { label: "Home" },
    { label: "Posts" },
    { label: "Messages", badge: "99+" },
    { label: "General Chat", badge: "5" },
    { label: "Profile" },
    { label: "Notifications", badge: "5" },
];

const faculties = [
    "Arts",
    "Science",
    "Business",
    "Education",
    "Music",
];

const moreItems = [
    { label: "About", href: "#" },
    { label: "Campus Map", href: "https://www.kingsu.ca/campus-life/campus-map" },
    { label: "Library", href: "https://www.kingsu.ca/services/library" },
    { label: "Student Services", href: "https://www.kingsu.ca/services" },
    { label: "Campus Events", href: "https://www.kingsu.ca/about-us/calendar" },
    { label: "Support", href: "https://www.kingsu.ca/student-hub/resources/resources" },
];

const quickLinks = [
    {
        title: "Visit King's",
        description: "Plan a campus visit and explore student life in Edmonton.",
        href: "https://www.kingsu.ca/",
    },
];

const campusHighlights = [
    "Learning Services supports study planning, writing help, and academic success.",
    "Student Life resources help students stay connected to clubs, chapel, and residence updates.",
    "Admissions and visit information are front-and-center across the King's University Edmonton experience.",
];


const handlePost = (value: string) => {
        console.log("Post created:", value);
    };

    const handleLike = (liked: boolean) => {
        console.log(liked ? "You liked the post" : "You unliked the post");
    };

    const handleShare = () => {
        console.log("Post shared");
    };

function Landing() {
    return (
        <div className="king-theme">
            <header className="king-header">
                <div className="king-shell">
                    <div className="king-topbar">
                        <div className="king-header__brand">
                            <div className="king-brand-copy">
                                <p className="king-eyebrow">The</p>
                                <h1 className="king-wordmark">King&apos;s</h1>
                                <p className="king-wordmark-subtitle">University</p>
                            </div>
                        </div>

                        <button
                            className="king-mode-toggle"
                            id="darkModeToggle"
                            type="button"
                            aria-label="Toggle dark mode"
                            onClick={() => {
                                document.body.classList.toggle("dark-mode");
                                localStorage.setItem("darkMode", document.body.classList.contains("dark-mode") ? "true" : "false");
                            }}
                        >
                            Switch Theme
                        </button>
                    </div>

                    <nav className="king-navbar" aria-label="Primary">
                        <div className="king-navbar__links">
                            {navigationItems.map((item) => (
                                <a key={item.label} className="king-nav-link" href="#">
                                    <span>{item.label}</span>
                                    {item.badge ? <span className="badge bg-warning text-dark">{item.badge}</span> : null}
                                </a>
                            ))}

                            <details className="king-nav-dropdown">
                                <summary className="king-nav-link king-nav-dropdown__toggle">
                                    <span>Faculties</span>
                                </summary>
                                <div className="king-nav-dropdown__menu">
                                    {faculties.map((faculty) => (
                                        <a key={faculty} className="king-nav-dropdown__item" href="#">
                                            {faculty}
                                        </a>
                                    ))}
                                </div>
                            </details>

                            <details className="king-nav-dropdown">
                                <summary className="king-nav-link king-nav-dropdown__toggle">
                                    <span>More</span>
                                </summary>
                                <div className="king-nav-dropdown__menu">
                                    {moreItems.map((item) => (
                                        <a key={item.label} className="king-nav-dropdown__item" href={item.href}>
                                            {item.label}
                                        </a>
                                    ))}
                                </div>
                            </details>
                        </div>

                        <div className="king-navbar__actions">
                            <input className="king-search" placeholder="Search posts, groups, or people" />
                        </div>
                    </nav>
                </div>
            </header>

            <main className="king-main king-shell">
                <section className="king-hero">
                    <div className="king-welcome-panel">
                        <div className="king-welcome">
                            <Title title="Welcome To King&apos;s University Edmonton" />
                            <p className="king-welcome-copy">
                                Follow class chatter, club updates, and student news in a lighter campus hub inspired by King&apos;s University Edmonton.
                            </p>
                            <div className="king-hero__actions">
                                <a className="king-cta king-cta--primary" href="#">
                                    See what&apos;s new
                                </a>
                                <a className="king-cta king-cta--secondary" href="#">
                                    Browse groups
                                </a>
                            </div>
                        </div>
                        <aside className="king-highlight-card">
                            <p className="king-side-panel__label">Campus support</p>
                            <ul className="king-side-panel__list">
                                {campusHighlights.map((item) => (
                                    <li key={item}>{item}</li>
                                ))}
                            </ul>
                        </aside>
                    </div>
                </section>

                <section className="king-resource-grid">
                    {quickLinks.map((link) => (
                        <article key={link.title} className="king-resource-card">
                            <div>
                                <p className="king-side-panel__label">Quick action</p>
                                <h3>{link.title}</h3>
                                <p>{link.description}</p>
                            </div>
                            <a href={link.href} className="king-resource-link">Open</a>
                        </article>
                    ))}
                </section>

                <div className="row g-4 align-items-start king-content-grid">
                    <div className="col-lg-8 king-content-grid__main">
                        <ClickableCard
                            title="Social post"
                            initialValue="Hi everyone, I'm a first-year student and I'm looking for advice on juggling classes and campus life."
                            onPost={handlePost}
                            onLike={handleLike}
                            onShare={handleShare}
                        />
                    </div>

                    <div className="col-lg-4 king-content-grid__side">
                        <div className="king-sidebar-stack">
                        <aside className="king-side-panel king-side-panel--soft">
                            <p className="king-side-panel__label">Today at King&apos;s</p>
                            <ul className="king-side-panel__list">
                                <li>Student council applications are open this month.</li>
                                <li>Volunteers are needed for the spring welcome fair.</li>
                                <li>Library late-night study hours are extended this weekend.</li>
                            </ul>
                        </aside>

                        <aside className="king-side-panel king-side-panel--compact">
                            <p className="king-side-panel__label">At a glance</p>
                            <div className="king-stat-list">
                                <div>
                                    <strong>5</strong>
                                    <span>new messages</span>
                                </div>
                                <div>
                                    <strong>3</strong>
                                    <span>events today</span>
                                </div>
                                <div>
                                    <strong>12</strong>
                                    <span>active group chats</span>
                                </div>
                            </div>
                        </aside>
                        </div>
                    </div>
                </div>

                <div className="king-footer">
                    <p className="king-faith-verse">
                        &quot;Let all that you do be done in love.&quot; <span>1 Corinthians 16:14</span>
                    </p>
                </div>

                <Notification message="General Chat has " number={5} color="dark" />
            </main>
            </div>
        );
    }
    
    export default Landing;