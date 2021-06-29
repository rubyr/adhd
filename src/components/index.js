import Falling from "./Falling.svelte";
import Buttons from "./Buttons.svelte";
import Typer from "./Typer.svelte";
import Dodger from "./Dodger.svelte";
import Math from "./Math.svelte";
import Colors from "./Colors.svelte";
import Simon from "./Simon.svelte";
import Stonks from "./Stonks.svelte";

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

export default components;