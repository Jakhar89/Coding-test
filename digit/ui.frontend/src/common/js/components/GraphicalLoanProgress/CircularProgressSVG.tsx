import React, { memo, useEffect, useState } from 'react';

type CircularProgressSVGProps = { percentage: number };

export const CircularProgressSVG = ({ percentage = 0 }: CircularProgressSVGProps) => {
  const radius = 46.5;
  const angle = 210;
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [progressAngle, setProgressAngle] = useState(210);
  const [progressCoords, setProgressCoords] = useState({ x: 0, y: 0 });
  const [iconCoords, setIconCoords] = useState({ x: 0, y: 0 });
  const [progressPercent, setProgressPercent] = useState(0);

  const calculateCoords = (angle = 0) => {
    var x = radius * Math.sin((Math.PI * 2 * angle) / 360);
    var y = radius * Math.cos((Math.PI * 2 * angle) / 360);
    return { x, y: radius - y };
  };

  const calcaulateEndPoint = () => {
    setCoords(calculateCoords(angle));
  };

  const calcaulateProgressEndPoint = () => {
    var progressAngle = (progressPercent * angle) / 100;
    setProgressAngle(progressAngle);
    setProgressCoords(calculateCoords(progressAngle));
  };

  const calculateIconPoint = () => {
    const relativeX = progressCoords?.x;
    const relativeY = radius - progressCoords?.y;
    setIconCoords({ x: 51 + relativeX, y: 51 - relativeY });
  };

  useEffect(() => {
    calcaulateEndPoint();
  }, [angle]);

  useEffect(() => {
    calculateIconPoint();
  }, [progressCoords]);

  useEffect(() => {
    calcaulateProgressEndPoint();
  }, [progressPercent]);

  useEffect(() => {
    if (percentage > 0) {
      console.log('Interval is called with percentage');

      let intervalId;
      intervalId = setInterval(() => {
        setProgressPercent((prevPercent) => {
          if (prevPercent < percentage) {
            return prevPercent + 0.25;
          } else {
            clearTimeout(intervalId);
            return prevPercent;
          }
        });
      }, 1000 / 120);
    }
  }, [percentage]);

  const transformStyle = { transform: `rotate(${360 - angle / 2}deg)`, transformOrigin: 'center center' };

  return (
    <svg
      viewBox="0 0 102 102"
      data-test-id="CircularProgressbar"
    >
      <path
        d={`
            M 51,51
            m 0,-46.5
            a 46.5,46.5 0 ${angle <= 180 ? 0 : 1} 1 ${coords?.x},${coords?.y}
          `}
        fillOpacity="0"
        style={transformStyle}
        className="baseArc"
      ></path>
      <path
        d={`
            M 51,51
            m 0,-46.5
            a 46.5,46.5 0 ${progressAngle <= 180 ? 0 : 1} 1 ${progressCoords?.x},${progressCoords?.y}
          `}
        fillOpacity="0"
        style={transformStyle}
        className="progressArc"
      ></path>
      <path
        className="hideCurveSquare"
        d="M 0,62.7 v 5 h 102 v -5 h -102 Z"
      ></path>
      <circle
        className="iconCircle"
        cx={iconCoords?.x}
        cy={iconCoords?.y}
        r="4.5"
        style={transformStyle}
      />
      <circle
        cx={iconCoords?.x}
        cy={iconCoords?.y}
        r="3.4"
        fill="white"
        style={transformStyle}
      />
      <path
        d={`
            M${iconCoords?.x},${iconCoords?.y}
            m 0,-1.8 
            l-1.5,1
            l2,3.5
          `}
        fill="none"
        stroke="#02E068"
        strokeWidth=".5"
        style={transformStyle}
      />
    </svg>
  );
};

export default memo(CircularProgressSVG);
