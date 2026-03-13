import { useMemo, useState } from "react";
import Notification from "../Notification";
import Title from "../Title";

type MessageAuthor = "me" | "other";

interface MessageItem {
    id: number;
    author: MessageAuthor;
    text: string;
    time: string;
}

interface Conversation {
    id: number;
    name: string;
    role: string;
    status: "Active now" | "Away" | "In class";
    unread: number;
    accent: string;
    summary: string;
    course: string;
    messages: MessageItem[];
}

const navigationItems = [
    { label: "Home", href: "#home" },
    { label: "Posts", href: "#" },
    { label: "Messages", href: "#messages", badge: "12", active: true },
    { label: "Marketplace", href: "#marketplace" },
    { label: "General Chat", href: "#", badge: "5" },
    { label: "Profile", href: "#" },
    { label: "Notifications", href: "#", badge: "3" },
];

const initialConversations: Conversation[] = [
    {
        id: 1,
        name: "Ava Thompson",
        role: "Biology study partner",
        status: "Active now",
        unread: 2,
        accent: "AT",
        summary: "Can we compare lab notes before tomorrow morning?",
        course: "BIOL 201",
        messages: [
            { id: 1, author: "other", text: "Hey, are you still meeting in the library tonight?", time: "6:10 PM" },
            { id: 2, author: "me", text: "Yes, I'm planning to grab a table near the windows at 7.", time: "6:14 PM" },
            { id: 3, author: "other", text: "Perfect. Can we compare lab notes before tomorrow morning?", time: "6:16 PM" },
        ],
    },
    {
        id: 2,
        name: "Jordan Lee",
        role: "Residence floor group",
        status: "Away",
        unread: 0,
        accent: "JL",
        summary: "Movie night starts at 8:30 in the lounge.",
        course: "Residence",
        messages: [
            { id: 1, author: "other", text: "Movie night starts at 8:30 in the lounge.", time: "4:40 PM" },
            { id: 2, author: "me", text: "Nice, I'll bring snacks after chapel.", time: "4:46 PM" },
        ],
    },
    {
        id: 3,
        name: "Maya Chen",
        role: "Classmate",
        status: "In class",
        unread: 5,
        accent: "MC",
        summary: "Professor Rios moved the presentation sign-up to Friday.",
        course: "COMM 110",
        messages: [
            { id: 1, author: "other", text: "Professor Rios moved the presentation sign-up to Friday.", time: "1:05 PM" },
            { id: 2, author: "me", text: "That helps a lot. I still need to polish my intro slide.", time: "1:11 PM" },
            { id: 3, author: "other", text: "Same here. Want to rehearse after class tomorrow?", time: "1:14 PM" },
        ],
    },
];

const supportCards = [
    {
        label: "Pinned",
        title: "Campus prayer group",
        copy: "Wednesday at 7:15 AM in the chapel foyer. Reply in the thread if you are joining.",
    },
    {
        label: "Reminder",
        title: "Quiet hours in residence",
        copy: "Keep conversations low after 10 PM and move group calls to the common room when possible.",
    },
];

