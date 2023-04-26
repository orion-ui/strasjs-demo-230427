<template>
	<o-card actions-line>
		<h4 v-html="post.title.mark(searchTerm)"/>
		<p>{{ post.body }}</p>
		<o-label>{{ setup.publishDate.toReadable('$dddd $DD $MMMM $YYYY') }}</o-label>

		<template #actions>
			<o-pop-confirm @confirm="setup.deletePostAsync()">
				<o-icon
					v-tooltip="`Supprimer`"
					icon="trash_full"
					ripple="danger"
					:loading="setup.ajax"
					@click.stop/>
			</o-pop-confirm>
		</template>

		<o-loader
			:visible="setup.ajax"
			message="Suppression..."
			color="danger"/>
	</o-card>
</template>

<script setup lang="ts">
import PostCardSetupService from '@/setup/post/PostCardSetupService';
const props = defineProps(PostCardSetupService.props);
const setup = new PostCardSetupService(props);
</script>

<style scoped lang="less">

</style>
