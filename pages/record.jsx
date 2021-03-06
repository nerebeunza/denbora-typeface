import Head from 'next/head'

import Header from '../components/Header'
import Footer from '../components/Footer'

import container from "../styles/Containers.module.css"

import texts from "../assets/texts.json"

export default function Record() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header/>
      <Footer
        font={"Denbora_02_07_12_35"}
      />

      <div className={`${container.fullpage}`}>
        <h1>Record !!</h1>
      </div>

    </div>
  )
}
