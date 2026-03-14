import "./SiteFooter.css";

type FooterLink = {
    label: string;
    href: string;
    external?: boolean;
};

type FooterSection = {
    title: string;
    links: FooterLink[];
};

const sections: FooterSection[] = [
    {
        title: "Navigate",
        links: [
            { label: "Home", href: "#home" },
            { label: "Posts", href: "#posts" },
            { label: "Messages", href: "#messages" },
            { label: "Marketplace", href: "#marketplace" },
        ],
    },
    {
        title: "King'sU",
        links: [
            { label: "About", href: "https://www.kingsu.ca/about-us/about-kings", external: true },
            { label: "Campus Map", href: "https://www.kingsu.ca/campus-life/campus-map", external: true },
            { label: "Calendar", href: "https://www.kingsu.ca/about-us/calendar", external: true },
        ],
    },
    {
        title: "Resources",
        links: [
            { label: "Library", href: "https://www.kingsu.ca/services/library", external: true },
            { label: "Student Services", href: "https://www.kingsu.ca/services", external: true },
            { label: "Student Hub", href: "https://www.kingsu.ca/student-hub/resources/resources", external: true },
        ],
    },
];

function SiteFooter() {
    const year = new Date().getFullYear();

    return (
        <footer className="king-site-footer" role="contentinfo">
            <div className="king-shell king-site-footer__shell">
                <div className="king-site-footer__panel">
                    <div className="king-site-footer__top">
                        <div className="king-site-footer__brand">
                            <p className="king-site-footer__mark" aria-label="King's Connect">
                                KING&apos;S CONNECT
                            </p>
                            <p className="king-site-footer__tagline">
                                Technology that makes it easier to ask for help, share resources, and stay connected.
                            </p>
                        </div>

                        <nav className="king-site-footer__nav" aria-label="Footer">
                            {sections.map((section) => (
                                <div key={section.title} className="king-site-footer__section">
                                    <p className="king-site-footer__title">{section.title}</p>
                                    <ul className="king-site-footer__list">
                                        {section.links.map((link) => (
                                            <li key={`${section.title}-${link.label}`}>
                                                <a
                                                    className="king-site-footer__link"
                                                    href={link.href}
                                                    {...(link.external ? { target: "_blank", rel: "noreferrer" } : {})}
                                                >
                                                    {link.label}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </nav>
                    </div>

                    <div className="king-site-footer__bottom">
                        <p className="king-site-footer__fineprint">
                            (c) {year} King&apos;s Connect. Built for a student-first campus community.
                        </p>
                        <div className="king-site-footer__mini">
                            <button
                                type="button"
                                className="king-site-footer__mini-link"
                                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                            >
                                Back to top
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default SiteFooter;

