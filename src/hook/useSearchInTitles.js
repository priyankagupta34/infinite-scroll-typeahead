import { useEffect, useState } from "react";

function useSearchInTitles(books, search) {
  const [item, setItems] = useState([]);
  useEffect(() => {
    if (!search) {
      setItems([]);
      return;
    }
    const regex = new RegExp(search, "i");
    const found = books.filter((val) => val.title.search(regex) !== -1);
    setItems(found.map((i) => i.title));
  }, [books, search]);
  return item;
}
export default useSearchInTitles;
