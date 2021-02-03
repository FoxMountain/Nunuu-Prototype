import React from 'react';
import classnames from 'classnames';

export const Stages = ({ clear, goToPrevious, setSummary, summary }) => {
  const stages = [
    { name: 'Etapa 1', target: 'De 2 a 4kg', equiv: 'equivale a 210 pañales', img: 'https://assets.website-files.com/600eff8cbf53c99e0ed39440/600f25502537b237647b2f2f_stage.svg' },
    { name: 'Etapa 2', target: 'De 3 a 6kg', equiv: 'equivale a 180 pañales', img: 'https://assets.website-files.com/600eff8cbf53c99e0ed39440/600f25502537b237647b2f2f_stage.svg' },
    { name: 'Etapa 3', target: 'De 6 a 9kg', equiv: 'equivale a 150 pañales', img: 'https://assets.website-files.com/600eff8cbf53c99e0ed39440/600f25502537b237647b2f2f_stage.svg' },
    { name: 'Etapa 4', target: 'De 9 a 12kg', equiv: 'equivale a 150 pañales', img: 'https://assets.website-files.com/600eff8cbf53c99e0ed39440/600f25502537b237647b2f2f_stage.svg' },
    { name: 'Etapa 5', target: 'De 12 a 15kg', equiv: 'equivale a 120 pañales', img: 'https://assets.website-files.com/600eff8cbf53c99e0ed39440/600f25502537b237647b2f2f_stage.svg' },
    { name: 'Etapa 6', target: '+14Kg', equiv: 'equivale a 120 pañales', img: 'https://assets.website-files.com/600eff8cbf53c99e0ed39440/600f25502537b237647b2f2f_stage.svg' },
  ];
  const [multiple, setMultiple] = React.useState(false);
  const limit = 5;

  React.useEffect(() => {
    const { stages: summStages = [] } = summary;
    if (summStages.length > 1) {
      setMultiple(true);
    }
  }, [])

  const findStageIndex = (index) => {
    const { stages: summStages = [] } = summary;
    return summStages.findIndex(pr => (pr.index === index));
  };

  const onAmountChange = (index, amount) => {
    if (amount >= 0) {
      const { stages: tempStages = [] } = summary;    
      const summStages = multiple ? [...tempStages] : [];
      const realIndex = findStageIndex(index);
      if (realIndex >= 0) {
        summStages[realIndex].amount = amount;
      } else {
        const { name } = stages[index];
        summStages.push({ index, amount, name });
      }
      const total = summStages.reduce((prev, curr) => (prev + curr.amount), 0);
      if (total > limit) return;
      setSummary({ ...summary, stages: summStages.sort((a, b) => a.index - b.index), designs: [{ id: 1, stage: index, amount: limit }] });
    }
  };

  const reset = () => {
    setSummary({ ...summary, stages: [], designs: [] });
  };

  return (
    <div id="stage" className="w-tab-pane w--tab-active" role="tabpanel">
      <button onClick={() => { goToPrevious(); clear(); }} className="process-back w-inline-block">
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
              <input type="checkbox" checked={multiple} onChange={() => { setMultiple(!multiple); reset(); }} />
              <span className="slider round"></span>
            </label>
          </div>
        </div>
      </div>

      <p className="mb-8">Elige hasta <span className="weight-bold text-blue">5 paquetes</span></p>
      <div className="stages-grid">
        {
          stages.map(({ name, target, equiv, img }, index) => {
            const { stages: tempStages = [] } = summary;
            const realIndex = findStageIndex(index);
            const amount = realIndex >= 0 ? tempStages[realIndex].amount : 0;
            const same = realIndex >= 0 ? tempStages[realIndex].index === index : false;
            return (
              <div className={classnames("stage-card", { active: !multiple && same })} key={index} onClick={multiple ? () => {} : () => onAmountChange(index, limit)}>
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
                        <button onClick={() => onAmountChange(index, amount - 1) } className="btn-less w-button">-</button>
                        <div className="w-embed">
                          <input type="number" min={0} className="stage-quantity" value={amount} onChange={(el) => onAmountChange(index, el.target.value) } />
                        </div>
                        <button onClick={() => onAmountChange(index, amount + 1) } className="btn-more w-button">+</button>
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
