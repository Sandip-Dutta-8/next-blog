import Link from "next/link";
import React from "react";
import styles from "./menuCategories.module.css";

const getData = async () => {
    const res = await fetch(process.env.BASE_URL+"/api/categories", {
        cache: "no-store"
    })

    if (!res.ok) {
        throw new Error("failed to fetch categories")
    }

    return res.json()
}

const MenuCategories = async () => {

    const data = await getData();

    return (
        <div className={styles.categoryList}>
            {data?.map((item) => (
                <Link
                    href={`/blog?cat=${item.slug}`}
                    className={`${styles.categoryItem} ${styles[item.slug]}`}
                    key={item._id}
                >
                    {item.slug}
                </Link>
            ))}
        </div>
    );
};

export default MenuCategories;