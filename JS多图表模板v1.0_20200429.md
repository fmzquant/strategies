
> 策略名称

JS多图表模板v1.0_20200429

> 策略作者

中本姜



> 策略参数



|参数|默认值|描述|
|----|----|----|
|LogLevel|3|Log等级|
|IsAsync|false|异步调用API获取数据|
|LoopInterval|3|轮训时间(秒)|
|MinDiff|0.8|最小价差|


> 源码 (javascript)

``` javascript
/*
v2.0 (20200429)
 * 解决标签挂靠问题
v2.0 (20171225)
 * 支持动态柱形图
v1.0 (20170725)
 * 基本多图标画图模板
 * 该模板可以在多张图表中绘出多种不同类型的时序图
   包括曲线，蜡烛以及柱型图的时序图表
 * 该模板未考虑非时序图情景
 * chart = $.ChartObj("title0"): 制作一张图表
 * series = chart.CreateSeries("series0", 'spline'): 在图表中画一张图
 * series.AddData(100): 在图中填充数字，实时绘图
*/
$.PlotFlag = function(time, text, title, shape, color) {
    var obj = {
        x: time,
        color: color,
        shape: shape,
        title: title,
        text: text
    }
    if (preFlagTime != time) {
        preFlagTime = time
        chart.add(seriesIdx, obj)
    } else {
        chart.add(seriesIdx, obj, -1)
    }
    return chart
}


function EasyReadTime(millseconds) {
    if (typeof millseconds == 'undefined' ||
        !millseconds) {
        millseconds = new Date().getTime();
    }
    var newDate = new Date();
    newDate.setTime(millseconds);
    return newDate.toLocaleString();
}

var RedColor = "#ff0000"; // 红色标记
var GreenColor = "#006600"; // 绿色标记
var YellowColor = "#FFA500"; // 橙色标记

$.DuoColor = GreenColor
$.KongColor = RedColor
$.PingColor = YellowColor

$.RedColor = RedColor;
$.GreenColor = GreenColor;
$.YellowColor = YellowColor;

// Critical Log, 出现该log时，整个程序将会退出
LOG_CRT = 0;
LOG_ERR = 1;
LOG_WARN = 2;
LOG_INFO = 3;
LOG_DA_DBG = 4;
LOG_WK_DBG = 5;

var LogLevelStr = ["LOG_CRT ", "LOG_ERR ", "LOG_WARN", "LOG_INFO ", "LOG_DA_DBG ", "LOG_WK_DBG "];
var LogColorStr = [RedColor, RedColor, YellowColor, GreenColor, "", ""];

function LogPush()
{
    var args = [].slice.call(arguments);
    var _LogLevel = args[0];

    if (_LogLevel <= LogLevel) {
        args[0] = LogLevelStr[_LogLevel];
        args.push(LogColorStr[_LogLevel]);
        if (_LogLevel == LOG_CRT) {
            throw args;
        } else {
            Log.apply(this, args);
        }
    }
}

// 全局的Chart对象用于真正的绘图
var G_Chart = null;
// 全局的ChartObj数组用于存储图表
var G_ChartObjList = [];

/* 定义一张图
 * name: 图名字
 * type: 图类型
 	- candlestick: 蜡烛图
 	- spline: 曲线图
 	- column: 柱状图
 * color: 图的颜色
*/
function _SeriesObj(name, type, color, yAxis, is_primary) {
	this._Name = name;
	this._Type = type;
	this._Color = color;
	this._Index = null;
	this._LastTime = null;
    this._yAxis = yAxis;
    this._is_primary = is_primary
    this._ColumnIndex = [];
    this._Rec = {'Time': null, 'High': null, 'Low': null, 'Close': null, 'Open': null}
    if (this._Type == 'column') {
        this._xAxis = 1;
    } else {
        this._xAxis = 0;
    }

	this.GetCfg = function() {
		var cfg;
        var xAxis_value;
		if (!color || this._Color == '') {
			cfg = {
				type: this._Type,
				name: this._Name,
				data: [],
                xAxis: this._xAxis,
                yAxis: this._yAxis};
		} else {
			cfg = {
				type: this._Type,
				name: this._Name,
				color: this._Color,
				data: [],
                xAxis: this._xAxis,
                yAxis: this._yAxis};
		}
        if (this._Type == 'candlestick') {
            cfg.color = '#DD2200';
            cfg.upColor = '#33AA11';
            cfg.lineColor = '#DD2200'; 
            cfg.upLineColor = '#33AA11';
        }
        if (this._Type == 'flags') {
			cfg = {
				type: this._Type,
				name: this._Name,
				data: []}
            cfg.onSeries = 'primary';
        }
        //if (this._Type == 'column') {
        //    cfg.dataLabels = {
        //            enabled: true,
        //            formatter: function() {        //格式化输出显示
        //              return (this.y) + "%";
        //            },
        //            verticalAligh: "top",
        //    };
        //}
        if (typeof(this._is_primary) != 'undefined' && this._is_primary != null &&
            this._is_primary) {
            cfg.id = "primary";
        }
		return cfg;
	}; 
    
    this.AddFData = function(time, title, text, color, shape) {
        if (this._Type != 'flags') {
			LogPush(LOG_CRT, this._Name, this._Type, "不是标签图不能添加标签数据");
        }
        var obj = {
            x: time,
            color: color,
            shape: shape,
            title: title,
            text: text
        }
        if (this._LastTime != time) {
            this._LastTime = time
            G_Chart.add(this._Index, obj)
        } else {
            /* 允许重复画数据 */
            G_Chart.add(this._Index, obj)
            //G_Chart.add(this._Index, obj, -1)
        }
    };
    
    this.AddKData = function(time, close, high, low, open) {
        if (this._Type != 'candlestick') {
			LogPush(LOG_CRT, this._Name, this._Type, "不是蜡烛图不能添加K线数据");
        }
        
        var _RECS = function(k_change, rec, data) {
            if (k_change) {
                rec.High = data.High;
                rec.Low = data.Low;
                rec.Open = data.Open;
                rec.Time = data.Time;
            }
            rec.Close = data.Close;
            rec.Low = Math.min(rec.Low, data.Low);
            rec.High = Math.max(rec.High, data.High);
            return [rec];
        };
        
        if (typeof(high) == 'undefined') {
            high = close;
        }
        if (typeof(low) == 'undefined') {
            low = close;
        }
        if (typeof(open) == 'undefined') {
            open = close;
        }
        var k_change = false;
        if (!this._LastTime || this._LastTime != time) {
            k_change = true;
        }
        var new_data = _RECS(k_change, this._Rec,
                             {'High': high, 'Low': low, 'Open': open, 'Close': close, 'Time': time});
        this.AddData(new_data, time);
    };

	/* 添加数据
     * data: 原始数据
     * time(可选): 标记当前数据的时间点,默认使用当前时间 
     * is_time_data(可选): 是否是时序相关数据,默认true
	 */
	this.AddData = function(data, time, is_time_data) {
		if (!G_Chart) {
			LogPush(LOG_CRT, "不能画图因为全局图表未定义!");
		}

        if (this._Type == 'column') {
            var column_name = data[0];
            var value = data[1];
            if (this._ColumnIndex[column_name] == null) {
		        G_Chart.add([this._Index, [column_name, value]]);
                for (var i in this._ColumnIndex) {
                    this._ColumnIndex[i] += -1;
                }
                this._ColumnIndex[column_name] = -1;
                //Log(column_name, this._ColumnIndex[column_name]);
            } else {
                //Log(this._Index, column_name, value, this._ColumnIndex[column_name]);
                G_Chart.add([this._Index, [column_name, value, this._ColumnIndex[column_name]]]);
            }
            return;
        }
        
		if (typeof(is_time_data) == 'undefined' || !is_time_data) {
			is_time_data = true;
		}
        
        var now_time;
        if (typeof(time) == 'undefined' || !time) {
		    now_time = new Date().getTime();
        } else {
            now_time = time;
        }
		if (is_time_data || this._Type == 'candlestick') {
			if (this._Type == 'candlestick') {
				var now_record = data[data.length-1];
				var now_data = [now_record.Time, now_record.Open, now_record.High,
                                now_record.Low, now_record.Close];
				var last_data = null;
				if (data.length > 1) {
					var last_record = data[data.length-2];
					last_data = [last_record.Time, last_record.Open, last_record.High,
                	             last_record.Low, last_record.Close];
				}
				now_time = now_data[0];
				if (!this._LastTime) {
					this._LastTime = now_time;
				}
				if (now_time == this._LastTime) {
					G_Chart.add([this._Index, now_data, -1]);
				} else {
					if (last_data) {
						G_Chart.add([this._Index, last_data, -1]);
					}
					G_Chart.add([this._Index, now_data]);
				}
			} else if (Array.isArray(data)) {
				now_time = data[0];
                if (now_time == this._LastTime) {
				    G_Chart.add([this._Index, data, -1]);
                } else {
				    G_Chart.add([this._Index, data]);
                }
			} else {
				time_data = [now_time, data];
                if (now_time == this._LastTime) {
				    G_Chart.add([this._Index, time_data, -1]);
                } else {
				    G_Chart.add([this._Index, time_data]);
                }
			}
		} else {
			G_Chart.add([this._Index, data]);
		}

		this._LastTime = now_time;
	};

	this.GetName = function() {
		return this._Name;
	};
}

/* 定义一张图表
 * parm title: 图表名字
 * parm is_stock: 是否用HighStock画图表
 * 可以在图表上画各种类型的图(series)
 */
function _ChartObj(title, is_stock) {
	this._Title = title;
	if (typeof(is_stock) == 'undefined') {
		is_stock = true;
	}
	this._IsStock = is_stock;
	// 图数组
	this._Series = [];
	// 图配置信息
	this._SeriesCfg = [];
    this._yAxis = 0;
	
    /* 在图表中创建一张图 
        @series_name(必须): 图标题
        @series_type(必须): 图类型 'column'(动态柱形图), 'candlestick'(蜡烛图), 'spline'(曲线图), 'flags'(标签), 'line'(直线)
        @series_color(可选): 画线使用颜色,默认自动
        @is_right(可选):是否使用右边纵坐标, 默认全部使用左纵坐标
        @is_primary(可选): 是否制定该series为primary，flag会挂靠在上面
    */
	this.CreateSeries = function(series_name, series_type, series_color, is_right, is_primary) {
		for (var name in this._Series) {
			if (name == series_name) {
				//LogPush(LOG_CRT, "不能在同一张表中创建相同名字的图");
				//return null;
                LogPush(LOG_INFO, name, "已经存在将直接返回");
                return this._Series[name]
			}
		}
        var yAxis = 0;
        if (typeof(is_right) != 'undefined') {
            yAxis = is_right ? 1: 0;
        } else {
            yAxis = this._yAxis;
        }
		var series = new _SeriesObj(series_name, series_type, series_color, yAxis, is_primary);
		this._Series[series_name] = series;
		var series_cfg = series.GetCfg();
		this._SeriesCfg.push(series_cfg);
		_UpdateSeriesIndex();
		return series;
	};

	this.AddData = function(series_name, data, is_time_data) {
		var series = this._Series[series_name];
		if (!series) {
			LogPush(LOG_ERROR, "不能再图表 ", this._Title, " 中找到图 ", series_name);
		}
		series.AddData(data, is_time_data);
		$.ChartUpdate();
	};

	this.GetCfg = function() {
		var cfg = {
			__isStock: this._IsStock,
			legend: {enabled: true},
    		tooltip: {xDateFormat: '%Y-%m-%d %H:%M:%S, %A'},
			chart: {zoomType: 'x',
                    panning: true},
			title: {text: this._Title},
			
    		rangeSelector: {
    	        buttons:  [
					{type: 'hour',count: 1, text: '1h'},
					{type: 'hour',count: 3, text: '3h'},
					{type: 'hour', count: 8, text: '8h'},
					{type: 'all',text: 'All'}],
    	        selected: 0,
    	        inputEnabled: false
    	    },
    		xAxis: [{type: 'datetime'},
                    {categories: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]}],
    		yAxis: [{
    		        title: {text: '价格线'},//标题
    		        style: {color: '#4572A7'},//样式 
    		        opposite: false  //生成左边Y轴
    		        },
    		        {
    		        title: {text: '价格振幅线'},//标题
    		        opposite: true  //生成右边Y轴
    		        }
    		],
			series: this._SeriesCfg,
		};
		return cfg;
	};

	this.GetName = function() {
		return this._Title;
	};
}

function _UpdateSeriesIndex() {
	var index = 0;
	$.ChartUpdate();
	for (var i = 0; i < G_ChartObjList.length; i++) {
		var chart = G_ChartObjList[i];
		for (var series_name in chart._Series) {
			var series = chart._Series[series_name];
			series._Index = index;
			LogPush(LOG_WK_DBG, "图表 ", chart.GetName(), " 中图 ",
                    series.GetName(), ", 索引号为:", series._Index);
			index += 1;
		}
	}
}

$.G_Chart = function() {
    return G_Chart;
}

$.ChartUpdate = function() {
	cfg_list = [];
	for (var i = 0; i < G_ChartObjList.length; i++) {
		var chart = G_ChartObjList[i];
		var cfg = chart.GetCfg();
		cfg_list.push(cfg);
	}
	if (!G_Chart) {
		G_Chart = Chart(cfg_list);
		//G_Chart.reset();
	} else {
		G_Chart.update(cfg_list);
	}
};

/* 新创建一张图表.
   @title: 图表标题
   @is_stock: 是否用HighStock画图, 默认true
              蜡烛图必须为true
              动态柱形图必须为false
   return: 返回一张图表, 在该图表中创建各种图
*/
$.ChartObj = function(title, is_stock) {
	var chart = new _ChartObj(title, is_stock);
	G_ChartObjList.push(chart); 
	return chart;
};

$.GetTickersAsync = function(exchanges) {
	tickers = [];
	var exchange_handlers = [];
	for (var i in exchanges) {
		if (IsAsync) {
			exchange_handlers[i] = exchanges[i].Go("GetTicker");
		} else {
			exchange_handlers[i] = exchanges[i].GetTicker();
		}
	}
	for (var i in exchange_handlers) {
		if (IsAsync) {
			tickers[i] = exchange_handlers[i].wait(500);
		} else {
			tickers[i] = exchange_handlers[i];
		}
	}
	return tickers;
};

var CoinNameMapping = {
	'BTC_CNY': 'BTC',
	'LTC_CNY': 'LTC',
	'ETH_CNY': 'ETH',
	'BTS_CNY': 'BTS',
};

function GetCoinType(currency) {
	coin_type = CoinNameMapping[currency];
	if (!coin_type) {
		coin_type = currency;
	}
	return coin_type;
}

function main() {
	var ticker_chart_list = [];
	// 价差图表
	var diff_chart_list = [];
	var exchange_dict = [];
	var coin_type;

	for (var i = 0; i < exchanges.length; i++) {
		var platform_name = exchanges[i].GetName();
		coin_type = GetCoinType(exchanges[i].GetCurrency());
		if (!exchange_dict[coin_type]) {
			exchange_dict[coin_type] = [];
		}
		if (!exchange_dict[coin_type][platform_name]) {
			exchange_dict[coin_type][platform_name] = exchanges[i];
		}
	}

	for (coin_type in exchange_dict) {
		var title_name = coin_type + "各个交易平台价格图表";
		var chart = $.ChartObj(title_name);
		LogPush(LOG_INFO, "添加图表:", title_name);
		ticker_chart_list[coin_type] = chart;

		coin_exchanges = exchange_dict[coin_type];
		for (var name in coin_exchanges) {
			var series_name = name + "现在价格";
			var series = chart.CreateSeries(series_name, 'spline', '');
			ticker_chart_list[coin_type][name] = series;
		}
	}

    var column_chart = $.ChartObj("柱形图", false);
    var column_series = column_chart.CreateSeries("柱形图", 'column');
	for (coin_type in exchange_dict) {
		var title_name = coin_type + "各个交易平台价差图表";
		var chart = $.ChartObj(title_name);
		LogPush(LOG_INFO, "添加图表:", title_name);
		diff_chart_list[coin_type] = chart;

		coin_exchanges = exchange_dict[coin_type];
		for (var left_name in coin_exchanges) {
			var find = false;
			for (var right_name in coin_exchanges) {
				if (right_name == left_name) {
					find = true;
					continue;
				}
				if (find) {
					var series_name = left_name + "_" + right_name + "价差";
					var series = chart.CreateSeries(series_name, 'spline', '');
					if (!diff_chart_list[coin_type][left_name]) {
						diff_chart_list[coin_type][left_name] = [];
					}
					var ele = [];
					ele['left_name'] = left_name;
					ele['right_name'] = right_name;
					ele['series'] = series;
					diff_chart_list[coin_type][left_name].push(ele);
					LogPush(LOG_INFO, "在图表:", title_name, "中添加图:", series_name);
				}
			}
		}
	}

    var n = 0;
	while (true) {
		for (var coin_type in exchange_dict) {
			var tickers = $.GetTickersAsync(exchange_dict[coin_type]);
			var time = new Date().getTime();
			for (var pname in exchange_dict[coin_type]) {
				//var exchange = exchange_dict[coin_type][pname];
				var series = ticker_chart_list[coin_type][pname];
				var records = exchange.GetRecords();
				var ticker = tickers[pname];
				if (!ticker || !ticker.Last || ticker.Sell < ticker.Buy) {
					continue;
				}
				series.AddData([time, ticker.Last]);

				var diff_series_list = diff_chart_list[coin_type][pname];
				if (diff_series_list) {
					for (var i in diff_series_list) {
						diff_series_dict = diff_series_list[i];
						var left_name = diff_series_dict['left_name'];
						var right_name = diff_series_dict['right_name'];
						var diff_series = diff_series_dict['series'];
						var left_ticker = ticker;
						var right_ticker = tickers[right_name];
                        LogPush(LOG_WK_DBG, "left_ticker: ", left_ticker, "right_ticker:", right_ticker);
						if (!right_ticker || !right_ticker.Last || right_ticker.Sell < right_ticker.Buy) {
							continue;
						}
						var sell_diff = left_ticker.Buy - right_ticker.Sell;
						var buy_diff = left_ticker.Sell - right_ticker.Buy;
						if (sell_diff >= 0 && buy_diff >= 0) {
                            if (Math.abs(sell_diff) >= MinDiff) {
							    diff_series.AddData([time, sell_diff]);
                            }
						}
						else if (sell_diff <= 0 && buy_diff <= 0) {
                            if (Math.abs(buy_diff) >= MinDiff) {
							    diff_series.AddData([time, buy_diff]);
                            }
						} 
                        //else {
						//	diff_series.AddData([time, 0]);
						//}
					}
				}
			}
		}
        if (n < 15) {
            column_series.AddData([n%5, n]);
        }
        n++;
        n++;
		Sleep(LoopInterval * 1000);
	}
}
```

> 策略出处

https://www.fmz.com/strategy/48731

> 更新时间

2020-04-29 16:35:59
