import { useState, useCallback } from "react";

export const usePaginate = (array, pageSize) => {
	const [currentPageIndex, setCurrentPageIndex] = useState(0);

	const pageCount = Math.ceil(array.length / pageSize);

	const currentPage = array.slice(
		currentPageIndex * pageSize,
		(currentPageIndex + 1) * pageSize
	);

	const nextPage = useCallback(() => {
		if (currentPageIndex < pageCount - 1) {
			setCurrentPageIndex(currentPageIndex + 1);
		}
	}, [currentPageIndex, pageCount]);

	const previousPage = useCallback(() => {
		if (currentPageIndex > 0) {
			setCurrentPageIndex(currentPageIndex - 1);
		}
	}, [currentPageIndex]);

	return {
		currentPage,
		currentPageIndex,
		nextPage,
		previousPage,
		setCurrentPageIndex,
		pageCount,
	};
};
