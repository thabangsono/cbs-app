<script>
// @ts-nocheck

    let showData = false;

    let data = [
        { id: 1, name: 'name'},
        { id: 2, name: 'description'},
        { id: 3, name: 'logo_uri'}
    ];

    function displayProvider(){
        showData = true;
    }
</script>


<div class="grid">
    <div>
        <h2>Providers</h2>
        <article>
            <header> User Details</header>
            <p>
                Update User details
            </p>
            <button class="outline secondary">Delete Provider</button>
            <a href="/" role="button" class="outline constrast" style="width: 100%;">Edit Details</a>
        </article>
    </div>
    <form action="?/createProvider" method="POST">
        <h3>New Provider</h3>
        <label for="description">Desciption</label>
        <input type="text" id="description" name="description"/>
        <label for="logo_uri">Logo URI</label>
        <textarea id="content" name="content" />
        <button type="submit">Update Provider</button>
    </form>
</div>