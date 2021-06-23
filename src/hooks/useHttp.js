import React, { useCallback, useState } from "react";

const useHttp = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const sendRequest = useCallback(async (requestConfig, applydata) => {
		setIsLoading(true);
		setError(null);
		try {
			const response = await fetch(
				// "https://react-http-f4f7f-default-rtdb.firebaseio.com/tasks.json"
				requestConfig.url,
				{
					method: requestConfig.method ? requestConfig.method : "GET",
					headers: requestConfig.headers ? requestConfig.headers : {},
					body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
				}
			);

			if (!response.ok) {
				console.log("Data add failed ");
				throw new Error("Request failed!");
			}

			const data = await response.json();

			applydata(data);
		} catch (err) {
			setError(err.message || "Something went wrong!");
		}
		setIsLoading(false);
	}, []);

	return { isLoading, error, sendRequest };
};

export default useHttp;
