import { useState } from "react";
import ClickableCard from "../ClickableCard";
import Title from "../Title";
import Notification from "../Notification";
import ConnectLogo from "../ConnectLogo";
import SiteFooter from "./SiteFooter";
import SharedPageHeader from "./SharedPageHeader";

type StudentProfile = {
    id: number;
    name: string | null;
    schoolEmail: string | null;
    username: string | null;
    studentId: number | null;
};

type LandingProps = {
    currentStudent: StudentProfile | null;
};

const navigationItems = [
    { label: "Home", href: "#home", active: true },
    { label: "Faculties", href: "#faculties" },
    { label: "Posts", href: "#posts", badge: "5" },
    { label: "Chat", href: "#messages", badge: "12" },
    { label: "Marketplace", href: "#marketplace" },
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
        description: "Offer items or support to classmates.",
        action: "Offer support",
        href: "#marketplace",
    },
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

function Landing({ currentStudent }: LandingProps) {
    const displayName = currentStudent?.name || currentStudent?.username || "Student";
    const displayRole = currentStudent ? "3rd year student" : "Guest student";
    const [showVerse, setShowVerse] = useState(true);

    return (
        <div className="king-theme">
            <SharedPageHeader
                navigationItems={navigationItems}
                profileName={displayName}
                profileStatus={displayRole}
                searchPlaceholder="Search posts, groups, or people"
                notificationCount="99+"
            />

            {showVerse ? (
                <div className="king-shell">
                    <div className="king-footer king-footer--inline">
                        <p
                            className="king-faith-verse king-faith-verse--compact king-faith-verse--green-fade"
                            onAnimationEnd={(event) => {
                                if (event.animationName === "kingVerseGreenBorderFade") {
                                    setShowVerse(false);
                                }
                            }}
                        >
                            &quot;Let all that you do be done in love.&quot; <span>1 Corinthians 16:14</span>
                        </p>
                    </div>
                </div>
            ) : null}

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
                                <a className="king-cta king-cta--secondary" href="#posts">
                                    Open community messages
                                </a>
                            </div>

                            <section className="king-impact-strip king-impact-strip--compact">
                                {impactMetrics.map((metric) => (
                                    <article key={metric.label} className="king-impact-card king-impact-card--compact">
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
                        </div>
                        <aside className="king-highlight-card">
                            <p className="king-side-panel__label">King&apos;s Connect identity</p>
                            <div className="king-brand-map">
                                <div className="king-brand-map__logo">
                                    <ConnectLogo
                                        className="connect-login-brand--map"
                                        eyebrow="Campus support, designed for good"
                                        name="King&apos;s Connect"
                                    />
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

                            </div>
                        </aside>
                    </div>
                </section>

                <section className="king-resource-grid">
                    {quickLinks.map((link) => (
                        <article key={link.title} className="king-resource-card">
                            <div className="king-resource-card__copy">
                                <p className="king-resource-card__kicker">{link.kicker}</p>
                                <h3>{link.title}</h3>
                                {link.description ? <p>{link.description}</p> : null}
                            </div>
                            <a href={link.href} className="king-resource-link">{link.action}</a>
                        </article>
                    ))}
                </section>

                <section className="king-support-grid">
                    {supportStreams.map((stream) => (
                        <article key={stream.title} className="king-side-panel king-side-panel--soft">
                            <p className="king-side-panel__label king-side-panel__label--blue">Community impact</p>
                            <h3 className="king-support-grid__title">{stream.title}</h3>
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
                            <div className="king-stat-list mt-3">
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

                <SiteFooter />
                <Notification message="General Chat has " number={5} color="dark" />
            </main>
            </div>
        );
    }
    
    export default Landing;
