<script lang="ts">

	export let data;

</script>

<h1>{data.provider?.name}</h1>
<form method="POST" action='?/update'>
	<label for="name">Name:</label>
	<input value={data.provider?.name} name="name"/>

	<label for="description">Description:</label>
	<input value={data.provider?.description} name="description"/>

	<label for="logo_uri">Logo URI:</label>
	<input value={data.provider?.logo_uri} name="logo_uri"/>

	<label for="isActive">Activate:</label>
	<input type="checkbox" checked={data.provider?.isActive} name="isActive" />

	<button type="submit" >Update</button>
</form>