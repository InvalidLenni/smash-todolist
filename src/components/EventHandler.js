import React from "react";
import { initList } from "../initList";
import { v4 as uuidv4 } from "uuid";

export default function EventHandler() {
	const [title, setTitle] = React.useState("");
	const [completed, setCompleted] = React.useState(false);
	const [tasksObject] = React.useState(localStorage.getItem("tasks"));
	const [taskArray] = React.useState(JSON.parse(tasksObject));
	const [taskStateArray, setTaskStateArray] = React.useState(taskArray);

	React.useEffect(() => {
		localStorage.setItem("tasks", JSON.stringify(taskStateArray));
	}, [taskStateArray]);

	React.useEffect(() => {
		const tasksJSON = localStorage.getItem("tasks");
		setTaskStateArray(JSON.parse(tasksJSON));
	}, []);

	function handleChange(event) {
		// Handle Event Changes

		if (event.target.value) {
			setTitle(event.target.value);
			setCompleted(event.target.checked);
		} else {
			console.error("Event Target is Null.");
		}
	}

	function handleAddTask() {
		// Handle Add Item

		if (title === null) {
			console.error("No given title.");
		}

		setTitle("");

		addToLocalStorage(title);

		console.info("Task added.");
	}

	function addToLocalStorage(title) {
		// Add the new Item to the local Storage.

		const newItem = [
			...taskStateArray,
			{
				id: uuidv4(),
				title: title,
				completed: false,
			},
		];
		setTaskStateArray(newItem);
		localStorage.setItem("tasks", JSON.stringify(newItem));

		console.info("Item has been succesfully added to the local storage.");
		console.debug("NEW JSON:" + taskStateArray);
	}

	function handleCompleteTask(item) {
		/**
		 * This function is handling the localStorage Update for Task Completion
		 * @param {item} item The item which will be updated / completed.
		 **/

		setCompleted(item.completed);

		console.info("Task completed.");
	}

	function handleToggleCompleted(itemID) {
		// This is handling the toggle of the checkbox.
		// It returns the task as completed.

		let taskCompletedMap = taskStateArray.map((item) => {
			if (item.id === itemID) {
				console.info("Task with the ID" + item.id + "is completed now.");
				console.info("Item was marked as final completed.");
				return { ...item, completed: true };
			} else {
				console.info("Item was already marked as final completed.");
				return item;
			}
		});

		setTaskStateArray(taskCompletedMap);
		localStorage.setItem("tasks", JSON.stringify(taskCompletedMap));

		console.info("It's successfully handled toggle completed.");
	}

	function handleDeleteTasks() {
		/**
		 * DELETE ALL TASKS OUT OF THE LOCAL STORAGE.
		 * @description This function is not for production, only for development.
		 **/
		localStorage.setItem("tasks", JSON.stringify(initList));

		setTaskStateArray(initList);
		console.info("Task List has been set to default.");
	}
	return (
		<div className="shadow-xl box-content drop-shadow-xl flex flex-col space-y-3 base-300 w-full lg:flex-row">
			<AddItem title={title} onChange={handleChange} onAdd={handleAddTask} />
			<br />
			<br />
			<div className="grid flex-grow h-32 card bg-base-300 rounded-box place-items-center">
				<List
					list={taskStateArray}
					onToggleCompleted={handleToggleCompleted}
					onCompleteTask={handleCompleteTask}
				/>
			</div>
			<div className="daisyuidivider lg:daisyuidivider-vertical">
				----------------------
			</div>
			<div className="grid flex-grow h-32 card bg-base-300 rounded-box place-items-center">
				<UCList list={taskStateArray} />
			</div>
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<button
				onClick={handleDeleteTasks}
				className="rounded-full daisyuibtn daisyuibtn-error"
			>
				RESET ALL TASKS
			</button>
		</div>
	);
}

export const AddItem = ({ title, onChange, onAdd }) => (
	<div className="shadow-md justify-center inline-flex">
		<input
			className="items-center mr2 rounded-full input input-bordered w-full max-w-xs"
			type="text"
			placeholder="Task title"
			value={title}
			onChange={onChange}
			required
		/>
		<button
			className="flex justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-end items-end mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
							<div className="justify-self-end inline-flex">
								<input
									type="checkbox"
									className="checkbox rounded-full checkbox-xs"
									checked={item.completed}
									disabled
								/>
							</div>
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
							<div className="flex justify-end">
								<input
									type="checkbox"
									checked={item.completed}
									onClick={handleCompleteTask}
									onChange={(e) => {
										onToggleCompleted(item.id, e.target.checked);
									}}
									className="checkbox flex justify-end rounded-full checkbox-xs"
								/>
							</div>
						</label>
					</li>
				))}
		</ul>
	</div>
);
