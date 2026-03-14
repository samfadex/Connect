import { useState } from "react";
import Title from "../Title";
import ConnectLogo from "../ConnectLogo";
import NotificationCenter from "./NotificationCenter";
import SiteFooter from "./SiteFooter";

type DiscussionPost = {
    id: number;
    title: string;
    detail: string;
    author: string;
};

const navigationItems = [
    { label: "Home", href: "#home" },
    { label: "Posts", href: "#posts", badge: "5", active: true },
    { label: "Messages", href: "#messages" },
    { label: "Marketplace", href: "#marketplace" },
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

const initialDiscussions: DiscussionPost[] = [
    {
        id: 1,
        title: "COMM 110 presentation practice",
        detail: "Looking for 2 classmates to rehearse on Thursday evening in the library.",
        author: "Maya",
    },
    {
        id: 2,
        title: "Textbook exchange thread",
        detail: "Post what you need and what you can share this week.",
        author: "Jordan",
    },
    {
        id: 3,
        title: "Midterm prayer + support circle",
        detail: "Quick check-in after chapel for anyone feeling overwhelmed.",
        author: "Ava",
    },
];

function Posts() {
    const [discussionTitle, setDiscussionTitle] = useState("");
    const [discussionDetail, setDiscussionDetail] = useState("");
    const [discussions, setDiscussions] = useState(initialDiscussions);

    const handleCreateDiscussion = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const trimmedTitle = discussionTitle.trim();
        const trimmedDetail = discussionDetail.trim();
        if (!trimmedTitle || !trimmedDetail) return;

        setDiscussions((current) => [
            {
                id: Date.now(),
                title: trimmedTitle,
                detail: trimmedDetail,
                author: "You",
            },
            ...current,
        ]);
        setDiscussionTitle("");
        setDiscussionDetail("");
    };

    return (
        <div className="king-theme">
            <header className="king-header">
                <div className="king-shell">
                    <div className="king-topbar">
                        <div className="king-header__brand">
                            <ConnectLogo className="connect-login-brand--header" eyebrow="Campus Network" name="CONNECT" />
                        </div>

                        <div className="king-topbar__actions">
                            <div className="king-profile-chip" role="button" tabIndex={0} aria-label="Open profile">
                                <span className="king-profile-chip__icon" aria-hidden="true">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M20 21a8 8 0 0 0-16 0" />
                                        <circle cx="12" cy="8" r="4" />
                                    </svg>
                                </span>
                                <span className="king-profile-chip__copy">
                                    <strong>Sarah Kim</strong>
                                    <small>Student</small>
                                </span>
                            </div>
                        </div>
                    </div>

                    <nav className="king-navbar" aria-label="Primary">
                        <div className="king-navbar__links">
                            {navigationItems.map((item) => (
                                <a
                                    key={item.label}
                                    className={`king-nav-link${item.active ? " king-nav-link--active" : ""}`}
                                    href={item.href}
                                >
                                    <span>{item.label}</span>
                                    {item.badge ? <span className="badge bg-warning text-dark">{item.badge}</span> : null}
                                </a>
                            ))}

                            <NotificationCenter unreadCount="99+" />

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
                            <input className="king-search" placeholder="Search discussions or students" />
                        </div>
                    </nav>
                </div>
            </header>

            <main className="king-main king-shell">
                <section className="king-message-hero">
                    <div className="king-message-hero__copy">
                        <p className="king-side-panel__label">Post section</p>
                        <Title title="Course Discussions" />
                        <p className="king-welcome-copy">
                            Create a discussion or join one already started by classmates.
                        </p>
                    </div>
                </section>

                <section className="king-posts-hub" id="posts">
                    <article className="king-posts-hub__create">
                        <p className="king-side-panel__label">Create a discussion</p>
                        <h3>Start a new post</h3>
                        <form onSubmit={handleCreateDiscussion} className="king-posts-hub__form">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Discussion title"
                                value={discussionTitle}
                                onChange={(event) => setDiscussionTitle(event.target.value)}
                            />
                            <textarea
                                className="form-control"
                                rows={4}
                                placeholder="What do you want to discuss?"
                                value={discussionDetail}
                                onChange={(event) => setDiscussionDetail(event.target.value)}
                            />
                            <button type="submit" className="king-cta king-cta--primary">
                                Post Discussion
                            </button>
                        </form>
                    </article>

                    <article className="king-posts-hub__join">
                        <p className="king-side-panel__label">Join discussion</p>
                        <div className="king-posts-hub__list">
                            {discussions.map((discussion) => (
                                <div key={discussion.id} className="king-posts-hub__item">
                                    <div>
                                        <h4>{discussion.title}</h4>
                                        <p>{discussion.detail}</p>
                                        <small>Started by {discussion.author}</small>
                                    </div>
                                    <a href="#messages" className="king-resource-link">Join</a>
                                </div>
                            ))}
                        </div>
                    </article>
                </section>

                <SiteFooter />
            </main>
        </div>
    );
}

export default Posts;
