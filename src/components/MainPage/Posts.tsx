import { useState } from "react";
import Title from "../Title";
import SiteFooter from "./SiteFooter";
import SharedPageHeader from "./SharedPageHeader";

type DiscussionPost = {
    id: number;
    title: string;
    detail: string;
    author: string;
};

const pendingGroupChatKey = "connect:pendingGroupChat";

const navigationItems = [
    { label: "Home", href: "#home" },
    { label: "Posts", href: "#posts", badge: "5", active: true },
    { label: "Chat", href: "#messages", badge: "12" },
    { label: "Group Forum", href: "#group-chat" },
    { label: "Marketplace", href: "#marketplace" },
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

    const handleJoinDiscussion = (discussion: DiscussionPost) => {
        try {
            sessionStorage.setItem(
                pendingGroupChatKey,
                JSON.stringify({
                    discussionId: discussion.id,
                    title: discussion.title,
                    detail: discussion.detail,
                }),
            );
        } catch {
            // If storage is unavailable, still navigate; user can manually pick a chat.
        }

        window.location.hash = "#group-chat";
    };

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
            <SharedPageHeader
                navigationItems={navigationItems}
                profileName="Sarah Kim"
                profileStatus="Student"
                searchPlaceholder="Search discussions or students"
                notificationCount="99+"
                moreItems={moreItems}
            />

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
                                    <a
                                        href="#group-chat"
                                        className="king-resource-link"
                                        onClick={(event) => {
                                            event.preventDefault();
                                            handleJoinDiscussion(discussion);
                                        }}
                                    >
                                        Join
                                    </a>
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
