import React from "react";
import styles from "./feature.module.css";
import Image from "next/image";
import Link from "next/link";

const Featured = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>
                <b>Hey, </b> Discover stories and creative ideas.
            </h1>
            <div className={styles.post}>
                <div className={styles.imgContainer}>
                    <Image src="/p1.jpeg" alt="" fill className={styles.image} />
                </div>
                <div className={styles.textContainer}>
                    <h1 className={styles.postTitle}>Lorem ipsum dolor sit amet alim consectetur adipisicing elit.</h1>
                    <p className={styles.postDesc}>
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                        Cupiditate, quam nisi magni ea laborum inventore voluptatum
                        laudantium repellat ducimus unde aspernatur fuga. Quo, accusantium
                        quisquam! Harum unde sit culpa debitis.
                    </p>
                    <button className={styles.button}><Link href="/blog">Read More</Link></button>
                </div>
            </div>
        </div>
    );
};

export default Featured;