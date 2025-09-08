import { useState } from "react";
import { ref, set } from "firebase/database";
import { db } from "../firebase";

export const useReqUpdate = () => {
	const [isUpdating, setIsUpdating] = useState(false);

	const reqUpdate = (id, newTitle, newBody) => {
		setIsUpdating(true);
		const refdb = ref(db, `todos/${id}`);

		set(refdb, {
			title: newTitle,
			body: newBody,
		})
			.then(() => console.log("Запись обновлена!"))
			.finally(() => setIsUpdating(false));
	};

	return { reqUpdate, isUpdating };
};
