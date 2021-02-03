import React from 'react';
import classnames from 'classnames';

export const Designs = ({ goToPrevious, setSummary, summary }) => {
  const { stages, designs: summDesigns = [] } = summary;
  const designs = [
    { img: 'https://uploads-ssl.webflow.com/600eff8cbf53c99e0ed39440/60142e451bc89fe6659de3c4_Textura-Dinosaurios%403x.png', id: 1 },
    { img: 'https://assets.website-files.com/600eff8cbf53c99e0ed39440/6010378b63ee0f8b8273020c_design2.png', id: 2 },
    { img: 'https://assets.website-files.com/600eff8cbf53c99e0ed39440/6010378be1e192268d8c3e09_design3.png', id: 3 },
  ];
  const [multiple, setMultiple] = React.useState(false);

  const onAmountChange = (index, design, amount) => {
    if (amount >= 0) {
      const { stages: tempStages = [] } = summary;
      const stg = tempStages.find(({ index: stgInd }) => index === stgInd);
      const stageLimit = stg.amount;
      
      const tdesigns = multiple 
        ? [...summDesigns] 
        : summDesigns.filter(({ stage: stageID }) => stageID !== index);
      const dsgIndex = tdesigns.findIndex(({ id: did, stage: stageID }) => did === design && stageID === index);
      if (dsgIndex >= 0) {
        tdesigns[dsgIndex].amount = amount;
      } else {
        tdesigns.push({ id: design, stage: index, amount });
      }
      const stageTotal = tdesigns.filter(({ stage: stageID }) => stageID === index).reduce((prev, curr) => (prev + curr.amount), 0);
      if (stageTotal > stageLimit) return;
      setSummary({ ...summary, designs: tdesigns });
    }
  };

  const reset = () => {
    setSummary({ ...summary, designs: [] });
  };

  return (
    <div id="design" className="w-tab-pane w--tab-active" role="tabpanel">
      <button onClick={() => { goToPrevious(); reset(); }} className="process-back w-inline-block">
        <img
          src="https://assets.website-files.com/600eff8cbf53c99e0ed39440/600f6ebc00ce6a5bf93e699f_icon-left.svg"
          loading="lazy" alt=""
        />
        <p className="return-text">Regresar</p>
      </button>
      <div className="h-horizontal-space-between mb-4">
        <h2 className="h2">Personaliza el diseño de tu pañal</h2>
        <div className="h-vertical-center">
          <p className="mr-2">Combinar Diseños</p>
          <div className="w-embed w-script">
            <label className="switch stage">
              <input type="checkbox" checked={multiple} onChange={() => { setMultiple(!multiple); reset(); }} />
              <span className="slider round"></span>
            </label>
          </div>
        </div>
      </div>

      <div className="design-grid">
        {
          stages.filter(s => s.amount > 0).map(({ index: stgIndex, name, amount: limit }) => {
            return (
              <div className="design-card" key={stgIndex}>
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
                      designs.map(({ id, img }, dind) => {
                        const dsg = summDesigns.find(({ id: did, stage: stg, amount: amnt }) => did === id && stg === stgIndex && amnt > 0);
                        const amount = dsg ? dsg.amount : 0;
                        return (
                          <div key={`${stgIndex}-${id}`} className="design-selector">
                            <button
                              onClick={multiple ? () => {} : () => onAmountChange(stgIndex, id, limit) }
                              className={classnames("design w-inline-block", { single: !multiple, active: !multiple && dsg })}
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
                                    <button onClick={() => onAmountChange(stgIndex, id, amount - 1) } className="btn-less w-button">-</button>
                                    <div className="w-embed">
                                      <input type="number" min={0} className="design-quantity" value={amount} onChange={(el) => onAmountChange(stgIndex, id, el.target.value) } />
                                    </div>
                                    <button onClick={() => onAmountChange(stgIndex, id, amount + 1) } className="btn-more w-button">+</button>
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
