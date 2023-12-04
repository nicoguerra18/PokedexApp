import React, { useEffect, useState } from "react";

const CountdownClock = ({ onTimeout }) => {
  const [seconds, setSeconds] = useState(60);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;

    if (isRunning) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds === 0) {
            clearInterval(interval);
            // Invoke the callback when the countdown reaches zero
            onTimeout();
            return 0;
          } else {
            return prevSeconds - 1;
          }
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, onTimeout]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handleReset = () => {
    setIsRunning(false);
    setSeconds(60);
  };

  return (
    <div className="summay countdown-clock">
      <span>
        <h2>Test Your Pokèmon Knowldge!</h2>
        <h2>{seconds} seconds</h2>

        <button className="btn-add" onClick={handleStart} disabled={isRunning}>
          Start
        </button>
        <button className="btn-reset" onClick={handleReset}>
          Reset
        </button>
      </span>
    </div>
  );
};

export default CountdownClock;
