import "./App.css";
import React, { useState, useRef } from "react";
import { statusList } from "./data";
import { handleGetMinute, handleGetPosition } from "./helper";

export default function App() {
  const [first, setFirst] = useState(true);
  const [points, setPoints] = useState([]);
  const [validPoints, setValidPoints] = useState([]);
  const [status, setStatus] = useState("play");
  const [timer, setTimer] = useState(0);

  const pointsRef = useRef(null);
  const screenRef = useRef(null);
  const timeOutRef = useRef(null);
  const timerRef = useRef(null);

  const handlePlayTimer = () => {
    setTimer(0);

    timerRef.current = setInterval(() => {
      setTimer((timer) => timer + 1);
    }, 100);
  };

  const handleRestart = () => {
    clearTimeout(timeOutRef.current);
    clearInterval(timerRef.current);

    const newPoints = Number(pointsRef.current.value);

    const { width } = screenRef.current.getBoundingClientRect();

    const newPointList = Array.from({ length: newPoints }, (v, i) => {
      const top = handleGetPosition(width);
      const left = handleGetPosition(width);

      const style = {
        top: top + "px",
        left: left + "px",
        zIndex: newPoints - i,
      };

      return { value: i + 1, style, id: i + top + left };
    });

    if (newPoints > 0) {
      handlePlayTimer();

      if (first) {
        setFirst(false);
      }
    } else {
      setTimer(0);
    }

    setValidPoints([]);
    setPoints(newPointList);
    setStatus("play");
  };

  const handlePlay = (value) => {
    if (status !== "fail" && !validPoints?.includes(value)) {
      if (value === validPoints.length + 1) {
        const newValidPoints = [...validPoints, value];

        setValidPoints(newValidPoints);

        if (newValidPoints.length === points.length) {
          timeOutRef.current = setTimeout(() => {
            setStatus("pass");
            clearInterval(timerRef.current);
          }, 1500);
        }
      } else {
        clearInterval(timerRef.current);
        setStatus("fail");
      }
    }
  };

  return (
    <div className="game__container">
      <div className="game__inner">
        {statusList?.[status]?.class && statusList?.[status]?.text && (
          <h1 className={`game__status ${statusList[status].class}`}>
            {statusList[status].text}
          </h1>
        )}
        <div className="game__field">
          <p>Points:</p>
          <input type="number" ref={pointsRef} />
        </div>
        <div className="game__field">
          <p>Time:</p>
          <p>{handleGetMinute(timer)}</p>
        </div>
        <button className="game__button" onClick={handleRestart}>
          {first ? "play" : "restart"}
        </button>
        <div className="game__screen" ref={screenRef}>
          {points.map((x) => (
            <button
              className={
                validPoints?.includes(x.value)
                  ? "game__number game__selected"
                  : "game__number"
              }
              key={x.id}
              onClick={() => handlePlay(x.value)}
              style={x.style}
            >
              {x.value}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
