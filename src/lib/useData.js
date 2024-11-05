"use client"

import useSWR from "swr"

const fetcher = query => request(process.env.NEXT_PUBLIC_WORDPRESS_BASE_URL, query)

function useArtworks () {
    const { data, error, isLoaded } = useSWR(
        `
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
                featuredImage {
                    node {
                    sizes
                    srcSet
                    sourceUrl
                    uri
                    }
                }
                }
            }
            }
        `,
        fetcher
    )
}