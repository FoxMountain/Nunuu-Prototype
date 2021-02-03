import React from 'react';

export const StepsContext = React.createContext({
  prevSteps: [],
  currStep: '',
  canGoToNext: undefined,
  goToPrev: undefined,
  goToNext: undefined,
  goToStep: undefined,
});
