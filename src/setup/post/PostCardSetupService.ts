import { reactive, type PropType } from 'vue';
import BaseSetupService from '@/setup/BaseSetupService';
import { random } from 'lodash-es';
import { Bus, sleep, useConfirm, useNotif } from '@orion.ui/orion';

type Props = SetupProps<typeof PostCardSetupService.props>

export default class PostCardSetupService extends BaseSetupService<Props> {
	static props = {
		post: {
			type: Object as PropType<JsonPlaceholderPost>,
			required: true as const,
		},
		searchTerm: {
			type: String,
			default: undefined,
		},
	};

	private state = reactive({ ajax: false });

	get ajax () {
		return this.state.ajax;
	}

	get publishDate () {
		return new Date(2023, random(0, 11), random(1, 31));
	}

	constructor (props?: Props) {
		super(props);
	}


	async deletePostAsync () {
		// if (await useConfirm(`Confirmez la suppression ?`)) {
		this.state.ajax = true;
		await sleep(1000);
		Bus.emit('post:delete', this.props.post.id);
		useNotif.success(`Suppression réussie`);
		// }
	}
}
