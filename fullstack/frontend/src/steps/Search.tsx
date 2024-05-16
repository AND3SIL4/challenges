import { useEffect, useState } from "react";
import { Data } from "../types";
import { toast } from "sonner";
import { searchFile } from "../services/search.ts";

export const Search = ({ initialData }: { initialData: Data }) => {
  const [data, setData] = useState<Data>(initialData);
  const [search, setSearch] = useState<string>("");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  //Use initial hook
  useEffect(() => {
    const newPathName =
      search === "" ? window.location.pathname : `?q=${search}`;
    window.history.pushState({}, "", newPathName);
  }, [search]);

  // llamar a la api para filtrar los estados
  useEffect(() => {
    if (!search) {
      setData(initialData);
      return;
    }
    //Call Api
    searchFile(search).then((response) => {
      const [err, newData] = response;
      if (err) {
        toast.error(err.message);
        return;
      }
      if (newData) setData(newData);
    });
  }, [search, initialData]);

  return (
    <>
      <form>
        <input
          onChange={handleSearch}
          type="search"
          placeholder="Buscar información..."
        />
      </form>
      <ul>
        {data.map((row, index) => (
          <li key={index}>
            <article>
              {Object.entries(row).map(([key, value]) => (
                <p key={key}>
                  <strong>{key}: </strong>
                  <strong>{value}</strong>
                </p>
              ))}
            </article>
          </li>
        ))}
      </ul>
    </>
  );
};
