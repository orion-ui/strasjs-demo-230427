import { reactive } from 'vue';
import BaseSetupService from '@/setup/BaseSetupService';
import { upperFirst } from 'lodash-es';
import { Bus, sleep, useAside, useLoader, useModal, usePrompt } from '@orion.ui/orion';
import PostAside from '@/components/post/PostAside.vue';
import PostModalCreate from '@/components/post/PostModalCreate.vue';

type Props = SetupProps<typeof SimpleListViewSetupService.props>

export default class SimpleListViewSetupService extends BaseSetupService<Props> {
	static props = {};

	private state = reactive({
		search: undefined as Undef<string>,
		fulllist: [] as JsonPlaceholderPost[],
		page: {
			index: 1,
			size: 12,
		} as OrionList.Props['page'],
	});

	get page () { return this.state.page; }
	set page (val) { this.state.page = val; }

	get search () { return this.state.search; }

	get filteredList () {
		return this.state.fulllist.filter(
			x => !this.state.search || x.title.includes(this.state.search),
		);
	}

	get list () {
		return this.filteredList
			.slice(
				(this.state.page.index - 1) * this.state.page.size,
				this.state.page.index * this.state.page.size,
			)
			.map(x => ({
				...x,
				title: upperFirst(x.title),
				body: upperFirst(x.body),
			}));
	}


	constructor (props?: Props) {
		super(props);

		Bus.on('post:delete', (postId) => {
			this.state.fulllist.deleteWhere('id', postId as number);
		});
	}

	protected async onBeforeMountAsync () {
		useLoader().show(`Fetching data...`);

		await sleep(700); // simulate longer request
		const res = await fetch('https://jsonplaceholder.typicode.com/posts');
		this.state.fulllist = await res.json();

		useLoader().hide();
	}


	async openPostAsync (post: JsonPlaceholderPost) {
		useAside({
			Nested: PostAside,
			NestedProps: { post },
		});
	}

	async triggerSearchPromptAsync () {
		const { confirm, value } = await usePrompt<string>({
			title: `Search`,
			message: `Filter on post's title`,
		});

		confirm && value?.trim().length
			? (this.state.search = value)
			: (this.state.search = undefined);

		this.state.page.index = 1;
	}

	async createNewPostAsync () {
		useModal({ Nested: PostModalCreate });
	}
}
