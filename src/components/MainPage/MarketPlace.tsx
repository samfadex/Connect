import { useMemo, useState } from "react";
import Notification from "../Notification";
import Title from "../Title";

type MarketplaceCategory = "Textbooks" | "Shoes" | "Clothing";

interface Listing {
    id: number;
    title: string;
    category: MarketplaceCategory;
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
                                        <p className="king-side-panel__label">{listing.category}</p>
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
