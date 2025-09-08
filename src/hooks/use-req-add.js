import { useState } from "react";
import { ref, push } from "firebase/database";
import { db } from "../firebase";

export const useReqAdd = () => {
	const [isCreating, setIsCreating] = useState(false);

	const reqAdd = (title, body) => {
		// добавляем параметры
		setIsCreating(true);
		const todoRef = ref(db, "todos");

		push(todoRef, {
			title,
			body,
		})
			.then(() => {
				console.log("Задача добавлена!");
			})
			.finally(() => setIsCreating(false));
	};

	return { reqAdd, isCreating };
};
