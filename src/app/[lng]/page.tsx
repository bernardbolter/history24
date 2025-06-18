import { useTranslation } from '../i18n'

import Artworks from '@/components/Artworks'
import Nav from '@/components/Nav'
import Logo from '@/components/Logo'
import FilterTab from '@/components/FilterTab'

import { getAllArtwork, Artwork, ArtworkResponse } from '@/lib/graphql'

async function getArtwork(): Promise<Artwork[]> {
  const res = await fetch("https://digitalcityseries.com/bolter/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: getAllArtwork }),
    next: { revalidate: 100 }
  })

  const data = await res.json()
  
  return data.data.allArtwork.nodes
}

interface HomeProps {
  params: {
    lng: string;
  };
}

const Home = async ({ params: { lng } }: HomeProps) => {
  const { t } = await useTranslation(lng, 'common')
  const artwork = await getArtwork()

  return (
    <section className="home-container">
      <Nav lng={lng} />
      <Logo lng={lng} />
      <FilterTab lng={lng} />
      <Artworks 
        artworks={artwork}
        lng={lng}  
      />
    </section>
  )
}

export default Home