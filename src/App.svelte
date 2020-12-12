<script>
  import Falling from "./Falling.svelte";
  import Buttons from "./Buttons.svelte";
  import Typer from "./Typer.svelte";
  import { onInterval } from "../scripts/onInterval";
  import Dodger from "./Dodger.svelte";
  import Math from "./Math.svelte";
  import Colors from "./Colors.svelte";
  import Simon from "./Simon.svelte";
  import choose from "../scripts/choose";
  import { aWords, dNouns, dVerbs, hWords } from "../resources/titles";
import Stonks from "./Stonks.svelte";

  let score = 0;
  let failed = false;

  const title = [aWords, dVerbs, hWords, dNouns]
    .map((n) => choose(n))
    .join(" ");

  const components = [
    [0, Falling],
    [20, Buttons],
    [45, Typer],
    [70, Dodger],
    [100, Math],
    [130, Colors],
    [170, Simon],
    [210, Stonks],
    // [0, Buttons],
    // [0, Typer],
    // [0, Dodger],
    // [0, Math],
    // [0, Colors],
    // [0, Simon],
    // [0, Stonks],
  ];

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
