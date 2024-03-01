<script lang="ts">
    import '../app.scss';
</script>

<div>
    <header>
        <nav>
            <ul>
                <li>
                    <a href="/provider">provider</a>
                </li>
                <li>
                    <a href="/resources">resources</a>
                </li>
            </ul>
        </nav>
    </header>

    <main>
        <slot />
    </main>

    <footer>
        <ul>
            <li>&copy {new Date().getFullYear()}</li>
            <li>made by <a href="https://csir.co.za">CSIR</a></li>
        </ul>
    </footer>
</div>

<style>
    main {
        overflow: scroll;
    }

    div {
        display: grid;
        grid-template-rows: auto 1fr auto;
        height: 100%;
    }
</style>