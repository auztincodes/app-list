import { ValidationProvider, extend } from 'vee-validate';
import * as rules from 'vee-validate/dist/rules';

import { messages } from 'vee-validate/dist/locale/en.json';

Object.keys(rules).forEach((rule) => {
	rule === 'email' ? (messages[rule] = 'Invalid email address') : null;
	extend(rule, {
		...rules[rule], // copies rule configuration
		message: messages[rule] // assign message
	});
});

export default {
	name: 'InputComponent',
	components: {
		ValidationProvider
	},
	props: {
		name: {
			type: String,
			default: ''
		},
		rules: {
			type: [Object, String],
			default: ''
		},
		placeholder: {
			type: String,
			default: ''
		},
        disabled: {
			type: Boolean,
			default: false
		},
		type: {
			type: String,
			default: 'text',
			validator(value) {
				return ['url', 'textarea', 'text', 'password', 'tel', 'search', 'number', 'email', 'date', 'file'].includes(value);
			}
		},
		value: {
			type: null,
			default: ''
		},
        width: {
			type: String,
			default: ''
		},
		vid: {
			type: String,
			default: ''
		},
	},
    data: () => ({
		innerValue: ''
	}),
	computed: {
		hasValue() {
			return !!this.innerValue;
		},
		style() {
			return {
				width: this.width
			};
		}
	},
    watch: {
		innerValue(value) {
			this.$emit('input', value);
		},
		value(val) {
			if (val !== this.innerValue) {
				this.innerValue = val;
			}
		}
	},
	created() {
        if (this.value) {
			this.innerValue = this.value;
		}
    },
};
