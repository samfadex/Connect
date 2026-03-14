import { useEffect, useState } from "react";
import Title from "../Title";
import SharedPageHeader from "./SharedPageHeader";
import SiteFooter from "./SiteFooter";

type ChatMessage = {
    id: number;
    author: string;
    text: string;
    time: string;
    attachmentName?: string;
};

type GroupChatThread = {
    id: number;
    title: string;
    subtitle: string;
    members: Array<{ name: string; initials: string }>;
    messages: ChatMessage[];
};

type PendingGroupChat = {
    discussionId: number;
    title: string;
    detail?: string;
};

const pendingGroupChatKey = "connect:pendingGroupChat";
const forumThreadsStorageKey = "connect:forumThreads";

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

const buildInitials = (value: string) => {
    const initials = value
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((word) => word[0]?.toUpperCase())
        .join("");
    return initials || "GC";
};

const buildForumMessages = (pending: PendingGroupChat): ChatMessage[] => [
    {
        id: Date.now(),
        author: "Forum host",
        text: `Welcome to the conversation for "${pending.title}".`,
        time: "Just now",
    },
    ...(pending.detail
        ? [
            {
                id: Date.now() + 1,
                author: "David Spacerocket",
                text: pending.detail,
                time: "Just now",
            },
        ]
        : []),
    {
        id: Date.now() + 2,
        author: "Sam Fadex",
        text: "I think this is a good discussion to keep going. We should compare everyone's ideas first.",
        time: "Just now",
    },
    {
        id: Date.now() + 3,
        author: "Dayana Mon Jerry",
        text: "I am interested too. I would like to hear how others would approach this.",
        time: "Just now",
    },
    {
        id: Date.now() + 4,
        author: "Stella Tom",
        text: "I can join and share my view. We may also want to collect notes in one place.",
        time: "Just now",
    },
];

const buildPendingThread = (pending: PendingGroupChat): GroupChatThread => ({
    id: pending.discussionId,
    title: pending.title,
    subtitle: "Dedicated forum",
    members: [
        { name: "David Spacerocket", initials: "DS" },
        { name: "Sam Fadex", initials: "SF" },
        { name: "Dayana Mon Jerry", initials: "DM" },
        { name: "Stella Tom", initials: "ST" },
        { name: "You", initials: "YO" },
    ],
    messages: buildForumMessages(pending),
});

const defaultForumThreads: GroupChatThread[] = [
    {
        id: 9001,
        title: "Textbook Exchange",
        subtitle: "Marketplace forum",
        members: [
            { name: "David Spacerocket", initials: "DS" },
            { name: "Sam Fadex", initials: "SF" },
            { name: "You", initials: "YO" },
        ],
        messages: [
            { id: 1, author: "David Spacerocket", text: "Anyone has the COMM 110 workbook to lend this week?", time: "Today" },
            { id: 2, author: "Sam Fadex", text: "I have one. I can bring it after chapel tomorrow.", time: "Today" },
        ],
    },
    {
        id: 9002,
        title: "Residence Study Hall",
        subtitle: "Community forum",
        members: [
            { name: "Dayana Mon Jerry", initials: "DM" },
            { name: "Stella Tom", initials: "ST" },
            { name: "You", initials: "YO" },
        ],
        messages: [
            { id: 1, author: "Dayana Mon Jerry", text: "Quiet room opens at 7 PM in the lounge.", time: "Yesterday" },
            { id: 2, author: "Stella Tom", text: "I will bring extra BIOL 201 notes for anyone who needs them.", time: "Yesterday" },
        ],
    },
];

const readStoredThreads = (): GroupChatThread[] => {
    if (typeof window === "undefined") return defaultForumThreads;
    try {
        const raw = localStorage.getItem(forumThreadsStorageKey);
        if (!raw) return defaultForumThreads;
        const parsed = JSON.parse(raw) as GroupChatThread[];
        return parsed.length > 0 ? parsed : defaultForumThreads;
    } catch {
        return defaultForumThreads;
    }
};

