import SharedPageHeader from "./MainPage/SharedPageHeader";
import SiteFooter from "./MainPage/SiteFooter";

type StudentProfile = {
    id: number;
    name: string | null;
    schoolEmail: string | null;
    username: string | null;
    studentId: number | null;
};

type FacultyProps = {
    currentStudent: StudentProfile | null;
};

type ProgramCard = {
    name: string;
    resourceLabel: string;
    forumLabel: string;
    highlights: string[];
};

type FacultyGroup = {
    name: string;
    description: string;
    departments: ProgramCard[];
};

const navigationItems = [
    { label: "Home", href: "#home" },
    { label: "Chat", href: "#messages", badge: "12" },
    { label: "Marketplace", href: "#marketplace" },
];

const facultyGroups: FacultyGroup[] = [
    {
        name: "Faculty of Arts & Social Science",
        description: "Discussion spaces and learning resources for humanities, social thought, and creative work.",
        departments: [
            {
                name: "English",
                resourceLabel: "Writing guides",
                forumLabel: "English forum",
                highlights: ["Essay planning tips", "Reading circles", "Peer editing"],
            },
            {
                name: "History",
                resourceLabel: "Archive resources",
                forumLabel: "History forum",
                highlights: ["Source analysis", "Exam prep", "Research threads"],
            },
            {
                name: "Psychology",
                resourceLabel: "Study resources",
                forumLabel: "Psychology forum",
                highlights: ["Flashcards", "Lab discussion", "Peer Q&A"],
            },
        ],
    },
    {
        name: "Faculty of Natural Science",
        description: "Program hubs for science classes, lab support, and collaborative problem solving.",
        departments: [
            {
                name: "Biology",
                resourceLabel: "Lab resources",
                forumLabel: "Biology forum",
                highlights: ["Lab note templates", "Field study help", "Quiz prep"],
            },
            {
                name: "Chemistry",
                resourceLabel: "Formula sheets",
                forumLabel: "Chemistry forum",
                highlights: ["Reaction review", "Safety reminders", "Practice sets"],
            },
            {
                name: "Computing Science",
                resourceLabel: "Coding resources",
                forumLabel: "Computing forum",
                highlights: ["Project help", "Debug threads", "Career links"],
            },
        ],
    },
    {
        name: "Faculty of Education",
        description: "Support spaces for future teachers, placements, and classroom preparation.",
        departments: [
            {
                name: "Elementary Education",
                resourceLabel: "Lesson resources",
                forumLabel: "Elementary forum",
                highlights: ["Lesson plans", "Placement advice", "Teaching tools"],
            },
            {
                name: "Secondary Education",
                resourceLabel: "Classroom resources",
                forumLabel: "Secondary forum",
                highlights: ["Subject planning", "Practicum tips", "Assessment ideas"],
            },
        ],
    },
    {
        name: "Leder School of Business",
        description: "Shared resources and department forums for business-focused programs and concentrations.",
        departments: [
            {
                name: "Business Core",
                resourceLabel: "Business resources",
                forumLabel: "Business forum",
                highlights: ["Case study help", "Presentation tips", "Networking leads"],
            },
            {
                name: "Accounting",
                resourceLabel: "Accounting sheets",
                forumLabel: "Accounting forum",
                highlights: ["Practice questions", "Excel tips", "Exam review"],
            },
            {
                name: "Marketing",
                resourceLabel: "Campaign resources",
                forumLabel: "Marketing forum",
                highlights: ["Brand strategy", "Peer feedback", "Portfolio ideas"],
            },
        ],
    },
];

function Faculty({ currentStudent }: FacultyProps) {
    const displayName = currentStudent?.name || currentStudent?.username || "Sam Fadex";
    const displayRole = currentStudent ? "3rd year student" : "Guest student";

    return (
        <div className="king-theme">
            <SharedPageHeader
                navigationItems={navigationItems}
                profileName={displayName}
                profileStatus={displayRole}
                searchPlaceholder="Search faculty resources and forums"
                notificationCount="99+"
            />

            <main className="king-main king-shell faculty-page">
                <section className="faculty-hero">
                    <div className="faculty-hero__intro">
                        <p className="king-motto">Faculty Spaces</p>
                        <h1 className="king-main-title">Programs, Resources, and Forums</h1>
                        <p className="faculty-hero__copy">
                            Each faculty space gives students one place to discover academic resources, ask questions, and connect with classmates in their department or program.
                        </p>
                    </div>

                    <div className="faculty-hero__panel">
                        <p className="king-side-panel__label">Quick Access</p>
                        <ul className="faculty-hero__list">
                            <li>Find department-specific study resources.</li>
                            <li>Join program discussion forums.</li>
                            <li>Share notes, tips, and peer support.</li>
                        </ul>
                    </div>
                </section>

                <section className="faculty-directory">
                    {facultyGroups.map((faculty) => (
                        <article key={faculty.name} className="faculty-section-card">
                            <div className="faculty-section-card__top">
                                <div>
                                    <p className="king-side-panel__label">Faculty</p>
                                    <h2>{faculty.name}</h2>
                                </div>
                                <p className="faculty-section-card__description">{faculty.description}</p>
                            </div>

                            <div className="faculty-program-grid">
                                {faculty.departments.map((department) => (
                                    <article key={department.name} className="faculty-program-card">
                                        <p className="king-side-panel__label">Department / Program</p>
                                        <h3>{department.name}</h3>
                                        <ul className="faculty-program-card__list">
                                            {department.highlights.map((highlight) => (
                                                <li key={highlight}>{highlight}</li>
                                            ))}
                                        </ul>
                                        <div className="faculty-program-card__actions">
                                            <a className="king-cta king-cta--primary faculty-program-card__button" href="#faculties">
                                                {department.resourceLabel}
                                            </a>
                                            <a className="king-cta king-cta--secondary faculty-program-card__button" href="#messages">
                                                {department.forumLabel}
                                            </a>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </article>
                    ))}
                </section>

                <SiteFooter />
            </main>
        </div>
    );
}

export default Faculty;
