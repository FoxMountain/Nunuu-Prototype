import React from 'react';

export const Congratulations = () => {
  return (
    <div className="thanks-container">
      <div className="container-slim">
        <div className="row pt-8">
          <div className="col-7 position-relative h-horizontal-end">
            <img
              src="https://assets.website-files.com/600eff8cbf53c99e0ed39440/601061d580af196c53369383_thanks.png"
              loading="lazy" sizes="(max-width: 479px) 32vw, (max-width: 991px) 33vw, (max-width: 1919px) 34vw, 656px"
              srcset="https://assets.website-files.com/600eff8cbf53c99e0ed39440/601061d580af196c53369383_thanks-p-500.png 500w, https://assets.website-files.com/600eff8cbf53c99e0ed39440/601061d580af196c53369383_thanks.png 514w"
              alt="" className="ty-image"/>
            <img
              src="https://assets.website-files.com/600eff8cbf53c99e0ed39440/601061d4b6cef5600442c830_thanks-bg.svg"
              loading="lazy" alt="" className="ty-bg"/>
          </div>
          <div className="col-5 col-padding-0 pt-4">
            <h1 className="h1 mb-2">Nadie nos enseña a ser papás, pero podemos ayudarnos mutuamente.</h1>
            <p className="text-big text-pink mb-5">¡Accede a nuestra comunidad para<br />aprender más!</p>
            <button href="#" className="btn-pink w-button">Comunidad NUNUU</button>
          </div>
        </div>
      </div>
    </div>
  );
}