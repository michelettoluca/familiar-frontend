export const getQueriesStatus = queries => {
	const isIdle = queries.some(query => query.isIdle);
	if (isIdle) return "idle";

	const isLoading = queries.some(query => query.isLoading);
	if (isLoading) return "loading";

	const isError = queries.some(query => query.isError);
	if (isError) return "error";

	const isSuccess = queries.some(query => query.isSuccess);
	if (isSuccess) return "success";
};
