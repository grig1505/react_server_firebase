import { useState } from "react";
import { ref, remove } from "firebase/database";
import { db } from "../firebase";

export const useReqDelete = () => {
	const [isDeleting, setIsDeleting] = useState(false);

	const reqDelete = () => {
		setIsDeleting(true);

		const refdb = ref(db, "todos/{id}");
		remove(refdb)
			.then(() => {
				console.log("Фен удален");
			})
			.finally(() => setIsDeleting(false));
	};

	return { reqDelete, isDeleting };
};
