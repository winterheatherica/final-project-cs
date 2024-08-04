import Head from 'next/head';

import Desc from "@/components/fragments/about/desc";
import VisionMission from "@/components/fragments/about/VisionMission";
import History from "@/components/fragments/about/history";

export default function Home() {
  return (
    <>
      <Head>
        <title>CSC PNJ</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <Desc />
        <VisionMission />
        <History />
      </main>
    </>
  );
}