/**
 * 简单倒计时
 * 
 *  1. 支持页面内同时存在多个计时器并且不互相干扰
 *  2. 支持多种格式，比如可以省略天、小时...等等，前面省略会自动加到后面，最多可以只有秒
 *  3. 倒计时可以是秒数，可以是时间戳，如果是时间戳需要指明timestamp="true"
 *
 * Usage:
 * 
 * 		<div class="timer-simple-seconds" timer="3600" timestamp="false">
 *			<span class="day">day</span>天
 * 			<span class="hour">hour</span>时
 * 			<span class="minute">minute</span>分
 * 			<span class="second">second</span>秒
 *		</div>
 *
 */
$(function(){
	
	//对所有的计时器进行处理
	var timers=$(".timer-simple-seconds");
	for(var i=0;i<timers.length;i++){
		var timer=$(timers[i]);
		//如果是时间戳，则预处理一下时间为倒计时秒数
		if(timer.attr("timestamp")=="true") prepareProcessTimer(timer);
		//先调用一次，避免误差
		processTimer(timer);
		setInterval(processTimer,1,timer);
	}
	
	/**
	 * doWhat: 这个函数将时间戳预处理成统一的倒计时描述
	 * 
	 * 对时间做一个预处理，因为如果服务器直接返回剩余的描述的话从服务器相应到客户端虽然短到几百毫秒但总是会有偏差的，这样子不太好
	 * 所以服务器只需要设置一个时间戳表示到哪里停止就可以了
	 * @param {Object} timer
	 */
	function prepareProcessTimer(timer){
		var total=parseInt(timer.attr("timer"));
		total=Math.round(total/1000);
		var now=new Date().getTime()/1000;
		timer.attr("timer",total-now);
	}
	
	/**
	 * 倒计时，滴答滴答...
	 * @param {Object} timer
	 */
	function processTimer(timer){
		var total=parseInt(timer.attr("timer"));
		var t=total;
		
		//倒计时不能为负
		if(total<0) return; //TODO 后续版本加上计时完毕可以回调函数
		
		//找到显示时间的元素
		var day=timer.find(".day");
		var hour=timer.find(".hour");
		var minute=timer.find(".minute");
		var second=timer.find(".second");
		
		//刷新计时器显示的值
		if(day.length){
			var d=Math.floor(t/(60*60*24));
			day.text(d);
			t-=d*(60*60*24);
		}
		if(hour.length){
			var h=Math.floor(t/(60*60));
			hour.text((h<10?"0":"")+h);
			t-=h*(60*60);
		}
		if(minute.length){
			var m=Math.floor(t/60);
			minute.text((m<10?"0":"")+m);
			t-=m*60;
		}
		if(second.length){
			second.text((t<10?"0":"")+t);
		}
		
		//一秒过去了...
		total--;
		timer.attr("timer",total);
	}
	
});