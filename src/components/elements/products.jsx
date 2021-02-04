import React from 'react';
import * as C from '../../constants';
import { StepsContext } from '../contexts/steps';
import { SummaryContext } from '../contexts/summary';

export const Products = () => {
  const { currStep, goToPrev } = React.useContext(StepsContext);
  const { changeProducts, products } = React.useContext(SummaryContext);
  const PRODUCTS_LIST = currStep === C.PRODUCTS_PURE
    ? C.LIST_PURE_PRODUCTS
    : C.LIST_ALL_PRODUCTS;

  return (
    <div id="products" className="w-tab-pane w--tab-active" role="tabpanel">
      <button onClick={goToPrev} className="process-back w-inline-block">
        <img
          src="https://assets.website-files.com/600eff8cbf53c99e0ed39440/600f6ebc00ce6a5bf93e699f_icon-left.svg"
          loading="lazy" alt="" />
        <p className="return-text">Regresar</p>
      </button>


      <div className="h-horizontal-space-between mb-2">
        <h2 className="h2 mb-7">
          {
            isPlan
              ? 'Personaliza tu caja con productos adicionales a tus pañales'
              : 'Agrega los productos que quieres en tu caja'
          }
        </h2>
      </div>

      
      <div className="products-grid">
        { PRODUCTS_LIST.map(product => {
          const { id, name, desc, img, price } = product;
          const savedProduct = products.find((pr) => pr.id === id);
          const amount = savedProduct
            ? savedProduct.amount 
            : 0;
          return (
              <div className="product-card" key={id}>
                <p className="product-price h3">${price}</p>
                <img
                  src={img}
                  loading="lazy" alt="" className="product-image"
                />
                <h3 className="product-name h3">{name}</h3>
                <p className="product-description">{desc}</p>
                <div className="input-field display">
                  <span onClick={() => changeProducts(product, amount - 1) } className="btn-less w-button">-</span>
                  <div className="w-embed">
                    <input type="number" min="0" className="product-quantity" value={amount} onChange={(el) => changeProducts(product, el.target.value)} />
                  </div>
                  <span onClick={() => changeProducts(product, amount + 1) } className="btn-more w-button">+</span>
                </div>
              </div>
            );
          })
        }
      </div>
    </div>                
  );
}
