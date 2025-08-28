import { useState } from "react";
import { ref, push } from "firebase/database";
import { db } from "../firebase";

export const useReqAdd = () => {
	const [isCreating, setIsCreating] = useState(false);

	const reqAdd = () => {
		setIsCreating(true);

		const todoRef = ref(db, "todos");
		push(todoRef, {
			title:'Добавленная задача',
			body: 'Текскт задачи',
		})
			.then((response) => {
				console.log("response", response);
			})
			.finally(() => setIsCreating(false));
	};

	return { reqAdd, isCreating };
};
