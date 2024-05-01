'use client';
import React, { useRef, useState } from 'react';

export default function Home() {
	const [todo, setTodo] = React.useState([]);
	const [input, setInput] = useState('');
	const [select, setSelect] = useState(1);

	const [toolTip, setToolTip] = useState('');

	const toolTipRef = useRef();

	const timeOutRef = useRef(null);
	const handelToolTip = (title, type = 'error') => {
		const color = type === 'success' ? 'green' : 'red';

		toolTipRef.current.style.display = 'block';
		toolTipRef.current.style.backgroundColor = color;

		setToolTip(title);
    clearTimeout(timeOutRef.current);
		timeOutRef.current = setTimeout(() => {
			toolTipRef.current.style.display = 'none';
			setToolTip('');
		}, 2000);
	};

	const handleInput = (e) => {
		const key = e.key;

		if (key === 'Enter') {
			return setInput(e.target.value);
		}
		setInput(e.target.value);
	};

	const handleAdd = () => {
		if (input === '') {
			return;
		}

		const newTodo = {
			id: Date.now(),
			text: input,
			isCompleted: false,
		};
		setTodo((prev) => [...prev, newTodo]);
		setInput('');
		handelToolTip('todo Added', 'success');
	};

	const handelIsCompleted = (id) => {
		const existingTodoIndex = todo.findIndex((item) => item.id === id);
		if (existingTodoIndex !== -1) {
			setTodo((prev) => prev.map((item) => (item.id === id ? { ...item, isCompleted: !item.isCompleted } : item)));
			handelToolTip('todo updated', 'success');
		}
	};

	const handleDelete = (id) => {
		console.log(id);
		setTodo((prev) => prev.filter((item) => item.id !== id));
		handelToolTip('todo Deleted');
	};

	return (
		<main className="flex items-center justify-center h-screen overflow-hidden">
			<div className="  w-[40rem] items-center justify-center">
				<div className="flex gap-2">
					<input
						type="text"
						name=""
						id=""
						value={input}
						onChange={handleInput}
						className={`input indent-3  w-full  border rounded-md focus:border-blue-400 outline-none h-10`}
					/>
					<button onClick={handleAdd} type="button" className="bg-red-200 h-10 rounded-md px-10 ">
						Add
					</button>
				</div>

				<div className="flex py-3 gap-3">
					<div onClick={() => setSelect(1)} className={` cursor-pointer ${select === 1 && 'customUnderline'}`}>
						All Tasks
					</div>
					<div onClick={() => setSelect(2)} className={` cursor-pointer ${select === 2 && 'customUnderline'}`}>
						Completed Tasks
					</div>
				</div>
				<div className="mt-10 h-[30rem] overflow-y-auto">
					<ul style={{ display: select === 1 ? 'block' : 'none' }} className="flex flex-col gap-5">
						{/* {todo.length} */}
						{todo.length > 0 ? (
							todo.map((item, index) => (
								<li key={item.id} className="border-2 py-3 px-3 flex items-start gap-2 justify-between">
									<span>
										<input
											onChange={() => handelIsCompleted(item.id)}
											defaultChecked={item.isCompleted}
											type="checkbox"
											className="size-4"
											name=""
											id=""
										/>
									</span>{' '}
									<span className="w-full  block text-wrap break-words text-justify">{item.text}</span>
									<button
										onClick={() => handleDelete(item.id)}
										className="float-right bg-red-600 text-white px-3 py-2 rounded-lg active:scale-95"
									>
										Delete
									</button>
								</li>
							))
						) : (
							<div className="text-3xl text-center">No Data</div>
						)}
					</ul>

					<ul style={{ display: select === 2 ? 'block' : 'none' }} className="flex flex-col gap-2">
						{/* {todo.length} */}
						{todo.length > 0 ? (
							todo.map(
								(item, index) =>
									item.isCompleted && (
										<li key={item.id} className="border-2 py-3 px-3 flex items-start gap-2 justify-between">
											<span>
												<input
													onChange={() => handelIsCompleted(item.id)}
													defaultChecked={item.isCompleted}
													type="checkbox"
													className="size-4"
													name=""
													id=""
												/>
											</span>{' '}
											<span className="w-full  block text-wrap break-words text-justify">{item.text}</span>
											<button
												onClick={() => handleDelete(item.id)}
												className="float-right bg-red-600 text-white px-3 py-2 rounded-lg active:scale-95"
											>
												Delete
											</button>
										</li>
									)
							)
						) : (
							<div className="text-3xl text-center">No Data</div>
						)}
					</ul>
				</div>
			</div>

			<div
				ref={toolTipRef}
				style={{ display: 'none' }}
				className="right-0  toolTipAnimations top-10 flex rounded-l-md items-center justify-center z-50 absolute"
			>
				<div className=" text-white  px-20 capitalize  rounded-l-md py-3">{toolTip}</div>
			</div>
		</main>
	);
}
