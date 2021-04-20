import * as React from "react";
import "./Search.styles.css";

interface SearchProps {
  search: string;
  datalist: string[];
  onChange: (e: any) => void;
}

const Search: React.FunctionComponent<SearchProps> = ({
  search,
  datalist,
  onChange,
}) => {
  return (
    <div className="Search">
      <input
        id="search"
        list="users"
        name="search"
        className="search"
        type="text"
        value={search}
        onChange={onChange}
        placeholder="Search..."
      />
      <datalist id="users">
        {datalist.map((username, i) => {
          return <option key={i} value={username} />;
        })}
      </datalist>
    </div>
  );
};

export { Search };