function GroupChat() {
    const pending = readPendingGroupChat();
    const [threadState, setThreadState] = useState<GroupChatThread[]>(() => {
        const storedThreads = readStoredThreads();
        if (!pending) return storedThreads;

        const pendingThread = buildPendingThread(pending);
        const existingThread = storedThreads.find((thread) => thread.id === pending.discussionId);

        return existingThread
            ? [
                existingThread,
                ...storedThreads.filter((thread) => thread.id !== pending.discussionId),
            ]
            : [pendingThread, ...storedThreads];
    });
    const [activeThreadId, setActiveThreadId] = useState(() => pending?.discussionId ?? threadState[0]?.id ?? 0);
    const [draft, setDraft] = useState("");
    const [selectedAttachment, setSelectedAttachment] = useState<File | null>(null);

    useEffect(() => {
        if (!pending) return;

        setThreadState((currentThreads) => {
            const existingThread = currentThreads.find((thread) => thread.id === pending.discussionId);
            if (existingThread) {
                return [
                    existingThread,
                    ...currentThreads.filter((thread) => thread.id !== pending.discussionId),
                ];
            }

            return [buildPendingThread(pending), ...currentThreads];
        });
        setActiveThreadId(pending.discussionId);

        try {
            sessionStorage.removeItem(pendingGroupChatKey);
        } catch {
            // Ignore storage issues and keep the page usable.
        }
    }, [pending]);

    useEffect(() => {
        try {
            localStorage.setItem(forumThreadsStorageKey, JSON.stringify(threadState));
        } catch {
            // Ignore storage issues and keep the page usable.
        }
    }, [threadState]);

    const activeThread = threadState.find((thread) => thread.id === activeThreadId) ?? threadState[0];

    const handleSend = () => {
        const trimmed = draft.trim();
        if ((!trimmed && !selectedAttachment) || !activeThread) return;

        setThreadState((currentThreads) =>
            currentThreads.map((thread) =>
                thread.id === activeThread.id
                    ? {
                        ...thread,
                        messages: [
                            ...thread.messages,
                            {
                                id: Date.now(),
                                author: "You",
                                text: trimmed || "Shared an attachment.",
                                time: "Just now",
                                attachmentName: selectedAttachment?.name,
                            },
                        ],
                    }
                    : thread,
            ),
        );
        setDraft("");
        setSelectedAttachment(null);
    };

    const handleAttachmentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const nextFile = event.target.files?.[0] ?? null;
        setSelectedAttachment(nextFile);
        event.target.value = "";
    };

    const navigationItems = [
        { label: "Home", href: "#home" },
<<<<<<< HEAD
        { label: "Posts", href: "#posts", badge: "5" },
        { label: "Chat", href: "#messages", badge: "12" },
        { label: "Group Forum", href: "#group-chat", active: true },
=======
        { label: "Posts", href: "#posts", badge: "5", active: true },
        { label: "Chat", href: "#messages", badge: "12" },
>>>>>>> 341059f (dksfsdjk)
        { label: "Marketplace", href: "#marketplace" },
    ];

    return (
        <div className="king-theme">
            <SharedPageHeader
                navigationItems={navigationItems}
                profileName="David Spacerocket"
                profileStatus="Student"
                searchPlaceholder="Search forum conversations"
                searchClassName="king-search--compact"
                notificationCount={3}
            />

            <main className="king-main king-shell">
                <section className="king-message-hero">
                    <div className="king-message-hero__copy">
                        <p className="king-side-panel__label">Post forum</p>
                        <Title title="Post Discussions" />
                        <p className="king-welcome-copy">
                            Every discussion opens in its own forum so students can read other viewpoints and share their own responses.
                        </p>
                    </div>
                </section>

                <section className="king-messages-layout">
                    <div className="king-forum-stack">
                        <aside className="king-message-list king-message-list--merged">
                            <div className="king-message-list__header">
                                <div>
                                    <h3>Discussion forums</h3>
                                </div>
                                <span className="badge bg-warning text-dark">{threadState.length}</span>
                            </div>

                            <div className="king-message-list__items">
                                {threadState.map((thread) => (
                                    <button
                                        key={thread.id}
                                        type="button"
                                        className={`king-thread-card${thread.id === activeThreadId ? " king-thread-card--active" : ""}`}
                                        onClick={() => setActiveThreadId(thread.id)}
                                    >
                                        <div className="king-thread-card__avatar">{buildInitials(thread.title)}</div>
                                        <div className="king-thread-card__copy">
                                            <strong>{thread.title}</strong>
                                            <span>{thread.subtitle}</span>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </aside>

                        {activeThread ? (
                            <section className="king-chat-panel">
                                <details className="king-forum-members">
                                    <summary className="king-forum-members__summary">
                                        <header className="king-chat-panel__header">
                                            <div className="king-chat-panel__person">
                                                <div className="king-thread-card__avatar king-thread-card__avatar--large">
                                                    {buildInitials(activeThread.title)}
                                                </div>
                                                <div>
                                                    <h3>{activeThread.title}</h3>
                                                    <p>{activeThread.subtitle}</p>
                                                </div>
                                            </div>
                                            <span className="badge king-post-badge">{activeThread.members.length} people</span>
                                        </header>
                                    </summary>

                                    <div className="king-forum-members__list">
                                        {activeThread.members.map((member) => (
                                            <span key={member.name} className="king-forum-member-chip">
                                                <span aria-hidden="true" className="king-forum-member-chip__avatar">
                                                    {member.initials}
                                                </span>
                                                <span className="king-forum-member-chip__name">{member.name}</span>
                                            </span>
                                        ))}
                                    </div>
                                </details>

                                <div className="king-chat-panel__messages">
                                    {activeThread.messages.map((message) => (
                                        <div
                                            key={message.id}
                                            className={`king-chat-bubble${message.author === "You" ? " king-chat-bubble--me" : ""}`}
                                        >
                                            <p>
                                                <strong style={{ display: "block", marginBottom: "0.15rem" }}>{message.author}</strong>
                                                {message.text}
                                            </p>
                                            {message.attachmentName ? (
                                                <span className="king-chat-bubble__attachment">{message.attachmentName}</span>
                                            ) : null}
                                            <span>{message.time}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="king-chat-panel__composer">
                                    <label className="form-label" htmlFor="groupChatDraft">
                                        Share your view
                                    </label>
                                    <div className="king-chat-panel__composer-input">
                                        <textarea
                                            id="groupChatDraft"
                                            className="form-control"
                                            rows={1}
                                            value={draft}
                                            onChange={(event) => setDraft(event.target.value)}
                                            onKeyDown={(event) => {
                                                if (event.key === "Enter" && !event.shiftKey) {
                                                    event.preventDefault();
                                                    handleSend();
                                                }
                                            }}
                                            placeholder="Write your response to the forum..."
                                        />
                                        <div className="king-chat-panel__attachments">
                                            <label className="king-chat-panel__attach-button">
                                                Add document
                                                <input
                                                    type="file"
                                                    accept=".pdf,.doc,.docx,.txt"
                                                    onChange={handleAttachmentChange}
                                                    hidden
                                                />
                                            </label>
                                            <label className="king-chat-panel__attach-button">
                                                Add picture
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleAttachmentChange}
                                                    hidden
                                                />
                                            </label>
                                        </div>
                                        <button
                                            type="button"
                                            className="king-cta king-cta--primary king-chat-panel__send"
                                            onClick={handleSend}
                                        >
                                            Send
                                        </button>
                                    </div>
                                    {selectedAttachment ? (
                                        <div className="king-chat-panel__attachment-preview">
                                            <span>{selectedAttachment.name}</span>
                                            <button
                                                type="button"
                                                className="king-chat-panel__attachment-clear"
                                                onClick={() => setSelectedAttachment(null)}
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    ) : null}
                                    <div className="king-chat-panel__composer-actions">
                                        <span>{draft.length}/240 characters</span>
                                    </div>
                                </div>
                            </section>
                        ) : null}
                    </div>

                    <aside className="king-message-info">
                        <div className="king-side-panel king-side-panel--soft">
                            <p className="king-side-panel__label">Forum tips</p>
                            <ul className="king-side-panel__list">
                                <li>Read what others have shared before adding your own response.</li>
                                <li>Keep replies constructive, specific, and respectful.</li>
                                <li>Use each thread to build one focused conversation around the topic.</li>
                            </ul>
                        </div>
                    </aside>
                </section>

                <SiteFooter />
            </main>
        </div>
    );
}

export default GroupChat;
