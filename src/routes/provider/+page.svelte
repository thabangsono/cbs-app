<script lang="ts">
	import { enhance } from '$app/forms';

	export let data;

	export let form;

	$: errors = form?.error;
</script>

<h1>Provider</h1>

<form method="POST" action="?/create" use:enhance>
	<label>
		Name
		{#if errors?.name}
			<span>{errors.name}</span>
		{/if}
		<input name="name" />
	</label>
	<label>
		Description
		{#if errors?.description}
			<span>{errors?.description}</span>
		{/if}
		<input name="description" />
	</label>
	<label>
		Logo URI
		{#if errors?.logo_uri}
			<span>{errors?.logo_uri}</span>
		{/if}
		<input name="logo_uri" />
	</label>
	<label>
		Activate
		<input name="isActive" type="checkbox" />
	</label>
	<button>Save</button>
</form>

<br />

<ul>
	{#each data.providers as provider}
		<ul>
			<li>
				<nav>
					<a href="/provider/{provider.id}">{provider.name}</a>

					<form method="POST" action="?/delete">
						<button name="provider_id" value={provider.id}>Delete</button>
					</form>
				</nav>
			</li>
		</ul>
	{/each}
</ul>

<style>
	form {
		display: grid;
		width: 250px;
	}
</style>
