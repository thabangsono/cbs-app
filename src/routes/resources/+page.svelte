<script lang="ts">
	import { enhance } from '$app/forms';
	
	export let data;

	let providers = data.providers;

	export let form;

	$:errors = form?.error;

</script>

<h1>Add Resource</h1>
<form method="POST" action="?/create" use:enhance>
    <label for="name">Name</label>
		<input name="name" />
		{#if errors?.name}
			<span class="small">{errors.name}</span>
		{/if}
		
	<label for="description">Description</label>
		<input name="description" />
		{#if errors?.description}
			<span class="small">{errors.description}</span>
		{/if}

	<label>
		Type
		<select name="type">
			<option value="File">File</option>
			<option value="Live">Live</option>
		</select>
	</label>

	<label for = "url">Url<input name="url" /></label>
		{#if errors?.url}
			<span class="small">{errors.url}</span>
		{/if}

    <label>
		isActive
		<input name="isActive" type="checkbox" />
	</label>

	<label for="providers">
		{#each providers as provider}
		<label for="providers"> {provider.name}</label>
		<input name="providers" type="checkbox" value={ provider.id} />
		{/each}
	</label>
	
	<button>Save</button>
</form>

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