import { useState } from 'react';
import Header from "./components/Header/Header";
import UserInput3 from "./components/UserInput/UserInput3";
import UserInput4 from "./components/UserInput/UserInput4";
import ResultTable from "./components/ResultTable/ResultTable";

const App = () => {
  // State for UserInput3
  const [userInput3, setUserInput3] = useState({
    retirementGoal: 20000,
    inflationAdjustment: 4,
    currentAge: 30,
    fromAge: 65,
    toAge: 85,
    postRetirementReturn: 4
  });

  // State for UserInput4
  const [userInput4, setUserInput4] = useState({
    monthlySavings: { stock: 0, mpf: 3000, other: 0, extra: 11709 },
    existingAssets: { stock: 200000, mpf: 300000, other: 300000, extra: 0 },
    expectedReturn: { stock: 5, mpf: 5, other: 0.1, extra: 5 }
  });

  const calculateHandler = () => {
    // Combine and process inputs from both forms
    const combinedInputs = {
      ...userInput3,
      ...userInput4,
      duration: userInput3.toAge - userInput3.fromAge
    };
    console.log('All inputs:', combinedInputs);
    // Add your calculation logic here
  };

  return (
    <div className="main-app">
      <style>{`
        .main-app {
          max-width: 1600px;
          margin: 0 auto;
          padding: 20px;
          font-family: 'Segoe UI', sans-serif;
        }
        
        .input-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(600px, 1fr));
          gap: 30px;
          margin: 2rem 0;
        }
        
        @media (max-width: 768px) {
          .input-container {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
      <Header />
      
      <div className="input-container">
        <UserInput3 
          inputs={userInput3}
          setInputs={setUserInput3}
          onCalculate={calculateHandler}
        />
        <UserInput4 
          inputs={userInput4}
          setInputs={setUserInput4}
          onCalculate={calculateHandler}
        />
      </div>
      <ResultTable />
    </div>
  );
};

export default App;