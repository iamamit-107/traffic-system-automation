import "./App.css";
import TrafficLight from "react-trafficlight";
import { useState } from "react";

const intiState = [
	{ red: false, yellow: false, green: false },
	{ red: false, yellow: false, green: false },
	{ red: false, yellow: false, green: false },
	{ red: false, yellow: false, green: false },
];

function App() {
	const [lights, setLights] = useState(intiState);

	function wait(milliseconds) {
		return new Promise((resolve) => setTimeout(resolve, milliseconds));
	}

	const clearAllTimeout = () => {
		let id = window.setTimeout(() => {}, 0);

		while (id--) {
			window.clearTimeout(id);
		}
	};

	const startSignal = async () => {
		for (let i = 0; i < lights.length; i++) {
			const traverseForGreen = lights.map((light, idx) => {
				if (idx === i) {
					return { red: false, green: true, yellow: false };
				} else {
					return { red: true, green: false, yellow: false };
				}
			});

			setLights([...traverseForGreen]);
			await wait(5000);

			const traverseForYellow = lights.map((light, idx) => {
				if (idx === i) {
					return { red: false, green: false, yellow: true };
				} else {
					return { red: true, green: false, yellow: false };
				}
			});

			setLights([...traverseForYellow]);
			await wait(1000);

			if (i === lights.length - 1) {
				startSignal();
			}
		}
	};

	const stopSignal = () => {
		setLights(intiState);
		clearAllTimeout();
	};

	return (
		<div className="App">
			<div class="lamps">
				{lights.map((light, idx) => (
					<div
						key={idx}
						className={
							idx === 0
								? "first-lamp"
								: idx === 2
								? "third-lamp"
								: idx === 3
								? "fourth-lamp"
								: "second-lamp"
						}
					>
						<TrafficLight
							RedOn={light.red}
							GreenOn={light.green}
							YellowOn={light.yellow}
						/>
					</div>
				))}
			</div>
			<div className="btn-group">
				<button className="start-btn" onClick={() => startSignal()}>
					Start
				</button>
				<button className="stop-btn" onClick={() => stopSignal()}>
					Stop
				</button>
			</div>
		</div>
	);
}

export default App;
