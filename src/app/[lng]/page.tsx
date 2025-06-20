import { useTranslation } from '../i18n'

import Artworks from '@/components/Artworks/Artworks'
import Nav from '@/components/Navigation/Nav'
import Logo from '@/components/Navigation/Logo'
import FilterTab from '@/components/Navigation/FilterTab'

import { getAllArtwork, Artwork, ArtworkResponse } from '@/lib/graphql'

async function getArtwork(): Promise<Artwork[]> {
  const res = await fetch(process.env.NEXT_PUBLIC_GRAPHQL_URL, {
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