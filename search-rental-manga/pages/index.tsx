import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>レンタルマンガ横断検索</title>
        <meta name="description" content="Generated by create next app" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          レンタルマンガ横断検索
        </h1>

        <p className={styles.description}>
          複数のマンガレンタルサイトを一括で横断検索します。
        </p>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://slash-mochi.net/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className={styles.footerItems}>
            <div className={styles.authorName}>
              Powered by{' '}Mochi
            </div>
            <Image src="/slash-mochi.png" alt="Slash Mochi Logo" height={32} width={32} />
          </div>
        </a>
      </footer>
    </div>
  )
}

export default Home
