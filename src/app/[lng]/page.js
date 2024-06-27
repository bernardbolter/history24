import { useContext } from 'react'
import { HistoryContext } from '@/providers/HistoryProvider'
import { useTranslation } from '../i18n'

import Artworks from '@/components/Artworks'
import Nav from '@/components/Nav'
import Logo from '@/components/Logo'

async function getArtwork() {
  const query =  `
    {
      allArtwork(first: 1000, where: {categoryName: "A Colorful History"}) {
        nodes {
          slug
          artworkFields {
            slug
            city
            artworklink {
              url
              title
            }
            country
            forsale
            height
            lat
            lng
            medium
            metadescription
            metakeywords
            orientation
            proportion
            series
            size
            style
            width
            year
          }
          title(format: RENDERED)
          databaseId
          id
        }
      }
    }
  `

  const res = await fetch("https://digitalcityseries.com/bolter/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
    next: {next: { revalidate: 10 }}
  })

  const data = await res.json()

  return data.data.allArtwork.nodes
}


const Home = async ({ params: { lng} }) => {
  const { t } = await useTranslation(lng, 'common')
  const [history, setHistory] = useContext(HistoryContext)
  const artwork = await getArtwork()
  console.log("art:", artwork)
  setHistory(state => ({ ...state, }))

  return (
    <section className="home-container">
      <Nav lng={lng} />
      <Logo lng={lng} />
      <Artworks 
        artworks={artwork}
        lng={lng}  
      />
    </section>
  )
}

export default Home