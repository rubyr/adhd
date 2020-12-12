<script>
  import { onInterval } from "../scripts/onInterval";
  import { fade } from "svelte/transition";

  export let fail;
  export let disabled = false;
  let failed = false;

  let pos = 1;
  let boxpos = { x: Math.floor(Math.random() * 3), y: 100 };

  onInterval(() => {
    boxpos.y -= failed || disabled ? 0 : 0.3;
    if (boxpos.y <= 20) {
      if (pos === boxpos.x) {
        fail();
        failed = true;
      } else if (boxpos.y <= 0) {
        boxpos = { x: Math.floor(Math.random() * 3), y: 100 };
      }
    }
  }, 1000 / 60);
</script>

<style>
  .holder {
    height: 120px;
    width: 60px;
    border: 1px solid grey;
    position: relative;
  }

  .block {
    width: 20px;
    height: 20px;
    background: black;
    position: relative;
  }

  .pos {
    width: 20px;
    height: 20px;
    background: grey;
    position: absolute;
    bottom: 0px;
  }

  section {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    gap: 5px;
    border: 1px solid black;
  }
</style>

<section transition:fade style="background: {failed ? '#eeaaaa' : 'inherit'}">
  <div class="holder">
    <div
      class="block"
      style="top: calc({100 - boxpos.y}% - calc(20px * {(100 - boxpos.y) / 100})); left: {boxpos.x * 20}px" />
    <div class="pos" style="left: calc({pos} * 20px)" />
  </div>

  <button
    disabled={failed || disabled}
    on:click={() => (pos = Math.max(pos - 1, 0))}>{'<'}</button>
  <button
    disabled={failed || disabled}
    on:click={() => (pos = Math.min(pos + 1, 2))}>{'>'}</button>
</section>
