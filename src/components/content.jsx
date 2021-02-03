import React from 'react';
import * as C from '../constants';
import { Type } from './elements/type';
import { Products } from './elements/products';
import { Stages } from './elements/stages';
import { Designs } from './elements/designs';
import { Frequency } from './elements/frequency';
import { Login } from './elements/login';
import { Payment } from './elements/payment';
import { Congratulations } from './elements/congrats';
import { Resume } from './resume';

const TabWrap = ({ resume, children, summary, nextStep, previousStep }) => (
  <div className="process-container main">
    <div className="container-slim">
      <div className="row">
        <div className="process-content">
          <div className="w-tabs">
            <div className="w-tab-content">
              { children }
            </div>
          </div>
        </div>
        { resume() }
      </div>
    </div>
  </div>
)

export const Content = ({ clear, summary, setSummary, step, goToNext, goToPrevious }) => {
  let resume = null;
  
  switch(step) {
    case C.TYPE:
      return (
        <Type goToNext={goToNext} summary={summary} setSummary={setSummary} />
      );  
    case C.PRODUCTS:
      resume = () => <Resume summary={summary} nextStep={() => goToNext(C.LOGIN)} />;
      return (
        <TabWrap resume={ resume }>
          <Products clear={clear} summary={summary} setSummary={setSummary} goToPrevious={goToPrevious} />
        </TabWrap>
      );
    case C.STAGE:
      resume = () => <Resume summary={summary} nextStep={() => goToNext(C.DESIGN)} />;
      return (
        <TabWrap resume={ resume }>
          <Stages clear={clear} summary={summary} setSummary={setSummary} goToPrevious={goToPrevious} />
        </TabWrap>
      );
    case C.DESIGN:
      resume = () => <Resume summary={summary} nextStep={() => goToNext(C.FREQUENCY)} />;
      return (
        <TabWrap resume={ resume }>
          <Designs summary={summary} setSummary={setSummary} goToPrevious={goToPrevious} />
        </TabWrap>
      );
    case C.FREQUENCY:
      resume = () => <Resume summary={summary} nextStep={() => goToNext(C.LOGIN)} />;
      return (
        <TabWrap resume={ resume }>
          <Frequency summary={summary} setSummary={setSummary} goToPrevious={goToPrevious} />
        </TabWrap>
      );
    case C.LOGIN:
      resume = () => <Resume summary={summary} nextStep={() => goToNext(C.PAYMENT)} />;
      return (
        <TabWrap resume={ resume }>
          <Login summary={summary} setSummary={setSummary} goToPrevious={goToPrevious} />
        </TabWrap>
      );
    case C.PAYMENT:
      return (
        <Payment summary={summary} nextStep={() => goToNext(C.CONGRATS)} goToPrevious={goToPrevious} />
      );
    case C.CONGRATS:
      return (
        <Congratulations />
      );
    default:
      return null;
  }
}
