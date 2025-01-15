import { useCallback, useRef, useState } from "react";
import useFetchBookInfiniteQuery from "../../hook/useFetchBookInfiniteQuery";
import SearchComponent from "../search/SearchComponent";

function DashboardComponent() {
  const [page, setPage] = useState(1);
  const ref = useRef();
  const { items, hasMore, load } = useFetchBookInfiniteQuery(page);
  const interectionObserver = useCallback(
    (node) => {
      if (ref.current) {
        ref.current.disconnect();
      }
      ref.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prev) => prev + 1);
        }
      });
      if (node) ref.current.observe(node);
    },
    [hasMore]
  );

  return (
    <div className="container">
      <SearchComponent items={items} />

      <div className="details">
        {items.map((item, index) => {
          if (items.length - 1 === index) {
            return (
              <div key={item.id} ref={interectionObserver} className="book">
                <div className="bookId">{item.id}</div>
                <div className="bookName">{item.title}</div>
              </div>
            );
          }
          return (
            <div key={item.id} className="book">
              <div className="bookId">{item.id}</div>
              <div className="bookName">{item.title}</div>
            </div>
          );
        })}
      </div>
      {load ? (
        <div className="load">
          <div className="inload" />
        </div>
      ) : null}
    </div>
  );
}

export default DashboardComponent;
