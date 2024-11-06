import React, { useEffect, useState } from 'react';
import './waterDrop.css'; 

const WaterDrop = () => {
  const [percent, setPercent] = useState(64);

  useEffect(() => {
    const dropElement = document.querySelector('.drop');
    const updateWater = () => {
      if (percent < 74) {
        setPercent((prevPercent) => prevPercent + 1);
      }
    };

    const handleAnimationIteration = () => {
      updateWater();
    };

    dropElement.addEventListener('animationiteration', handleAnimationIteration);

    return () => {
      dropElement.removeEventListener('animationiteration', handleAnimationIteration);
    };
  }, [percent]);

  return (
    <div className="container2">
      <div className="drop">
        <svg viewBox="0 0 384 512" xmlns="http://www.w3.org/2000/svg">
          <path d="M192 512C86 512 0 426 0 320C0 228.4 130.1 57.7 168.4 11.8C179.8 -1.9 204.2 -1.9 215.6 11.8C253.9 57.7 384 228.4 384 320C384 426 298 512 192 512z" />
        </svg>
      </div>

      <svg style={{ display: 'none' }} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0" y="0">
        <symbol id="wave">
          <path d="M420,20c21.5-0.4,38.8-2.5,51.1-4.5c13.4-2.2,26.5-5.2,27.3-5.4C514,6.5,518,4.7,528.5,2.7c7.1-1.3,17.9-2.8,31.5-2.7c0,0,0,0,0,0v20H420z"></path>
          <path d="M420,20c-21.5-0.4-38.8-2.5-51.1-4.5c-13.4-2.2-26.5-5.2-27.3-5.4C326,6.5,322,4.7,311.5,2.7C304.3,1.4,293.6-0.1,280,0c0,0,0,0,0,0v20H420z"></path>
          <path d="M140,20c21.5-0.4,38.8-2.5,51.1-4.5c13.4-2.2,26.5-5.2,27.3-5.4C234,6.5,238,4.7,248.5,2.7c7.1-1.3,17.9-2.8,31.5-2.7c0,0,0,0,0,0v20H140z"></path>
          <path d="M140,20c-21.5-0.4-38.8-2.5-51.1-4.5c-13.4-2.2-26.5-5.2-27.3-5.4C46,6.5,42,4.7,31.5,2.7C24.3,1.4,13.6-0.1,0,0c0,0,0,0,0,0l0,20H140z"></path>
        </symbol>
      </svg>

      <div className="box">
        <div className="percent">
          <div className="percentNum" id="count">
            {percent}
          </div>
          <div className="percentB">%</div>
        </div>
        <div id="water" className="water" style={{ transform: `translate(0, ${100 - percent}%)` }}>
          <svg viewBox="0 0 560 20" className="water_wave water_wave_back">
            <use xlinkHref="#wave" />
          </svg>
          <svg viewBox="0 0 560 20" className="water_wave water_wave_front">
            <use xlinkHref="#wave" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default WaterDrop;
