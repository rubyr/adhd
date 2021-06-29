<script>
  import { onInterval } from "../../scripts/onInterval";

  export let fail;
  export let disabled = false;
  let failed = false;

  let pos = 100;

  onInterval(() => {
    pos -= failed || disabled ? 0 : 0.1;
    if (pos <= 0) {
      fail();
      failed = true;
    }
  }, 1000 / 60);
</script>

<style>
  .holder {
    height: 120px;
    width: 20px;
    border: 1px solid grey;
  }

  .block {
    width: 20px;
    height: 20px;
    background: black;
    position: relative;
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

<section style="background: {failed ? '#eeaaaa' : 'inherit'}">
  <div class="holder">
    <div
      class="block"
      style="top: calc({pos}% - calc(20px * calc({pos} / 100)))" />
  </div>

  <button
    disabled={failed || disabled}
    on:click={() => (pos = 100)}>click</button>
</section>
