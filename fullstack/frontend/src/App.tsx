import { useState } from "react";
import "./App.css";
import { uploadFile } from "./services/upload";
import { Toaster, toast } from "sonner";
import { type Data } from "./types";
import { Search } from "./steps/Search";

const APP_STATUS = {
  IDLE: "idle",
  ERROR: "error",
  READY_UPLOAD: "ready_upload",
  UPLOADING: "uploading",
  READY_USAGE: "ready_usage",
} as const;

//Make a type to set the initial state
type appStatusType = (typeof APP_STATUS)[keyof typeof APP_STATUS];

const TEXT_STATUS = {
  [APP_STATUS.READY_UPLOAD]: "Subir archivo",
  [APP_STATUS.UPLOADING]: "Cargando archivo...",
};

function App() {
  //Manager status
  const [appStatus, setAppStatus] = useState<appStatusType>(APP_STATUS.IDLE);
  const [file, setFile] = useState<File | null>(null);
  const [data, setData] = useState<Data>([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const [file] = event.target.files ?? [];
    if (file) {
      setFile(file);
      setAppStatus(APP_STATUS.READY_UPLOAD);
    }
  };

  const handleSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    //Validate the status before send
    if (appStatus !== APP_STATUS.READY_UPLOAD || !file) {
      return;
    }

    setAppStatus(APP_STATUS.UPLOADING);

    const [err, newData] = await uploadFile(file);

    if (err) {
      setAppStatus(APP_STATUS.ERROR);
      toast.error(err.message);
      return;
    }

    if (newData) {
      setAppStatus(APP_STATUS.READY_USAGE);
      setData(newData);
      toast.success("El archivo se cargo correctamente");
      return;
    }
  };

  const showButton =
    appStatus === APP_STATUS.READY_UPLOAD || appStatus === APP_STATUS.UPLOADING;

  const showForm = appStatus !== APP_STATUS.READY_USAGE;

  return (
    <>
      <Toaster />
      <h1>Upload CSV + search </h1>
      {showForm && (
        <form onSubmit={handleSubmit}>
          <label htmlFor="load-file">Cargar archivo</label>
          <input
            id="load-file"
            disabled={appStatus === APP_STATUS.UPLOADING}
            name="file"
            onChange={handleInputChange}
            type="file"
            accept=".csv"
          />
          {showButton && (
            <button disabled={appStatus === APP_STATUS.UPLOADING}>
              {TEXT_STATUS[appStatus]}
            </button>
          )}
        </form>
      )}
      {appStatus === APP_STATUS.READY_USAGE && <Search initialData={data} />}
    </>
  );
}

export default App;
