import React from 'react';
import { Header } from './components/header';
import { Content } from './components/content';
import * as C from './constants';
import './Default.css';
import './App.css';

function App() {
  const [prevSteps, setPrevSteps] = React.useState([]);
  const [currStep, setCurrStep] = React.useState(C.TYPE);
  const [summary, setSummary] = React.useState({
    isPlan: true,
    products: [],
    stages: [],
    designs: [],
  });

  const { isPlan } = summary;

  const goToNext = (nextStep) => {
    setPrevSteps([currStep, ...prevSteps]);
    setCurrStep(nextStep);
  };

  const goToPrevious = () => {
    const [last, ...rest] = prevSteps; 
    if (last) {
      setCurrStep(last);
      setPrevSteps(rest);
    }
  }

  const clear = () => {
    setSummary({
      isPlan: true,
      products: [],
      stages: [],
      designs: [],
    });
  };

  return (
    <>
      <Header step={currStep} isPlan={isPlan} />
      <Content 
        clear={clear}
        summary={summary}
        setSummary={setSummary}
        step={currStep}
        goToNext={goToNext}
        goToPrevious={goToPrevious}
      />
    </>
  );
}

export default App;
