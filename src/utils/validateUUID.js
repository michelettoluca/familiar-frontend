const validateUuid = uuid => {
	const uuidTemplate =
		/^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;

	return uuidTemplate.test(uuid);
};

module.exports = validateUuid;
