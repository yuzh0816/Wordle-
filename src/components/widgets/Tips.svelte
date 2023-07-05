<script context="module" lang="ts">
	const tips = [
		"你可以通过点击WORDLE+或左右滑动棋盘来改变游戏模式。",
		"困难模式是针对游戏模式的。在一个游戏模式中打开它，不会在其他游戏模式中改变它。",
		"双击单词可以学习你所输入单词的网络释义",
		"如果你还没有违反困难模式的规则，可以在游戏中启用困难模式。",
		"双击或右击下一行，看看还可以打出多少个可能的单词，如果你已经使用过之前的所有信息。",
		"因为单词是随机从列表中选择的，所以有可能再次得到相同的单词。（尽管几乎不可能）",
		"当你看到左上角的刷新按钮时，这意味着一个新词已经准备好了。",
		"在每日挑战中每个人在同一时间都有相同的词条。你的词#73和其他人的#73是一样的。",
		"有效的猜测多于可能的单词，即不是所有的5个字母的单词都能被游戏选择为答案。",
		"历史游戏不计入你的统计数据。历史游戏是指你跟随一个链接到一个特定的游戏编号。",
		"每个游戏模式只保存最近的历史游戏数据。",
	];
</script>

<script lang="ts">
	export let change: boolean;
	let index = Math.floor(tips.length * Math.random());
	$: if (change) index = Math.floor(tips.length * Math.random());

	function nextTip() {
		index = (index + 1) % tips.length;
	}
	function previousTip() {
		index = (index - 1 + tips.length) % tips.length;
	}
</script>

<div class="outer">
	<div class="number">小提示 {index + 1}/{tips.length}</div>
	<div class="tip">{tips[index]}</div>
	<svg
		class="left"
		on:click={previousTip}
		on:keydown={previousTip}
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 100 100"
	>
		<path d="M75,0L25,50L75,100z" />
	</svg>
	<svg
		on:click={nextTip}
		on:keypress={nextTip}
		class="right"
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 100 100"
	>
		<path d="M25,0L75,50L25,100z" />
	</svg>
</div>

<style lang="scss">
	.outer {
		margin: 15px auto;
		padding: 10px 20px;
		max-width: calc(0.6 * var(--game-width));
		border: solid 1px var(--border-secondary);
		background: var(--bg-secondary);
		border-radius: 4px;
		position: relative;
	}
	.number {
		text-align: center;
		font-weight: bold;
		font-size: 1.2em;
		margin-bottom: 10px;
	}
	.left,
	.right {
		cursor: pointer;
		position: absolute;
		border-radius: 4px;
		background: var(--fg-primary);
		fill: var(--bg-primary);
		height: 45px;
		padding: 10px 0;
		top: 50%;
	}
	.left {
		left: 0;
		transform: translate(-50%, -50%);
	}
	.right {
		right: 0;
		transform: translate(50%, -50%);
	}
	.tip {
		text-align: center;
		min-height: 70px;
	}
</style>
