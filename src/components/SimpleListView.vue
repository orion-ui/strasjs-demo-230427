<template>
	<o-page
		title="Simple list"
		subtitle="Fetched from {JSON}Placeholder">
		<template #actions>
			<o-icon
				icon="search"
				@click="setup.triggerSearchPromptAsync()"/>
			<o-button
				color="brand"
				@click="setup.createNewPostAsync()">
				Nouveau post
			</o-button>
		</template>

		<o-list
			v-model:page="setup.page"
			:list="setup.list"
			:total="setup.filteredList.length">
			<template #default="{ item }">
				<post-card
					:post="item"
					:search-term="setup.search"
					@click="setup.openPostAsync(item)"/>
			</template>
		</o-list>
	</o-page>
</template>

<script setup lang="ts">
import PostCard from './post/PostCard.vue';
import SimpleListViewSetupService from '@/setup/SimpleListViewSetupService';
const props = defineProps(SimpleListViewSetupService.props);
const setup = new SimpleListViewSetupService(props);
</script>

<style scoped lang="less">

</style>
