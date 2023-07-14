
> Name

海龟量化工具-海龟原版E-比率计算

> Author

道长





> Source (javascript)

``` javascript
/*backtest
start: 2018-01-01 00:00:00
end: 2021-03-04 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"OKEX","currency":"BTC_USDT"}]
*/

/**
 * ATR计算
 * @param records
 * @private
 */
function _ATR(records, period) {
     var acount = 0;
     var len = records.length;

     for (var i = len-1; i >= len-period; i--) {
          var decide = Math.abs(records[i].High - records[i].Low);
          acount += decide;
     }

     return (acount / period);
}

/**
 * 生成从minNum到maxNum的随机数
 * @param minNum
 * @param maxNum
 * @return {number}
 */
function randomNum(minNum,maxNum){
     switch(arguments.length){
          case 1:
               return parseInt(Math.random()*minNum+1,10);
          case 2:
               return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10);
          default:
               return 0;
     }
}

/**
 * 查询时间间隔
 * @param periodTime
 * @param periodType
 */
function getTimeInter(periodTime, periodType) {
     if("day" == periodType) {
          return (1000 * 60 * 60 * 24) * parseInt(periodTime);
     }else if("hour" == periodType) {
          return (1000 * 60 * 60) * parseInt(periodTime);
     }else {
          return (1000 * 60) * parseInt(periodTime);
     }
}

/**
 * E比率入市信号记录:每次开仓时调用
 * @direction "BUY"-做多； "SELL":做空
 * @param kPeriod 入市时atr计算所使用的K线周期
 *        atrPeriod入市时atr计算选择的时间范围
 *        kPeriod = PERIOD_D1; atrPeriod = 20 表示计算过去20天每天的平均波幅
 * @private
 */
function _Enter_Market_Record(ex, price, direction, kPeriod, atrPeriod) {
     // 计算ATR
     var records = ex.GetRecords(kPeriod);
     var atr = _ATR(records, atrPeriod);

     var now = new Date().getTime();
     var enterMarketRecord = {"enterId" : randomNum(1000000, 9999999), "date" : now, "dateStr": _D(now), "price" : price, "direction" : direction, "atr" : atr};
     Log("入市点：" + JSON.stringify(enterMarketRecord));

     var enterMarketRecords = _G("enterMarketRecords");
     if(enterMarketRecords == null) {
          enterMarketRecords = new Array();
     }
     enterMarketRecords.push(enterMarketRecord);

     _G("enterMarketRecords", enterMarketRecords);
}

/**
 * E比率计算：
 * @param periodTime=1；periodType=day 表示计算入市后1天的E比率
 *        periodTime=1；periodType=hour 表示计算入市后1小时的E比率
 *        periodTime=1；periodType=min 表示计算入市后1分钟的E比率
 * @private
 */
function _E(periodTime, periodType, ex) {
     var enterMarketRecords = _G("enterMarketRecords");

     if (enterMarketRecords != null && enterMarketRecords.length > 0) {

          var ticker = ex.GetTicker();
          var currPrice = parseFloat(ticker.Last);

          //计算设定周期的时间间隔
          var timeInter = getTimeInter(periodTime, periodType);
          // 当前时间节点
          var now = new Date().getTime();

          // 每时每刻都记录每个入市点之后一段时间内的最高点和最低点（通过K线获取的时间范围有误差）
          for (var i=0; i<enterMarketRecords.length; i++) {
               var enterMarketRec = enterMarketRecords[i];
               var inter = now - parseInt(enterMarketRec.date);
               if (inter < timeInter) {
                    // 记录入市点后的最高点和最低点
                    var high_low = _G((enterMarketRec.enterId+""));
                    if (high_low == null) {
                         var high = currPrice > enterMarketRec.price ? currPrice : enterMarketRec.price;
                         var low = currPrice < enterMarketRec.price ? currPrice : enterMarketRec.price;

                         high_low = {"highest" : high, "lowest" : low};
                         _G((enterMarketRec.enterId+""), high_low);
                    } else {
                         var high = currPrice > high_low.highest ? currPrice : high_low.highest;
                         var low = currPrice < high_low.lowest ? currPrice : high_low.lowest;

                         high_low = {"highest" : high, "lowest" : low};
                         _G((enterMarketRec.enterId+""), high_low);
                    }
                    //Log("high_low" + JSON.stringify(high_low));
               }
          }

          // 每次看最开始的那个入市点是否到检测时间，到了就计算并将该入市点从队列移除
          var enterMarketRecord0 = enterMarketRecords[0];

          if (now - enterMarketRecord0.date >= timeInter) {
               // 计算MAE和MFE
               var l_h = _G((enterMarketRecord0.enterId+""));

               var mae = 0;
               var mfe = 0;
               if (enterMarketRecord0.direction == 'UP') {
                    if (l_h.highest > enterMarketRecord0.price) {
                         mae = l_h.highest - enterMarketRecord0.price;
                    }
                    if (l_h.lowest < enterMarketRecord0.price) {
                         mfe = enterMarketRecord0.price - l_h.lowest;
                    }
               }
               if (enterMarketRecord0.direction == 'DOWN') {
                    if (l_h.lowest < enterMarketRecord0.price) {
                         mae = enterMarketRecord0.price - l_h.lowest;
                    }
                    if (l_h.highest > enterMarketRecord0.price) {
                         mfe = l_h.highest - enterMarketRecord0.price;
                    }
               }

               // 将MAE和MFE分别除以入市时的ATR（根据波动性做出调整，将不同市场标准化）
               mae = parseFloat(mae/enterMarketRecord0.atr);
               mfe = parseFloat(mfe/enterMarketRecord0.atr);

               // 计算平均MAE和MFE并记录
               var mae_avg = _G("mae_avg");
               var mfe_avg = _G("mfe_avg");

               if (mae_avg == null) {
                    mae_avg = {"mae":mae, "times":1};
               } else {
                    mae = parseFloat((mae_avg.mae + mae)/2);
                    mae_avg = {"mae":mae, "times":mae_avg.times+1};
               }
               if (mfe_avg == null) {
                    mfe_avg = {"mfe":mfe, "times":1};
               } else {
                    mfe = parseFloat((mfe_avg.mfe + mfe)/2);
                    mfe_avg = {"mfe":mfe, "times":mfe_avg.times+1};
               }

               var E_ = parseFloat(mae_avg.mae/mfe_avg.mfe);
               Log("E-比率=" + E_ + "计算最新入市点：" + JSON.stringify(enterMarketRecord0) + "后,[总入市点数量]" + mfe_avg.times + ",[记录的高低点]" + JSON.stringify(l_h) + "#ff0000");

               // 记录计算的MAE和MFE并将该入市点从队列清除
               _G("mae_avg", mae_avg);
               _G("mfe_avg", mfe_avg);
               enterMarketRecords.shift();

               // 重新加入入市点之后再记录最高最低点
               _G((enterMarketRecord0.enterId+""), null);
               _G((enterMarketRecord0.enterId+""), null);
          }
     }
}

/**
 * 使用唐奇安通道突破+趋势过滤器组合判断入市点，并使用工具方法计算E-率
 * 这里只简单测上涨变下跌和下跌变上涨的入市点，并不是完全的唐奇安突破入市
 */
function tqaTest(ex) {
     // 获取过去20天的最高和最低点
     var records = ex.GetRecords(PERIOD_D1);
     var highest = TA.Highest(records, 20, 'High');
     var lowest = TA.Lowest(records, 20, 'Low');
     //Log("highest:" + highest + ",lowest:" + lowest);

     var ticker = ex.GetTicker();
     var currPrice = parseFloat(ticker.Last);

     var times = 0;

     if (currPrice > highest || currPrice < lowest) {
          var ma50 = TA.MA(records, 50);
          var ma300 = TA.MA(records, 300);

          var lastDirection = _G("lastDirection");

          if (currPrice > highest && ma50[ma50.length-1] > ma300[ma300.length-1]) {
               // 开始做多,记录入市点
               if (lastDirection == null || lastDirection == "DOWN") {
                    _Enter_Market_Record(ex, currPrice, "UP", PERIOD_D1, 20);
                    _G("lastDirection", "UP");
               }
          }
          if (currPrice < lowest && ma50[ma50.length-1] < ma300[ma300.length-1]) {
               // 开始做空,记录入市点
               if (lastDirection == null || lastDirection == "UP"){
                    _Enter_Market_Record(ex, currPrice, "DOWN", PERIOD_D1, 20);
                    _G("lastDirection", "DOWN");
               }
          }
     }

     //计算E70:入市后70天内的E-比率，要在while(true)循环里调用
     _E(70, "day", ex);

}

function main() {

     while (true) {

          tqaTest(exchanges[0]);

          Sleep(500);
     }
}
```

> Detail

https://www.fmz.com/strategy/259135

> Last Modified

2021-03-05 15:49:20
