export default {
	name: 'CTable',
	props: {
		tableHeaders: {
			required: true,
			default: []
		},
		tableData: {
			required: true,
			default: () => []
		},
		loading: {
			default: false
		}
	},
};
