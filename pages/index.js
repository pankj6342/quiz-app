import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import styles from "../styles/Home.module.css";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    localStorage.clear();
  }, []);
  return (
    <div className={styles.container}>
      <Head>
        <title>QuizNow</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container fixed inset-0 flex items-center justify-center bg-white">
        <div className="w-[60%] h-[70%] shadow-md flex flex-col items-center space-y-4 justify-center">
          <div className="text-4xl font-bold text-green-400 blur-0">
            Welcome to QuizNow
            <hr className="bg-orange-500 h-[0.5]" />
          </div>
          <div className="flex items-center justify-between space-x-4">
            <button
              onClick={() => {
                router.push(`/start`);
              }}
              className="bg-green-300 rounded-xl shadow-md p-2"
            >
              Attempt a test
            </button>
            <button
              className="bg-red-300 rounded-xl shadow-md p-2"
              onClick={() => {
                router.push(`/create`);
              }}
            >
              Create a test
            </button>
          </div>
        </div>
      </div>
      <footer className={styles.footer}></footer>
    </div>
  );
}
