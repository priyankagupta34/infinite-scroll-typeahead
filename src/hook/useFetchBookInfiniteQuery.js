import { useEffect, useState } from "react";

function useFetchBookInfiniteQuery(page) {
  const [items, setBooks] = useState([]);
  const [load, setLoad] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  useEffect(() => {
    const url = `https://jsonplaceholder.typicode.com/photos?${new URLSearchParams(
      {
        _page: page,
        limit: 30,
      }
    ).toString()}`;
    console.log("URL", url);

    fetchData();
    async function fetchData() {
      setLoad(true);
      const json = await fetch(url);
      const response = await json.json();
      setHasMore(response.length !== 0 && response.at(-1).id <= 1000);
      setBooks((prev) => [...prev, ...response]);
      setLoad(false);
    }
  }, [page]);
  return { items, hasMore, load };
}

export default useFetchBookInfiniteQuery;
