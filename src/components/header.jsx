import React from 'react';
import * as C from '../constants';
import classnames from 'classnames';

export const Header = ({ step, isPlan }) => {
  let title = '';
  let body = '';
  let tip = '';
  let timelineValue = 0;

  switch(step) {
    case C.PRODUCTS:
      timelineValue = 1;
      title = 'Agrega Productos a tu caja NUNUU';
      body = 'Contamos con una variedad de productos que dejaran radiante y limpio a tu bebé.';
      break;
    case C.STAGE:
      timelineValue = 1;
      title = 'Elegiste un Plan Mensual';
      body = 'Personaliza tu Caja NUNUU. Elige de acuerdo al tamaño de tu bebé y selecciona las etapas.';
      tip = 'Tip: Si necesitas combinar tamaños puedes activar el switch.';
      break;
    case C.DESIGN:
      timelineValue = 2;
      title = '¡Excelente! Personaliza el diseño de los pañales para tu bebé.';
      body = 'Cada tamaño cuenta con diseños diferentes, elige el diseño que más te agrede.';
      break;
    case C.FREQUENCY:
      timelineValue = 3;
      title = '¡Perfecto! es momento de elegir la frecuencia de tu pedido.';
      body = 'Nuestros pedidos son entregados después de 48 horas. Podrás cambiar la frecuencia de tus pedidos cuando quieras en tu portal.';
      break;
    case C.LOGIN:
      timelineValue = 4;
      title = 'Solo falta iniciar sesión/crea un cuenta y agregar tus datos de envío.';
      break;
    case C.PAYMENT:
      timelineValue = 5;
      title = 'Revisa tu resumen y que tu pedido esté correcto. ¡Solo queda pagar y listo!';
      break;
    case C.CONGRATS:
      timelineValue = 6;
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
        <div className="timeline">
          <div className="progress">
            <div className="dot-container">
              <div className={classnames("dot", { active: timelineValue >= 1 })}></div>
              <p className={classnames("timeline-label", { active: timelineValue >= 1 })}>ETAPA</p>
            </div>
          </div>
          <div className="progress">
            <div className={classnames("progressbar", { active: timelineValue >= 2 })}></div>
            <div className="dot-container">
              <div className={classnames("dot", { active: timelineValue >= 2 })}></div>
              <p className={classnames("timeline-label", { active: timelineValue >= 2 })}>DISEÑO</p>
            </div>
          </div>
          <div className="progress">
            <div className={classnames("progressbar", { active: timelineValue >= 3 })}></div>
            <div className="dot-container">
              <div className={classnames("dot", { active: timelineValue >= 3 })}></div>
              <p className={classnames("timeline-label", { active: timelineValue >= 3 })}>FREcUENCIA</p>
            </div>
          </div>
          <div className="progress">
            <div className={classnames("progressbar", { active: timelineValue >= 4 })}></div>
            <div className="dot-container">
              <div className={classnames("dot", { active: timelineValue >= 4 })}></div>
              <p className={classnames("timeline-label", { active: timelineValue >= 4 })}>ENVÍO</p>
            </div>
          </div>
          <div className="progress">
            <div className={classnames("progressbar", { active: timelineValue >= 5 })}></div>
            <div className="dot-container">
              <div className={classnames("dot", { active: timelineValue >= 5 })}></div>
              <p className={classnames("timeline-label", { active: timelineValue >= 5 })}>PAGO</p>
            </div>
          </div>
        </div>
      )
      : (
        <div className="timeline">
          <div className="progress">
            <div className="dot-container">
              <div className={classnames("dot", { active: timelineValue >= 1 })}></div>
              <p className={classnames("timeline-label", { active: timelineValue >= 1 })}>PRODUCTOS</p>
            </div>
          </div>
          <div className="progress">
            <div className={classnames("progressbar", { active: timelineValue >= 4 })}></div>
            <div className="dot-container">
              <div className={classnames("dot", { active: timelineValue >= 4 })}></div>
              <p className={classnames("timeline-label", { active: timelineValue >= 4 })}>ENVÍO</p>
            </div>
          </div>
          <div className="progress">
            <div className={classnames("progressbar", { active: timelineValue >= 5 })}></div>
            <div className="dot-container">
              <div className={classnames("dot", { active: timelineValue >= 5 })}></div>
              <p className={classnames("timeline-label", { active: timelineValue >= 5 })}>PAGO</p>
            </div>
          </div>
        </div>
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
              <p class={classnames("text-blue", { 'display-none': !tip })}>{tip}</p>
            </div>
          </div>
          { timeline }
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
