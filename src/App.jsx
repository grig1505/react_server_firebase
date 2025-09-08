import { useState } from 'react';
import { useReqGet, useReqAdd, useReqUpdate, useReqDelete } from './hooks';
import Modal from './components/Modal/Modal';
import 'material-icons/iconfont/material-icons.css';

function App() {
	const { isLoading, tdlist, setTdlist } = useReqGet();
	const { reqAdd, isCreating } = useReqAdd(setTdlist);
	const { reqUpdate, isUpdating } = useReqUpdate();
	const { reqDelete, isDeleting } = useReqDelete(setTdlist);

	const [title, setTitle] = useState("");
	const [body, setBody] = useState("");
	const [modalOpen, setModalOpen] = useState(false);
	const [selectedTask, setSelectedTask] = useState(null);
	const [actionType, setActionType] = useState('');
	const [searchQuery, setSearchQuery] = useState("");
	const [isSorted, setIsSorted] = useState(false);

	const addTodo = (e) => {
		e.preventDefault();
		if (title.trim() && body.trim()) {
			reqAdd(title, body);
			setTitle("");
			setBody("");
		} else {
			alert("Заполните все поля!");
		}
	};

	const openAddModal = (title, body) => {
		setSelectedTask({title, body });
		setActionType('add');
		setModalOpen(true);
	};
	const openUpdateModal = (id, title, body) => {
		setSelectedTask({ id, title, body });
		setActionType('update');
		setModalOpen(true);
	};

	const openDeleteModal = (id, title) => {
		setSelectedTask({ id, title });
		setActionType('delete');
		setModalOpen(true);
	};

	const filteredTasks = Object.entries(tdlist).filter(([id, { title, body }]) => {
		const taskContent = `${title} ${body}`.toLowerCase();
		return taskContent.includes(searchQuery.toLowerCase());
	});

	const sortedTasks = isSorted
		? filteredTasks.sort(([idA, taskA], [idB, taskB]) => taskA.title.localeCompare(taskB.title))
		: filteredTasks;

	return (
		<div className="container">
			<div className="list">
				<h1>Список задач</h1>
				<input
					type="text"
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
					placeholder="Поиск по задачам"
				/>
				<button onClick={() => setIsSorted(!isSorted)}>
					{isSorted ? (<span class="material-icons">close</span>) : (<span class="material-icons">sort</span>)}
				</button>
				<button onClick={() => openAddModal(title, body)}><span class="material-icons">add</span></button>
				{isLoading ? (
					<div className="loader"></div>
				) : (
					sortedTasks.map(([id, { title, body }]) => (
						<div className='list-item' key={id}>
							<h2>{title}</h2>
							<p>{body}</p>
							<div></div>
							<button disabled={isUpdating} onClick={() => openUpdateModal(id, title, body)}><span class="material-icons">edit_note</span></button>
							<button disabled={isDeleting} onClick={() => openDeleteModal(id, title)}><span class="material-icons">delete</span></button>
						</div>
					))
				)}

			</div>

			<Modal
				isOpen={modalOpen}
				onClose={() => setModalOpen(false)}
				onSubmit={actionType === 'update' ? reqUpdate : reqDelete}
				task={selectedTask}
				actionType={actionType}
			/>
		</div>
	);
}

export default App;
