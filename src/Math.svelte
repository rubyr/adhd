<script>
  import { onInterval } from "../scripts/onInterval";
  import { fade } from "svelte/transition";
  import shuffle from "../scripts/shuffle";

  export let fail;
  export let disabled;
  let failed = false;

  let equation = `${Math.floor(Math.random() * 11) - 5} ${
    ["+", "-"][Math.floor(Math.random() * 2)]
  } ${Math.floor(Math.random() * 6)}`;

  $: answer = new Function("", `return ${equation}`)();
  $: wrong1 = answer + 1;
  $: wrong2 = answer - 1;

  let progress = 0;
  let progressTimer = setInterval(() => {
    progress += disabled ? 0 : 1 / 60;
  }, 1000 / 60);

  onInterval(() => {
    clearInterval(progressTimer);
    if (disabled) return;
    if (equation !== "") {
      fail();
      failed = true;
      return;
    }
    equation = `${Math.floor(Math.random() * 11) - 5} ${
      ["+", "-"][Math.floor(Math.random() * 2)]
    } ${Math.floor(Math.random() * 6)}`;
    progressTimer = setInterval(() => {
      progress += disabled ? 0 : 1 / 60;
    }, 1000 / 60);
  }, 18500);

  const clicked = (ans) => {
    clearInterval(progressTimer);
    if (ans === answer) {
      equation = "";
      progress = 0;
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
      style="background: linear-gradient(to right, lightgray {100 * (progress / 18.5)}%, white {100 * (progress / 18.5) + 0.1}%)">
      {equation}
    </h2>
    <div class="inputs">
      {#each shuffle([answer, wrong1, wrong2]) as ans}
        <button
          on:click={() => clicked(ans)}
          disabled={failed || disabled}>{((typeof ans === "number" && !isNaN(ans)) ? ans : 0)}</button>
      {/each}
    </div>
    <div />
  </div>
</section>
