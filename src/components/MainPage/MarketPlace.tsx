import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import Notification from "../Notification";
import Title from "../Title";

type MarketplaceCategory = "Textbooks" | "Shoes" | "Clothing";
type ListingIcon = "textbook" | "running-shoe" | "hoodie" | "workbook" | "boots" | "jacket";

interface Listing {
    id: number;
    title: string;
    category: MarketplaceCategory;
    icon: ListingIcon;
    price: string;
    seller: string;
    condition: string;
    location: string;
    description: string;
    tag: string;
}

const navigationItems = [
    { label: "Home", href: "#home" },
    { label: "Posts", href: "#" },
    { label: "Messages", href: "#messages", badge: "12" },
    { label: "Marketplace", href: "#marketplace", active: true },
    { label: "General Chat", href: "#", badge: "5" },
    { label: "Profile", href: "#" },
    { label: "Notifications", href: "#", badge: "3" },
];

const marketplaceListings: Listing[] = [
    {
        id: 1,
        title: "Biology 201 Textbook",
        category: "Textbooks",
        icon: "textbook",
        price: "$45",
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
        price: "$35",
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
        price: "$25",
        seller: "Maya C.",
        condition: "Like new",
        location: "Campus cafe",
        description: "Navy hoodie in medium. Worn twice and washed once, still really soft.",
        tag: "Campus pick",
    },
    {
        id: 4,
        title: "Calculus Workbook",
        category: "Textbooks",
        icon: "workbook",
        price: "$20",
        seller: "Noah B.",
        condition: "Used",
        location: "Science wing",
        description: "Helpful worked examples and notes in pencil. Perfect if you're taking first-year calc.",
        tag: "Budget",
    },
    {
        id: 5,
        title: "Brown Chelsea Boots",
        category: "Shoes",
        icon: "boots",
        price: "$40",
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
        price: "$60",
        seller: "Daniel K.",
        condition: "Excellent",
        location: "North parking lot",
        description: "Warm black parka, size large, with deep pockets and no damage on the zipper.",
        tag: "Seasonal",
    },
];

const categoryFilters: Array<MarketplaceCategory | "All"> = ["All", "Textbooks", "Shoes", "Clothing"];

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

    const filteredListings = useMemo(
        () => marketplaceListings.filter((listing) => selectedCategory === "All" || listing.category === selectedCategory),
        [selectedCategory],
    );

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
                            <input className="king-search" placeholder="Search listings, brands, or course codes" />
                        </div>
                    </nav>
                </div>
            </header>

            <main className="king-main king-shell">
                <section className="king-market-hero">
                    <div className="king-market-hero__copy">
                        <p className="king-side-panel__label">Student marketplace</p>
                        <Title title="Buy And Sell On Campus" />
                        <p className="king-welcome-copy">
                            Find affordable textbooks, clean sneakers, and extra layers without leaving the King&apos;s community.
                        </p>
                        <div className="king-hero__actions">
                            <a className="king-cta king-cta--primary" href="#messages">Message a seller</a>
                            <a className="king-cta king-cta--secondary" href="#home">Back to home</a>
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

                <section className="king-market-layout">
                    <aside className="king-market-sidebar">
                        <div className="king-side-panel king-side-panel--soft">
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

                        <div className="king-side-panel">
                            <p className="king-side-panel__label">Selling tips</p>
                            <ul className="king-side-panel__list">
                                {spotlightTips.map((tip) => (
                                    <li key={tip}>{tip}</li>
                                ))}
                            </ul>
                        </div>
                    </aside>

                    <section className="king-market-main">
                        <div className="king-market-toolbar">
                            <div>
                                <p className="king-side-panel__label">Available now</p>
                                <h3>{filteredListings.length} items ready for pickup</h3>
                            </div>
                            <span className="king-post-badge">Safe campus meetups encouraged</span>
                        </div>

                        <div className="king-market-grid">
                            {filteredListings.map((listing) => (
                                <article key={listing.id} className="king-market-card">
                                    <div className="king-market-card__top">
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
                                        <a className="king-cta king-cta--primary" href="#messages">Message seller</a>
                                        <button type="button" className="king-cta king-cta--secondary">Save item</button>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </section>
                </section>

                <div className="king-footer">
                    <p className="king-faith-verse">
                        &quot;Share with the Lord&apos;s people who are in need.&quot; <span>Romans 12:13</span>
                    </p>
                </div>

                <Notification message="Marketplace has" number={filteredListings.length} color="dark" />
            </main>
        </div>
    );
}

export default MarketPlace;
