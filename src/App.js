import React, { useCallback, useEffect, useState } from "react";

import Tasks from "./components/Tasks/Tasks";
import NewTask from "./components/NewTask/NewTask";
import useHttp from "./hooks/useHttp";

function App() {
	const [tasks, setTasks] = useState([]);

	const { isLoading, error, sendRequest: fetchTasks } = useHttp();

	// const fetchTasks = async (taskText) => {
	// 	setIsLoading(true);
	// 	setError(null);
	// 	try {
	// 		const response = await fetch(
	// 			"https://react-http-f4f7f-default-rtdb.firebaseio.com/tasks.json"
	// 		);

	// 		if (!response.ok) {
	// 			console.log("Data add failed ");
	// 			throw new Error("Request failed!");
	// 		}

	// 		const data = await response.json();

	// 		const loadedTasks = [];

	// 		for (const taskKey in data) {
	// 			loadedTasks.push({ id: taskKey, text: data[taskKey].text });
	// 		}

	// 		setTasks(loadedTasks);
	// 	} catch (err) {
	// 		setError(err.message || "Something went wrong!");
	// 	}
	// 	setIsLoading(false);
	// };

	useEffect(() => {
		const transformTasks = (tasksObj) => {
			const loadedTasks = [];

			for (const taskKey in tasksObj) {
				loadedTasks.push({ id: taskKey, text: tasksObj[taskKey].text });
			}

			setTasks(loadedTasks);
		};
		fetchTasks(
			{
				url: "https://react-http-f4f7f-default-rtdb.firebaseio.com/tasks.json",
			},
			transformTasks
		);
	}, []);

	const taskAddHandler = (task) => {
		setTasks((prevTasks) => prevTasks.concat(task));
	};

	return (
		<React.Fragment>
			<NewTask onAddTask={taskAddHandler} />
			<Tasks
				items={tasks}
				loading={isLoading}
				error={error}
				onFetch={fetchTasks}
			/>
		</React.Fragment>
	);
}

export default App;
