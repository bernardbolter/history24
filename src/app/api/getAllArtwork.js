export const getArtworks = () => {
    fetch("https://digitalcityseries.com/bolter/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
        next: {next: { revalidate: 10 }}
      })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
      })
      .catch(error => console.log(error))
}