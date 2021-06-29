<script>
  import { onInterval } from "../scripts/onInterval";
  import components from "./components";
  import choose from "../scripts/choose";
  import { aWords, dNouns, dVerbs, hWords } from "../resources/titles";

  let score = 0;
  let failed = false;

  const title = [aWords, dVerbs, hWords, dNouns]
    .map((n) => choose(n))
    .join(" ");

  let onFail = () => {
    failed = true;
  };
  onInterval(() => {
    score += failed ? 0 : 1;
  }, 1000);
</script>

<style>
  main {
    display: flex;
    flex-wrap: wrap;
    gap: 1px;
  }
  footer {
    position: absolute;
    bottom: 0;
    font-size: 0.8em;
  }
</style>

<svelte:head>
  <title>{title}</title>
</svelte:head>
<h1>{score}</h1>
<main>
  {#each components as c}
    {#if score >= c[0]}
      <svelte:component this={c[1]} fail={onFail} disabled={failed} />
    {/if}
  {/each}
</main>
<footer>
  <p>made by <a href="https://www.twitter.com/woobyrubes">@woobyrubes</a></p>
</footer>
