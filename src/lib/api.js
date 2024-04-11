const API_URL = process.env.NEXT_PUBLIC_WORDPRESS_BASE_URL;

async function fetchAPI(query, { variables } = {}) {
  // console.log("API: ", API_URL);
  const headers = { "Content-Type": "application/json" };

  const res = await fetch(API_URL, {
    method: "POST",
    headers,
    body: JSON.stringify({ query, variables }),
  });

  const json = await res.json();

  if (json.errors) {
    console.log(json.errors);
    console.log("error details", query, variables);
    throw new Error("Failed to fetch API");
  }

  // console.log("get data: ", json.data);

  return json.data;
}

export async function getFullArtworkProps(theId) {
  console.log("in get full: ", theId);

  const fullArtworkData = await fetchAPI(
    `
      query FullArtworkQuery($artId: ID!) {
        artwork(id: $artId) {
          artworkFields {
            artworklink {
              target
              title
              url
            }
            city
            extraimages
            forsale
            height
            lat
            lng
            medium
            metadescription
            metakeywords
            orientation
            performance
            proportion
            series
            size
            width
            year
            country
            style
          }
          content(format: RENDERED)
          date
          slug
          title(format: RENDERED)
        }
      }
    `,
    {
      variables: {
        artId: theId,
      },
    }
  );

  return fullArtworkData;
}

export async function getStaticArtworkPaths() {
  console.log("get paths")
  const pathsData = await fetchAPI(
    `
      query ArtworkStaticQuery {
        allArtwork(first: 1000) {
          nodes {
            id
            slug
          }
        }
      }
    `
  );

  console.log(pathsData)

  return pathsData;
}

// export async function getAllData() {
//   console.log("getting data");
//   const data = await fetchAPI(
//     `
//         query WPQuery {
//             pages {
//                 edges {
//                   node {
//                     content(format: RENDERED)
//                     slug
//                   }
//                 }
//               }
//               cVEntries {
//                 nodes {
//                   cv {
//                     birthCity
//                     birthYear
//                     category
//                     city
//                     direction
//                     gallery
//                     link1 {
//                       url
//                       title
//                     }
//                     link2 {
//                       title
//                       url
//                     }
//                     link3 {
//                       title
//                       url
//                     }
//                     link4 {
//                       title
//                       url
//                     }
//                     year
//                     workCity2
//                     workCity1
//                     title
//                     school
//                     notes
//                     name
//                   }
//                   date
//                 }
//               }
//               artworks {
//                 nodes {
//                   artwork {
//                     coordinates
//                     coordinatesDigits
//                     density
//                     elevation
//                     extraImages
//                     fieldGroupName
//                     height
//                     orientation
//                     population
//                     proportion
//                     series
//                     width
//                   }
//                   slug
//                   title
//                 }
//               }
//           }
//         `
//   );

//   return data;
// }

export async function getIndexData() {
  console.log("get index data")
  const artData = await fetchAPI(
    `
      query IndexQuery {
        allArtwork(first: 1000) {
          nodes {
          artworkFields {
            artworklink {
                    target
                    title
                    url
                  }
                  city
                  extraimages
                  forsale
                  height
                  lat
                  lng
                  medium
                  metadescription
                  metakeywords
                  orientation
                  performance
                  proportion
                  series
                  size
                  slug
                  style
                  width
                  year
                }
                content(format: RENDERED)
                date
                title(format: RENDERED)
                uri
                slug
              }
            }
        artistInfo(id: "cG9zdDozNQ==") {
          artistInfo {
            birthcity
            birthyear
            link1 {
              title
              url
            }
            link2 {
              title
              url
            }
            link3 {
              title
              url
            }
            link4 {
              title
              url
            }
            link5 {
              title
              url
            }
            workcity1
            workcity2
            workcity3
            name
          }
        }
      }
    `
  );

  console.log(artData);

  return artData;
}

export async function getBioData() {
  console.log("get bio")
  const bioData = await fetchAPI(
    `
      query BioQuery {
        page(id: "cG9zdDo1MQ==") {
          content(format: RENDERED)
        }
        artistInfo(id: "cG9zdDozNQ==") {
          artistInfo {
            birthcity
            birthyear
            link1 {
              title
              url
            }
            link2 {
              title
              url
            }
            link3 {
              title
              url
            }
            link4 {
              title
              url
            }
            link5 {
              title
              url
            }
            name
            workcity1
            workcity2
            workcity3
          }
        }
      } 
    `
  );

  return bioData;
}

export async function getCVData() {
  console.log("get CV")
  const cvData = await fetchAPI(
    `
      query CVQuery {
        cvinfos(first:1000) {
          nodes {
            cv_info_fields {
              city
              gallery
              role
              school
              section
              title
              year
            }
          }
        }
        artistInfo(id: "cG9zdDozNQ==") {
          artistInfo {
            birthcity
            birthyear
            link1 {
              title
              url
            }
            link2 {
              title
              url
            }
            link3 {
              title
              url
            }
            link4 {
              title
              url
            }
            link5 {
              title
              url
            }
            name
            workcity1
            workcity2
            workcity3
          }
        }
      }
    `
  );

  return cvData;
}

export async function getStatementData() {
  console.log("get statement")
  const statementData = await fetchAPI(
    `
      query BioQuery {
          page(id: "cG9zdDo1Mw==") {
            content
          }
          artistInfo(id: "cG9zdDozNQ==") {
            artistInfo {
              birthcity
              birthyear
              link1 {
                title
                url
              }
              link2 {
                title
                url
              }
              link3 {
                title
                url
              }
              link4 {
                title
                url
              }
              link5 {
                title
                url
              }
              name
              workcity1
              workcity2
              workcity3
            }
          }
        }
      `
  );

  return statementData;
}
