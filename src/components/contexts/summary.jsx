import React from 'react';

export const SummaryContext = React.createContext({
  isPlan: true,
  oneTimeBuy: true,
  products: [],
  stages: [],
  designs: [],
  date: undefined,
  frequency: undefined,
  changePlan: undefined,
  changeOneTimeBuy: undefined,
  changeProducts: undefined,
  changeStages: undefined,
  changeDesigns: undefined,
  changeDate: undefined,
  changeFrequency: undefined,
  clear: {
    all: undefined,
    stages: undefined,
    designs: undefined,
    products: undefined,
    date: undefined,
    frequency: undefined,
  },
});
