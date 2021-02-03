import React from 'react';
import { toCurrency } from '../utils/currency';

export const Resume = ({ summary, nextStep }) => {
  const { isPlan = false, products = [], stages = [] } = summary;
  const monthlyTotal = isPlan ? 1000 : 0;
  const shippingTotal = isPlan ? 0 : 100;
  const productsTotal = products.filter(({ amount }) => (amount > 0)).reduce((prev, { amount, price = 0 }, index) => prev + (amount * price), 0);
  const total = monthlyTotal + shippingTotal + productsTotal;

  return (
    <div className="process-resume v-vertical-start">
      <div className="display-sm-none">
        <h3 className="text-big mb-2">Resumen</h3>
        { 
          isPlan
            ? (
              <div className="resume-item">
                <p className="resume-name">Plan Mensual:</p>
                <p className="resume-price resume-price-size">$1,000MXN</p>
              </div>
            )
            : null
        }
        <div className="resume-products">
          { 
            products.filter(({ amount }) => (amount > 0)).map(({ name, amount, price = 0 }, index) => (
              <div className="resume-item" key={index}>
                <p className="resume-name">{ amount > 1 ? `X${amount} ` : ''}{ name }</p>
                <p className="resume-price resume-price-size">${ toCurrency(price * amount) }MXN</p>
              </div>
            ))
          }
        </div>
        <div className="resume-stages">
          {
            stages.filter(({ amount }) => (amount > 0)).map(({ name, amount }) => (
              <div className="resume-item">
                <p className="resume-name">{ amount > 1 ? `X${amount} ` : ''}{ name }</p>
              </div>
            ))
          }
        </div>
        <div className="row mb-7">
          <div className="col-padding-0 col-md-12 col-8">
            <p className="resume-name">Envío:</p>
          </div>
          <div className="col-padding-0 col-md-12 col-4 text-right text-md-left">
            <p className="resume-price-size">${ toCurrency(shippingTotal) }MXN</p>
          </div>
        </div>
        <img
          src="https://assets.website-files.com/600eff8cbf53c99e0ed39440/600f71e7850346a965a92547_caja-nunuu.png"
          loading="lazy" alt="" className="resume-img" />
        <div className="resume-item">
          <p className="resume-name">Total</p>
          <p className="resume-total resume-price-size">${ toCurrency(total) }MXN</p>
        </div>
      </div>
      <button onClick={nextStep} className="btn-blue full-width display-block next-step w-button mt-4 ">
        <span>Siguiente Paso</span>
        <img src='https://uploads-ssl.webflow.com/600eff8cbf53c99e0ed39440/60143b72d8ab46269e710fb9_Icon-Right.svg' />
      </button>
    </div>
  )
}