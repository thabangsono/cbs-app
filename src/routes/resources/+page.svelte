<script lang="ts">
export let data;
let providers = data.providers;

</script>

<h1>Add Resource</h1>
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
		Type
		<select name="type">
			<option value="File">File</option>
			<option value="Live">Live</option>
		</select>
	</label>
	<label>
		Url
		<input name="url" />
	</label>
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