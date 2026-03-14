import { useState } from "react";

interface ClickableCardProps {
    title: string;
    /** Optional initial value to prefill the input. */
    initialValue?: string;
    /** Called when the user posts (presses Post/Submit). */
    onPost?: (value: string) => void;
    /** Called when the user toggles like. */
    onLike?: (liked: boolean) => void;
    /** Called when the user shares. */
    onShare?: () => void;
}

interface PostItem {
    id: number;
    text: string;
    audience: "Campus" | "Classmates" | "Connect Group";
    createdAt: string;
}

function ClickableCard({ title, initialValue = "", onPost, onLike, onShare }: ClickableCardProps) {
    const [value, setValue] = useState(initialValue);
    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    const [shareCount, setShareCount] = useState(0);
    const [audience, setAudience] = useState<PostItem["audience"]>("Campus");
    const [posts, setPosts] = useState<PostItem[]>([
        {
            id: 1,
            text: "Does anyone want to join a study session in the library after chapel tomorrow?",
            audience: "Campus",
            createdAt: "Just now",
        },
    ]);

    const handlePost = () => {
        if (!value.trim()) return;
        const trimmedValue = value.trim();
        onPost?.(trimmedValue);
        setPosts((currentPosts) => [
            {
                id: Date.now(),
                text: trimmedValue,
                audience,
                createdAt: "Now",
            },
            ...currentPosts,
        ]);
        setValue("");
    };

    const handleLike = () => {
        const nextLiked = !liked;
        setLiked(nextLiked);
        setLikeCount((c) => c + (nextLiked ? 1 : -1));
        onLike?.(nextLiked);
    };

    const handleShare = () => {
        setShareCount((c) => c + 1);
        onShare?.();
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            event.preventDefault();
            handlePost();
        }
    };

    return (
        <div className="card mb-3">
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text text-muted">Share an update, choose your audience, and preview what students will see.</p>

                <div className="row g-3 align-items-start">
                    <div className="col-lg-7">
                        <div className="mb-2">
                            <label className="form-label fw-semibold" htmlFor="postAudience">Posting to</label>
                            <select
                                id="postAudience"
                                className="form-select"
                                value={audience}
                                onChange={(event) => setAudience(event.target.value as PostItem["audience"])}
                            >
                                <option value="Campus">Campus</option>
                                <option value="Classmates">Classmates</option>
                                <option value="Connect Group">Connect Group</option>
                            </select>
                        </div>

                        <div className="mb-2">
                            <div className="input-group">
                                <input
                                    type="text"
                                    value={value}
                                    onChange={(e) => setValue(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    className="form-control king-post-input"
                                    placeholder="Share something happening on campus"
                                    aria-label="Post input"
                                />
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={handlePost}
                                >
                                    Post
                                </button>
                            </div>
                        </div>

                        <div className="d-flex justify-content-between align-items-center small text-muted mb-3">
                            <span>Audience: {audience}</span>
                            <span>{value.length}/280 characters</span>
                        </div>
                    </div>

                    <div className="col-lg-5">
                        <div className="king-composer-preview">
                            <p className="king-side-panel__label mb-2">Preview</p>
                            <p className="mb-2 fw-semibold king-preview-title">You are posting to {audience}</p>
                            <p className="mb-0 text-muted">
                                {value.trim() || "Your post preview will appear here as you type."}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="d-flex gap-2 flex-wrap mb-4">
                    <button
                        type="button"
                        className={`btn btn-outline-${liked ? "success" : "secondary"}`}
                        onClick={handleLike}
                    >
                        {liked ? "Liked" : "Like"} ({likeCount})
                    </button>
                    <button
                        type="button"
                        className="btn btn-outline-info"
                        onClick={() => alert("Comment feature coming soon!")}
                    >
                        Comment
                    </button>
                    <button
                        type="button"
                        className="btn btn-outline-primary"
                        onClick={handleShare}
                    >
                        Share ({shareCount})
                    </button>
                </div>

                <div className="king-post-feed">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h6 className="mb-0">Recent posts</h6>
                        <span className="small text-muted">{posts.length} updates</span>
                    </div>

                    <div className="d-grid gap-3">
                        {posts.map((post) => (
                            <article key={post.id} className="king-post-feed__item">
                                <div className="d-flex justify-content-between align-items-center gap-3 mb-2">
                                    <span className="badge king-post-badge">{post.audience}</span>
                                    <span className="small text-muted">{post.createdAt}</span>
                                </div>
                                <p className="mb-0">{post.text}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ClickableCard;
