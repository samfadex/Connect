import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import Notification from "../Notification";
import Title from "../Title";
import SiteFooter from "./SiteFooter";
import SharedPageHeader from "./SharedPageHeader";

const bookImageUrl = new URL("../../assets/images/book.png", import.meta.url).toString();
const hoodieImageUrl = new URL("../../assets/images/hoodie.png", import.meta.url).toString();
const phoneImageUrl = new URL("../../assets/images/phone.png", import.meta.url).toString();
const laptopImageUrl = new URL("../../assets/images/asuslaptop.png", import.meta.url).toString();

function getListingImage(category: MarketplaceCategory): { src: string; alt: string } {
    switch (category) {
        case "Textbooks":
            return { src: bookImageUrl, alt: "Textbook listing" };
        case "Clothing":
            return { src: hoodieImageUrl, alt: "Clothing listing" };
        case "Shoes":
            return { src: phoneImageUrl, alt: "Shoes listing" };
    }
}

type MarketplaceCategory = "Textbooks" | "Shoes" | "Clothing";
type ListingIcon = "textbook" | "running-shoe" | "hoodie" | "workbook" | "boots" | "jacket";
type ListingMode = "Buy" | "Share";

interface Listing {
    id: number;
    title: string;
    category: MarketplaceCategory;
    icon: ListingIcon;
    mode: ListingMode;
    price: string;
    seller: string;
    condition: string;
    location: string;
    description: string;
    tag: string;
}

const navigationItems = [
    { label: "Home", href: "#home" },
    { label: "Posts", href: "#posts", badge: "5" },
    { label: "Chat", href: "#messages", badge: "12" },
    { label: "Group Forum", href: "#group-chat" },
    { label: "Marketplace", href: "#marketplace", active: true },
];

const moreItems = [
    { label: "About", href: "#" },
    { label: "Campus Map", href: "https://www.kingsu.ca/campus-life/campus-map" },
    { label: "Library", href: "https://www.kingsu.ca/services/library" },
    { label: "Student Services", href: "https://www.kingsu.ca/services" },
    { label: "Campus Events", href: "https://www.kingsu.ca/about-us/calendar" },
    { label: "Support", href: "https://www.kingsu.ca/student-hub/resources/resources" },
];

const marketplaceListings: Listing[] = [
    {
        id: 1,
        title: "Biology 201 Textbook",
        category: "Textbooks",
        icon: "textbook",
        mode: "Buy",
        price: "$20",
        seller: "Ava T.",
        condition: "Lightly used",
        location: "Library foyer",
        description: "Clean pages, a few highlighted sections, and still includes the online code booklet.",
        tag: "Popular",
    },
    {
        id: 2,
        title: "Nike Running Shoes",
        category: "Shoes",
        icon: "running-shoe",
        mode: "Buy",
        price: "$15",
        seller: "Jordan L.",
        condition: "Good condition",
        location: "Residence lobby",
        description: "Men's size 10. Great for intramurals or the gym, just a bit too big for me.",
        tag: "Quick sale",
    },
    {
        id: 3,
        title: "King's Hoodie",
        category: "Clothing",
        icon: "hoodie",
        mode: "Share",
        price: "Free",
        seller: "Maya C.",
        condition: "Like new",
        location: "Campus cafe",
        description: "Navy hoodie in medium. Worn twice and washed once, still really soft. Happy to lend it out for winter events.",
        tag: "Community share",
    },
    {
        id: 4,
        title: "Calculus Workbook",
        category: "Textbooks",
        icon: "workbook",
        mode: "Share",
        price: "Free",
        seller: "Noah B.",
        condition: "Used",
        location: "Science wing",
        description: "Helpful worked examples and notes in pencil. You can borrow it for exam prep week.",
        tag: "Study share",
    },
    {
        id: 5,
        title: "Brown Chelsea Boots",
        category: "Shoes",
        icon: "boots",
        mode: "Buy",
        price: "$18",
        seller: "Grace P.",
        condition: "Very good",
        location: "Student centre",
        description: "Women's size 8. Comfortable for chapel, class presentations, or going downtown.",
        tag: "Trending",
    },
    {
        id: 6,
        title: "Winter Jacket",
        category: "Clothing",
        icon: "jacket",
        mode: "Share",
        price: "Free",
        seller: "Daniel K.",
        condition: "Excellent",
        location: "North parking lot",
        description: "Warm black parka, size large, with deep pockets and no damage on the zipper. Available to borrow during cold snaps.",
        tag: "Seasonal share",
    },
];

