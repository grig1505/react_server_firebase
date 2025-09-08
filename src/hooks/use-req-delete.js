import { useState } from "react";
import { ref, remove } from "firebase/database";
import { db } from "../firebase";

export const useReqDelete = (setTdlist) => {
	const [isDeleting, setIsDeleting] = useState(false);

	const reqDelete = (id) => {
		setIsDeleting(true);
		const refdb = ref(db, `todos/${id}`);

		remove(refdb)
			.then(() => {
				console.log("Запись удалена!");
				setTdlist((prevTdlist) => {
					const newTdlist = { ...prevTdlist };
					delete newTdlist[id];
					return newTdlist;
				});
			})
			.finally(() => setIsDeleting(false));
	};

	return { reqDelete, isDeleting };
};
