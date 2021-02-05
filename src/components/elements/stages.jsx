import React from 'react';
import classnames from 'classnames';
import * as C from '../../constants';
import { SummaryContext } from '../contexts/summary';
import { StepsContext } from '../contexts/steps';

export const Stages = () => {
  const { isPlan, stages, products, changeStages, clear } = React.useContext(SummaryContext);
  const { goToPrev } = React.useContext(StepsContext);
  const [multiple, setMultiple] = React.useState(false);

  const total = stages.reduce((prev, stage) => (
    prev + stage.amount
  ), 0);
  const limit = isPlan
    ? C.PLAN_STAGES_LIMIT
    : products.filter(({isDiaper}) => isDiaper).reduce(
      (prev, curr) => (prev + (curr.amount * curr.packages)), 0);

  React.useEffect(() => {
    if (stages.length > 1) setMultiple(true);
  }, [stages]);

  let legend = null;
  if (multiple) {
    legend = limit - total === 1
      ? <>Tienes <span className="weight-bold text-blue">{limit - total} paquete</span> disponible para elegir</>
      : <>Tienes <span className="weight-bold text-blue">{limit - total} paquetes</span> disponibles para elegir</>
  } else {
    legend = limit === 1
      ? <>Elige <span className="weight-bold text-blue">{limit} paquete</span></>
      : <>Elige hasta <span className="weight-bold text-blue">{limit} paquetes</span></>
  }

  return (
    <div id="stage" className="w-tab-pane w--tab-active" role="tabpanel">
      <button onClick={goToPrev} className="process-back w-inline-block">
        <img
          src="https://assets.website-files.com/600eff8cbf53c99e0ed39440/600f6ebc00ce6a5bf93e699f_icon-left.svg"
          loading="lazy" alt=""
        />
        <p className="return-text">Regresar</p>
      </button>
      <div className="h-horizontal-space-between mb-2">
        <h2 className="h2">Elige el tamaño de pañales adecuado a la etapa de tu bebé</h2>
        <div className="h-vertical-center">
          <p className="mr-2">Combinar tamaños</p>
          <div className="w-embed w-script">
            <label className="switch stage">
              <input
                type="checkbox"
                checked={multiple}
                onChange={() => { 
                  setMultiple(!multiple);
                  if (multiple) clear.stages();
                }}
              />
              <span className="slider round"></span>
            </label>
          </div>
        </div>
      </div>

      <p className="mb-8">{ legend }</p>

      <div className="stages-grid">
        {
          C.LIST_ALL_STAGES.map(stage => {
            const { id, name, target, equiv, img } = stage;
            const savedStage = stages.find((st) => st.id === id);
            
            const amount = savedStage
              ? savedStage.amount 
              : 0;

            return (
              <div className='stage-card-wrap' key={id}>
                <div 
                  className={classnames("stage-card", { single: !multiple, active: !multiple && amount })}
                  onClick={multiple ? undefined : () => changeStages(stage, limit, !multiple)}
                >
                  <h3 className="stage-name h3">{name}</h3>
                  <img
                    src={img}
                    loading="lazy" alt="" className="stage-image"
                  />
                  <p className="stage-target">{target}</p>
                  <p className="stage-equivalence text-small mb-1">{equiv}</p>
                  {
                    !multiple
                      ? null
                      : (
                        <div className="input-field display">
                          <button 
                            disabled={amount === 0}
                            className="btn-less w-button"
                            onClick={() => changeStages(stage, amount - 1) }
                          >
                            -
                          </button>
                          <div className="w-embed">
                            <input
                              type="number"
                              min={0}
                              className="stage-quantity"
                              value={amount}
                              onChange={(el) => changeStages(stage, el.target.value) }
                            />
                          </div>
                          <button
                            disabled={total === limit}
                            className="btn-more w-button"
                            onClick={() => changeStages(stage, amount + 1) }
                          >
                            +
                          </button>
                        </div>
                      )
                  }
                </div>
              </div>
            );
          })
        }
      </div>
    </div>
  );
}
