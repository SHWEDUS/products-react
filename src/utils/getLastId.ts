export const getLastId = (): number => {
	try {
		return Number(localStorage.getItem('lastId'));
	} catch (e) {
		return 1;
	}
};
