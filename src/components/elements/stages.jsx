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
    : products.filter(({isDiaper}) => isDiaper).reduce((prev, curr) => (prev + curr.amount), 0);

  React.useEffect(() => {
    if (stages.length > 1) setMultiple(true);
  }, [stages]);

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
        <h2 className="h2">Elige la etapa</h2>
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

      <p className="mb-8">Elige hasta <span className="weight-bold text-blue">5 paquetes</span></p>
      <div className="stages-grid">
        {
          C.LIST_ALL_STAGES.map(stage => {
            const { id, name, target, equiv, img } = stage;
            const savedStage = stages.find((st) => st.id === id);
            
            const amount = savedStage
              ? savedStage.amount 
              : 0;

            const limit = isPlan
              ? C.PLAN_STAGES_LIMIT
              : products.filter(({isStage}) => isStage).reduce((prev, curr) => (prev + curr.amount), 0);

            return (
              <div 
                key={id}
                className={classnames("stage-card", { active: !multiple && amount })}
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
                        <button onClick={() => changeStages(stage, amount - 1) } className="btn-less w-button">-</button>
                        <div className="w-embed">
                          <input
                            type="number"
                            min={0}
                            className="stage-quantity"
                            value={amount}
                            onChange={(el) => changeStages(stage, el.target.value) }
                          />
                        </div>
                        <button onClick={() => changeStages(stage, amount + 1) } className="btn-more w-button">+</button>
                      </div>
                    )
                }
              </div>
            );
          })
        }
      </div>
    </div>
  );
}
