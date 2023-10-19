<script lang="ts">
	import { enhance } from '$app/forms';

	export let data;

	export let form;

	export let errors = form?.error;
	console.log(form?.error);
</script>

<h1>Provider</h1>

<form method="POST" action="?/create">
	<label>
		Name
		{#if errors?.name}
			<label>{errors?.name[0]}</label>
		{/if}
		<input name="name" />
	</label>
	<label>
		Description
		{#if errors?.description}
			<label>{errors?.description[0]}</label>
		{/if}
		<input name="description" />
	</label>
	<label>
		Logo URI
		{#if errors?.logo_uri}
			<label>{errors?.logo_uri[0]}</label>
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
