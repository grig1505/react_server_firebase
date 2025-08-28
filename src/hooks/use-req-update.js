import { useState } from "react";
import { ref, set } from "firebase/database";
import { db } from "../firebase";

export const useReqUpdate = () => {
	const [isUpdating, setIsUpdating] = useState(false);

	const reqUpdate = (id) => {
		setIsUpdating(true);

		const refdb = ref(db, `todos/${id}`);

		set(refdb, {
			title: "Новый заголовок",
			body: 'Новый текст',
		})
			.then((response) => {
				console.log("response", response);
			})
			.finally(() => setIsUpdating(false));
	};

	return { reqUpdate, isUpdating };
};
