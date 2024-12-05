import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import styles from './card.module.css'

const Card = () => {
    return (
        <div className={styles.container}>
                <div className={styles.imageContainer}>
                    <Image src="/p1.jpeg" alt="" fill className={styles.image} />
                </div>

            <div className={styles.textContainer}>
                <div className={styles.detail}>
                    <span className={styles.date}>
                        {/* {item.createdAt.substring(0, 10)} -{" "} */}
                        11.02.2024 
                    </span>
                    <span className={styles.category}>- CULTURE</span>
                </div>
                <Link href="/">
                    <h1>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Excepturi, quaerat.</h1>
                </Link>
                <p className={styles.desc}>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minima pariatur eaque voluptates neque explicabo et sunt nobis laboriosam id consequatur maiores dolorem porro, quas voluptatum atque illo eligendi? Dolore, cupiditate.
                </p>
                {/* <div className={styles.desc} dangerouslySetInnerHTML={{ __html: item?.desc.substring(0, 60) }} /> */}
                <Link href="/" className={styles.link}>
                    Read More
                </Link>
            </div>
        </div>
    )
}

export default Card