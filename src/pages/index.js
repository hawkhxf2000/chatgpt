import Head from 'next/head'
import {useState} from "react";
import styles from '@/styles/Home.module.css'
import {Inter} from "@next/font/google";
import MarkdownReader from "@/pages/MarkdownReader";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generator-35", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input: input }),
      });
      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }
      console.log(data.result.content);
      setResult(data.result.content);
      setInput("");
    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
      <div>
        <Head>
          <title>Personal ChatGPT</title>
        </Head>

        <main className={styles.main}>
          <h3>Name my pet</h3>
          <form onSubmit={onSubmit}>
            <input
                type="text"
                name="animal"
                placeholder="Enter an animal"
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            <input type="submit" value="Generate names" />
          </form>
          {/*<div className={styles.result}>{result}</div>*/}
          <MarkdownReader content={result}/>
        </main>
      </div>
  );
}
