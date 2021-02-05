import React from 'react';
import { toCurrency } from '../../utils/currency';
import { SummaryContext } from '../contexts/summary';
import * as C from '../../constants';
import { StepsContext } from '../contexts/steps';

export const Payment = () => {
  const { isPlan, oneTimeBuy, products, stages } = React.useContext(SummaryContext);;
  const { goToPrev, goToNext } = React.useContext(StepsContext);

  const mx = isPlan && !oneTimeBuy
    ? 1 - C.DISCOUNT
    : 1;

  const monthlyTotal = isPlan ? C.PLAN_COST : 0;
  const shippingTotal = isPlan ? C.SHIPPING_PLAN : C.SHIPPING_PRODUCTS;
  const productsTotal = products.reduce(
    (prev, { amount, price = 0 }, index) => prev + ((amount * price) * mx), 0);
  const total = monthlyTotal + shippingTotal + productsTotal;

  return (
    <div className="process-container payment">
      <div className="container-slim">
        <div className="row">
          <div className="payment-container">
            <button onClick={goToPrev} className="process-back w-inline-block">
              <img
                src="https://assets.website-files.com/600eff8cbf53c99e0ed39440/600f6ebc00ce6a5bf93e699f_icon-left.svg"
                loading="lazy" alt=""
              />
              <p className="return-text-2">Regresar</p>
            </button>
            <div className="display-h-flex position-relative">
              <div className="col-2 col-padding-0 h-vertical-center">
                <img
                  src="https://assets.website-files.com/600eff8cbf53c99e0ed39440/601090ffd5a064ac4904f9df_caja-nunuu-resumen%402x.png"
                  loading="lazy" alt=""
                />
              </div>
              <div className="payment-resume">
                <h3 className="h3 mb-6">Resumen de Compra</h3>
                <div className="buy-resume">
                  { 
                    isPlan
                      ? (
                        <>
                          <div className="resume-payment-item">
                            <p className="resume-payment-name">Plan Mensual:</p>
                            <p className="resume-price resume-price-size">
                              <strong>${ toCurrency(monthlyTotal) }</strong>MXN
                            </p><a href="#" className="editar">Editar</a>
                          </div>
                          {
                            stages.map(({ id, name, amount }) => (
                              <div className="resume-item" key={id}>
                                <p className="resume-payment-name resume-payment-stage">{ amount > 1 ? `X${amount} ` : ''}{ name }</p>
                              </div>
                            ))
                          }
                        </>
                      )
                      : null
                  }
                  
                  <div className="resume-stages">
                    {
                      products.filter(({ isDiaper }) => isDiaper).map(product => {
                        const { id, name, amount, price } = product;
                        return (
                          <div className="resume-item" key={id}>
                            <p className="resume-payment-name">{ amount > 1 ? `X${amount} ` : ''}{ name }</p>
                            <p className="resume-price resume-price-size">
                              <strong>${ toCurrency((price * amount) * mx) }</strong>MXN
                            </p><a href="#" className="editar">Editar</a>
                          </div>
                        );
                      })
                    }
                    {
                      isPlan
                        ? null
                        : (
                          stages.map(({ id, name, amount }) => (
                            <div className="resume-item" key={id}>
                              <p className="resume-payment-name resume-payment-stage">{ amount > 1 ? `X${amount} ` : ''}{ name }</p>
                            </div>
                          ))
                        )
                    }
                    {
                      products.filter(({ isDiaper }) => !isDiaper).map(product => {
                        const { id, name, amount, price } = product;
                        return (
                          <div className="resume-item" key={id}>
                            <p className="resume-payment-name">{ amount > 1 ? `X${amount} ` : ''}{ name }</p>
                            <p className="resume-price resume-price-size">
                              <strong>${ toCurrency((price * amount) * mx) }</strong>MXN
                            </p><a href="#" className="editar">Editar</a>
                          </div>
                        );
                      })
                    }
                  </div>

                  <div className="resume-stages">
                    <div className="resume-item">
                      <p className="resume-payment-name">Envío:</p>
                      <p className='resume-price resume-price-size'>
                        <strong>${toCurrency(shippingTotal)}</strong>MXN
                      </p>
                    </div>
                  </div>

                  <hr className="mb-3 mt-4" style={{ backgroundColor: '#c7c7d4', height: '1px', border: 0 }} />

                  <div className="resume-stages">
                    <div className="resume-item">
                      <p className="resume-payment-name resume-payment-total">Total</p>
                      <p className="resume-price resume-total">
                        <strong>${toCurrency(total)}</strong>MXN
                      </p>
                    </div>
                  </div>

                  <div className="resume-stages">
                    <h3 className="text-big mb-1">Dirección de Envío</h3>
                    <div className="resume-item">
                      <p className="resume-payment-address">Lucerna 60, C.P. 06600, Ciudad de México, México</p>
                      <p className="resume-price resume-total"></p><a href="#" className="editar">Editar</a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="payment-card">
                <div className="mb-6">
                  <h3 className="text-big mb-6">Elige tu método de pago</h3>
                  <div className="mb-6 display-h-flex">
                    <a href="#" className="method mr-2 w-inline-block">
                      <img
                        src="https://assets.website-files.com/600eff8cbf53c99e0ed39440/6010910ccb99fb53cf9d2182_Icon-Finance-Credit-Cart.svg"
                        loading="lazy" alt="" className="mr-2"
                      />
                      <p>Pago con Tarjeta</p>
                    </a>
                    <a href="#" className="method w-inline-block">
                      <img
                        src="https://assets.website-files.com/600eff8cbf53c99e0ed39440/6010914c2090444f9d9a478c_paypal-logo.svg"
                        loading="lazy" alt="" className="mr-2"
                      />
                      <p>Pago con Paypal</p>
                    </a>
                  </div>
                  <h3 className="text-big mb-6">Datos De Tarjeta</h3>
                  <div className="col-9 col-padding-0">
                    <div className="w-form">
                      <form id="email-form-2" name="email-form-2" data-name="Email Form 2">
                        <label for="name-2" className="label">NO. DE TARJETA</label>
                          <input type="text" className="input mb-4 w-input" maxlength="256" name="name-2" data-name="Name 2" placeholder="" id="name-2"
                          />
                        <div className="row">
                          <div className="col-5 col-padding-0">
                            <label for="email-3" className="label">FECHA DE EXPIRACIóN</label>
                            <div className="pr-4">
                              <input type="email" className="input w-input" maxlength="256" name="email-3" data-name="Email 3" placeholder="" id="email-3" required=""/>
                            </div>
                          </div>
                          <div className="col-3 col-padding-0 ml-auto">
                            <label for="email-4" className="label">cvv</label>
                            <input
                              type="email" className="input w-input" maxlength="256" name="email-2" data-name="Email 2"
                              placeholder="" id="email-2" required=""
                            />
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                <button className="btn-blue full-width display-block next-step-payment w-button" onClick={goToNext}>
                  <span>Pagar ahora</span>
                  <img src='https://uploads-ssl.webflow.com/600eff8cbf53c99e0ed39440/60143b72d8ab46269e710fb9_Icon-Right.svg' />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}