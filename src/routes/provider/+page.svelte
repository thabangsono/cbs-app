<script lang="ts">
	import { enhance } from '$app/forms';

	export let data;

	export let form;

	$: errors = form?.error;
</script>

<h1>Provider</h1>

<form method="POST" action="?/create" use:enhance>
		<label for="name">Name</label>
		<input name="name" />
		{#if errors?.name}
			<span class="small">{errors.name}</span>
		{/if}

	<label for="description">Description</label>
	<input name="description" />
		{#if errors?.description}
			<span class="small">{errors?.description}</span>
		{/if}

	<label for="logo_uri"></label>
	<input name="logo_uri" />
		Logo URI
		{#if errors?.logo_uri}
			<span class="small">{errors?.logo_uri}</span>
		{/if}
		
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

	label {
		display: block;
		margin-top: 20px;
	}
	span.small {
		font-size: smaller;
		color: #ff0000;
	}
</style>
