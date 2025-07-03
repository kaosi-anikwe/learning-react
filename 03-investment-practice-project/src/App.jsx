import { useState } from "react";
import Results from "./components/Results";
import UserInputs from "./components/UserInputs";
import Header from "./components/Header";

function App() {
  const [investmentParams, setInvestmentParams] = useState({
    initialInvestment: 15000,
    annualInvestment: 1200,
    expectedReturn: 6,
    duration: 10,
  });

  const isvalidInput = investmentParams.duration >= 1;

  function handleParamsEdit(param, value) {
    setInvestmentParams((prevParams) => {
      return { ...prevParams, [param]: +value };
    });
  }

  return (
    <>
      <Header />
      <UserInputs params={investmentParams} onChange={handleParamsEdit} />
      {!isvalidInput && (
        <p className="center">Please enter a duration greater than zero.</p>
      )}
      {isvalidInput && <Results params={investmentParams} />}
    </>
  );
}

export default App;
