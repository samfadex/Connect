import { useEffect, useRef } from "react";
import ConnectLogo from "../ConnectLogo";
import NotificationCenter from "./NotificationCenter";

type NavigationItem = {
    label: string;
    href: string;
    active?: boolean;
    badge?: string | number;
};

type DropdownItem = {
    label: string;
    href: string;
};

type SharedPageHeaderProps = {
    navigationItems: NavigationItem[];
    profileName: string;
    profileStatus: string;
    searchPlaceholder: string;
    notificationCount: string | number;
    searchClassName?: string;
    faculties?: DropdownItem[];
    moreItems?: DropdownItem[];
};

const defaultFaculties: DropdownItem[] = [
    { label: "Arts", href: "#faculties" },
    { label: "Science", href: "#faculties" },
    { label: "Business", href: "#faculties" },
    { label: "Education", href: "#faculties" },
    { label: "Music", href: "#faculties" },
];

const defaultMoreItems: DropdownItem[] = [
    { label: "About", href: "#" },
    { label: "Campus Map", href: "https://www.kingsu.ca/campus-life/campus-map" },
    { label: "Library", href: "https://www.kingsu.ca/services/library" },
    { label: "Student Services", href: "https://www.kingsu.ca/services" },
    { label: "Campus Events", href: "https://www.kingsu.ca/about-us/calendar" },
    { label: "Support", href: "https://www.kingsu.ca/student-hub/resources/resources" },
];

function SharedPageHeader({
    navigationItems,
    profileName,
    profileStatus,
    searchPlaceholder,
    notificationCount,
    searchClassName,
    faculties = defaultFaculties,
    moreItems = defaultMoreItems,
}: SharedPageHeaderProps) {
    const navRef = useRef<HTMLElement | null>(null);

    const closeDropdowns = () => {
        navRef.current?.querySelectorAll<HTMLDetailsElement>(".king-nav-dropdown[open]").forEach((dropdown) => {
            dropdown.open = false;
        });
    };

    useEffect(() => {
        const handlePointerDown = (event: PointerEvent) => {
            if (!(event.target instanceof Node)) return;

            const navElement = navRef.current;
            if (!navElement) return;

            const clickedDropdown = event.target.parentElement?.closest(".king-nav-dropdown");
            if (clickedDropdown) return;

            closeDropdowns();
        };

        window.addEventListener("hashchange", closeDropdowns);
        document.addEventListener("pointerdown", handlePointerDown);

        return () => {
            window.removeEventListener("hashchange", closeDropdowns);
            document.removeEventListener("pointerdown", handlePointerDown);
        };
    }, []);

    return (
        <header className="king-header">
            <div className="king-shell">
                <div className="king-topbar">
                    <div className="king-header__brand">
                        <ConnectLogo className="connect-login-brand--header" eyebrow="Campus Network" name="CONNECT" />
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
                                <strong>{profileName}</strong>
                                <small>{profileStatus}</small>
                            </span>
                        </div>
                    </div>
                </div>

                <nav ref={navRef} className="king-navbar" aria-label="Primary">
                    <div className="king-navbar__links">
                        {navigationItems.map((item) => (
                            <a
                                key={item.label}
                                className={`king-nav-link${item.active ? " king-nav-link--active" : ""}${item.badge ? " king-nav-link--with-badge" : ""}${item.label === "Posts" ? " king-nav-link--badge-near" : ""}`}
                                href={item.href}
                                onClick={closeDropdowns}
                            >
                                <span>{item.label}</span>
                                {item.badge ? (
                                    <span className="king-nav-link__badge">
                                        {item.badge}
                                    </span>
                                ) : null}
                            </a>
                        ))}

                        <NotificationCenter unreadCount={notificationCount} />

                        <details className="king-nav-dropdown">
                            <summary className="king-nav-link king-nav-dropdown__toggle">
                                <span>Faculties</span>
                            </summary>
                            <div className="king-nav-dropdown__menu">
                                {faculties.map((faculty) => (
                                    <a key={faculty.label} className="king-nav-dropdown__item" href={faculty.href} onClick={closeDropdowns}>
                                        {faculty.label}
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
                                    <a key={item.label} className="king-nav-dropdown__item" href={item.href} onClick={closeDropdowns}>
                                        {item.label}
                                    </a>
                                ))}
                            </div>
                        </details>
                    </div>

                    <div className="king-navbar__actions">
                        <input className={`king-search${searchClassName ? ` ${searchClassName}` : ""}`} placeholder={searchPlaceholder} />
                    </div>
                </nav>
            </div>
        </header>
    );
}

export default SharedPageHeader;
