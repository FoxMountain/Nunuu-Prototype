export const TYPE = 'type';
export const STAGE = 'stage';
export const PRODUCTS = 'products';
export const PRODUCTS_PURE = 'products_pure';
export const DESIGN = 'design';
export const FREQUENCY = 'frequency';
export const LOGIN = 'login';
export const PAYMENT = 'payment';
export const CONGRATS = 'congratulations';

export const PLAN_STAGES_LIMIT = 5;
export const PLAN_COST = 1000;

export const SHIPPING_PLAN = 0;
export const SHIPPING_PRODUCTS = 100;

export const LIST_PURE_PRODUCTS = [
  {id: 1, name: 'Toallitas Húmedas', desc: 'Toallas que cuentan con nuestro Sello Ecocert, solo usamos 5 ingredientes, entre ellos el 98.9% es agua.', img: 'https://assets.website-files.com/600eff8cbf53c99e0ed39440/6010374763ee0f308073019b_toallitas-humedas.png', price: 40, isStage: false},
  {id: 2, name: 'BioGel Limpiador', desc: 'A base de albaricoque y aloe vera, ideal para piel sensible. Si tu bebé no queda radiante y limpio no es NUNUU.', img: 'https://assets.website-files.com/600eff8cbf53c99e0ed39440/600f6fd4a9317798cc7aaa22_biogel-limpiador.png', price: 80, isStage: false},
  {id: 3, name: 'Pañalera', desc: 'Pañalera con una capacidad de hasta 50 pañales y cuenta con bolsas internas para que coloques tus toallas y lociones para tu bebé.', img: 'https://assets.website-files.com/600eff8cbf53c99e0ed39440/600f6fe8b03ce546cfa8e959_panalera-thumb.png', price: 600, isStage: false},
];

export const LIST_ALL_PRODUCTS = [
  ...LIST_PURE_PRODUCTS,
  {id: 4, name: '', desc: '', img: '', price: 40, isStage: false},
  {id: 5, name: '', desc: '', img: '', price: 80, isStage: false},
  {id: 6, name: '', desc: '', img: '', price: 600, isStage: true},
];

export const LIST_ALL_STAGES = [
  { id: 0, name: 'Etapa 1', target: 'De 2 a 4kg', equiv: 'equivale a 210 pañales', img: 'https://assets.website-files.com/600eff8cbf53c99e0ed39440/600f25502537b237647b2f2f_stage.svg' },
  { id: 1, name: 'Etapa 2', target: 'De 3 a 6kg', equiv: 'equivale a 180 pañales', img: 'https://assets.website-files.com/600eff8cbf53c99e0ed39440/600f25502537b237647b2f2f_stage.svg' },
  { id: 2, name: 'Etapa 3', target: 'De 6 a 9kg', equiv: 'equivale a 150 pañales', img: 'https://assets.website-files.com/600eff8cbf53c99e0ed39440/600f25502537b237647b2f2f_stage.svg' },
  { id: 3, name: 'Etapa 4', target: 'De 9 a 12kg', equiv: 'equivale a 150 pañales', img: 'https://assets.website-files.com/600eff8cbf53c99e0ed39440/600f25502537b237647b2f2f_stage.svg' },
  { id: 4, name: 'Etapa 5', target: 'De 12 a 15kg', equiv: 'equivale a 120 pañales', img: 'https://assets.website-files.com/600eff8cbf53c99e0ed39440/600f25502537b237647b2f2f_stage.svg' },
  { id: 5, name: 'Etapa 6', target: '+14Kg', equiv: 'equivale a 120 pañales', img: 'https://assets.website-files.com/600eff8cbf53c99e0ed39440/600f25502537b237647b2f2f_stage.svg' },
];

export const LIST_ALL_DESIGNS = [
  { id: 0, img: 'https://uploads-ssl.webflow.com/600eff8cbf53c99e0ed39440/60142e451bc89fe6659de3c4_Textura-Dinosaurios%403x.png'},
  { id: 1, img: 'https://assets.website-files.com/600eff8cbf53c99e0ed39440/6010378b63ee0f8b8273020c_design2.png' },
  { id: 2, img: 'https://assets.website-files.com/600eff8cbf53c99e0ed39440/6010378be1e192268d8c3e09_design3.png' },
];