import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useState, useEffect } from "react";


const inter = Inter({ subsets: ["latin"] });
let filename = [];

fetch('filename.json')
.then((r) => r.json())
.then((data) =>{
  filename = data;
});


function nextQuestion() {
  const index = Math.floor(Math.random() * filename.length);
  return "/data/" + filename[index] + "_0.png";
}

export default function Home() {
  const [count, setCount] = useState(1);
  const [question, setQuestion] = useState("/data/A6_017_0.png");

  useEffect(() => {
    window.addEventListener('scroll', isSticky);
    return () => {
        window.removeEventListener('scroll', isSticky);
    };
  });

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    })
  }, [question])

  const isSticky = (e) => {
    const header = document.getElementById('header');
    const scrollTop = window.scrollY;
    scrollTop >= 1000 ? header.classList.add('is-sticky') : header.classList.remove('is-sticky');
  };

  return (
    <>
      <Head>
        <title>Mẹ Tuyền Béo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header id="header" className={`${styles.is_sticky} ${styles.card}`}
                  onClick={() => {
                    if (question.endsWith("0.png")) {
                      setQuestion(question.replace("0.png", "1.png"));
                      return;
                    }
                    setQuestion(nextQuestion());
                    setCount(count+1);
                  }}>
        <h1>
          Câu: {count}
        </h1>
        <h1>
          Tiếp tục
        </h1>
      </header>
      <main className={`${styles.main} ${inter.className}`}>
        <div className={styles.center}>
          <Image
            src={question}
            alt="Lỗi do Tuyền quá béo"
            width={1080}
            height={1000}
            priority
          />
        </div>
        
      </main>
    </>
  );
}
