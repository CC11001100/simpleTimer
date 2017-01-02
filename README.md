## 简单的倒计时插件


Author： CC11001100

简单倒计时

1. 支持页面内同时存在多个计时器并且不互相干扰
2. 支持多种格式，比如可以省略天、小时...等等，前面省略会自动加到后面，最多可以只有秒
3. 倒计时可以是秒数，可以是时间戳，可以是日期时间（设置一种即可）

Usage:

<div class="timer-simple-seconds" (timer="3600" | timestamp="1482737420000" | datetime="2016-12-26 15:30:20") >
	<span class="day">0</span>天
	<span class="hour">00</span>时
	<span class="minute">00</span>分
	<span class="second">00</span>秒
</div>