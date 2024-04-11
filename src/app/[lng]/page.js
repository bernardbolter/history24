import { useTranslation } from '../i18n'

import Artworks from '@/components/Artworks'
import Nav from '@/components/Nav'
import Logo from '@/components/Logo'


const Home = async ({ params: { lng} }) => {
  const { t } = await useTranslation(lng, 'common')
  const { data } = await fetch(process.env.NEXT_PUBLIC_WORDPRESS_BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
        query ColorQuery {
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
      `,
    }),
    next: { revalidate: 10 },
  }).then((res) => res.json());

  let artworks = data.allArtwork?.nodes

  return (
    <section className="home-container">
      <Nav lng={lng} />
      <Logo lng={lng} />
      <Artworks 
        artworks={artworks} 
        lng={lng}  
      />
    </section>
  )
}

export default Home