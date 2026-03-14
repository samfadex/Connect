import ClickableCard from "../ClickableCard";
import Title from "../Title";
import Notification from "../Notification";

const navigationItems = [
    { label: "Home", href: "#home", active: true },
    { label: "Posts", href: "#" },
    { label: "Messages", href: "#messages", badge: "99+" },
    { label: "Marketplace", href: "#marketplace" },
    { label: "General Chat", href: "#", badge: "5" },
    { label: "Notifications", href: "#", badge: "5" },
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

const quickLinks = [
    {
        kicker: "Mutual aid",
        title: "Request Support",
        description: "Post a need for textbooks, winter clothing, groceries, or study help and let the campus community respond.",
        action: "Ask for help",
        href: "#marketplace",
    },
    {
        kicker: "Community sharing",
        title: "Share What You Can",
        description: "Offer items, time, or academic support so fewer students have to face a hard week alone.",
        action: "Offer support",
        href: "#marketplace",
    },
];

const campusHighlights = [
    "Students can borrow, share, or request essentials instead of quietly going without them.",
    "Peer-to-peer support keeps useful items in circulation and reduces waste across campus.",
    "Messaging and community posts make it easier to respond quickly when someone needs help.",
];

const campusForum = [
    {
        title: "Study hall tonight",
        detail: "Library group room open at 7:00 PM for biology and stats review.",
    },
    {
        title: "Winter clothing drive",
        detail: "Student centre shelf is collecting coats, gloves, and boots through Friday.",
    },
    {
        title: "Campus prayer and care",
        detail: "Students are organizing meal support for classmates during midterms.",
    },
];

const impactMetrics = [
    { value: "143", label: "items shared", detail: "across campus" },
    { value: "$4.2k", label: "saved by students", detail: "through free and low-cost listings" },
    { value: "67", label: "requests fulfilled", detail: "through peer support" },
];

const supportStreams = [
    {
        title: "Affordable Essentials",
        description: "Help students find lower-cost textbooks, clothing, and campus basics before cost becomes a barrier.",
    },
    {
        title: "Borrow And Share",
        description: "Encourage reuse through borrowing and sharing so good items stay useful instead of going to waste.",
    },
    {
        title: "Peer Support",
        description: "Use posts and messages to connect classmates who can help with rides, study sessions, or practical needs.",
    },
];


const handlePost = (value: string) => {
        console.log("Post created:", value);
    };

    const handleLike = (liked: boolean) => {
        console.log(liked ? "You liked the post" : "You unliked the post");
    };

    const handleShare = () => {
        console.log("Post shared");
    };

function Landing() {
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
                            <input className="king-search" placeholder="Search posts, groups, or people" />
                        </div>
                    </nav>
                </div>
            </header>

            <main className="king-main king-shell">
                <section className="king-hero">
                    <div className="king-welcome-panel">
                        <div className="king-welcome">
                            <p className="king-motto">Share more. Waste less. Lift each other up.</p>
                            <Title title="King&apos;s Connect" />
                            <p className="king-welcome-copy">
                                We believe God did not create us to walk through life alone. King&apos;s Connect is a campus forum built to help students find community, care for one another in practical ways, and create the kind of support system God intended where needs are seen, help is shared, and no one has to struggle in silence.
                            </p>
                            <div className="king-hero__actions">
                                <a className="king-cta king-cta--primary" href="#marketplace">
                                    Explore support marketplace
                                </a>
                                <a className="king-cta king-cta--secondary" href="#messages">
                                    Open community messages
                                </a>
                            </div>
                        </div>
                        <aside className="king-highlight-card">
                            <p className="king-side-panel__label">King&apos;s Connect identity</p>
                            <div className="king-brand-map">
                                <div className="king-brand-map__logo">
                                    <div className="king-connect-logo" aria-hidden="true">
                                        <svg viewBox="0 0 120 120" fill="none">
                                            <defs>
                                                <linearGradient id="kingConnectGradient" x1="22" y1="18" x2="96" y2="98" gradientUnits="userSpaceOnUse">
                                                    <stop stopColor="#93C5FD" />
                                                    <stop offset="1" stopColor="#1D4ED8" />
                                                </linearGradient>
                                            </defs>
                                            <rect x="14" y="14" width="92" height="92" rx="28" fill="url(#kingConnectGradient)" />
                                            <path d="M43 33V87" stroke="#EFF6FF" strokeWidth="10" strokeLinecap="round" />
                                            <path d="M46 60L78 34" stroke="#EFF6FF" strokeWidth="10" strokeLinecap="round" />
                                            <path d="M46 61L80 86" stroke="#EFF6FF" strokeWidth="10" strokeLinecap="round" />
                                            <circle cx="84" cy="34" r="7" fill="#DBEAFE" />
                                            <circle cx="84" cy="86" r="7" fill="#DBEAFE" />
                                        </svg>
                                    </div>
                                    <div className="king-brand-map__logo-copy">
                                        <strong>King&apos;s Connect</strong>
                                        <span>Campus support, designed for good</span>
                                    </div>
                                </div>

                                <div className="king-brand-map__forum">
                                    <div className="king-brand-map__forum-header">
                                        <p className="king-side-panel__label">Campus forum</p>
                                        <span>Live now</span>
                                    </div>
                                    <div className="king-brand-map__forum-list">
                                        {campusForum.map((item) => (
                                            <article key={item.title} className="king-brand-map__forum-item">
                                                <strong>{item.title}</strong>
                                                <p>{item.detail}</p>
                                            </article>
                                        ))}
                                    </div>
                                </div>

                                <div className="king-brand-map__canvas" aria-label="Map graphic of Alberta with Edmonton highlighted">
                                    <svg viewBox="0 0 320 220" fill="none">
                                        <path
                                            d="M96 28L205 28L220 54L237 65L230 90L246 117L228 147L232 184L156 192L93 176L80 141L69 97L81 72L96 28Z"
                                            fill="rgba(255,255,255,0.72)"
                                            stroke="rgba(1,43,92,0.22)"
                                            strokeWidth="4"
                                        />
                                        <path
                                            d="M108 52H198M104 86H214M100 120H206M112 154H198"
                                            stroke="rgba(1,43,92,0.16)"
                                            strokeWidth="4"
                                            strokeLinecap="round"
                                        />
                                        <path
                                            d="M100 74L213 74M105 109L219 109M96 143L206 143"
                                            stroke="rgba(59,130,246,0.14)"
                                            strokeWidth="4"
                                            strokeLinecap="round"
                                        />
                                        <path
                                            d="M185 90C185 104 165 120 159 126C153 120 133 104 133 90C133 76 144 66 159 66C174 66 185 76 185 90Z"
                                            fill="#1D4ED8"
                                        />
                                        <circle cx="159" cy="89" r="11" fill="#DBEAFE" />
                                        <path d="M185 89H258" stroke="#012B5C" strokeWidth="4" strokeLinecap="round" />
                                        <rect x="214" y="66" width="82" height="46" rx="16" fill="#012B5C" />
                                        <text x="228" y="86" fill="#EFF6FF" fontSize="14" fontWeight="700">Edmonton</text>
                                        <text x="228" y="101" fill="#D7E8FA" fontSize="11">King&apos;s University</text>
                                    </svg>
                                </div>

                                <div className="king-brand-map__location">
                                    <span className="king-brand-map__pin">Edmonton, Alberta</span>
                                    <h3>Built around King&apos;s University and the students who make it home.</h3>
                                    <p>
                                        This concept ties the platform directly to place, showing a campus community rooted in Edmonton and connected through practical care.
                                    </p>
                                </div>
                            </div>

                            <ul className="king-side-panel__list">
                                {campusHighlights.map((item) => (
                                    <li key={item}>{item}</li>
                                ))}
                            </ul>
                        </aside>
                    </div>
                </section>

                <section className="king-resource-grid">
                    {quickLinks.map((link) => (
                        <article key={link.title} className="king-resource-card">
                            <div className="king-resource-card__copy">
                                <p className="king-resource-card__kicker">{link.kicker}</p>
                                <h3>{link.title}</h3>
                                <p>{link.description}</p>
                            </div>
                            <a href={link.href} className="king-resource-link">{link.action}</a>
                        </article>
                    ))}
                </section>

                <section className="king-impact-strip">
                    {impactMetrics.map((metric) => (
                        <article key={metric.label} className="king-impact-card">
                            <div className="king-impact-card__value">
                                <strong>{metric.value}</strong>
                            </div>
                            <div className="king-impact-card__copy">
                                <span>{metric.label}</span>
                                <small>{metric.detail}</small>
                            </div>
                        </article>
                    ))}
                </section>

                <section className="king-support-grid">
                    {supportStreams.map((stream) => (
                        <article key={stream.title} className="king-side-panel king-side-panel--soft">
                            <p className="king-side-panel__label">Community impact</p>
                            <h3>{stream.title}</h3>
                            <p className="king-support-grid__copy">{stream.description}</p>
                        </article>
                    ))}
                </section>

                <div className="row g-4 align-items-start king-content-grid">
                    <div className="col-lg-8 king-content-grid__main">
                        <ClickableCard
                            title="Community request"
                            initialValue="Hi everyone, I am looking for a used stats textbook or someone willing to share one for two weeks before midterms."
                            onPost={handlePost}
                            onLike={handleLike}
                            onShare={handleShare}
                        />
                    </div>

                    <div className="col-lg-4 king-content-grid__side">
                        <div className="king-sidebar-stack">
                        <aside className="king-side-panel king-side-panel--soft">
                            <p className="king-side-panel__label">Support in action</p>
                            <ul className="king-side-panel__list">
                                <li>A residence student shared winter boots with two classmates this week.</li>
                                <li>Three borrowed textbooks were matched before the first economics quiz.</li>
                                <li>Volunteers are organizing a shelf of free essentials in the student centre.</li>
                            </ul>
                        </aside>

                        <aside className="king-side-panel king-side-panel--compact">
                            <p className="king-side-panel__label">At a glance</p>
                            <div className="king-stat-list">
                                <div>
                                    <strong>18</strong>
                                    <span>needs posted</span>
                                </div>
                                <div>
                                    <strong>24</strong>
                                    <span>items shared free</span>
                                </div>
                                <div>
                                    <strong>31</strong>
                                    <span>support chats active</span>
                                </div>
                            </div>
                        </aside>
                        </div>
                    </div>
                </div>

                <div className="king-footer">
                    <p className="king-faith-verse">
                        &quot;Let all that you do be done in love.&quot; <span>1 Corinthians 16:14</span>
                    </p>
                </div>

                <Notification message="General Chat has " number={5} color="dark" />
            </main>
            </div>
        );
    }
    
    export default Landing;
