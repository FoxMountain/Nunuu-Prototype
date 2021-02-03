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
import { StepsContext } from './contexts/steps';

const TabWrap = ({ children  }) => (
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
        <Resume />
      </div>
    </div>
  </div>
)

export const Content = () => {
  const { currStep: step } = React.useContext(StepsContext);
  
  switch(step) {
    case C.TYPE:
      return (
        <Type />
      );
    case C.PRODUCTS:
    case C.PRODUCTS_PURE:
      return (
        <TabWrap>
          <Products />
        </TabWrap>
      );
    case C.STAGE:
      return (
        <TabWrap>
          <Stages />
        </TabWrap>
      );
    case C.DESIGN:
      return (
        <TabWrap>
          <Designs />
        </TabWrap>
      );
    case C.FREQUENCY:
      return (
        <TabWrap>
          <Frequency />
        </TabWrap>
      );
    case C.LOGIN:
      return (
        <TabWrap>
          <Login />
        </TabWrap>
      );
    case C.PAYMENT:
      return (
        <Payment />
      );
    case C.CONGRATS:
      return (
        <Congratulations />
      );
    default:
      return null;
  }
}
