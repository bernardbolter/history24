import { gql } from "graphql-request"

export const getAllArtwork = `
    query getAllArtwork {
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
`