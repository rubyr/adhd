<script>
  import { onInterval } from "../scripts/onInterval";
  import { fade } from "svelte/transition";
  import { onMount } from "svelte";

  export let fail;
  export let disabled;
  let failed = false;

  let num = 0;
  let hiddenInc = 0.67;
  let incValue = 0.6;

  let canv;
  let ctx;

  onMount(() => (ctx = canv.getContext("2d")));

  onInterval(() => {
    if (disabled) return;
    num += incValue + hiddenInc;

    // shift everything to the left:
    var imageData = ctx.getImageData(
      1,
      0,
      ctx.canvas.width - 1,
      ctx.canvas.height
    );
    ctx.putImageData(imageData, 0, 0);
    // now clear the right-most pixels:
    ctx.clearRect(ctx.canvas.width - 1, 0, 1, ctx.canvas.height);

    ctx.fillStyle = "red";
    ctx.fillRect(canv.width - 1, ((100 - num) / 200) * canv.height, 1, 1);

    if (Math.abs(num) >= 100) {
      fail();
      failed = true;
      return;
    }
  }, 1000 / 60);
</script>

<style>
  .holder {
    display: grid;
    grid-template-columns: auto 1fr;
  }

  section {
    padding: 20px;
    border: 1px solid black;
  }

  canvas {
    border: 1px solid black;
  }
</style>

<section transition:fade style="background: {failed ? '#eeaaaa' : 'inherit'}">
  <div class="holder">
    <input
      type="range"
      min={-5}
      max={5}
      bind:value={incValue}
      step={0.1}
      orient="vertical"
      disabled={failed || disabled} />
    <canvas bind:this={canv} width={300} />
  </div>
</section>
