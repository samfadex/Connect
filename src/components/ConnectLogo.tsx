type ConnectLogoProps = {
    className?: string;
    eyebrow?: string;
    name?: string;
};

function ConnectLogo({
    className = "",
    eyebrow = "Campus Network",
    name = "CONNECT",
}: ConnectLogoProps) {
    const wrapperClassName = ["connect-login-brand", className].filter(Boolean).join(" ");

    return (
        <div className={wrapperClassName}>
            <div className="connect-login-brand__mark" aria-hidden="true">
                <span className="connect-login-brand__ring connect-login-brand__ring--one"></span>
                <span className="connect-login-brand__ring connect-login-brand__ring--two"></span>
                <span className="connect-login-brand__dot"></span>
            </div>
            <div className="connect-login-brand__copy">
                <p className="connect-login-brand__eyebrow">{eyebrow}</p>
                <h2 className="connect-login-brand__name">{name}</h2>
            </div>
        </div>
    );
}

export default ConnectLogo;
