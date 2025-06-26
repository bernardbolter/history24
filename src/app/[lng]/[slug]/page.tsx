import { getAllArtwork, Artwork } from '@/lib/graphql'
import Nav from '@/components/Navigation/Nav'
import Logo from '@/components/Navigation/Logo'
import ArtworkList from '@/components/Artworks/ArtworkList'

interface SlugPageProps {
  params: {
    slug: string
    lng: string
  }
}

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
  
  // Debug logging
  console.log('GraphQL Response:', data)
  
  // Check for GraphQL errors
  if (data.errors) {
    console.error('GraphQL Errors:', data.errors)
    throw new Error(`GraphQL errors: ${JSON.stringify(data.errors)}`)
  }
  
  // Check if data exists
  if (!data.data) {
    console.error('No data field in response:', data)
    throw new Error('No data field in GraphQL response')
  }
  
  // Check if allArtwork exists
  if (!data.data.allArtwork) {
    console.error('No allArtwork field in response:', data.data)
    throw new Error('No allArtwork field in GraphQL response')
  }
  
  return data.data.allArtwork.nodes
}

const SlugPage = async ({ params: { slug, lng } }: SlugPageProps) => {
  const artworks = await getArtwork()

  return (
    <div className="slug-container">
      <Logo lng={lng} />
      <Nav lng={lng} />
      <ArtworkList artworks={artworks} lng={lng} slug={slug}/>
    </div>
  )
}

export default SlugPage