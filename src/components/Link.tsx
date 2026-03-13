import type { ReactNode } from "react";

interface LinkProps {
    label: string;
    children?: ReactNode
    href?: string;
}
function Link({ label, children, href = "#" }: LinkProps) {
    return <a className="p-3 d-block fw-bold" href={href}>{label}{children}</a>;
}
export default Link;
