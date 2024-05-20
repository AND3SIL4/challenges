import { Toaster, toast } from "sonner";
import "./styles/App.css";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";

const APP_STATUS = {
  IDLE: "idle",
  LOADING: "loading",
  SUCCESS: "success",
  ERROR: "error",
  AMOUNT_SELECTED: "amount-selected",
};
//Types for idle app status
type InputsIdleStatus = {
  amountInputs: number;
  amountDecimals: number;
};
//Types for amountSelected app status
type InputsAmountSelected = {
  data: number[];
};

function App() {
  //Manage the app status
  const [appStatus, setAppStatus] = useState(APP_STATUS.IDLE);
  const [amountInputs, setAmountInputs] = useState(0);
  const [decimals, setDecimals] = useState(0);
  const [dataToBeCalculate, setDataToBeCalculate] = useState<number[]>([]);

  //To manage the form fields and data in amountSelected status
  const { register: registerIdle, handleSubmit: handleIdle } =
    useForm<InputsIdleStatus>();
  const onSubmitIdleData: SubmitHandler<InputsIdleStatus> = (data) => {
    const { amountDecimals, amountInputs } = data;
    setAmountInputs(amountInputs);
    setDecimals(amountDecimals);
    setAppStatus(APP_STATUS.AMOUNT_SELECTED);
    toast.info("Datos configurados correctamente");
  };

  //TODO: Set initial values for the using useEffect

  //To manage the form fields and data in idle status
  const {
    register: registerReadyCalculate,
    handleSubmit: handleReadyCalculate,
  } = useForm<InputsAmountSelected>();
  const onSubmitToCalculate: SubmitHandler<InputsAmountSelected> = (data) => {
    setDataToBeCalculate(data.data);
    toast.info("Información registrada correctamente");
    setAppStatus(APP_STATUS.LOADING);
  };

  //*Main function to render the app depending on the app status
  const renderApp = () => {
    switch (appStatus) {
      case APP_STATUS.IDLE:
        return (
          <form onSubmit={handleIdle(onSubmitIdleData)}>
            <h2>
              Antes de comenzar necesitamos algunos datos previos para poder
              realizar los cálculos
            </h2>
            {/* Form manager of the idle status */}
            <label htmlFor="amount-inputs">Cantidad de datos</label>
            <input
              type="number"
              id="amount-inputs"
              {...registerIdle("amountInputs", { valueAsNumber: true })}
              placeholder="Escriba solo números"
              required
            />
            <label htmlFor="amount-inputs">Número de decimales</label>
            <input
              type="number"
              id="amount-inputs"
              {...registerIdle("amountDecimals", { valueAsNumber: true })}
              placeholder="Escriba solo números"
              required
            />
            <button className="button" type="submit">
              Ingresar datos
            </button>
          </form>
        );
      case APP_STATUS.AMOUNT_SELECTED:
        return (
          <form onSubmit={handleReadyCalculate(onSubmitToCalculate)}>
            {/* Form manager of the main calculate */}
            {/* Render the HTML element depends on the value of `amountInputs` */}
            {[...Array(amountInputs)].map((_, index) => (
              <input
                key={index}
                type="number"
                placeholder={`Dato ${index + 1} (solo números)`}
                {...registerReadyCalculate(`data.${index}`, {
                  valueAsNumber: true,
                })}
                required
              />
            ))}

            <button className="button" type="submit">
              Hacer cálculos
            </button>
          </form>
        );
      case APP_STATUS.LOADING:
        return <h2>Cargando resultados...</h2>;
      case APP_STATUS.SUCCESS:
        return (
          <>
            <h2>Resultados</h2>
          </>
        );
      case APP_STATUS.ERROR:
        return <h2>There was an error processing your request.</h2>;
      default:
        return (
          <h2>
            Ocurrió un error desconocido, por favor comuníquese con el
            administrador
          </h2>
        );
    }
  };
  return (
    <div className="container-app">
      <Toaster position="bottom-center" expand={false} richColors />
      <h1>Cálculos químicos</h1>
      {renderApp()}
      {/* TODO: 
        - GET DATA
        - CALCULATE THE AVERAGE
        - CALCULATE STANDARD DEVIATION
        - CALCULATE RSD */}
    </div>
  );
}

export default App;
