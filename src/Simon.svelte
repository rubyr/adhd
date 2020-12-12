<script>
  import { onInterval } from "../scripts/onInterval";
  import { fade } from "svelte/transition";
  import shuffle from "../scripts/shuffle";

  export let fail;
  export let disabled;
  let failed = false;

  let order = shuffle([1, 2, 3, 4]);
  let pressed = "";

  let progress = 0;
  let progressTimer = setInterval(() => {
    progress += disabled ? 0 : 1 / 60;
  }, 1000 / 60);

  onInterval(() => {
    clearInterval(progressTimer);
    if (disabled) return;
    if (pressed.length < 4) {
      fail();
      failed = true;
      return;
    }
    order = shuffle([1, 2, 3, 4]);
    pressed = "";
    progressTimer = setInterval(() => {
      progress += disabled ? 0 : 1 / 60;
    }, 1000 / 60);
  }, 14200);

  const clicked = (ans) => {
    clearInterval(progressTimer);
    if (ans === pressed.length + 1) {
      pressed += ans;
    } else {
      fail();
      failed = true;
    }
  };
</script>

<style>
  .holder {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  section {
    padding: 20px;
    border: 1px solid black;
  }
</style>

<section transition:fade style="background: {failed ? '#eeaaaa' : 'inherit'}">
  <div class="holder">
    {#each order as n}
      <button
        style={pressed.length === 4 ? '' : `background: linear-gradient(to right, lightgray ${100 * (progress / 14.2)}%, white ${100 * (progress / 14.2) + 0.1}%)`}
        disabled={disabled || pressed.length === 4}
        on:click={() => clicked(n)}>{n}</button>
    {/each}
  </div>
</section>
