import React from 'react';
import classnames from 'classnames';
import * as C from '../../constants';
import { SummaryContext } from '../contexts/summary';
import { StepsContext } from '../contexts/steps';

export const Frequency = () => {
  const { date, frequency, changeDate, changeFrequency } = React.useContext(SummaryContext);
  const { goToPrev } = React.useContext(StepsContext);
  
  return (
    <div id="frequency" className="w-tab-pane w--tab-active" role="tabpanel">
      <div className="process-content-frequency">
        <button onClick={goToPrev} className="process-back w-inline-block">
          <img
            src="https://assets.website-files.com/600eff8cbf53c99e0ed39440/600f6ebc00ce6a5bf93e699f_icon-left.svg"
            loading="lazy" alt=""
          />
          <p className="return-text-2">Regresar</p>
        </button>

        <h2 className="h2 mb-2">Elige la fecha de inicio de tu plan y la frecuencia de entrega</h2>
        
        <div className="display-h-flex">
          <div className="col-3 col-padding-0 pt-8">
            <h3 className="h3 mb-1">Primer Fecha De Entrega</h3>
            <p className="text-small mb-3">Elige el día en el que te gustaría recibir tu entrega.</p>
            <div className="w-embed">
              <input type="date"
                data-date-inline-picker="true"
                value={date}
                onChange={(el) => changeDate(el.target.value)}
              />
            </div>
          </div>
          <div className="col-2 h-horizontal-center">
            <div className="hr-vertical"></div>
          </div>
          <div className="frequency">
            <h3 className="h3 mt-3 mb-1">Frecuencia De Entrega</h3>
            <p className="text-small mb-3">Elige la frecuencia de entrega. Siempre puedes cambiarla en tu portal para no quedarte sin pañales ni productos.</p>
           
            <div className="frequency-grid">
              {
                C.LIST_ALL_FREQUENCIES.map(({ id, period, quantity }) => (
                  <div
                    key={id}
                    className={classnames("frequency-card", { active: frequency === id })}
                    onClick={() => changeFrequency(id)}
                  >
                    <p className="frequency-label text-small">Recibir mi Kit cada:</p>
                    <h3 className="frequency-name h3">{period}</h3>
                    <p className="frequency-quantity text-small">{quantity}</p>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}