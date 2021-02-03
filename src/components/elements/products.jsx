import React from 'react';
import * as C from '../../constants';
import { toCurrency } from '../../utils/currency';

export const Products = ({ clear, goToPrevious, setSummary, summary }) => {
  const [products, setProducts] = React.useState([
    {name: 'Toallitas Húmedas', desc: 'Toallas que cuentan con nuestro Sello Ecocert, solo usamos 5 ingredientes, entre ellos el 98.9% es agua.', img: 'https://assets.website-files.com/600eff8cbf53c99e0ed39440/6010374763ee0f308073019b_toallitas-humedas.png', price: 40, amount: 0},
    {name: 'BioGel Limpiador', desc: 'A base de albaricoque y aloe vera, ideal para piel sensible. Si tu bebé no queda radiante y limpio no es NUNUU.', img: 'https://assets.website-files.com/600eff8cbf53c99e0ed39440/600f6fd4a9317798cc7aaa22_biogel-limpiador.png', price: 80, amount: 0},
    {name: 'Pañalera', desc: 'Pañalera con una capacidad de hasta 50 pañales y cuenta con bolsas internas para que coloques tus toallas y lociones para tu bebé.', img: 'https://assets.website-files.com/600eff8cbf53c99e0ed39440/600f6fe8b03ce546cfa8e959_panalera-thumb.png', price: 600, amount: 0},
  ]);

  React.useEffect(() => {
    const { products: summProds = [] } = summary;
    const [...prs] = products;
    summProds.forEach(({ amount }, index) => prs[index].amount = amount);
    setProducts(prs);
  }, []);

  const setProductAmount = (index, amount) => {
    if (amount >= 0) {
      const prs = [...products];
      prs[index].amount = amount;
      
      const { products: summProds = [] } = summary;
      const prodInd = summProds.findIndex(pr => (pr.index === index));
      console.log(prodInd);
      if (prodInd >= 0) {
        summProds[prodInd].amount = amount;
      } else {
        const {amount, name, price} = prs[index];
        summProds.push({ index, amount, name, price });
      }
      setSummary({...summary, products: summProds.sort((a, b) => a.index - b.index) });
      setProducts(prs);
    }
  };

  return (
    <div id="products" className="w-tab-pane w--tab-active" role="tabpanel">
      <button onClick={() => { goToPrevious(); clear(); }} className="process-back w-inline-block">
        <img
          src="https://assets.website-files.com/600eff8cbf53c99e0ed39440/600f6ebc00ce6a5bf93e699f_icon-left.svg"
          loading="lazy" alt="" />
        <p className="return-text">Regresar</p>
      </button>

      <h2 className="h2 mb-7">Agrega los productos que quieres en tu caja</h2>
      <div className="products-grid">
        { products.map(({ name, desc, img, price, amount }, index) => (
            <div className="product-card" key={index}>
              <p className="product-price h3">${price}</p>
              <img
                src={img}
                loading="lazy" alt="" className="product-image"
              />
              <h3 className="product-name h3">{name}</h3>
              <p className="product-description">{desc}</p>
              <div className="input-field display">
              <span onClick={() => setProductAmount(index, amount - 1) } className="btn-less w-button">-</span>
                <div className="w-embed">
                  <input type="number" min="0" className="product-quantity" value={amount} onChange={(el) => setProductAmount(index, el.target.value)} />
                </div>
              <span onClick={() => setProductAmount(index, amount + 1) } className="btn-more w-button">+</span>
              </div>
            </div>
          ))
        }
      </div>
    </div>                
  );
}
