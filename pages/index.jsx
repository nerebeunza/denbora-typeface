import {useState, useEffect} from 'react';
import Head from 'next/head'
import opentype from 'opentype.js'

import Header from '../components/Header'
import Footer from '../components/Footer'
import {GlyphListContainer, GlyphList} from '../components/GlyphList';
import TypeTester from '../components/TypeTester';

import container from "../styles/Containers.module.css"

import texts from "../assets/texts.json"


export default function Home(props) {

  const [dateState, setDateState] = useState()
  const [glyphs, setGlyphs] = useState()

  useEffect(() => {
    const fetchTime = async () => {
      const res = await fetch("http://worldtimeapi.org/api/timezone/Europe/Madrid")
      const data = await res.json()
      setDateState(data)
    }
    fetchTime()
    setInterval(() => fetchTime(), 1000)

    opentype.load("/TFG_v_03GX.ttf", (err, font) => {
      if(err) {
        console.log(font)
      }
      else {
        const fontGlyphs = font.glyphs.glyphs
        console.log(fontGlyphs)
        const cleanGlyphs = Object.keys(fontGlyphs).map((key, index) => {
          return {
            name : fontGlyphs[key].name,
            unicode: fontGlyphs[key].unicode
          }
        })
        setGlyphs(cleanGlyphs)
      }
    
    })

  }, [])

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header
        // date={dateState ? `${dateState.getUTCHours()}:${dateState.getUTCMinutes()}:${dateState.getUTCSeconds()} [GMT+1]` : "HH:mm:ss"}
        date={`${dateState?.datetime.split("T")[1].split("+")[0].split(".")[0]} [${dateState?.abbreviation}]`}
      />
      <Footer
        font={"Denbora_02_07_12_35"}
      />

      <div className={`${container.fullpage}`}>
        <h1>{props.date}</h1>
      </div>

      <div className={`${container.default} ${container["padding-small"]}`}>
        <h1>contenidoo</h1>
      </div>

      <div className={`${container.default} ${container["padding-big"]}`} style={{fontSize: 85}}>
        <p>{texts.introduction}</p>
      </div>

      <div className={`${container.default} ${container["padding-big"]}`}>
        <GlyphListContainer>
          {glyphs ? Object.keys(glyphs).map(key => {
            return <GlyphList key={key}>{String.fromCharCode(glyphs[key].unicode)}</GlyphList>
          }) : ""}
        </GlyphListContainer>
      </div>


      <TypeTester>
        {texts.titular}
      </TypeTester>

      <div className={`${container.default} ${container["padding-big"]}` }>
        <p style={{fontSize: 60}}>{texts.articleIntro}</p>
        <p style={{fontSize: 20}}>{texts.article}</p>
      </div>

    </div>
  )
}
