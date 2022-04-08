import React from "react";

export const useForm = initialState => {
	const [form, setForm] = React.useState(initialState);

	const setFormField = e => {
		const { name, value } = e.target;
		setForm({ ...form, [name]: value });
	};

	return [form, setFormField];
};
