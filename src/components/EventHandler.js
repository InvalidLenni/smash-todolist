import React from "react";
import { initList } from "../initList";
import { v4 as uuidv4 } from "uuid";

export default function EventHandler() {
	const [tasks, setTasks] = React.useState(initList);
	const [title, setTitle] = React.useState("");
	const [completed, setCompleted] = React.useState(false);
	const [tasksObject] = React.useState(localStorage.getItem("tasks"));
	const [taskArray] = React.useState(JSON.parse(tasksObject));

	function handleChange(event) {
		// Handle Event Changes

		if (event.target.value) {
			setTitle(event.target.value);
			setCompleted(event.target.checked);
		} else {
			console.error("Event Target is Null.");
		}
	}

	/* function deleteLocalStorage(item) {
		let index = taskArray.indexOf(item.name);

		if (index !== -1) {
			taskArray.splice(index, 1);
			localStorage.setItem("tasks", taskArray);

			setList([...taskArray]);
		}
	}
	function updateLocalStorage(itemID) {

		let task = JSON.parse(localStorage.getItem("tasks"));
		if (task["id"] === item.id) {
			task.splice();
			const modifiedItem = [
				...taskArray,
				{
					...item,
					completed: true,
				},
			];
			localStorage.setItem("tasks", JSON.stringify(modifiedItem));
			console.info("Task with the ID" + item.id + "is completed now.");
		} else {
			console.debug("Eh, nope. That is not the ight ID.");
		}

		console.info("updated");
	}*/

	function handleAddTask() {
		// Handle Add Item

		if (title === null) {
			console.error("No given title.");
		}
		const newList = tasks.concat({
			id: uuidv4(),
			title: title,
			completed: completed,
		});

		setTasks(newList);

		setTitle("");

		addToLocalStorage(title);

		console.info("Task added.");
	}

	function addToLocalStorage(title) {
		const newItem = [
			...taskArray,
			{
				id: uuidv4(),
				title: title,
				completed: false,
			},
		];
		localStorage.setItem("tasks", JSON.stringify(newItem));
	}

	function handleCompleteTask(item) {
		/**
		 * This function is handling the localStorage Update for Task Completion
		 * @param {item} item The item which will be updated / completed.
		 **/

		const modifiedList = tasks.push({ ...item, completed: item.completed });

		setTasks(modifiedList);

		setCompleted(item.completed);

		console.info("Task completed.");
	}

	function handleToggleCompleted(itemID) {
		// This is handling the toggle of the checkbox.
		// It returns the task as completed.

		let taskCompletedMap = taskArray.map((item) => {
			if (item.id === itemID) {
				console.info("Task with the ID" + item.id + "is completed now.");
				console.info("Item was marked as final completed.");
				return { ...item, completed: true };
			} else {
				console.info("Item was already marked as final completed.");
				return item;
			}
		});

		setTasks(taskCompletedMap);
		localStorage.setItem("tasks", JSON.stringify(taskCompletedMap));

		console.info("It's successfully handled toggle completed.");
	}

	function handleDeleteTasks() {
		/**
		 * DEVELOPMENT USAGE: This function is not for production, only for development.
		 **/
		localStorage.setItem("tasks", JSON.stringify(initList));
		console.info("Task List has been set to default.");
	}
	return (
		<div>
			<AddItem title={title} onChange={handleChange} onAdd={handleAddTask} />
			<br />

			<div className="grid flex-grow h-32 card bg-base-300 rounded-box place-items-center">
				<List
					list={taskArray}
					onToggleCompleted={handleToggleCompleted}
					onCompleteTask={handleCompleteTask}
				/>
			</div>
			<div className="divider lg:divider-horizontal">
				----------------------
			</div>
			<div className="grid flex-grow h-32 card bg-base-300 rounded-box place-items-center">
				<UCList list={taskArray} />
			</div>
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<button
				onClick={handleDeleteTasks}
				className="daisyuibtn daisyuibtn-error"
			>
				RESET ALL TASKS
			</button>
		</div>
	);
}

export const AddItem = ({ title, onChange, onAdd }) => (
	<div className="shadow-md">
		<input
			className="input input-bordered w-full max-w-xs"
			type="text"
			placeholder="New task title"
			value={title}
			onChange={onChange}
			required
		/>
		<button
			className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
			onClick={onAdd}
		>
			<svg
				class="w-6 h-6"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
				></path>
			</svg>
		</button>
	</div>
);

//
export const UCList = ({ list }) => (
	// This is the completed list.
	<div className="grid flex-grow h-32 card bg-base-300 rounded-box place-items-center">
		<ul>
			{list
				.filter((item) => item.completed === true)
				.map((item) => {
					return (
						<li key={item.id}>
							<label>{item.title}</label>
							<input
								type="checkbox"
								className="checkbox justify-end rounded-full checkbox-xs"
								checked={item.completed}
								disabled
							/>
						</li>
					);
				})}
		</ul>
	</div>
);

//
export const List = ({ list, onToggleCompleted, handleCompleteTask }) => (
	// This is the list with uncompleted items.
	<div className="grid flex-grow h-32 card bg-base-300 rounded-box place-items-center">
		<ul>
			{list
				.filter((item) => item.completed === false)
				.map((item) => (
					<li key={item.id}>
						<label>
							{item.title}
							<input
								type="checkbox"
								checked={item.completed}
								onClick={handleCompleteTask}
								onChange={(e) => {
									onToggleCompleted(item.id, e.target.checked);
								}}
								className="checkbox justify-end rounded-full checkbox-xs"
							/>
						</label>
					</li>
				))}
		</ul>
	</div>
);
