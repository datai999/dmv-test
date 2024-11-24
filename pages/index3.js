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
  const [question, setQuestion] = useState("/data/A6_007_0.png");

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [question])

  return (
    <>
      <Head>
        <title>Mẹ Tuyền Béo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>

        <div className={styles.grid}>

          <h1>
            Câu: {count}
          </h1>

          <button
            className={styles.card}
            onClick={() => {
              if (question.endsWith("0.png")) {
                setQuestion(question.replace("0.png", "1.png"));
                return;
              }
              setQuestion(nextQuestion());
              setCount(count+1);
            }}
          >
            <h1>
              Tiếp tục <span>-&gt;</span>
            </h1>
          </button>

        </div>

        <div className={styles.center}>
          <Image
            src={question}
            width={1080}
            height={1000}
            priority
          />
        </div>
        
      </main>
    </>
  );
}
