<script lang="ts">
	export let data;
</script>

<h1>Provider</h1>

<form method="POST" action="?/create">
	<label>
		Name
		<input name="name" />
	</label>
	<label>
		Description
		<input name="description" />
	</label>
	<label>
		Logo URI
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
		<li>
			{provider.name}
		</li>
	{/each}
</ul>

<style>
	form {
		display: grid;
		width: 250px;
	}
</style>
