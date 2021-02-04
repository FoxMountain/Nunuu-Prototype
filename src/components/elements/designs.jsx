import React from 'react';
import classnames from 'classnames';
import * as C from '../../constants';
import { SummaryContext } from '../contexts/summary';
import { StepsContext } from '../contexts/steps';

export const Designs = () => {
  const { stages, designs, changeDesigns, clear } = React.useContext(SummaryContext);
  const { goToPrev } = React.useContext(StepsContext);
  const [multiple, setMultiple] = React.useState(false);

  React.useEffect(() => {
    const result = { };
    let thereAreMultiple = false;
    designs.forEach((des) => {
      if (!result[des.stageID]) result[des.stageID] = 0;
      else thereAreMultiple = true;
      ++result[des.stageID];
    });
    if (thereAreMultiple) setMultiple(true);
  }, [designs]);

  return (
    <div id="design" className="w-tab-pane w--tab-active" role="tabpanel">
      <button onClick={goToPrev} className="process-back w-inline-block">
        <img
          src="https://assets.website-files.com/600eff8cbf53c99e0ed39440/600f6ebc00ce6a5bf93e699f_icon-left.svg"
          loading="lazy" alt=""
        />
        <p className="return-text">Regresar</p>
      </button>
      <div className="h-horizontal-space-between mb-4">
        <h2 className="h2">Personaliza el diseño de tus pañales</h2>
        <div className="h-vertical-center">
          <p className="mr-2">Combinar Diseños</p>
          <div className="w-embed w-script">
            <label className="switch stage">
              <input
                type="checkbox"
                checked={multiple}                
                onChange={() => { 
                  setMultiple(!multiple);
                  if (multiple) clear.designs();
                }}
              />
              <span className="slider round"></span>
            </label>
          </div>
        </div>
      </div>

      <div className="design-grid">
        {
          stages.map(({ id: stgID, name }) => {
            return (
              <div className="design-card" key={stgID}>
                <div className="img-container">
                  <img
                    src="https://assets.website-files.com/600eff8cbf53c99e0ed39440/600f2700c612ede6e7cbf076_diaper-design-01.png"
                    loading="lazy" alt="" className="design-image" />
                  <img
                    src="https://assets.website-files.com/600eff8cbf53c99e0ed39440/600f28503bf6002ea0df1628_gray-texture.svg"
                    loading="lazy" alt="" className="bg-texture" />
                </div>
                <div className="stage-selector">
                  <h3 className="design-stage h3">{name}</h3>
                  <div className="design-selector-grid">

                    {
                      C.LIST_ALL_DESIGNS.map(({ id, img }) => {
                        const savedDesign = designs.find((des) => des.designID === id && des.stageID === stgID);
                        const amount = savedDesign
                          ? savedDesign.amount
                          : 0;

                        const limit = stages.reduce((prev, curr) => {
                          return curr.id === stgID
                            ? prev + curr.amount
                            : prev
                        }, 0);

                        return (
                          <div key={`${stgID}-${id}`} className="design-selector">
                            <button
                              onClick={multiple ? undefined : () => changeDesigns(stgID, id, limit, !multiple) }
                              className={classnames("design w-inline-block", { single: !multiple, active: !multiple && amount })}
                            >
                              <img
                                src={img}
                                loading="lazy" alt=""
                              />
                            </button>

                            {
                              !multiple
                                ? null
                                : (
                                  <div className="input-field display">
                                    <button onClick={() => changeDesigns(stgID, id, amount - 1) } className="btn-less w-button">-</button>
                                    <div className="w-embed">
                                      <input type="number" min={0} className="design-quantity" value={amount} onChange={(el) => changeDesigns(stgID, id, el.target.value) } />
                                    </div>
                                    <button onClick={() => changeDesigns(stgID, id, amount + 1) } className="btn-more w-button">+</button>
                                  </div>
                                )
                            }
                          </div>
                        );
                      })
                    }
                  </div>
                </div>
              </div>
            );
          })
        }
      </div>
    </div>
  );
}
