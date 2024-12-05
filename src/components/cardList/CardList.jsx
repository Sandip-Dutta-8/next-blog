import React from 'react'
import Card from '../card/Card'
import styles from './cardList.module.css'

const CardList = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Recent Posts</h1>
            <div className={styles.posts}>
                <Card />
            </div>
            {/* <Pagination page={page} hasPrev={hasPrev} hasNext={hasNext} /> */}
        </div>
    )
}

export default CardList