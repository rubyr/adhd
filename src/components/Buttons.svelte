<script>
  import { onInterval } from "../../scripts/onInterval";
  import { fade } from "svelte/transition";

  export let fail;
  export let disabled;
  let failed = false;

  let index = Math.floor(Math.random() * 9);

  let progress = 0;
  let progressTimer = setInterval(() => {
    progress += (disabled ? 0 : 1 / 60);
  }, 1000 / 60);

  const timeout = onInterval(() => {
    clearInterval(progressTimer);
    if (disabled) return;
    if (index !== -1) {
      fail();
      failed = true;
      return;
    }
    index = Math.floor(Math.random() * 9);
    progressTimer = setInterval(() => {
      progress += (disabled ? 0 : 1 / 60)
    }, 1000 / 60);
  }, 10000);

  const clicked = (i) => {
    clearInterval(progressTimer);
    if (i === index) {
      index = -1;
    } else {
      fail();
      failed = true;
    }
    progress = 0;
  };
</script>

<style>
  .holder {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
  }

  .button {
    width: 50px;
    height: 50px;
    background: black;
    position: relative;
  }

  .button:disabled {
    background: darkgray;
  }

  .active:disabled {
    background: lightgray;
  }

  .active {
    background: white;
  }

  section {
    padding: 20px;
    border: 1px solid black;
  }
</style>

<section transition:fade style="background: {failed ? '#eeaaaa' : 'inherit'}">
  <div class="holder">
    {#each Array(9).fill(1) as _, i}
      {#if i === index}
        <button
          disabled={failed || disabled}
          class="button active"
          style="background: linear-gradient(to right, lightgray {100 * (progress / 10)}%, white {100 * (progress / 10) + 0.1}%)"
          on:click={() => clicked(i)} />
      {:else}
        <button
          disabled={failed || disabled}
          class="button"
          on:click={() => clicked(i)} />
      {/if}
    {/each}
  </div>
</section>
