import BaseSetupService from '@/setup/BaseSetupService';
import { useValidation } from '@orion.ui/orion';
import { reactive } from 'vue';

type Props = SetupProps<typeof PostModalCreateSetupService.props>

export default class PostModalCreateSetupService extends BaseSetupService<Props> {
	static props = {};

	post = reactive({
		title: undefined as Undef<string>,
		body: undefined as Undef<string>,
	});

	validator = useValidation(this.post, {
		title: 'required|length:5,10|hasUppercase',
		body: 'required|length:10',
	});

	constructor (props?: Props) {
		super(props);
	}

	savePost () {
		const formIsValid = this.validator.validate();

		if (formIsValid) {
			//...
		} else {
			this.validator.showValidationState();
		}
	}
}
