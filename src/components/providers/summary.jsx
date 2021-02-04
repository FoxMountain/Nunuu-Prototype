import React from 'react';
import { SummaryContext } from '../contexts/summary';
import * as C from '../../constants';

export const SummaryProvider = ({ children }: Props) => {
  const [isPlan, setPlan] = React.useState(true);
  const [oneTimeBuy, setOneTimeBuy] = React.useState(false);
  const [products, setProducts] = React.useState([]);
  const [stages, setStages] = React.useState([]);
  const [designs, setDesigns] = React.useState([]);
  const [date, setDate] = React.useState();
  const [frequency, setFrequency] = React.useState(2);

  const changePlan = (value) => {
    setPlan(value);
  }

  const changeOneTimeBuy = (value) => {
    setOneTimeBuy(!oneTimeBuy);
  }

  const changeProducts = (product, amount) => {
    if (amount < 0) return;

    const productsTemp = [...products];
    const index = productsTemp.findIndex(({id}) => id === product.id);
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
    if (amount < 0) return;
    if (unique) {
      const stagesTemp = [];
      stagesTemp.push({...stage, amount});
      setStages(stagesTemp);
    } else {
      const stagesTemp = [...stages];
      const index = stagesTemp.findIndex(({id}) => id === stage.id);
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
        }, index >= 0 ? 0 : amount);
        const limit = isPlan
          ? C.PLAN_STAGES_LIMIT
          : products.filter(({isDiaper}) => isDiaper).reduce((prev, curr) => (prev + curr.amount), 0);

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

  const changeDesigns = (stageID, designID, amount, unique = false) => {
    if (amount < 0) return;
    if (unique) {
      const designsTemp = designs.filter(({ stageID: stx }) => stx !== stageID);
      designsTemp.push({ stageID, designID, amount });
      setDesigns(designsTemp);
    } else {
      const designsTemp = [...designs];
      const index = designsTemp.findIndex(
        ({ stageID: stx, designID: dex }) => stx === stageID && dex === designID);
      if (amount === 0) {
        if (index >= 0) {
          designsTemp.splice(index, 1);
          setDesigns(designsTemp);
        } else {
          console.log('NO INDEX TO REMOVE');
        }
      } else {
        const total = designsTemp.filter((des) => (
          des.stageID === stageID
        )).reduce((prev, curr) => {
          return curr.stageID === stageID && curr.designID === designID
            ? prev + amount
            : prev + curr.amount
        }, index >= 0 ? 0 : amount);
        const limit = stages.filter((st) => (
          st.id === stageID
        )).reduce((prev, curr) => prev + curr.amount, 0);

        if (total <= limit) {
          if (index >= 0) {
            designsTemp[index].amount = amount;
            setDesigns(designsTemp)
          } else {
            designsTemp.push({stageID, designID, amount});
            setDesigns(designsTemp.sort((a, b) => a.stageID - b.stageID));
          }
        }
      }
    }
  }

  const changeDate = (value) => {
    setDate(value);
  }

  const changeFrequency = (value) => {
    setFrequency(value);
  }

  const clearAll = () => {
    setPlan(true);
    setOneTimeBuy(false);
    setProducts([]);
    setStages([]);
    setDesigns([]);
    setDate(undefined);
    setFrequency(2);
  }

  return (
    <SummaryContext.Provider
      value={{
        isPlan,
        oneTimeBuy,
        products,
        stages,
        designs,
        date,
        frequency,
        changePlan,
        changeOneTimeBuy,
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
          frequency: () => setFrequency(2),
        },
      }}
    >
      {children}
    </SummaryContext.Provider>
  );
};
