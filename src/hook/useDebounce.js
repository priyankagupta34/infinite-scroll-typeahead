import { useEffect, useState } from "react";

function useDebounce(search) {
  const [query, setQuery] = useState("");
  useEffect(() => {
    let timeout;
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      setQuery(search);
    }, 500);

    return () => clearTimeout(timeout);
  }, [search]);
  return query;
}
export default useDebounce;
