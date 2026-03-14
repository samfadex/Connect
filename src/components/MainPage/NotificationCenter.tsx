import { useEffect, useId, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

type NotificationCategory = "Messages" | "Marketplace" | "Community" | "System";

type NotificationItem = {
    id: number;
    category: NotificationCategory;
    title: string;
    detail: string;
    time: string;
    unread?: boolean;
    href?: string;
};

type NotificationCenterProps = {
    unreadCount?: number | string;
    items?: NotificationItem[];
};

const defaultNotifications: NotificationItem[] = [
    {
        id: 1,
        category: "Messages",
        title: "New reply from Ava",
        detail: "Study group is still on for 7 PM in the library.",
        time: "2 min ago",
        unread: true,
        href: "#messages",
    },
    {
        id: 2,
        category: "Marketplace",
        title: "Listing saved",
        detail: "You saved \"Biology 201 Textbook\".",
        time: "18 min ago",
        unread: true,
        href: "#marketplace",
    },
    {
        id: 3,
        category: "Community",
        title: "Winter clothing drive",
        detail: "Donations are being collected through Friday.",
        time: "1 hr ago",
        unread: false,
        href: "#home",
    },
    {
        id: 4,
        category: "System",
        title: "Safety reminder",
        detail: "Meet in public campus spaces for item pickups.",
        time: "Today",
        unread: false,
    },
    {
        id: 5,
        category: "Community",
        title: "New discussion started",
        detail: "COMM 110 presentation practice thread is active.",
        time: "Today",
        unread: true,
        href: "#posts",
    },
];

const categories: Array<"All" | NotificationCategory> = ["All", "Messages", "Marketplace", "Community", "System"];

type CategoryAccent = {
    label: string;
    chipClassName: string;
    iconClassName: string;
    dotClassName: string;
    borderColor: string;
};

const categoryAccent: Record<NotificationCategory, CategoryAccent> = {
    Messages: {
        label: "Messages",
        chipClassName: "bg-primary text-light",
        iconClassName: "bg-primary-subtle text-primary",
        dotClassName: "bg-primary",
        borderColor: "var(--bs-primary)",
    },
    Marketplace: {
        label: "Marketplace",
        chipClassName: "bg-success text-light",
        iconClassName: "bg-success-subtle text-success",
        dotClassName: "bg-success",
        borderColor: "var(--bs-success)",
    },
    Community: {
        label: "Community",
        chipClassName: "bg-warning text-dark",
        iconClassName: "bg-warning-subtle text-warning-emphasis",
        dotClassName: "bg-warning",
        borderColor: "var(--bs-warning)",
    },
    System: {
        label: "System",
        chipClassName: "bg-secondary text-light",
        iconClassName: "bg-secondary-subtle text-secondary-emphasis",
        dotClassName: "bg-secondary",
        borderColor: "var(--bs-secondary)",
    },
};

function CategoryGlyph({ category }: { category: NotificationCategory }) {
    const commonProps = {
        viewBox: "0 0 24 24",
        width: 20,
        height: 20,
        fill: "none",
        stroke: "currentColor",
        strokeWidth: 1.8,
        strokeLinecap: "round" as const,
        strokeLinejoin: "round" as const,
        "aria-hidden": true,
        focusable: "false" as const,
    };

    switch (category) {
        case "Messages":
            return (
                <svg {...commonProps}>
                    <path d="M21 15a2 2 0 0 1-2 2H8l-5 5V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2Z" />
                </svg>
            );
        case "Marketplace":
            return (
                <svg {...commonProps}>
                    <path d="M20.6 13.4 11 3H4v7l9.6 9.6a2 2 0 0 0 2.8 0l4.2-4.2a2 2 0 0 0 0-2.8Z" />
                    <circle cx="7.5" cy="7.5" r="1.5" />
                </svg>
            );
        case "Community":
            return (
                <svg {...commonProps}>
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.9" />
                    <path d="M16 3.1a4 4 0 0 1 0 7.8" />
                </svg>
            );
        case "System":
            return (
                <svg {...commonProps}>
                    <path d="M12 2 20 6v6c0 5-3.5 9.5-8 10-4.5-.5-8-5-8-10V6Z" />
                </svg>
            );
    }
}

function NotificationCenter({ unreadCount, items = defaultNotifications }: NotificationCenterProps) {
    const offcanvasId = useId();
    const [isOpen, setIsOpen] = useState(false);
    const [activeCategory, setActiveCategory] = useState<(typeof categories)[number]>("All");
    const [query, setQuery] = useState("");
    const [unreadOnly, setUnreadOnly] = useState(false);
    const [selectedNotificationId, setSelectedNotificationId] = useState<number | null>(null);
    const closeButtonRef = useRef<HTMLButtonElement | null>(null);

    const computedUnreadCount = useMemo(
        () => items.reduce((count, item) => count + (item.unread ? 1 : 0), 0),
        [items],
    );
    const badgeCount = unreadCount ?? computedUnreadCount;

    const filteredItems = useMemo(() => {
        const trimmedQuery = query.trim().toLowerCase();
        return items.filter((item) => {
            if (activeCategory !== "All" && item.category !== activeCategory) return false;
            if (unreadOnly && !item.unread) return false;
            if (!trimmedQuery) return true;
            return (
                item.title.toLowerCase().includes(trimmedQuery) ||
                item.detail.toLowerCase().includes(trimmedQuery) ||
                item.category.toLowerCase().includes(trimmedQuery)
            );
        });
    }, [activeCategory, items, query, unreadOnly]);

    const groupedByCategory = useMemo(() => {
        const groups = new Map<NotificationCategory, NotificationItem[]>();
        for (const category of categories) {
            if (category === "All") continue;
            groups.set(category, []);
        }
        for (const item of filteredItems) {
            groups.get(item.category)?.push(item);
        }
        return Array.from(groups.entries());
    }, [filteredItems]);

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => {
        setIsOpen(false);
        setSelectedNotificationId(null);
    };

    const selectedNotification = selectedNotificationId
        ? items.find((item) => item.id === selectedNotificationId) ?? null
        : null;

    const overlay = useMemo(() => {
        if (!isOpen) return null;
        if (typeof document === "undefined") return null;

        return createPortal(
            <>
                <div className="offcanvas-backdrop fade show" onClick={handleClose} aria-hidden="true" />
                <div
                    id={offcanvasId}
                    className="offcanvas offcanvas-end show"
                    role="dialog"
                    aria-modal="true"
                    aria-label="Notification center"
                    tabIndex={-1}
                    style={{
                        visibility: "visible",
                        background: "var(--king-paper)",
                        borderLeft: "1px solid var(--king-border)",
                        boxShadow: "var(--king-shadow)",
                        width: "min(420px, 92vw)",
                        borderTopLeftRadius: "22px",
                        borderBottomLeftRadius: "22px",
                        overflow: "hidden",
                    }}
                >
                    <div
                        className="offcanvas-header"
                        style={{
                            padding: "1.1rem 1.1rem 0.85rem",
                            background:
                                "linear-gradient(180deg, rgba(255,255,255,0.98), rgba(239,246,255,0.9))",
                            borderBottom: "1px solid var(--king-border)",
                        }}
                    >
                        <div className="d-flex align-items-center justify-content-between w-100 gap-3">
                            <div>
                                <h2 className="m-0" style={{ fontSize: "1.35rem", color: "var(--king-navy)" }}>
                                    Notifications
                                </h2>
                                <p className="m-0 small text-muted">{badgeCount} unread</p>
                            </div>
                            <button
                                ref={closeButtonRef}
                                type="button"
                                className="btn-close"
                                aria-label="Close"
                                onClick={handleClose}
                            />
                        </div>
                    </div>

                        <div className="offcanvas-body">
                            {selectedNotification ? (
                                <div
                                    className="mb-3"
                                    style={{
                                        padding: "0.95rem",
                                        borderRadius: "18px",
                                        background: "rgba(255, 255, 255, 0.94)",
                                        border: "1px solid rgba(1, 43, 92, 0.1)",
                                    }}
                                >
                                    <div className="d-flex align-items-start gap-3">
                                        <div
                                            className={`rounded-circle ${categoryAccent[selectedNotification.category].iconClassName}`}
                                            style={{
                                                width: "46px",
                                                height: "46px",
                                                display: "grid",
                                                placeItems: "center",
                                                flexShrink: 0,
                                            }}
                                            aria-hidden="true"
                                        >
                                            <CategoryGlyph category={selectedNotification.category} />
                                        </div>

                                        <div className="flex-grow-1">
                                            <div className="d-flex align-items-start justify-content-between gap-2">
                                                <div>
                                                    <span
                                                        className={`badge ${categoryAccent[selectedNotification.category].chipClassName}`}
                                                    >
                                                        {categoryAccent[selectedNotification.category].label}
                                                    </span>
                                                    <div className="fw-semibold mt-2" style={{ color: "var(--king-navy)" }}>
                                                        {selectedNotification.title}
                                                    </div>
                                                </div>
                                                <span className="small text-muted">{selectedNotification.time}</span>
                                            </div>

                                            <p className="mb-0 mt-1 text-muted">{selectedNotification.detail}</p>

                                            <div className="d-flex gap-2 flex-wrap mt-3">
                                                <button
                                                    type="button"
                                                    className="btn btn-sm btn-light"
                                                    onClick={() => setSelectedNotificationId(null)}
                                                >
                                                    Back
                                                </button>
                                                {selectedNotification.href ? (
                                                    <button
                                                        type="button"
                                                        className="btn btn-sm btn-primary"
                                                        onClick={() => {
                                                            window.location.hash = selectedNotification.href ?? "#home";
                                                            handleClose();
                                                        }}
                                                    >
                                                        Open
                                                    </button>
                                                ) : null}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : null}
                        <div
                            className="mb-3"
                            style={{
                                padding: "0.85rem",
                                borderRadius: "18px",
                                background: "rgba(255, 255, 255, 0.92)",
                                border: "1px solid rgba(1, 43, 92, 0.1)",
                            }}
                        >
                            <div className="d-flex align-items-center justify-content-between gap-2 flex-wrap">
                                <div className="btn-group btn-group-sm" role="group" aria-label="Notification view">
                                    <button
                                        type="button"
                                        className={`btn ${unreadOnly ? "btn-outline-secondary" : "btn-primary"}`}
                                        onClick={() => setUnreadOnly(false)}
                                    >
                                        All
                                    </button>
                                    <button
                                        type="button"
                                        className={`btn ${unreadOnly ? "btn-primary" : "btn-outline-secondary"}`}
                                        onClick={() => setUnreadOnly(true)}
                                    >
                                        Unread
                                    </button>
                                </div>

                                <select
                                    id={`${offcanvasId}-category`}
                                    className="form-select form-select-sm"
                                    aria-label="Notification category"
                                    value={activeCategory}
                                    onChange={(event) => setActiveCategory(event.target.value as typeof activeCategory)}
                                    style={{ width: "min(210px, 100%)", borderRadius: "999px" }}
                                >
                                    {categories.map((category) => (
                                        <option key={category} value={category}>
                                            {category}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="position-relative mt-2">
                                <span
                                    aria-hidden="true"
                                    style={{
                                        position: "absolute",
                                        left: "0.75rem",
                                        top: "50%",
                                        transform: "translateY(-50%)",
                                        color: "rgba(22, 38, 59, 0.55)",
                                        pointerEvents: "none",
                                    }}
                                >
                                    <svg
                                        viewBox="0 0 24 24"
                                        width="16"
                                        height="16"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <circle cx="11" cy="11" r="7" />
                                        <path d="m21 21-4.3-4.3" />
                                    </svg>
                                </span>
                                <input
                                    className="form-control form-control-sm"
                                    aria-label="Search notifications"
                                    value={query}
                                    onChange={(event) => setQuery(event.target.value)}
                                    placeholder="Search notifications"
                                    style={{
                                        borderRadius: "999px",
                                        paddingLeft: "2.2rem",
                                        background: "rgba(255, 255, 255, 0.95)",
                                    }}
                                />
                            </div>
                        </div>

                        <div className="d-grid gap-2">
                            {activeCategory === "All" ? (
                                filteredItems.length === 0 ? (
                                    <div className="king-side-panel">
                                        <p className="king-side-panel__label">You&apos;re all caught up</p>
                                        <p className="mb-0 text-muted">No notifications match your filters right now.</p>
                                    </div>
                                ) : (
                                    groupedByCategory.map(([category, categoryItems]) =>
                                        categoryItems.length === 0 ? null : (
                                            <section key={category} className="mb-3">
                                                <div className="d-flex align-items-center justify-content-between gap-3">
                                                    <div className="d-flex align-items-center gap-2">
                                                        <span
                                                            className={`rounded-circle ${categoryAccent[category].iconClassName}`}
                                                            style={{
                                                                width: "32px",
                                                                height: "32px",
                                                                display: "grid",
                                                                placeItems: "center",
                                                            }}
                                                            aria-hidden="true"
                                                        >
                                                            <CategoryGlyph category={category} />
                                                        </span>
                                                        <div className="fw-semibold" style={{ color: "var(--king-navy)" }}>
                                                            {category}
                                                        </div>
                                                    </div>
                                                    <span className={`badge ${categoryAccent[category].chipClassName}`}>
                                                        {categoryItems.reduce((count, item) => count + (item.unread ? 1 : 0), 0)}
                                                    </span>
                                                </div>
                                                <div className="d-grid gap-2 mt-2">
                                                    {categoryItems.map((item) => (
                                                        <button
                                                            key={item.id}
                                                            type="button"
                                                            className="king-brand-map__forum-item text-start w-100"
                                                            style={{
                                                                cursor: "pointer",
                                                                padding: "0.75rem 0.85rem",
                                                                borderRadius: "16px",
                                                                borderLeft: `4px solid ${categoryAccent[item.category].borderColor}`,
                                                                background:
                                                                    item.id === selectedNotificationId
                                                                        ? "rgba(1, 43, 92, 0.08)"
                                                                        : item.unread
                                                                            ? "rgba(13, 110, 253, 0.07)"
                                                                            : undefined,
                                                            }}
                                                            onClick={() => setSelectedNotificationId(item.id)}
                                                        >
                                                            <div className="d-flex align-items-start gap-3">
                                                                <div
                                                                    className={`rounded-circle ${categoryAccent[item.category].iconClassName}`}
                                                                    style={{
                                                                        width: "42px",
                                                                        height: "42px",
                                                                        display: "grid",
                                                                        placeItems: "center",
                                                                        flexShrink: 0,
                                                                    }}
                                                                    aria-hidden="true"
                                                                >
                                                                    <CategoryGlyph category={item.category} />
                                                                </div>
                                                                <div className="flex-grow-1">
                                                                    <div className="d-flex align-items-start justify-content-between gap-2">
                                                                        <div className="fw-semibold" style={{ color: "var(--king-navy)" }}>
                                                                            {item.title}
                                                                        </div>
                                                                        <span className="small text-muted">{item.time}</span>
                                                                    </div>
                                                                    <p className="mb-0">{item.detail}</p>
                                                                </div>
                                                                {item.unread ? (
                                                                    <span
                                                                        className={`rounded-circle ${categoryAccent[item.category].dotClassName}`}
                                                                        style={{
                                                                            width: "10px",
                                                                            height: "10px",
                                                                            flexShrink: 0,
                                                                            marginTop: "0.35rem",
                                                                        }}
                                                                        aria-label="Unread"
                                                                        title="Unread"
                                                                    />
                                                                ) : null}
                                                            </div>
                                                        </button>
                                                    ))}
                                                </div>
                                            </section>
                                        ),
                                    )
                                )
                            ) : filteredItems.length === 0 ? (
                                <div className="king-side-panel">
                                    <p className="king-side-panel__label">Nothing here</p>
                                    <p className="mb-0 text-muted">Try switching categories or clearing your search.</p>
                                </div>
                            ) : (
                                <section className="mb-3">
                                    <div className="d-flex align-items-center justify-content-between gap-3">
                                        <div className="d-flex align-items-center gap-2">
                                            <span
                                                className={`rounded-circle ${categoryAccent[activeCategory].iconClassName}`}
                                                style={{
                                                    width: "32px",
                                                    height: "32px",
                                                    display: "grid",
                                                    placeItems: "center",
                                                }}
                                                aria-hidden="true"
                                            >
                                                <CategoryGlyph category={activeCategory} />
                                            </span>
                                            <div className="fw-semibold" style={{ color: "var(--king-navy)" }}>
                                                {activeCategory}
                                            </div>
                                        </div>
                                        <span className={`badge ${categoryAccent[activeCategory].chipClassName}`}>
                                            {filteredItems.reduce((count, item) => count + (item.unread ? 1 : 0), 0)}
                                        </span>
                                    </div>
                                    <div className="d-grid gap-2 mt-2">
                                        {filteredItems.map((item) => (
                                            <button
                                                key={item.id}
                                                type="button"
                                                className="king-brand-map__forum-item text-start w-100"
                                                style={{
                                                    cursor: "pointer",
                                                    padding: "0.75rem 0.85rem",
                                                    borderRadius: "16px",
                                                    borderLeft: `4px solid ${categoryAccent[item.category].borderColor}`,
                                                    background:
                                                        item.id === selectedNotificationId
                                                            ? "rgba(1, 43, 92, 0.08)"
                                                            : item.unread
                                                                ? "rgba(13, 110, 253, 0.07)"
                                                                : undefined,
                                                }}
                                                onClick={() => setSelectedNotificationId(item.id)}
                                            >
                                                <div className="d-flex align-items-start gap-3">
                                                    <div
                                                        className={`rounded-circle ${categoryAccent[item.category].iconClassName}`}
                                                        style={{
                                                            width: "42px",
                                                            height: "42px",
                                                            display: "grid",
                                                            placeItems: "center",
                                                            flexShrink: 0,
                                                        }}
                                                        aria-hidden="true"
                                                    >
                                                        <CategoryGlyph category={item.category} />
                                                    </div>
                                                    <div className="flex-grow-1">
                                                        <div className="d-flex align-items-start justify-content-between gap-2">
                                                            <div className="fw-semibold" style={{ color: "var(--king-navy)" }}>
                                                                {item.title}
                                                            </div>
                                                            <span className="small text-muted">{item.time}</span>
                                                        </div>
                                                        <p className="mb-0">{item.detail}</p>
                                                    </div>
                                                    {item.unread ? (
                                                        <span
                                                            className={`rounded-circle ${categoryAccent[item.category].dotClassName}`}
                                                            style={{
                                                                width: "10px",
                                                                height: "10px",
                                                                flexShrink: 0,
                                                                marginTop: "0.35rem",
                                                            }}
                                                            aria-label="Unread"
                                                            title="Unread"
                                                        />
                                                    ) : null}
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </section>
                            )}
                        </div>
                    </div>
                </div>
            </>,
            document.body,
        );
    }, [
        activeCategory,
        badgeCount,
        filteredItems,
        groupedByCategory,
        isOpen,
        items,
        offcanvasId,
        query,
        selectedNotificationId,
        unreadOnly,
    ]);

    useEffect(() => {
        if (!isOpen) return;

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") handleClose();
        };
        window.addEventListener("keydown", handleKeyDown);

        // Focus a predictable control for keyboard users.
        closeButtonRef.current?.focus();

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = previousOverflow;
        };
    }, [isOpen]);

    return (
        <>
            <button
                type="button"
                className="king-nav-link"
                aria-haspopup="dialog"
                aria-controls={offcanvasId}
                aria-expanded={isOpen}
                onClick={handleOpen}
            >
                <span>Notifications</span>
                <span className="badge bg-warning text-dark">{badgeCount}</span>
            </button>
            {overlay}
        </>
    );
}

export default NotificationCenter;
