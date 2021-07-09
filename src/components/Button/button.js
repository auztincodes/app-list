export default {
	props: {
		size: {
			type: String,
			default: 'default',
			validator: function (value) {
				return ['full', 'large', 'modal', 'default'].indexOf(value) !== -1;
			}
		},
		buttonType: {
			type: String,
			default: 'primary',
			validator: function (value) {
				return ['primary', 'outline','warning'].indexOf(value) !== -1;
			}
		},
		submitType: {
			type: String,
			default: 'button',
		}
	},
	computed: {
		classes() {
			return {
				btn: true,
				[`btn-${this.buttonType}`]: true,
				[`btn-${this.size}`]: true
			};
		}
	}
};