const categoryFilters: Array<MarketplaceCategory | "All"> = ["All", "Textbooks", "Shoes", "Clothing"];
const listingModes: Array<ListingMode | "All"> = ["All", "Buy", "Share"];

const spotlightTips = [
    "Meet in public spots on campus like the library foyer or student centre.",
    "Add course codes to textbook listings so classmates can find the right edition faster.",
    "Use Messages to confirm pick-up times before heading across campus.",
];

function ListingIcon({ icon }: { icon: ListingIcon }): ReactNode {
    const commonProps = {
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: 1.8,
        strokeLinecap: "round" as const,
        strokeLinejoin: "round" as const,
        "aria-hidden": true,
    };

    switch (icon) {
        case "textbook":
            return (
                <svg {...commonProps}>
                    <path d="M6 4.5A2.5 2.5 0 0 1 8.5 2H19v18H8.5A2.5 2.5 0 0 0 6 22Z" />
                    <path d="M6 4.5V22H5a2 2 0 0 1-2-2V6.5a2 2 0 0 1 2-2Z" />
                    <path d="M10 7h5" />
                    <path d="M10 11h6" />
                </svg>
            );
        case "running-shoe":
            return (
                <svg {...commonProps}>
                    <path d="M4 15c2.3 0 3.8-.6 5.2-2.2l1.8-2.1 2 2.3c1.2 1.4 2.7 2 5 2H21v3H4a2 2 0 0 1 0-4Z" />
                    <path d="M10 8 8.8 5.8" />
                    <path d="M13 10 11.6 8" />
                    <path d="M16 12 14.5 9.8" />
                </svg>
            );
        case "hoodie":
            return (
                <svg {...commonProps}>
                    <path d="M9 5a3 3 0 0 1 6 0l2.6 1.7-1.1 3.8-1.5-.8V20H9V9.7l-1.5.8-1.1-3.8Z" />
                    <path d="M10 5.5c.6.7 1.2 1 2 1s1.4-.3 2-1" />
                    <path d="M12 10v3" />
                </svg>
            );
        case "workbook":
            return (
                <svg {...commonProps}>
                    <path d="M7 3h10a2 2 0 0 1 2 2v14H7a2 2 0 0 0-2 2V5a2 2 0 0 1 2-2Z" />
                    <path d="M9 8h6" />
                    <path d="M9 12h4" />
                    <path d="m14 16 1.2 1.2L18 14.4" />
                </svg>
            );
        case "boots":
            return (
                <svg {...commonProps}>
                    <path d="M8 4v7.5c0 1.2.5 2.3 1.4 3.1l2.1 1.9H19a2 2 0 0 1 0 4H9.5a5.5 5.5 0 0 1-3.9-1.6L4 17.3V4Z" />
                    <path d="M8 8h3" />
                </svg>
            );
        case "jacket":
            return (
                <svg {...commonProps}>
                    <path d="M9.5 3 7 5.2 5 9v11h4v-6h6v6h4V9l-2-3.8L14.5 3 12 5Z" />
                    <path d="M12 5v9" />
                    <path d="M9 9h6" />
                </svg>
            );
    }
}

