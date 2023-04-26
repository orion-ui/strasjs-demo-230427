<template>
	<o-section title="Nouveau post">
		<div class="flex fd-c g-sm">
			<o-input
				v-model="setup.post.title"
				label="Titre"
				autofocus
				:validation="setup.validator.rule('title')"
				validation-error-message="Requis"/>
			<o-textarea
				v-model="setup.post.body"
				label="Contenu"
				show-length
				:validation="setup.validator.rule('body')"/>
		</div>
	</o-section>

	<o-section
		align="stretch"
		gap="sm">
		<o-button
			color="danger"
			nude
			@click="_modal?.close()">
			Annuler
		</o-button>
		<o-button
			color="success"
			outline
			@click="setup.savePost()">
			Enregistrer
		</o-button>
	</o-section>
</template>

<script setup lang="ts">
import PostModalCreateSetupService from '@/setup/post/PostModalCreateSetupService';
import { inject } from 'vue';
const _modal = inject<OrionModal>('_modal');
const props = defineProps(PostModalCreateSetupService.props);
const setup = new PostModalCreateSetupService(props);
</script>

<style scoped lang="less">

</style>
