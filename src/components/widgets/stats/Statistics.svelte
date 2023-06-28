<script lang="ts">
	import { mode } from "../../../stores";
	import { modeData, Stats } from "../../../utils";

	import Stat from "./Stat.svelte";
	export let data: Stats;

	let stats: [string, string | number][];
	$: {
		stats = [
			["游戏数", data.played],
			["胜利 %", Math.round(((data.played - data.guesses.fail) / data.played) * 100) || 0],
			[
				"平均步骤",
				(
					Object.entries(data.guesses).reduce((a, b) => {
						if (!isNaN(+b[0])) {
							return a + +b[0] * b[1];
						}
						return a;
					}, 0) / data.played || 0
				).toFixed(1),
			],
		];
		if (data.guesses.fail > 0) {
			stats.push(["失败", data.guesses.fail]);
		}
		if (data.hasStreak) {
			stats.push(["目前连胜纪录", data.streak]);
			stats.push(["最大连胜纪录", data.maxStreak]);
		}
	}
</script>

<h3>统计 ({modeData.modes[$mode].name})</h3>
<div>
	{#each stats as stat}
		<Stat name={stat[0]} stat={stat[1]} />
	{/each}
</div>

<style>
	div {
		display: flex;
		justify-content: center;
		gap: 8px;
	}
</style>
