import { useEffect, useMemo, useState } from "react";
import Notification from "../Notification";
import Title from "../Title";
import SiteFooter from "./SiteFooter";
import SharedPageHeader from "./SharedPageHeader";

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

const pendingGroupChatKey = "connect:pendingGroupChat";

const navigationItems = [
    { label: "Home", href: "#home" },
    { label: "Posts", href: "#posts", badge: "5" },
    { label: "Chat", href: "#messages", active: true },
    { label: "Marketplace", href: "#marketplace" },
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

type PendingGroupChat = {
    discussionId: number;
    title: string;
    detail?: string;
};

const readPendingGroupChat = (): PendingGroupChat | null => {
    if (typeof window === "undefined") return null;
    try {
        const raw = sessionStorage.getItem(pendingGroupChatKey);
        if (!raw) return null;
        return JSON.parse(raw) as PendingGroupChat;
    } catch {
        return null;
    }
};

const buildAccent = (title: string) => {
    const letters = title
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((word) => word[0]?.toUpperCase())
        .join("");
    return letters || "GC";
};

function Messages() {
    const pendingGroupChat = readPendingGroupChat();
    const pendingConversationId = pendingGroupChat ? 1_000_000_000 + pendingGroupChat.discussionId : null;

    const [threadList, setThreadList] = useState(() => {
        if (!pendingGroupChat || pendingConversationId === null) return initialConversations;
        const groupConversation: Conversation = {
            id: pendingConversationId,
            name: pendingGroupChat.title,
            role: "Forum group chat",
            status: "Active now",
            unread: 0,
            accent: buildAccent(pendingGroupChat.title),
            summary: "Welcome to the forum group chat.",
            course: "Forum",
            messages: [
                {
                    id: 1,
                    author: "other",
                    text: `Group chat created for: ${pendingGroupChat.title}`,
                    time: "Just now",
                },
                ...(pendingGroupChat.detail
                    ? [
                        {
                            id: 2,
                            author: "other" as const,
                            text: pendingGroupChat.detail,
                            time: "Just now",
                        },
                    ]
                    : []),
            ],
        };

        return [groupConversation, ...initialConversations];
    });

    const [activeConversationId, setActiveConversationId] = useState(() => pendingConversationId ?? initialConversations[0].id);
    const [draft, setDraft] = useState("");

    const activeConversation = useMemo(
        () => threadList.find((conversation) => conversation.id === activeConversationId) ?? threadList[0],
        [activeConversationId, threadList],
    );

    const totalUnread = threadList.reduce((count, conversation) => count + conversation.unread, 0);

    useEffect(() => {
        if (!pendingGroupChat) return;
        try {
            sessionStorage.removeItem(pendingGroupChatKey);
        } catch {
            // ignore
        }
    }, []);

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
            <SharedPageHeader
                navigationItems={navigationItems.map((item) =>
                    item.label === "Chat"
                        ? { ...item, badge: totalUnread > 0 ? (totalUnread > 99 ? "99+" : totalUnread) : undefined }
                        : item
                )}
                profileName="Sarah Kim"
                profileStatus="Student"
                searchPlaceholder="Search conversations or classmates"
                searchClassName="king-search--compact"
                notificationCount={3}
            />

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
                                <h3>Chats</h3>
                            </div>
                            <button
                                type="button"
                                className="king-cta king-cta--secondary king-message-list__button king-message-list__button--compact"
                                aria-label={`${totalUnread} unread messages`}
                            >
                                {totalUnread}
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
                            <div className="king-chat-panel__composer-input">
                                <textarea
                                    id="messageDraft"
                                    className="form-control"
                                    rows={1}
                                    value={draft}
                                    onChange={(event) => setDraft(event.target.value)}
                                    onKeyDown={handleDraftKeyDown}
                                    placeholder={`Message ${activeConversation.name}`}
                                />
                                <button type="button" className="king-cta king-cta--primary king-chat-panel__send" onClick={handleSend}>
                                    Send
                                </button>
                            </div>
                            <div className="king-chat-panel__composer-actions">
                                <span>{draft.length}/240 characters</span>
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

                <SiteFooter />

                <Notification message="You have" number={totalUnread} color="dark" />
            </main>
        </div>
    );
}

export default Messages;
