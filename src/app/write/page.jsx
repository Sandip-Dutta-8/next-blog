// src/app/write/page.jsx
"use client";  // This marks the component as a client component

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import Image from "next/image";
import styles from "./writePage.module.css";

const WritePage = () => {
    const { status } = useSession();
    const router = useRouter();

    const [open, setOpen] = useState(false);
    const [file, setFile] = useState(null);
    const [media, setMedia] = useState("");
    const [value, setValue] = useState("");
    const [title, setTitle] = useState("");
    const [catSlug, setCatSlug] = useState("");

    useEffect(() => {
        const uploadToCloudinary = async () => {
            if (!file) return;

            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", "your_upload_preset"); // Replace with your actual preset

            const CLOUDINARY_URL = process.env.NEXT_PUBLIC_CLOUDINARY_URL;

            if (!CLOUDINARY_URL) {
                console.error("CLOUDINARY_URL is not defined in the environment variables");
                return;
            }

            // Extract Cloudinary URL
            const cloudName = CLOUDINARY_URL.split("@")[1];
            const cloudinaryBaseURL = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;

            try {
                const response = await fetch(cloudinaryBaseURL, {
                    method: "POST",
                    body: formData,
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(`Cloudinary upload failed: ${response.status} - ${errorText}`);
                }

                const data = await response.json();
                setMedia(data.secure_url);
            } catch (error) {
                console.error("Error uploading to Cloudinary:", error);
            }
        };

        uploadToCloudinary();
    }, [file]);

    if (status === "loading") {
        return <div className={styles.loading}>Loading...</div>;
    }

    if (status === "unauthenticated") {
        router.push("/");
    }

    const slugify = (str) =>
        str
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, "")
            .replace(/[\s_-]+/g, "-")
            .replace(/^-+|-+$/g, "");

    const handleSubmit = async () => {
        const res = await fetch("/api/posts", {
            method: "POST",
            body: JSON.stringify({
                title,
                desc: value,
                img: media,
                slug: slugify(title),
                catSlug: catSlug || "style", // If not selected, choose the general category
            }),
        });

        if (res.status === 200) {
            const data = await res.json();
            router.push(`/posts/${data.slug}`);
        }
    };

    const modules = {
        toolbar: [
            [{ header: [1, 2, false] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
            ["link"],
            ["clean"],
        ],
    };

    const formats = [
        "header",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "list",
        "bullet",
        "indent",
        "link",
    ];

    return (
        <div className={styles.container}>
            <input
                type="text"
                placeholder="Title"
                className={styles.input}
                onChange={(e) => setTitle(e.target.value)}
            />
            <select className={styles.select} onChange={(e) => setCatSlug(e.target.value)}>
                <option value="style">style</option>
                <option value="fashion">fashion</option>
                <option value="food">food</option>
                <option value="culture">culture</option>
                <option value="travel">travel</option>
                <option value="coding">coding</option>
            </select>
            <div className={styles.editor}>
                <button className={styles.button} onClick={() => setOpen(!open)}>
                    <Image src="/add.png" alt="+" width={16} height={16} />
                </button>
                {open && (
                    <div className={styles.add}>
                        <input
                            type="file"
                            id="image"
                            onChange={(e) => setFile(e.target.files[0])}
                            style={{ display: "none" }}
                        />
                        <button className={styles.addButton}>
                            <label htmlFor="image" style={{ cursor: "pointer" }}>
                                <Image src="/image.png" alt="" width={16} height={16} />
                            </label>
                        </button>
                        <button className={styles.addButton}>
                            <Image src="/external.png" alt="" width={16} height={16} />
                        </button>
                        <button className={styles.addButton}>
                            <Image src="/video.png" alt="" width={16} height={16} />
                        </button>
                    </div>
                )}
                <ReactQuill
                    className={styles.textArea}
                    theme="bubble"
                    value={value}
                    onChange={setValue}
                    placeholder="Tell your story..."
                    modules={modules}
                    formats={formats}
                />
            </div>
            <button className={styles.publish} onClick={handleSubmit}>
                Publish
            </button>
        </div>
    );
};

export default WritePage;
