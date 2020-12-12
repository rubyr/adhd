<script>
  import { onInterval } from "../scripts/onInterval";
  import words from "../resources/words";
  import { fade } from "svelte/transition";

  export let fail;
  export let disabled;
  let failed = false;

  let word = words[Math.floor(Math.random() * words.length)];
  let typed;

  let progress = 0;
  let progressTimer = setInterval(() => {
    progress += disabled ? 0 : 1 / 60;
  }, 1000 / 60);

  onInterval(() => {
    clearInterval(progressTimer);
    if (disabled) return;
    if (word !== "") {
      fail();
      failed = true;
      return;
    }
    word = words[Math.floor(Math.random() * words.length)];
    progressTimer = setInterval(() => {
      progress += disabled ? 0 : 1 / 60;
    }, 1000 / 60);
  }, 20000);

  const clicked = () => {
    clearInterval(progressTimer);
    if (typed === word) {
      word = "";
      typed = "";
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
    grid-template-rows: 80% 20%;
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
    <!-- this stuff is all so you can't select the word and copy paste -->
    <h2
      style="-moz-user-select: none; -webkit-user-select: none; -ms-user-select:none; user-select:none;-o-user-select:none;"
      unselectable="on"
      onselectstart="return false;"
      onmousedown="return false;">
      {@html word ? word : '&nbsp;'}
    </h2>
    <div class="inputs">
      <input
        disabled={failed || disabled}
        bind:value={typed}
        placeholder={word}
        style="background: linear-gradient(to right, lightgray {100 * (progress / 20)}%, white {100 * (progress / 20) + 0.1}%)" />
      <button
        disabled={failed || disabled}
        on:click={() => clicked()}>submit</button>
    </div>
    <div />
  </div>
</section>
