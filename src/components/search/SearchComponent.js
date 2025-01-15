import { useState } from "react";
import useSearchInTitles from "../../hook/useSearchInTitles";
import useDebounce from "../../hook/useDebounce";

function SearchComponent({ items }) {
  const [search, setSearch] = useState("");
  const [show, setShow] = useState(false);
  const debouncedSearch = useDebounce(search);
  const filteredItems = useSearchInTitles(items, debouncedSearch);
  const highlightMatch = (text, query) => {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, "i");
    const list = text.split(regex);
    return list.map((item, index) =>
      regex.test(item) ? (
        <span style={{ backgroundColor: "yellow" }} key={index}>
          {item}
        </span>
      ) : (
        item
      )
    );
  };
  const clickItem = (event, val) => {
    console.log("val", val);
  };
  return (
    <div className="header">
      <h1>Infinite</h1>
      <div className="search">
        <input
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setShow(true);
          }}
          onFocus={() => setShow(true)}
          onBlur={() => setShow(false)}
        />
        <div className="typeahead">
          {show &&
            filteredItems.map((val, i) => (
              <div key={val + i} onMouseDown={(e) => clickItem(e, val)}>
                {highlightMatch(val, search)}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default SearchComponent;
