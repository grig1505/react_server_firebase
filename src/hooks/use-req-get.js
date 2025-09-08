import { useState, useEffect } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "../firebase";

export const useReqGet = () => {
	const [tdlist, setTdlist] = useState({});
	const [isLoading, setIsLoading] = useState(true);


	useEffect(() => {
		const tdlistRef = ref(db, "todos");
		setIsLoading(true);

		const unsubscribe = onValue(tdlistRef, (snapshot) => {
			const data = snapshot.val() || {};
			setTdlist(data);
			console.log("tdlist", data);
			setIsLoading(false);
		});

		return () => unsubscribe();
	}, []);



	return { isLoading, tdlist, setTdlist};
};
