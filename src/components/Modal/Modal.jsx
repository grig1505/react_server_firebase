import styles from "./Modal.module.css";

function Modal({ isOpen, onClose, onSubmit, task, actionType }) {
	if (!isOpen) return null;

	return (
		<div className={ styles.modalOverlay}>
			<div className={ styles.modal }>
				<div className={ styles.closeWindow }  onClick={onClose}>x</div>
				<h2>
				{actionType === "update"
				? "Обновить задачу"
				: actionType === "delete"
				? "Удалить задачу"
				: actionType === "add"
				? "Добавить задачу"
				: "Действие не определено"}
				</h2>
				{actionType === "update" ? (
					<>
						<input
							className={styles.fieldInput}
							type="text"
							defaultValue={task.title}
							placeholder="Название задачи"
							id="update-title"
						/>
						<textarea
							className={styles.fieldTextarea}
							defaultValue={task.body}
							placeholder="Текст задачи"
							id="update-body"
						/>
					</>
				) : actionType === "delete" && (
					<p>Вы уверены, что хотите удалить задачу "{task.title}"?</p>
				)}
				{actionType === "add" && (
					<>				<form onSubmit={addTodo}>
					<input
						type="text"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						placeholder="Название задачи"
					/>
					<textarea
						value={body}
						onChange={(e) => setBody(e.target.value)}
						placeholder="Текст задачи"
					/>
					<button type="submit" disabled={isCreating}>Добавить задачу</button>
				</form>	</>
				)}
				<button className={ styles.cancelButton } onClick={onClose}>Отмена</button>
				<button  className={ styles.cancelButton }
					onClick={() => {
						if (actionType === "update") {
							const newTitle =
								document.getElementById("update-title").value;
							const newBody =
								document.getElementById("update-body").value;
							onSubmit(task.id, newTitle, newBody);
						} else if (actionType === "delete")  {
							onSubmit(task.id);
						} else if (actionType === "add") {
							const newTitle =
								document.getElementById("update-title").value;
							const newBody =
								document.getElementById("update-body").value;
							onSubmit(newTitle, newBody);
						}
						onClose();
					}}
				>
					{actionType === "update" ? "Сохранить" : "Удалить"}
				</button>
			</div>
		</div>
	);
}

export default Modal;
