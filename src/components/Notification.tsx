interface NotificationProps {
    /** The base notification text (e.g. "You have"). */
    message: string;
    /** The number to display in the notification. */
    number: number;
    /** Bootstrap alert color style. */
    color?: 'primary' | 'light' | 'dark' | 'success';
}

function Notification({ message, number, color = "primary" }: NotificationProps) {
    return (
        <div
            className={`king-notification position-fixed bottom-0 end-0 m-3 alert alert-${color} py-2 px-3 shadow-sm`}
            role="status"
            aria-live="polite"
            style={{ zIndex: 1080, minWidth: '160px', maxWidth: '70vw', fontSize: '0.9rem', borderRadius: '1rem', boxShadow: '0 10px 25px rgba(31, 42, 55, 0.12)' }}
        >
            <small className="m-0">
                {message} <span className="fw-bold">{number}</span> messages
            </small>
        </div>
    );
}

export default Notification;
