import React from 'react';
import { StepsContext } from '../contexts/steps';
import * as C from '../../constants';
import { SummaryContext } from '../contexts/summary';

export const StepsProvider = ({ children }: Props) => {
  const [prevSteps, setPrevSteps] = React.useState([]);
  const [currStep, setCurrStep] = React.useState(C.TYPE);
  const { isPlan, oneTimeBuy, products, stages, designs, date, frequency, clear } = React.useContext(SummaryContext);

  const goToStep = (value) => {
    setPrevSteps([currStep, ...prevSteps]);
    setCurrStep(value);
  }

  const goToPrev = () => {
    const [last, ...rest] = prevSteps; 
    switch(currStep) {
      case C.STAGE:
        clear.stages();
        break;
      case C.DESIGN:
        clear.designs();
        break;
      case C.PRODUCTS:
      case C.PRODUCTS_PURE:
        clear.products();
        break;
      case C.FREQUENCY:
        clear.frequency();
        clear.date();
        break;
      default:
        break;
    }
    if (last) {
      setCurrStep(last);
      setPrevSteps(rest);
    }
  }

  const goToNext = () => {
    if (canGoToNext()) {
      if (isPlan) {
        switch(currStep) {
          case C.STAGE:
            goToStep(C.DESIGN);
            break;
          case C.DESIGN:
            goToStep(C.PRODUCTS_PURE);
            break;
          case C.PRODUCTS_PURE:
            goToStep(C.FREQUENCY);
            break;
          case C.FREQUENCY:
            goToStep(C.LOGIN);
            break;
          case C.LOGIN:
            goToStep(C.PAYMENT);
            break;
          case C.PAYMENT:
            goToStep(C.CONGRATS);
            break;
          default: 
            break;
        }
      } else {
        switch(currStep) {
          case C.PRODUCTS:
            const hasDiapers = products.some(({ isDiaper }) => isDiaper);
            if (hasDiapers) goToStep(C.STAGE);
            else goToStep(C.LOGIN);
            break;
          case C.STAGE:
            goToStep(C.DESIGN);
            break;
          case C.DESIGN:
            goToStep(!oneTimeBuy ? C.FREQUENCY : C.LOGIN);
            break;
          case C.FREQUENCY:
            goToStep(C.LOGIN);
            break;
          case C.LOGIN:
            goToStep(C.PAYMENT);
            break;
          case C.PAYMENT:
            goToStep(C.CONGRATS);
            break;
          default: 
            break;
        }
      }
    }
  }

  const canGoToNext = () => {
    let canDo = false;
    switch(currStep) {
      case C.TYPE:
        canDo = true;
        break;
      case C.STAGE:
        const stageTotal = stages.reduce((prev, curr) => (prev + curr.amount), 0);
        const stageOnLimit = isPlan 
          ? stageTotal === C.PLAN_STAGES_LIMIT 
          : stageTotal === products.filter(({isDiaper}) => isDiaper).reduce((prev, curr) => (prev + curr.amount), 0);
        canDo = stages.length && stageOnLimit;
        break;
      case C.DESIGN:
        const designTotal = designs.reduce((prev, curr) => (prev + curr.amount), 0);
        const designLimit = isPlan ? C.PLAN_STAGES_LIMIT : stages.reduce((prev, curr) => (prev + curr.amount), 0);
        const designOnLimit = designTotal === designLimit;
        canDo = designs.length && designOnLimit;
        break;
      case C.PRODUCTS:
        canDo = products.length > 0;
        break;
      case C.PRODUCTS_PURE:
        canDo = true;
        break;
      case C.FREQUENCY:
        canDo = frequency && date && true;
        break;
      case C.LOGIN:
      case C.PAYMENT:
        canDo = true;
        break;
      default:
        canDo = false;
        break;
    }
    return canDo;
  }

  return (
    <StepsContext.Provider
      value={{
        prevSteps,
        currStep,
        canGoToNext,
        goToPrev,
        goToNext,
        goToStep,
      }}
    >
      {children}
    </StepsContext.Provider>
  );
}