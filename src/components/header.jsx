import React from 'react';
import * as C from '../constants';
import classnames from 'classnames';
import { StepsContext } from './contexts/steps';
import { SummaryContext } from './contexts/summary';

const TimelineProgress = ({ name, value, currentValue, first }) => (
  <div className="progress">
    <div className={classnames("progressbar", { active: currentValue >= value, 'display-none': first })}></div>
    <div className="dot-container">
      <div className={classnames("dot", { active: currentValue >= value })}></div>
      <p className={classnames("timeline-label", { active: currentValue >= value })}>
        {name}
      </p>
    </div>
  </div>
)

export const Header = () => {
  const { currStep: step } = React.useContext(StepsContext);
  const { isPlan, products } = React.useContext(SummaryContext);
  let title = '';
  let body = '';
  let tip = '';
  let timelineValue = 0;
  const hasDiapers = products.some(({ isDiaper }) => isDiaper);

  switch(step) {
    case C.PRODUCTS:
      timelineValue = 1;
      title = 'Elige los productos que deseas';
      body = 'Contamos con una variedad de productos que dejaran radiante y limpio a tu bebé.';
      break;
    case C.STAGE:
      timelineValue = 2;
      title = 'Elegiste un Plan Mensual';
      body = 'Personaliza tu Caja NUNUU. Elige de acuerdo al tamaño de tu bebé y selecciona las etapas.';
      tip = 'Tip: Si necesitas combinar tamaños puedes activar el switch.';
      break;
    case C.DESIGN:
      timelineValue = 3;
      title = '¡Excelente! Personaliza el diseño de los pañales para tu bebé.';
      body = 'Cada tamaño cuenta con diseños diferentes, elige el diseño que más te agrede.';
      break;
    case C.PRODUCTS_PURE:
      timelineValue = 4;
      title = 'Agrega Productos a tu caja NUNUU';
      body = 'Contamos con una variedad de productos que dejaran radiante y limpio a tu bebé.';
      break;
    case C.FREQUENCY:
      timelineValue = 7;
      title = '¡Perfecto! es momento de elegir la frecuencia de tu pedido.';
      body = 'Nuestros pedidos son entregados después de 48 horas. Podrás cambiar la frecuencia de tus pedidos cuando quieras en tu portal.';
      break;
    case C.LOGIN:
    case C.SHIPPING:
      timelineValue = 9;
      title = 'Solo falta iniciar sesión/crea un cuenta y agregar tus datos de envío.';
      break;
    case C.PAYMENT:
      timelineValue = 10;
      title = 'Revisa tu resumen y que tu pedido esté correcto. ¡Solo queda pagar y listo!';
      break;
    case C.CONGRATS:
      title = '¡Muchas Gracias Por Tú Compra!';
      body = 'En unos momentos recibirás un email con los datos de tu compra.';
      tip = 'Número de Rastreo: 1349573037'
      break;
    case C.TYPE:
    default:
      title = '¡Hola soy Nunu!';
      body = 'Sé que a veces elegir el producto adecuado para tu bebé puede ser una tarea abrumadora, pero estoy aquí para ayudarte a elegir el mejor kit que tu bebé amará.';
      break;
  }

  const timeline = step === C.TYPE || step === C.CONGRATS
    ? null
    : isPlan
      ? (
          <>
            <TimelineProgress name='Etapa' value={2} currentValue={timelineValue} first />
            <TimelineProgress name='Diseño' value={3} currentValue={timelineValue} />
            <TimelineProgress name='Productos' value={4} currentValue={timelineValue} />
            <TimelineProgress name='Frecuencia' value={7} currentValue={timelineValue} />
            {/* <TimelineProgress name='Cuenta' value={8} currentValue={timelineValue} /> */}
            <TimelineProgress name='Envío' value={9} currentValue={timelineValue} />
            <TimelineProgress name='Pago' value={10} currentValue={timelineValue} />
          </>
        )
      : hasDiapers
        ? (
            <>
              <TimelineProgress name='Productos' value={1} currentValue={timelineValue} first />
              <TimelineProgress name='Etapa' value={2} currentValue={timelineValue} />
              <TimelineProgress name='Diseño' value={3} currentValue={timelineValue} />
              {/* <TimelineProgress name='Cuenta' value={8} currentValue={timelineValue} /> */}
              <TimelineProgress name='Envío' value={9} currentValue={timelineValue} />
              <TimelineProgress name='Pago' value={10} currentValue={timelineValue} />
            </>
          )
        : (
          <>
            <TimelineProgress name='Productos' value={1} currentValue={timelineValue} first />
            {/* <TimelineProgress name='Cuenta' value={8} currentValue={timelineValue} /> */}
            <TimelineProgress name='Envío' value={9} currentValue={timelineValue} />
            <TimelineProgress name='Pago' value={10} currentValue={timelineValue} />
          </>
        );

  return (
    <div className="header">
      <div className="container-slim">
        <div className="row h-horizontal-space-between h-vertical-center">
          <div className="display-h-flex">
            <img
              src="https://assets.website-files.com/600eff8cbf53c99e0ed39440/600f1f764595234ee954bb47_logo.svg"
              loading="lazy" alt="" className="logo" />
            <div className="bubble-info-2">
              <h3 className="h3 text-orange mb-1">{title}</h3>
              <p>{body}</p>
              <div className="bubble-corner"></div>
              <p className={classnames("text-blue", { 'display-none': !tip })}>{tip}</p>
            </div>
          </div>
          <div className="timeline">
            { timeline }
          </div>
          {
            step !== C.CONGRATS
              ? null
              : (
                <div className="h-vertical-center">
                  <div className="display-v-flex mr-4">
                    <h3 className="h3 mb-3">¿Qué más puedo hacer?</h3>
                    <a href="#" className="sm-link">Visitar Mi Cuenta</a>
                    <a href="#" className="sm-link">Explorar La Comunidad NUNUU</a>
                    <a href="/" className="sm-link">Regresar al Inicio</a>
                  </div>
                  <div className="coupon">
                    <h3 className="h3 mb-2">¡Comparte este cupón y recibeUn 10% en tu próximo pedido!</h3>
                    <a href="#" className="coupon-btn w-button">AX142021-A15</a>
                  </div>
                </div>
              )
          }
        </div>
      </div>
    </div>
  );
}
