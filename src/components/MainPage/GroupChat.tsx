import { useEffect, useMemo, useState } from "react";
import Title from "../Title";
import SharedPageHeader from "./SharedPageHeader";
import SiteFooter from "./SiteFooter";

type ChatMessage = {
    id: number;
    author: string;
    text: string;
    time: string;
};

type GroupChatThread = {
    id: number;
    title: string;
    subtitle: string;
    members: Array<{ name: string; initials: string }>;
    messages: ChatMessage[];
};

const pendingGroupChatKey = "connect:pendingGroupChat";

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

const buildInitials = (value: string) => {
    const initials = value
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((word) => word[0]?.toUpperCase())
        .join("");
    return initials || "GC";
};

function GroupChat() {
    const pending = readPendingGroupChat();

    const threads = useMemo<GroupChatThread[]>(() => {
        const nowThread: GroupChatThread | null = pending
            ? {
                id: pending.discussionId,
                title: pending.title,
                subtitle: "Forum group chat",
                members: [
                    { name: "Maya Chen", initials: "MC" },
                    { name: "Jordan Lee", initials: "JL" },
                    { name: "Ava Thompson", initials: "AT" },
                    { name: "You", initials: "YO" },
                ],
                messages: [
                    {
                        id: 1,
                        author: "System",
                        text: `Group chat created for: ${pending.title}`,
                        time: "Just now",
                    },
                    ...(pending.detail
                        ? [
                            {
                                id: 2,
                                author: "Maya",
                                text: pending.detail,
                                time: "Just now",
                            },
                        ]
                        : []),
                    {
                        id: 3,
                        author: "Jordan",
                        text: "I can join. What time works for everyone?",
                        time: "Just now",
                    },
                    {
                        id: 4,
                        author: "Ava",
                        text: "Same, I’m free after 6:30 PM.",
                        time: "Just now",
                    },
                ],
            }
            : null;

        const sampleThreads: GroupChatThread[] = [
            {
                id: 9001,
                title: "Textbook Exchange",
                subtitle: "Marketplace group",
                members: [
                    { name: "Noah B.", initials: "NB" },
                    { name: "Grace P.", initials: "GP" },
                    { name: "You", initials: "YO" },
                ],
                messages: [
                    { id: 1, author: "Grace", text: "Anyone have the COMM 110 workbook?", time: "Today" },
                    { id: 2, author: "Noah", text: "I’ve got one to lend for exam week.", time: "Today" },
                ],
            },
            {
                id: 9002,
                title: "Residence Study Hall",
                subtitle: "Community group",
                members: [
                    { name: "Sarah K.", initials: "SK" },
                    { name: "Daniel K.", initials: "DK" },
                    { name: "You", initials: "YO" },
                ],
                messages: [
                    { id: 1, author: "Sarah", text: "Quiet room at 7 PM in the lounge.", time: "Yesterday" },
                    { id: 2, author: "Daniel", text: "I’ll bring extra notes for BIOL 201.", time: "Yesterday" },
                ],
            },
        ];

        return nowThread ? [nowThread, ...sampleThreads] : sampleThreads;
    }, [pending]);

    const [activeThreadId, setActiveThreadId] = useState(() => threads[0]?.id ?? 0);
    const [draft, setDraft] = useState("");
    const [threadState, setThreadState] = useState<GroupChatThread[]>(threads);

    useEffect(() => {
        setThreadState(threads);
        setActiveThreadId(threads[0]?.id ?? 0);
    }, [threads]);

    useEffect(() => {
        if (!pending) return;
        try {
            sessionStorage.removeItem(pendingGroupChatKey);
        } catch {
            // ignore
        }
    }, []);

    const activeThread = threadState.find((thread) => thread.id === activeThreadId) ?? threadState[0];

    const handleSend = () => {
        const trimmed = draft.trim();
        if (!trimmed || !activeThread) return;

        setThreadState((current) =>
            current.map((thread) =>
                thread.id === activeThread.id
                    ? {
                        ...thread,
                        messages: [
                            ...thread.messages,
                            {
                                id: Date.now(),
                                author: "You",
                                text: trimmed,
                                time: "Just now",
                            },
                        ],
                    }
                    : thread,
            ),
        );
        setDraft("");
    };

    const navigationItems = [
        { label: "Home", href: "#home" },
        { label: "Posts", href: "#posts", badge: "5" },
        { label: "Chat", href: "#group-chat", active: true },
        { label: "Marketplace", href: "#marketplace" },
    ];

    return (
        <div className="king-theme">
            <SharedPageHeader
                navigationItems={navigationItems}
                profileName="Sarah Kim"
                profileStatus="Student"
                searchPlaceholder="Search group chats"
                searchClassName="king-search--compact"
                notificationCount={3}
            />

            <main className="king-main king-shell">
                <section className="king-message-hero">
                    <div className="king-message-hero__copy">
                        <p className="king-side-panel__label">Group chat</p>
                        <Title title="Forum Conversations" />
                        <p className="king-welcome-copy">Join the discussion with classmates in a dedicated group thread.</p>
                    </div>
                </section>

                <section className="king-messages-layout">
                    <aside className="king-message-list">
                        <div className="king-message-list__header">
                            <div>
                                <h3>Group chats</h3>
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

                            <div
                                style={{
                                    display: "flex",
                                    gap: "0.5rem",
                                    flexWrap: "wrap",
                                    padding: "0.6rem 0.85rem 0",
                                }}
                            >
                                {activeThread.members.map((member) => (
                                    <span
                                        key={member.name}
                                        style={{
                                            display: "inline-flex",
                                            alignItems: "center",
                                            gap: "0.5rem",
                                            borderRadius: "999px",
                                            padding: "0.25rem 0.6rem",
                                            border: "1px solid rgba(0, 43, 92, 0.12)",
                                            background: "rgba(255, 255, 255, 0.85)",
                                        }}
                                    >
                                        <span
                                            aria-hidden="true"
                                            style={{
                                                width: "28px",
                                                height: "28px",
                                                borderRadius: "12px",
                                                display: "grid",
                                                placeItems: "center",
                                                background: "rgba(250, 204, 21, 0.28)",
                                                border: "1px solid rgba(250, 204, 21, 0.5)",
                                                fontWeight: 900,
                                                color: "rgba(15, 23, 42, 0.9)",
                                            }}
                                        >
                                            {member.initials}
                                        </span>
                                        <span style={{ fontWeight: 700 }}>{member.name}</span>
                                    </span>
                                ))}
                            </div>

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
                                        <span>{message.time}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="king-chat-panel__composer">
                                <label className="form-label" htmlFor="groupChatDraft">
                                    Join the convo
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
                                        placeholder="Type a message..."
                                    />
                                    <button
                                        type="button"
                                        className="king-cta king-cta--primary king-chat-panel__send"
                                        onClick={handleSend}
                                    >
                                        Send
                                    </button>
                                </div>
                                <div className="king-chat-panel__composer-actions">
                                    <span>{draft.length}/240 characters</span>
                                </div>
                            </div>
                        </section>
                    ) : null}

                    <aside className="king-message-info">
                        <div className="king-side-panel king-side-panel--soft">
                            <p className="king-side-panel__label">Group chat tips</p>
                            <ul className="king-side-panel__list">
                                <li>Keep messages kind, helpful, and on-topic.</li>
                                <li>Confirm times and locations before meeting on campus.</li>
                                <li>Use Chat to coordinate study groups and item pickups.</li>
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

