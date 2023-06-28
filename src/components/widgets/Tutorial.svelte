<script lang="ts">
	import { COLS, ROWS } from "../../utils";

	import { Tile } from "../board";
	export let visible: boolean;
</script>

<h3>玩法介绍</h3>
<div>在 {ROWS} 次机会中猜出 <strong>WORDLE</strong> 单词 </div>
<div>每个猜测必须是一个有效的含有 {COLS} 个字母的单词，确认后点击<strong>提交</strong>按钮提交。 </div>
<div>
	每次猜测后，方块的颜色会发生变化，以显示你猜测的单词与目标词的接近程度。
</div>
<div class:complete={visible} class="examples">
	<div><strong>例子🌰</strong></div>
	<div class="row">
		<Tile value="w" state="🟩" />
		<Tile value="e" state="🔳" />
		<Tile value="a" state="🔳" />
		<Tile value="r" state="🔳" />
		<Tile value="y" state="🔳" />
	</div>
	<div>字母 <strong>W</strong> 在单词中且位置正确。</div>
	<div class="row">
		<Tile value="p" state="🔳" />
		<Tile value="i" state="🟨" />
		<Tile value="l" state="🔳" />
		<Tile value="l" state="🔳" />
		<Tile value="s" state="🔳" />
	</div>
	<div>字母 <strong>I</strong> 在单词中但是位置不对。</div>
	<div class="row">
		<Tile value="v" state="🔳" />
		<Tile value="a" state="🔳" />
		<Tile value="g" state="🔳" />
		<Tile value="u" state="⬛" />
		<Tile value="e" state="🔳" />
	</div>
	<div>字母 <strong>U</strong> 不在单词中。</div>
</div>
<div>
	这是由 Josh Wardle 开发的热门猜词游戏 <a
		href="https://www.nytimes.com/games/wordle/"
		target="_blank"
		rel="noreferrer">Wordle</a
	>
	的改进版。
	<br />
	切换成无限模式即可体验无限Wordle。
	<br />
	打开设置以查看其他新增功能。
	<br /><br />
	由 
	<a href="https://github.com/yuzh0816" target="_blank" rel="noreferrer">yuzh</a> 开发
	<br />
	自 
	<a href="https://github.com/MikhaD" target="_blank" rel="noreferrer">MikhaD</a> 作品二次创作
</div>

<style lang="scss">
	div {
		margin: 14px 0;
	}
	.examples {
		border-top: 1px solid var(--border-primary);
		border-bottom: 1px solid var(--border-primary);
		:global(.row > *) {
			height: 100%;
			aspect-ratio: 1;
		}
		&:not(.complete) :global(.row .back) {
			transition-delay: 0.3s;
		}
	}
	.row {
		height: 40px;
		display: flex;
		gap: 4px;
	}
</style>
