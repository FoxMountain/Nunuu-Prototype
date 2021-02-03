import React from 'react';
import { SummaryContext } from '../contexts/summary';
import * as C from '../../constants';

export const SummaryProvider = ({ children }: Props) => {
  const [isPlan, setPlan] = React.useState(true);
  const [products, setProducts] = React.useState([]);
  const [stages, setStages] = React.useState([]);
  const [designs, setDesigns] = React.useState([]);
  const [date, setDate] = React.useState();
  const [frequency, setFrequency] = React.useState();

  const changePlan = (value) => {
    setPlan(value);
  }

  const changeProducts = (product, amount) => {
    const productsTemp = [...products];
    const index = productsTemp.findIndex(({id}) => id === product.id);
    if (amount < 0) return;
    if (amount === 0) {
      if (index >= 0) {
        productsTemp.splice(index, 1);
        setProducts(productsTemp);
      } else {
        console.log('NO INDEX TO REMOVE');
      }
    } else {
      if (index >= 0) {
        productsTemp[index].amount = amount;
        setProducts(productsTemp);
      } else {
        productsTemp.push({...product, amount});
        setProducts(productsTemp.sort((a, b) => a.id - b.id));
      }
    }
  }

  const changeStages = (stage, amount, unique = false) => {
    console.log(amount);
    if (unique) {
      const stagesTemp = [];
      stagesTemp.push({...stage, amount});
      setStages(stagesTemp);
    } else {
      const stagesTemp = [...stages];
      const index = stagesTemp.findIndex(({id}) => id === stage.id);
      if (amount < 0) return;
      if (amount === 0) {
        if (index >= 0) {
          stagesTemp.splice(index, 1);
          setStages(stagesTemp);
        } else {
          console.log('NO INDEX TO REMOVE');
        }
      } else {
        const total = stagesTemp.reduce((prev, curr) => {
          return curr.id === stage.id
            ? prev + amount
            : prev + curr.amount
        }, 0);
        const limit = isPlan
          ? C.PLAN_STAGES_LIMIT
          : products.filter(({isStage}) => isStage).reduce((prev, curr) => (prev + curr.amount), 0);

        if (total <= limit) {
          if (index >= 0) {
            stagesTemp[index].amount = amount;
            setStages(stagesTemp)
          } else {
            stagesTemp.push({...stage, amount});
            setStages(stagesTemp.sort((a, b) => a.id - b.id));
          }
        }
      }
    }
  }

  const changeDesigns = (stageID, design, amount) => {

  }

  const changeDate = (value) => {
    setDate(value);
  }

  const changeFrequency = (value) => {
    setFrequency(value);
  }

  const clearAll = () => {
    setPlan(true);
    setProducts([]);
    setStages([]);
    setDesigns([]);
    setDate(undefined);
    setFrequency(undefined);
  }

  return (
    <SummaryContext.Provider
      value={{
        isPlan,
        products,
        stages,
        designs,
        date,
        frequency,
        changePlan,
        changeProducts,
        changeStages,
        changeDesigns,
        changeDate,
        changeFrequency,
        clear: {
          all: clearAll,
          stages: () => setStages([]),
          designs: () => setDesigns([]),
          products: () => setProducts([]),
          date: () => setDate(undefined),
          frequency: () => setFrequency(undefined),
        },
      }}
    >
      {children}
    </SummaryContext.Provider>
  );
};
