import React from 'react';
import { Header } from './components/header';
import { Content } from './components/content';
import { SummaryProvider } from './components/providers/summary';
import { StepsProvider } from './components/providers/steps';
import * as C from './constants';
import './Default.css';
import './App.css';

function App() {
  return (
    <SummaryProvider>
      <StepsProvider>
        <Header />
        <Content />
      </StepsProvider>
    </SummaryProvider>
  );
}

export default App;
