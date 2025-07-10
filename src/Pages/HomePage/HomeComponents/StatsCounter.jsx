import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../HomeCss/home.css"

const StatsCounter = () => {
  const [counters, setCounters] = useState([
    { value: 0, target: 500, text: "Members" },
    { value: 0, target: 120, text: "Countries" },
    { value: 0, target: 15, text: "Years" },
    { value: 0, target: 24, text: "Support", suffix: "/7" }
  ]);

  useEffect(() => {
    const duration = 2000; // Animation duration in ms
    const increment = (counter, index) => {
      const startTime = performance.now();
      
      const updateCounter = (timestamp) => {
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const currentValue = Math.floor(progress * counter.target);
        
        setCounters(prev => {
          const newCounters = [...prev];
          newCounters[index].value = currentValue;
          return newCounters;
        });

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        }
      };

      requestAnimationFrame(updateCounter);
    };

    counters.forEach((counter, index) => {
      increment(counter, index);
    });
  }, []);

  return (
    <>
    {/*color changed from style={{backgroundColor :"#2c3034"}} */}
    <div className='primary-background-color' >
    <div className="container py-5">
      <div className="row text-center" >
        {counters.map((counter, index) => (
          <div key={index} className="col-md-3 col-sm-6 mb-4 mb-md-0">
            <div className="h3 fw-bold text-white">
              {counter.value}
              {counter.suffix && <span>{counter.suffix}</span>}
              {counter.text === "Members" && <span>K+</span>}
              {counter.text === "Countries" && <span>+</span>}
              {counter.text === "Years" && <span>+</span>}
            </div>
            <p className="h6 fw-light mt-2" style={{color: "#9ca3af"}}>{counter.text}</p>
          </div>
        ))}
      </div>
    </div>
    </div>
    </>
  );
};

export default StatsCounter;