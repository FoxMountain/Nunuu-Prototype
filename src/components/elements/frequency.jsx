import React from 'react';

export const Frequency = ({ goToPrevious }) => {
  return (
    <div id="frequency" className="w-tab-pane w--tab-active" role="tabpanel">
      <div className="process-content-frequency">
        <button onClick={() => { goToPrevious(); }} className="process-back w-inline-block">
          <img
            src="https://assets.website-files.com/600eff8cbf53c99e0ed39440/600f6ebc00ce6a5bf93e699f_icon-left.svg"
            loading="lazy" alt=""
          />
          <p className="return-text-2">Regresar</p>
        </button>
        <div className="display-h-flex">
          <div className="col-3 col-padding-0 pt-8">
            <h2 className="h2 mb-1">Primer Fecha De Entrega</h2>
            <p className="text-small mb-3">Elige el día en el que te gustaría recibir tu entrega.</p>
            <div className="w-embed"><input type="date" data-date-inline-picker="true" /></div>
          </div>
          <div className="col-2 h-horizontal-center">
            <div className="hr-vertical"></div>
          </div>
          <div className="frequency">
            <h2 className="h2 mb-1">Primer Fecha De Entrega</h2>
            <p className="text-small mb-3">Elige la frecuencia de entrega. Siempre puedes cambiarla en tu portal
              para no quedarte sin pañales ni productos.</p>
            <div className="frequency-grid">
              <div className="frequency-card">
                <p className="frequency-label text-small">Recibir mi Kit cada:</p>
                <h3 className="frequency-name h3">3 Semanas</h3>
                <p className="frequency-quantity text-small">11 pañales al día</p>
              </div>
              <div className="frequency-card">
                <p className="frequency-label text-small">Recibir mi Kit cada:</p>
                <h3 className="frequency-name h3">4 Semanas</h3>
                <p className="frequency-quantity text-small">9 pañales al día</p>
              </div>
              <div className="frequency-card">
                <p className="frequency-label text-small">Recibir mi Kit cada:</p>
                <h3 className="frequency-name h3">5 Semanas</h3>
                <p className="frequency-quantity text-small">7 pañales al día</p>
              </div>
              <div className="frequency-card">
                <p className="frequency-label text-small">Recibir mi Kit cada:</p>
                <h3 className="frequency-name h3">6 Semanas</h3>
                <p className="frequency-quantity text-small">6 pañales al día</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}