<script>
  import { onInterval } from "../../scripts/onInterval";
  import { fade } from "svelte/transition";
  import shuffle from "../../scripts/shuffle";
  import choose from "../../scripts/choose";

  export let fail;
  export let disabled;
  let failed = false;

  const colors = ["red", "green", "blue", "black"];
  let color = choose(colors);
  let colorWord = choose(colors);

  let progress = 0;
  let progressTimer = setInterval(() => {
    progress += disabled ? 0 : 1 / 60;
  }, 1000 / 60);

  onInterval(() => {
    clearInterval(progressTimer);
    if (disabled) return;
    if (color !== "") {
      fail();
      failed = true;
      return;
    }
    color = choose(colors);
    colorWord = choose(colors);
    progress = 0;
    progressTimer = setInterval(() => {
      progress += disabled ? 0 : 1 / 60;
    }, 1000 / 60);
  }, 16700);

  const clicked = (ans) => {
    clearInterval(progressTimer);
    if (ans === color) {
      color = "";
      colorWord = "";
    } else {
      fail();
      failed = true;
    }
  };
</script>

<style>
  .holder {
    display: grid;
    grid-template-rows: 1fr 1fr;
  }

  .inputs {
    grid-row: 2;
  }

  section {
    padding: 20px;
    border: 1px solid black;
  }
</style>

<section transition:fade style="background: {failed ? '#eeaaaa' : 'inherit'}">
  <div class="holder">
    <h2
      style="background: linear-gradient(to right, lightgray {100 * (progress / 16.7)}%, white {100 * (progress / 16.7) + 0.1}%); color: {color}">
      {colorWord}
    </h2>
    <div class="inputs">
      {#each colors as col}
        <button
          on:click={() => clicked(col)}
          disabled={failed || disabled}>{col}</button>
      {/each}
    </div>
    <div />
  </div>
</section>
