import React, { useState, useEffect, useRef } from 'react';

import Nav from './Nav';
import Footer from './Footer';



const PomodoroClock = () => {
	const audioRef = useRef();
	
	const [ breakLength, setBreakLength ] = useState(1);
	const [ sessionLength, setSessionLength ] = useState(1);
	const [ timerType, setTimerType ] = useState("Session")
	const [ minutes, setMinutes ] = useState(25);
	const [ seconds, setSeconds ] = useState(0);
	const [ isActive, setIsActive] = useState(false);
	const [ counter, setCounter ] = useState(sessionLength * 60);
	
	
	useEffect(() => {
		let intervalId;
		
		if (isActive) {	
			intervalId = setInterval(() => {
				const secondsCounter = counter % 60;
				const minutesCounter = Math.floor(counter / 60);
				
				setSeconds(secondsCounter);
				setMinutes(minutesCounter);
			
				if (minutes === 0 && seconds === 0) {
					let count = 0;
					
					audioRef.current.play(); 
					timerType !== "Session" ? count = sessionLength && setTimerType("Session") && setCounter(count * 60) : count = breakLength && setTimerType("Break") && setCounter(count * 60);
					
				} 


			
			setCounter(counter => counter - 1);
			}, 1000);
		}
		
		return () => clearInterval(intervalId);
		
	}, [isActive, counter]);
	
	
	const plus = (control) => {
		if (control === "breakLength" && breakLength < 60) {
			setBreakLength(breakLength => breakLength + 1);
		} else if (control === "sessionLength" && sessionLength < 60) {
			let count = sessionLength + 1;
			setSessionLength(sessionLength => sessionLength + 1);
			setMinutes(minutes => minutes + 1);
			setSeconds(0);
			setCounter(count * 60);
		}
	};
	
	const minus = (control) => {
		if (control === "breakLength" && breakLength > 1) {
			setBreakLength(breakLength => breakLength -1);
		} else if (control === "sessionLength" && sessionLength > 1) {
			let count = sessionLength - 1;
			setSessionLength(sessionLength => sessionLength - 1);
			setMinutes(minutes => minutes - 1);
			setSeconds(0);
			setCounter(count * 60);
		}
	};	
	
	const restart = () => {
		setBreakLength(5);
		setSessionLength(25);
		setMinutes(25);
		setSeconds(0);
		setIsActive(false);
		setTimerType("Session");
		
		audioRef.current.pause();
	};


	
	return (
		<div>
			<header>
				<Nav />
			</header>
			<main>
				<h1>25 + 5 Clock</h1>
				<div class="time-setting">
					<div>
						<p id="break-label" class="break-label">Break Length</p>
						<div class="time-control">
							<button id="break-decrement" onClick={() => minus("breakLength")}>-</button>
							<span id="break-length"> {breakLength} </span>
							<button id="break-increment" onClick={() => plus("breakLength")}>+</button>
						</div>
					</div>
					<div>
						<p id="session-label" class="session-label">Session Length</p>
						<div class="time-control">
							<button id="session-decrement" onClick={() => minus("sessionLength")}>-</button>
							<span id="session-length"> {sessionLength} </span>
							<button id="session-increment" onClick={() => plus("sessionLength")}>+</button>
						</div>
					</div>
				</div>
				<div class="clock">
					<h2 id="timer-label">{timerType}</h2>
					<p id="time-left">
						{minutes >= 10 ? minutes : "0" + minutes}
						:
						{seconds >= 10 ? seconds : "0" + seconds}
					</p>
				</div>
				<div class="clock-controls">
					<button id="start_stop" onClick={() => setIsActive(!isActive)}>Play/Stop</button>
					<button id="reset" onClick={() => restart()}>Restart</button>
				</div>
			</main>
			
			<audio
				id="beep"
				preload="auto"
				ref={audioRef}
				src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
			/>
			
			<Footer />
		</div>
	);
};


export default PomodoroClock


