import { useTranslation } from '../i18n'

import Artworks from '@/components/Artworks'
import Nav from '@/components/Nav'
import Logo from '@/components/Logo'

import { getAllArtwork } from '@/lib/graphql'

async function getArtwork() {

  const res = await fetch("https://digitalcityseries.com/bolter/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: getAllArtwork }),
    next: {next: { revalidate: 100 }}
  })

  const data = await res.json()
  // console.log(data)

  return data.data.allArtwork.nodes
}

const Home = async ({ params: { lng} }) => {
  const { t } = useTranslation(lng, 'common')
  const artwork = await getArtwork()

  return (
    <section className="home-container">

            <Nav lng={lng} />
            <Logo lng={lng} />
            <Artworks 
              artworks={artwork}
              lng={lng}  
            /> 

            {/* {!artwork
              ? <p>loading...</p>
              : <Artworks 
                  artworks={artwork}
                  lng={lng}  
                /> 
            } */}
    </section>
  )
}

export default Home