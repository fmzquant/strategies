
> 策略名称

cancelorder加强版

> 策略作者

alinwo

> 策略描述

botvs提供的api函数cancelorder只负责把指令发送到交易所，至于交易所是否真的执行成功与否并不会做判断和检测，所以我们需要在自己的程序中做这个检测工作，保证cancelorder能执行成功。

以下函数会重试cancelorder直到交易所成功执行，调用cancelorder的地方替换为此函数即可

函数源码分析：http://www.pcclean.io/%E5%A6%82%E4%BD%95%E8%A7%A3%E5%86%B3botvs%E4%B8%8A%E6%89%A7%E8%A1%8Ccancelorder%E5%87%BD%E6%95%B0%E5%A4%B1%E8%B4%A5%E7%9A%84%E9%97%AE%E9%A2%98%EF%BC%9F/



> 源码 (javascript)

``` javascript
$.retry_cancelorder=function(ex,order_id){
	Log("取消订单"+order_id);
	ex.CancelOrder(order_id);
	Sleep(3000);
	var orders=_C(ex.GetOrders);
	var find=false;
	for (var i=0;i<orders.length;++i){
		if (orders[i].Id===order_id){
			find=true;
			break;
		}
	}
	if (find){
		$.retry_cancelorder(ex.order_id);
	}
}


```

> 策略出处

https://www.fmz.com/strategy/134368

> 更新时间

2019-01-26 10:44:53