function MarketPlace() {
    const [selectedCategory, setSelectedCategory] = useState<MarketplaceCategory | "All">("All");
    const [selectedMode, setSelectedMode] = useState<ListingMode | "All">("All");

    const scrollToMarketplace = () => {
        if (typeof document === "undefined") return;
        const target = document.getElementById("marketplace");
        if (target) {
            target.scrollIntoView({ behavior: "smooth", block: "start" });
            return;
        }
        window.location.hash = "#marketplace";
    };

    const filteredListings = useMemo(
        () => marketplaceListings.filter((listing) => {
            const matchesCategory = selectedCategory === "All" || listing.category === selectedCategory;
            const matchesMode = selectedMode === "All" || listing.mode === selectedMode;
            return matchesCategory && matchesMode;
        }),
        [selectedCategory, selectedMode],
    );

    return (
        <div className="king-theme">
            <SharedPageHeader
                navigationItems={navigationItems}
                profileName="Sarah Kim"
                profileStatus="Student"
                searchPlaceholder="Search listings, brands, or course codes"
                notificationCount={3}
                moreItems={moreItems}
            />

            <main className="king-main king-shell">
                <section className="king-market-hero">
                    <div className="king-market-hero__copy">
                        <p className="king-side-panel__label">Student marketplace</p>
                        <Title title="Buy And Sell On Campus" />
                        <p className="king-welcome-copy">
                            Find affordable textbooks, clean sneakers, and extra layers without leaving the King&apos;s community.
                        </p>
                        <div className="king-hero__actions">
                            <button
                                type="button"
                                className="king-cta king-cta--primary"
                                onClick={() => {
                                    setSelectedCategory("All");
                                    setSelectedMode("Buy");
                                    scrollToMarketplace();
                                }}
                            >
                                Buy
                            </button>
                            <button
                                type="button"
                                className="king-cta king-cta--secondary"
                                onClick={() => {
                                    setSelectedCategory("All");
                                    setSelectedMode("All");
                                    scrollToMarketplace();
                                }}
                            >
                                Sell
                            </button>
                            <button
                                type="button"
                                className="king-cta king-cta--secondary"
                                onClick={() => {
                                    setSelectedCategory("All");
                                    setSelectedMode("Share");
                                    scrollToMarketplace();
                                }}
                            >
                                Share
                            </button>
                        </div>
                    </div>

                    <div className="king-market-hero__stats">
                        <div>
                            <strong>26</strong>
                            <span>fresh listings</span>
                        </div>
                        <div>
                            <strong>9</strong>
                            <span>textbooks today</span>
                        </div>
                        <div>
                            <strong>14</strong>
                            <span>pickup spots on campus</span>
                        </div>
                    </div>
                </section>

                <section className="king-market-layout" id="marketplace" style={{ alignItems: "stretch" }}>
                    <aside className="king-market-sidebar" style={{ display: "flex", flexDirection: "column" }}>
                        <div
                            className="king-side-panel king-side-panel--soft"
                            style={{
                                flex: 1,
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            <div>
                                <p className="king-side-panel__label">Browse by type</p>
                                <div className="king-market-filter-list">
                                    {listingModes.map((mode) => (
                                        <button
                                            key={mode}
                                            type="button"
                                            className={`king-market-filter${selectedMode === mode ? " king-market-filter--active" : ""}`}
                                            onClick={() => setSelectedMode(mode)}
                                        >
                                            {mode}
                                        </button>
                                    ))}
                                </div>

                                <div style={{ height: "1px", background: "var(--king-border)", margin: "1.15rem 0" }} />

                                <p className="king-side-panel__label">Browse by category</p>
                                <div className="king-market-filter-list">
                                    {categoryFilters.map((category) => (
                                        <button
                                            key={category}
                                            type="button"
                                            className={`king-market-filter${selectedCategory === category ? " king-market-filter--active" : ""}`}
                                            onClick={() => setSelectedCategory(category)}
                                        >
                                            {category}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div
                                style={{
                                    flex: 1,
                                    marginTop: "1.15rem",
                                    borderRadius: "20px",
                                    border: "1px solid rgba(0, 43, 92, 0.12)",
                                    background:
                                        "linear-gradient(135deg, rgba(250, 204, 21, 0.18) 0%, rgba(255, 255, 255, 0.92) 55%, rgba(96, 165, 250, 0.12) 100%)",
                                    boxShadow: "0 14px 28px rgba(15, 23, 42, 0.08)",
                                    padding: "1rem",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "flex-start",
                                    gap: "0.85rem",
                                }}
                            >
                                <div>
                                    <p className="king-side-panel__label" style={{ marginBottom: "0.35rem" }}>
                                        Quick links
                                    </p>
                                    <p className="mb-0" style={{ color: "rgba(15, 23, 42, 0.72)" }}>
                                        Jump to what students are grabbing most this week.
                                    </p>
                                </div>

                                <div
                                    style={{
                                        display: "grid",
                                        gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                                        gap: "0.75rem",
                                    }}
                                >
                                    {[
                                        {
                                            title: "Textbooks",
                                            subtitle: "Course-ready deals",
                                            image: bookImageUrl,
                                            onClick: () => {
                                                setSelectedCategory("Textbooks");
                                                scrollToMarketplace();
                                            },
                                        },
                                        {
                                            title: "Clothing",
                                            subtitle: "Layers for the season",
                                            image: hoodieImageUrl,
                                            onClick: () => {
                                                setSelectedCategory("Clothing");
                                                scrollToMarketplace();
                                            },
                                        },
                                        {
                                            title: "Buy",
                                            subtitle: "Paid listings",
                                            image: laptopImageUrl,
                                            onClick: () => {
                                                setSelectedCategory("All");
                                                setSelectedMode("Buy");
                                                scrollToMarketplace();
                                            },
                                        },
                                        {
                                            title: "Share",
                                            subtitle: "Free community picks",
                                            image: phoneImageUrl,
                                            onClick: () => {
                                                setSelectedCategory("All");
                                                setSelectedMode("Share");
                                                scrollToMarketplace();
                                            },
                                        },
                                    ].map((card) => (
                                        <button
                                            key={card.title}
                                            type="button"
                                            className="btn p-0 text-start"
                                            onClick={card.onClick}
                                            style={{
                                                borderRadius: "18px",
                                                border: "1px solid rgba(250, 204, 21, 0.5)",
                                                background: "rgba(255, 255, 255, 0.88)",
                                                overflow: "hidden",
                                                boxShadow: "0 12px 20px rgba(15, 23, 42, 0.08)",
                                            }}
                                        >
                                            <div
                                                style={{
                                                    height: "128px",
                                                    background: "rgba(250, 204, 21, 0.14)",
                                                    display: "grid",
                                                    placeItems: "center",
                                                }}
                                            >
                                                <img
                                                    src={card.image}
                                                    alt={card.title}
                                                    loading="lazy"
                                                    style={{
                                                        width: "100%",
                                                        height: "100%",
                                                        objectFit: "contain",
                                                        display: "block",
                                                        padding: "10px",
                                                    }}
                                                />
                                            </div>
                                            <div style={{ padding: "0.75rem 0.85rem" }}>
                                                <div style={{ fontWeight: 900, letterSpacing: "-0.01em" }}>{card.title}</div>
                                                <div style={{ color: "rgba(15, 23, 42, 0.7)", fontSize: "0.92rem" }}>
                                                    {card.subtitle}
                                                </div>
                                            </div>
                                        </button>
                                    ))}
                                </div>

                                <div
                                    style={{
                                        borderRadius: "18px",
                                        border: "1px dashed rgba(0, 43, 92, 0.18)",
                                        background: "rgba(255, 255, 255, 0.78)",
                                        padding: "0.9rem 0.95rem",
                                    }}
                                >
                                    <p className="king-side-panel__label" style={{ marginBottom: "0.35rem" }}>
                                        Reviews
                                    </p>
                                    <div className="d-flex align-items-center justify-content-between gap-2">
                                        <div style={{ fontWeight: 900, color: "rgba(15, 23, 42, 0.92)" }}>Trusted swaps</div>
                                        <span
                                            className="badge bg-warning text-dark"
                                            style={{ borderRadius: "999px", letterSpacing: "0.06em" }}
                                        >
                                            4.9/5
                                        </span>
                                    </div>

                                    {[
                                        {
                                            quote: "Fast pickup, friendly sellers, and real savings. Everything felt safe meeting on campus.",
                                            initials: "SK",
                                            name: "Sarah K.",
                                        },
                                        {
                                            quote: "Found my textbook in 10 minutes and the seller met right after class. Super easy.",
                                            initials: "JL",
                                            name: "Jordan L.",
                                        },
                                        {
                                            quote: "The Share items helped me through midterms. People were kind and quick to respond.",
                                            initials: "MC",
                                            name: "Maya C.",
                                        },
                                    ].map((review) => (
                                        <div key={review.initials} style={{ marginTop: "0.75rem" }}>
                                            <p className="mb-0" style={{ color: "rgba(15, 23, 42, 0.74)", lineHeight: 1.5 }}>
                                                “{review.quote}”
                                            </p>
                                            <div className="d-flex align-items-center gap-2 mt-3">
                                                <span
                                                    aria-hidden="true"
                                                    style={{
                                                        width: "34px",
                                                        height: "34px",
                                                        borderRadius: "14px",
                                                        display: "grid",
                                                        placeItems: "center",
                                                        background: "rgba(250, 204, 21, 0.28)",
                                                        border: "1px solid rgba(250, 204, 21, 0.5)",
                                                        fontWeight: 900,
                                                        color: "rgba(15, 23, 42, 0.9)",
                                                    }}
                                                >
                                                    {review.initials}
                                                </span>
                                                <div>
                                                    <div style={{ fontWeight: 800, marginBottom: 0, color: "rgba(15, 23, 42, 0.92)" }}>
                                                        {review.name}
                                                    </div>
                                                    <div style={{ fontSize: "0.9rem", color: "rgba(15, 23, 42, 0.7)" }}>
                                                        Verified student
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div style={{ marginTop: "auto" }}>
                                <div style={{ height: "1px", background: "var(--king-border)", margin: "1.15rem 0" }} />

                                <p className="king-side-panel__label">Selling tips</p>
                                <ul className="king-side-panel__list" style={{ marginBottom: 0 }}>
                                    {spotlightTips.map((tip) => (
                                        <li key={tip}>{tip}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </aside>

                    <section className="king-market-main" style={{ height: "100%" }}>
                        <div className="king-market-toolbar">
                            <div
                                style={{
                                    flex: "1 1 auto",
                                    padding: "0.95rem 1rem",
                                    borderRadius: "18px",
                                    border: "1px solid var(--king-border)",
                                    background:
                                        "linear-gradient(135deg, rgba(250, 204, 21, 0.22) 0%, rgba(255, 255, 255, 0.92) 42%, rgba(96, 165, 250, 0.14) 100%)",
                                    boxShadow: "var(--king-shadow)",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "0.9rem",
                                }}
                            >
                                <div
                                    aria-hidden="true"
                                    style={{
                                        width: "46px",
                                        height: "46px",
                                        borderRadius: "16px",
                                        display: "grid",
                                        placeItems: "center",
                                        background: "rgba(250, 204, 21, 0.35)",
                                        border: "1px solid rgba(250, 204, 21, 0.55)",
                                        flexShrink: 0,
                                    }}
                                >
                                    <svg
                                        viewBox="0 0 24 24"
                                        width="22"
                                        height="22"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        style={{ color: "rgba(15, 23, 42, 0.88)" }}
                                    >
                                        <path d="M20 7h-9" />
                                        <path d="M14 17H5" />
                                        <circle cx="7" cy="7" r="2" />
                                        <circle cx="17" cy="17" r="2" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="king-side-panel__label" style={{ marginBottom: "0.35rem" }}>
                                        Available now
                                    </p>
                                    <h3 style={{ margin: 0, letterSpacing: "-0.02em" }}>
                                        {filteredListings.length} items ready for pickup
                                    </h3>
                                    <p className="mb-0" style={{ color: "rgba(15, 23, 42, 0.72)", marginTop: "0.25rem" }}>
                                        Meet in public campus spaces and confirm pick-up times in chat.
                                    </p>
                                </div>
                            </div>
                            <span className="king-post-badge">
                                {selectedMode === "Share" ? "Sharing is free and community-based" : "Safe campus meetups encouraged"}
                            </span>
                        </div>

                        <div className="king-market-grid">
                            {filteredListings.map((listing) => (
                                <article key={listing.id} className="king-market-card">
                                    <div
                                        style={{
                                            borderRadius: "18px",
                                            overflow: "hidden",
                                            border: "1px solid rgba(0, 43, 92, 0.12)",
                                            background: "rgba(255, 255, 255, 0.86)",
                                            height: "190px",
                                            padding: "10px",
                                        }}
                                    >
                                        {(() => {
                                            const img = getListingImage(listing.category);
                                            return (
                                                <img
                                                    src={img.src}
                                                    alt={img.alt}
                                                    loading="lazy"
                                                    style={{
                                                        width: "100%",
                                                        height: "100%",
                                                        objectFit: "contain",
                                                        display: "block",
                                                    }}
                                                />
                                            );
                                        })()}
                                    </div>

                                    <div className="king-market-card__top" style={{ marginTop: "0.95rem" }}>
                                        <span className="king-market-card__tag">{listing.tag}</span>
                                        <span className="king-market-card__price">{listing.price}</span>
                                    </div>

                                    <div className="king-market-card__body">
                                        <div className="king-market-card__category">
                                            <span className="king-market-card__icon" aria-hidden="true">
                                                <ListingIcon icon={listing.icon} />
                                            </span>
                                            <p className="king-side-panel__label">{listing.category}</p>
                                        </div>
                                        <span className={`king-market-mode king-market-mode--${listing.mode.toLowerCase()}`}>{listing.mode}</span>
                                        <h3>{listing.title}</h3>
                                        <p>{listing.description}</p>
                                    </div>
                                    <div className="king-market-card__meta">
                                        <div>
                                            <strong>{listing.seller}</strong>
                                            <span>seller</span>
                                        </div>
                                        <div>
                                            <strong>{listing.condition}</strong>
                                            <span>condition</span>
                                        </div>
                                        <div>
                                            <strong>{listing.location}</strong>
                                            <span>pickup</span>
                                        </div>
                                    </div>
                                    <div className="king-market-card__actions">
                                        <a className="king-cta king-cta--primary" href="#messages">
                                            {listing.mode === "Share" ? "Request item" : "Message seller"}
                                        </a>
                                        <button type="button" className="king-cta king-cta--secondary">
                                            {listing.mode === "Share" ? "Offer thanks" : "Save item"}
                                        </button>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </section>
                </section>

                <SiteFooter />

                <Notification message="Marketplace has" number={filteredListings.length} color="dark" />
            </main>
        </div>
    );
}

export default MarketPlace;
