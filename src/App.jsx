import { useEffect, useState } from 'react';
import {
    useReqGet,
    useReqAdd,
    useReqUpdate,
    useReqDelete,
} from './hooks';
function App() {
	const { tdlist, setTdlist, isLoading } = useReqGet();
 	const { reqAdd, isCreating } = useReqAdd(setTdlist);
    const { reqUpdate, isUpdating } = useReqUpdate();
    const { reqDelete, isDeleting } = useReqDelete(setTdlist);

//http:/localhost:3005/todos
    return (
		<div className="container">
		<div className="list">
			<h1>Список задач</h1>
            {isLoading ? (
                <div className="loader"></div>
            ) : (
                Object.values(tdlist).map(({ id, title, body }) => (
                    <div className='list-item' key={id}>
						{title} - {body}
						<button disabled={isUpdating} onClick={reqUpdate(id)}>Обновить</button>
						<button disabled={isDeleting} onClick={reqDelete}>Удалить</button>
					</div>

                ))
				)}
			<button disabled={isCreating} onClick={reqAdd}>
                Добавить задачу
				</button>
			</div>

        </div>
    );
};
export default App;
