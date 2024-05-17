import { useEffect, useState } from "react";
import { Data } from "../types";
import { toast } from "sonner";
import { useDebounce } from "@uidotdev/usehooks";
import { searchFile } from "../services/search.ts";
import "../styles/Search.css";

const DEBOUNDTIMER = 200;

export const Search = ({ initialData }: { initialData: Data }) => {
  const [data, setData] = useState<Data>(initialData);
  const [search, setSearch] = useState<string>(() => {
    const searchParam = new URLSearchParams(window.location.pathname);
    return searchParam.get("q") ?? "";
  });

  const deboundSearch = useDebounce(search, DEBOUNDTIMER);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  //Use initial hook
  useEffect(() => {
    const newPathName =
      deboundSearch === "" ? window.location.pathname : `?q=${deboundSearch}`;
    window.history.pushState({}, "", newPathName);
  }, [deboundSearch]);

  // llamar a la api para filtrar los estados
  useEffect(() => {
    if (!deboundSearch) {
      setData(initialData);
      return;
    }
    //Call Api
    searchFile(deboundSearch).then((response) => {
      const [err, newData] = response;
      if (err) {
        toast.error(err.message);
        return;
      }
      if (newData) setData(newData);
    });
  }, [deboundSearch, initialData]);

  return (
    <>
      <form>
        <input
          id="input-text"
          onChange={handleSearch}
          type="search"
          placeholder="Buscar información..."
          defaultValue={search}
        />
      </form>
      <ul>
        {data.map((row) => (
          <li key={row.id}>
            <table>
              <tr>
                {Object.keys(row).map((key) => (
                  <th key={key}>{key}</th>
                ))}
              </tr>
              <tr>
                {Object.values(row).map((value) => (
                  <td>{value}</td>
                ))}
              </tr>
            </table>
          </li>
        ))}
      </ul>
    </>
  );
};
