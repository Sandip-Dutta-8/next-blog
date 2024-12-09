"use client";

import Link from "next/link";
import styles from "./comments.module.css";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useState } from "react";
import useSWR from "swr";

const fetcher = async (url) => {
    const res = await fetch(url);

    if (!res.ok) {
        const error = new Error(res.statusText);
        throw error;
    }

    return res.json();
};

const Comments = ({ postSlug }) => {
    const { status } = useSession();

    const { data, error, mutate } = useSWR(
        postSlug ? `/api/comments?postSlug=${postSlug}` : null,
        fetcher
    );

    const [desc, setDesc] = useState("");

    const handleSubmit = async () => {
        if (!desc.trim()) return;

        await fetch("/api/comments", {
            method: "POST",
            body: JSON.stringify({ desc, postSlug }),
        });
        mutate();
    };

    if (error) {
        return <div>Error loading comments: {error.message}</div>;
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Comments</h1>
            {status === "authenticated" ? (
                <div className={styles.write}>
                    <textarea
                        placeholder="write a comment..."
                        className={styles.input}
                        onChange={(e) => setDesc(e.target.value)}
                    />
                    <button className={styles.button} onClick={handleSubmit}>
                        Send
                    </button>
                </div>
            ) : (
                <Link href="/login">Login to write a comment</Link>
            )}
            <div className={styles.comments}>
                {data ? (
                    data.map((item) => (
                        <div className={styles.comment} key={item._id}>
                            <div className={styles.user}>
                                {item?.user?.image && (
                                    <Image
                                        src={item.user.image}
                                        alt=""
                                        width={50}
                                        height={50}
                                        className={styles.image}
                                    />
                                )}
                                <div className={styles.userInfo}>
                                    <span className={styles.username}>{item.user.name}</span>
                                    <span className={styles.date}>{item.createdAt.substring(0, 10)}</span>
                                </div>
                            </div>
                            <p className={styles.desc}>{item.desc}</p>
                        </div>
                    ))
                ) : (
                    "loading"
                )}
            </div>
        </div>
    );
};

export default Comments;
