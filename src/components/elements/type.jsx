import React from 'react';
import * as C from '../../constants';
import { StepsContext } from '../contexts/steps';
import { SummaryContext } from '../contexts/summary';

export const Type = ({ goToNext, summary, setSummary }) => {
  const { isPlan, changePlan } = React.useContext(SummaryContext);
  const { goToStep } = React.useContext(StepsContext);
  return (
    <div className="type">
      <div className="container-slim text-center">
        <h2 className="h2">Elige el tipo de compra</h2>
        <div className="div-block">
          <div className="type-card">
            <img
              src="https://assets.website-files.com/600eff8cbf53c99e0ed39440/600f18b073478c1207c54984_type-montly.png"
              loading="lazy" alt="" className="type-image" 
            />
            <h3 className="type-name h3">Plan Mensual</h3>
            <p className="type-description text-big">A partir de $1,000 MXN<br/>+ Envío Gratis</p>
            <p className="type-description">Personaliza tu caja NUNUU con nuestros pañales ecológicos y nuestros productos de higiene bio.</p>
            <button 
              onClick={() => {
                changePlan(true);
                goToStep(C.STAGE);
              }} 
              className="btn-pink full-width mt-auto w-button"
            >
              Elegir Plan Mensual
            </button>
          </div>
          <div className="type-card">
            <img
              src="https://assets.website-files.com/600eff8cbf53c99e0ed39440/600f18b03524b260abadf537_type-purchase.png"
              loading="lazy" alt="" className="type-image"
            />
            <h3 className="type-name h3 mb-1">Compra Por Producto</h3>
            <p className="type-description">¡Elige solamente los productos que requieras y realiza tu pedido!</p>
            <div className="py-5"></div>
            <button
              onClick={() => {
                changePlan(false);
                goToStep(C.PRODUCTS);
              }}
              className="btn-pink full-width mt-auto w-button"
            >
              Comprar Por Producto
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
