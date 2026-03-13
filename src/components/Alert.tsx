import type { ReactNode } from "react";

interface message {
    children: ReactNode;
    color?: 'primary' | 'light' | 'dark' | 'success';
}

function Alert({ children, color = "primary" }: message) {
    return <div className={'mx-2 text-center fw-bold fs-4 alert alert-' + color}>{children}</div>
}

export default Alert;