function Messages() {
    const [threadList, setThreadList] = useState(initialConversations);
    const [activeConversationId, setActiveConversationId] = useState(initialConversations[0].id);
    const [draft, setDraft] = useState("");

    const activeConversation = useMemo(
        () => threadList.find((conversation) => conversation.id === activeConversationId) ?? threadList[0],
        [activeConversationId, threadList],
    );

    const totalUnread = threadList.reduce((count, conversation) => count + conversation.unread, 0);

    const handleSend = () => {
        const trimmedDraft = draft.trim();
        if (!trimmedDraft || !activeConversation) return;

        setThreadList((currentThreads) =>
            currentThreads.map((conversation) =>
                conversation.id === activeConversation.id
                    ? {
                        ...conversation,
                        unread: 0,
                        summary: trimmedDraft,
                        messages: [
                            ...conversation.messages,
                            {
                                id: Date.now(),
                                author: "me",
                                text: trimmedDraft,
                                time: "Just now",
                            },
                        ],
                    }
                    : conversation,
            ),
        );
        setDraft("");
    };

    const handleOpenConversation = (conversationId: number) => {
        setActiveConversationId(conversationId);
        setThreadList((currentThreads) =>
            currentThreads.map((conversation) =>
                conversation.id === conversationId
                    ? { ...conversation, unread: 0 }
                    : conversation,
            ),
        );
    };

    const handleDraftKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            handleSend();
        }
    };

    if (!activeConversation) {
        return null;
    }

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
                                <a
                                    key={item.label}
                                    className={`king-nav-link${item.active ? " king-nav-link--active" : ""}`}
                                    href={item.href}
                                >
                                    <span>{item.label}</span>
                                    {item.badge ? <span className="badge bg-warning text-dark">{item.badge}</span> : null}
                                </a>
                            ))}
                        </div>

                        <div className="king-navbar__actions">
                            <input className="king-search" placeholder="Search conversations or classmates" />
                        </div>
                    </nav>
                </div>
            </header>

            <main className="king-main king-shell">
                <section className="king-message-hero">
                    <div className="king-message-hero__copy">
                        <p className="king-side-panel__label">Inbox</p>
                        <Title title="Messages" />
                        <p className="king-welcome-copy">
                            Keep up with classmates, residence groups, and course partners in one place without losing the campus feel.
                        </p>
                    </div>

                    <div className="king-message-hero__stats">
                        <div>
                            <strong>{threadList.length}</strong>
                            <span>active chats</span>
                        </div>
                        <div>
                            <strong>{totalUnread}</strong>
                            <span>unread messages</span>
                        </div>
                        <div>
                            <strong>4</strong>
                            <span>study groups today</span>
                        </div>
                    </div>
                </section>

                <section className="king-messages-layout">
                    <aside className="king-message-list">
                        <div className="king-message-list__header">
                            <div>
                                <p className="king-side-panel__label">Conversations</p>
                                <h3>Recent threads</h3>
                            </div>
                            <button type="button" className="king-cta king-cta--secondary king-message-list__button">
                                New message
                            </button>
                        </div>

                        <div className="king-message-list__items">
                            {threadList.map((conversation) => (
                                <button
                                    key={conversation.id}
                                    type="button"
                                    className={`king-thread-card${conversation.id === activeConversation.id ? " king-thread-card--active" : ""}`}
                                    onClick={() => handleOpenConversation(conversation.id)}
                                >
                                    <div className="king-thread-card__avatar">{conversation.accent}</div>
                                    <div className="king-thread-card__content">
                                        <div className="king-thread-card__top">
                                            <strong>{conversation.name}</strong>
                                            <span>{conversation.messages[conversation.messages.length - 1]?.time}</span>
                                        </div>
                                        <p className="king-thread-card__role">{conversation.role}</p>
                                        <p className="king-thread-card__summary">{conversation.summary}</p>
                                    </div>
                                    {conversation.unread > 0 ? (
                                        <span className="king-thread-card__badge">{conversation.unread}</span>
                                    ) : null}
                                </button>
                            ))}
                        </div>
                    </aside>

                    <section className="king-chat-panel">
                        <header className="king-chat-panel__header">
                            <div className="king-chat-panel__person">
                                <div className="king-thread-card__avatar king-thread-card__avatar--large">
                                    {activeConversation.accent}
                                </div>
                                <div>
                                    <h3>{activeConversation.name}</h3>
                                    <p>
                                        {activeConversation.role} &middot; {activeConversation.status}
                                    </p>
                                </div>
                            </div>
                            <span className="badge king-post-badge">{activeConversation.course}</span>
                        </header>

                        <div className="king-chat-panel__messages">
                            {activeConversation.messages.map((message) => (
                                <div
                                    key={message.id}
                                    className={`king-chat-bubble${message.author === "me" ? " king-chat-bubble--me" : ""}`}
                                >
                                    <p>{message.text}</p>
                                    <span>{message.time}</span>
                                </div>
                            ))}
                        </div>

                        <div className="king-chat-panel__composer">
                            <label className="form-label" htmlFor="messageDraft">Reply</label>
                            <textarea
                                id="messageDraft"
                                className="form-control"
                                rows={3}
                                value={draft}
                                onChange={(event) => setDraft(event.target.value)}
                                onKeyDown={handleDraftKeyDown}
                                placeholder={`Message ${activeConversation.name}`}
                            />
                            <div className="king-chat-panel__composer-actions">
                                <span>{draft.length}/240 characters</span>
                                <button type="button" className="king-cta king-cta--primary" onClick={handleSend}>
                                    Send message
                                </button>
                            </div>
                        </div>
                    </section>

                    <aside className="king-message-info">
                        <div className="king-side-panel king-side-panel--soft">
                            <p className="king-side-panel__label">Conversation details</p>
                            <h3>{activeConversation.name}</h3>
                            <p className="king-message-info__meta">{activeConversation.role}</p>
                            <div className="king-stat-list">
                                <div>
                                    <strong>{activeConversation.status}</strong>
                                    <span>availability</span>
                                </div>
                                <div>
                                    <strong>{activeConversation.course}</strong>
                                    <span>shared space</span>
                                </div>
                                <div>
                                    <strong>{activeConversation.messages.length}</strong>
                                    <span>messages in thread</span>
                                </div>
                            </div>
                        </div>

                        {supportCards.map((card) => (
                            <article key={card.title} className="king-side-panel">
                                <p className="king-side-panel__label">{card.label}</p>
                                <h3>{card.title}</h3>
                                <p className="king-message-info__copy">{card.copy}</p>
                            </article>
                        ))}
                    </aside>
                </section>

                <div className="king-footer">
                    <p className="king-faith-verse">
                        &quot;Encourage one another and build each other up.&quot; <span>1 Thessalonians 5:11</span>
                    </p>
                </div>

                <Notification message="You have" number={totalUnread} color="dark" />
            </main>
        </div>
    );
}

export default Messages;
