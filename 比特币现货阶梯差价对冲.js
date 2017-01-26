/*
策略出处: https://www.botvs.com/strategy/30573
策略名称: 比特币现货阶梯差价对冲
策略作者: roushasha
策略描述:

阶梯差价对冲，新手策略


参数          默认值    描述
----------  -----  -----
jizhun      true   基准
fanwei      5      范围
maxliang    0.5    最大下单
xianbijia   6000   最近的币价
lirun       true   利润
zhanghushu  12     账户数量
*/

function main() {

    var dongjieqian = 0;
    var lessbuyx = 33;
    var lesssellx = 33;
    var lastlessbuyx = 0
    var lastlesssellx = 0
    var huai = 0;
    var hbss;
    var okss;
    var accounthb;
    var accountok;
    var depthok;
    var depthhb;
    var bok;
    var bokl;
    var sok;
    var sokl;
    var bhb;
    var bhbl;
    var shb;
    var shbl;
    var qok;
    var cok;
    var qhb;
    var chb;
    var xx = 0;
    var yy = 0;
    var lastdepthhb = exchanges[0].GetDepth();
    var lastdepthok = exchanges[1].GetDepth();
    var hbx; //火币卖的程度
    var hby; //火币买的程度
    var cps; //火币卖的触发价格
    var iam; //交易的数量
    var huajia; //滑价
    var ii; //用来判断火币是否交易
    var shiyongjizhun; //使用基准
    shiyongjizhun = jizhun;
    while (true) {
        var tss = new Date();
        Log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^")
        var ts = new Date();
        Log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");

        Log("开始获取账户资金时间", ts.getSeconds());

        // 这下面是获取账户
        var accounts = [];
        while (true) {
            for (var i = 0; i < exchanges.length; i++) {
                if (accounts[i] == null) {
                    // 创建异步操作
                    accounts[i] = exchanges[i].Go("GetAccount");
                }
            }
            var failed = 0;
            for (var i = 0; i < exchanges.length; i++) {
                if (typeof(accounts[i].wait) != "undefined") {
                    // 等待结果
                    var ret = accounts[i].wait();
                    if (ret) {
                        accounts[i] = ret;
                        Log(exchanges[i].GetName(), accounts[i]);
                    } else {
                        // 重试
                        accounts[i] = null;
                        failed++;
                    }
                }
            }
            if (failed == 0) {
                break;
            } else {
                break;
            }
        }

        Log("获取账户资金耗时 ", (new Date().getTime() - ts.getTime()) / 1000, "秒");
        Log("*********************************************************************");

       




        var ts = new Date();
        Log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");

        Log("开始获取火币未完成订单", ts.getSeconds());
        var orders = exchanges[0].GetOrders()
        Log(orders);
        var fb = 0,
            fs = 0;
        if (orders === null) {} else {
            for (var i = 0; i < orders.length; i++) {
                if (orders[i].Type === 1) {
                    fs = fs + orders[i].Amount - orders[i].DealAmount
                }

                if (orders[i].Type === 0) {
                    fb = fb + orders[i].Amount * orders[i].Price - orders[i].DealAmount * orders[i].AvgPrice
                }
            }
        }


        Log("火币冻结钱 ", fb, "冻结币", fs);
        Log("获取火币未完成订单耗时 ", (new Date().getTime() - ts.getTime()) / 1000, "秒");
        Log("*********************************************************************");


        accounthb = accounts[0];
        accountok = accounts[1];
        Log(accounts[0]);
        Log(accounts[1]);

        if (!accounthb) {
            Log("获取火币账户信息失败");
            continue;
        }
        if (!accountok) {
            Log("获取ok账户信息失败");
            continue;
        }


        qok = accountok.Balance;
        cok = accountok.Stocks;
        qhb = accounthb.Balance;
        chb = accounthb.Stocks;


        Log("冻结的总资金=", accountok.FrozenBalance + fb + accountok.FrozenStocks * xianbijia + fs * xianbijia)
        if (accountok.FrozenBalance + fb + accountok.FrozenStocks * xianbijia + fs * xianbijia > 2500) {
            Log("冻结资金超过上限");
            continue;
        }
        //火币能卖的量 chb 
        //ok能买的量 qok/sok 
        //二者取小Math.min（chb，qok/sok）
        //火币已卖的量 qhb/bhb 
        //ok已买的量 cok 
        //二者取小Math.min（cok，qhb/bhb）
        //火币已经卖的程度 hbx=Math.min（cok，qhb/bhb）/(Math.min（chb，qok/sok）+Math.min（cok，qhb/bhb）)



        //---------------
        // 获取市场深度
        var ts = new Date();
        Log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");

        Log("开始获取市场深度时间", ts.getSeconds());
        var depths = [];
        while (true) {
            for (var i = 0; i < exchanges.length; i++) {
                if (depths[i] == null) {
                    // 创建异步操作
                    depths[i] = exchanges[i].Go("GetDepth");
                }
            }
            var failed = 0;
            for (var i = 0; i < exchanges.length; i++) {
                if (typeof(depths[i].wait) != "undefined") {
                    // 等待结果         
                    var ret = depths[i].wait();
                    if (ret) {
                        depths[i] = ret;

                        Log(exchanges[i].GetName(), depths[i]);
                    } else {
                        // 重试
                        depths[i] = null;
                        failed++;
                    }
                }
            }
            if (failed == 0) {
                break;
            } else {
                break;


            }
        }
        depthhb = depths[0];
        depthok = depths[1];
        //判断深度是否有效
        if (!depthhb) {
            Log("获取火币深度信息失败");
            continue;
        }
        if (!depthok) {
            Log("获取ok深度信息失败");
            continue;
        }




        if (depthhb.Bids[0].Price === lastdepthhb.Bids[0].Price && depthhb.Bids[0].Amount === lastdepthhb.Bids[0].Amount && depthhb.Asks[0].Price === lastdepthhb.Asks[0].Price && depthhb.Asks[0].Amount === lastdepthhb.Asks[0].Amount) {

            ++xx;
  Log(xx);

        } else {
            xx = 0;
        }
    if(depthok.Bids[0].hasOwnProperty("Price") ){Log("包含price属性")}else{Log("不包含price属性");continue}
       
    if (depthok.Bids[0].Price === lastdepthok.Bids[0].Price && depthok.Bids[0].Amount === lastdepthok.Bids[0].Amount && depthok.Asks[0].Price === lastdepthok.Asks[0].Price && depthok.Asks[0].Amount === lastdepthok.Asks[0].Amount) {

            ++yy;
             Log(yy);
        } else {
            yy = 0;
        }
        lastdepthhb = depthhb;
        lastdepthok = depthok;
        if (xx> 20) {
            Log("火币深度无效");
            continue;
        }
        if (yy > 20) {
            Log("ok深度无效");
            continue;
        }
        bok = depthok.Bids[0].Price;
        bokl = depthok.Bids[0].Amount;
        sok = depthok.Asks[0].Price;
        sokl = depthok.Asks[0].Amount;
        bhb = depthhb.Bids[0].Price;
        bhbl = depthhb.Bids[0].Amount;
        shb = depthhb.Asks[0].Price;
        shbl = depthhb.Asks[0].Amount;
        Log("火币买一", bhb, "火币卖一", shb, "火币盘口差", shb - bhb);
        Log("ok卖一", sok, "ok买一", bok, "ok盘口差", sok - bok);
        Log("获取市场深度耗时 ", (new Date().getTime() - ts.getTime()) / 1000, "秒");
        Log("*********************************************************************");


        //下面计算买卖补充系数
        //如果=33 计算 如果不等于33，不计算
        if (lesssellx === 33) {
            Log("计算少买少卖数量")

            dongjieqian = accountok.FrozenBalance + fb;
            if (dongjieqian < 5) {
                dongjieqian = 0
            }
            lesssellx = dongjieqian / (bok * zhanghushu)
            lessbuyx = (accountok.FrozenStocks + fs) / zhanghushu
        }


        Log("少卖数=", lesssellx, "少买数=", lessbuyx)




        //下面计算火币卖的情况
        while (true) {
            ii = 0; //火币未交易
            //火币能卖的量 chb 
            //ok能买的量 qok/sok 
            //二者取小Math.min（chb，qok/sok）
            //火币已卖的量 qhb/bhb 
            //ok已买的量 cok 
            //二者取小Math.min(cok，qhb/bhb)

            hbx = Math.min(cok, qhb / bhb) / (Math.min(chb, qok / sok) + Math.min(cok, qhb / bhb));
            Log("火币卖程度", hbx);
          /*  if (hbx > 0.5) {
                if (shiyongjizhun + fanwei * 0.5 > 0) {
                    Log("中心靠右，右移，速度缩减系数=", 1 - (shiyongjizhun + fanwei * 0.5) / 5);
                    shiyongjizhun = shiyongjizhun + 0.001 * (1 - (shiyongjizhun + fanwei * 0.5) / 5) * (hbx - 0.5);
                    Log("使用基准=", shiyongjizhun, "增加", 0.001 * (1 - (shiyongjizhun + fanwei * 0.5) / 5) * (hbx - 0.5));
                } else {
                    Log("中心靠左，右移，速度增加系数=", 1 - (shiyongjizhun + fanwei * 0.5) / 5);

                    shiyongjizhun = shiyongjizhun + 0.001 * (1 - (shiyongjizhun + fanwei * 0.5) / 5) * (hbx - 0.5);
                    Log("使用基准=", shiyongjizhun, "增加", 0.001 * (1 - (shiyongjizhun + fanwei * 0.5) / 5) * (hbx - 0.5));
                }

            } else {
                if (shiyongjizhun + fanwei * 0.5 > 0) {
                    Log("中心靠右，左移，速度增加系数=", 1 + (shiyongjizhun + fanwei * 0.5) / 5);
                    shiyongjizhun = shiyongjizhun + 0.001 * (1 + (shiyongjizhun + fanwei * 0.5) / 5) * (hbx - 0.5);
                    Log("使用基准=", shiyongjizhun, "减小", 0.001 * (1 + (shiyongjizhun + fanwei * 0.5) / 5) * (hbx - 0.5));
                } else {
                    Log("中心靠左，左移，速度缩减系数=", 1 + (shiyongjizhun + fanwei * 0.5) / 5);
                    shiyongjizhun = shiyongjizhun + 0.001 * (1 + (shiyongjizhun + fanwei * 0.5) / 5) * (hbx - 0.5);
                    Log("使用基准=", shiyongjizhun, "减小", 0.001 * (1 + (shiyongjizhun + fanwei * 0.5) / 5) * (hbx - 0.5));


                }

            }*/


            cps = shiyongjizhun + fanwei * hbx;
            if (cps > ((bhb - sok))) {
                Log("火币已卖程度", hbx,"第一触发差价", cps, "实际差价", bhb-sok, "不会触发第一种");
                break;
            }
            huajia = Math.abs((bhb - sok - cps) / 2) + 0.25 * lirun;
            huajia = _N(huajia, 2);
            iam = Math.min(chb, qok / (sok + huajia), bhbl, sokl, maxliang);
            iam = _N(iam, 2);
            Log("第一最大量=", maxliang)
            Log("程度", hbx, "火币卖至少赚差价", cps, "实际赚差价", bhb - sok, "滑价=（1/2实际赚差价-至少赚差价）+0.25利润=", huajia, "下单量", iam);

            if (iam < 0.01) {
                break;
            } else {
                var hbid = exchanges[0].Go("Sell", bhb - huajia, Math.max((iam - lesssellx), 0.01));
                var okid = exchanges[1].Buy(sok + huajia, Math.max((iam - lessbuyx), 0.01));
                lastlesssellx = lesssellx;
                lastlessbuyx = lessbuyx;
                lesssellx = 33;
                lessbuyx = 33;
                ++ii; //火币已经交易
                ++huai;
                /* 不计算损失率，加速      
         Sleep(200);
          
    hbid = hbid.wait()
                if (!hbid) {
                   
                    break;
                }
                var order = exchanges[0].GetOrder(hbid);
                if (!order) {
                   
                    break;
                }
                hbss = bhb * Math.max((iam-lastlesssellx),0.01) - order.DealAmount * order.AvgPrice - (bhb - huajia) * (Math.max((iam-lastlesssellx),0.01) - order.DealAmount);
                Log(order);
                Log(hbss, "损失的钱=", "火币买一", bhb, "*", "下单量", Math.max((iam-lastlesssellx),0.01), "-", "已成交量", order.DealAmount, "*", "成交均价", order.AvgPrice, "-(", "火币买一", bhb, "-", "滑价", huajia, ")", "*", "(", "下单量", Math.max((iam-lastlesssellx),0.01), "-", "已成交量", order.DealAmount);
                Log(Math.max((iam-lastlesssellx),0.01) * huajia);
                Log("火币卖损失率=", hbss / (Math.max((iam-lastlesssellx),0.01) * huajia))
                
           */

                /* 不计算损失率，加速 
                  if (!okid) {

                      break;
                  }
                  var order = exchanges[1].GetOrder(okid);
                  if (!order) {
                    
                      break;
                  }

                  okss = 0 - sok * Math.max((iam-lastlessbuyx),0.01) + order.DealAmount * order.AvgPrice + (sok + huajia) * (Math.max((iam-lastlessbuyx),0.01) - order.DealAmount);
                  Log(order);

                  Log(okss, "损失的钱=", "-ok卖一", sok, "*", "下单量", Math.max((iam-lastlessbuyx),0.01), "+", "已成交量", order.DealAmount, "*", "成交均价", order.AvgPrice, "+(", "ok卖一", sok, "+", "滑价", huajia, ")", "*", "(", "下单量", Math.max((iam-lastlessbuyx),0.01), "-", "已成交量", order.DealAmount);
                  Log(Math.max((iam-lastlessbuyx),0.01) * huajia);
                  Log("ok买损失率=", okss / (Math.max((iam-lastlessbuyx),0.01) * huajia))
                  
                    */


                break;


            }

            //触发价格cps=jizhun+fanwei*hbx
            //下单数量Math.min（chb，qok/（sok+滑价），bhbl，sokl，maxliang）
            //如果下单数量小于0.01 break else 下火币卖单 ok下买单 break
        }
        //下面计算火币买的情况
        while (true) {
            if (ii) {
                Log("火币已经交易过了");
                break;
            } //火币已经交易过了
            Log("没交易过，检测后一种情况");
            //火币能买的量 qhb/shb
            //ok能卖的量 cok 
            //二者取小Math.min（cok，qhb/shb）
            //火币已买的量   chb
            //ok已卖的量 qok/bok
            //二者取小Math.min(chb，qok/bok)
            hby = Math.min(chb, qok / bok) / (Math.min(chb, qok / bok) + Math.min(cok, qhb / shb)); //火币已经买的幅度
            cps = shiyongjizhun + fanwei - lirun - fanwei * hby;
            if (cps < ((shb - bok))) {
                Log("火币已买程度", hby,"第二触发差价", cps, "实际差价", shb-bok, "没有触发第二种");
                break;
            }
            huajia = Math.abs((cps - shb + bok) / 2) + 0.25 * lirun;
            huajia = _N(huajia, 2); //到这
            iam = Math.min(cok, qhb / (shb + huajia), bokl, shbl, maxliang);
            iam = _N(iam, 2);
            Log("第二最大=", maxliang)
            Log("第二程度", hby, "火币买最多亏价差", cps, "实际亏差价", shb - bok, "滑价=（1/2最多亏差价-实际亏差价）+0.25利润=", huajia, "下单量", iam);

            if (iam < 0.01) {
                break;
            } else {
                var hbid = exchanges[0].Go("Buy", shb + huajia, Math.max((iam - lessbuyx), 0.01));
                var okid = exchanges[1].Sell(bok - huajia, Math.max((iam - lesssellx), 0.01));
                lastlesssellx = lesssellx;
                lastlessbuyx = lessbuyx;
                lesssellx = 33;
                lessbuyx = 33;
                ++huai;
                /* 不计算损失率，加速      
                 Sleep(200);
                 hbid = hbid.wait()
                 if (!hbid) {

                     break;
                 }
                 var order = exchanges[0].GetOrder(hbid);
                 if (!order) {
                     
                     break;
                 }

                 hbss = 0 - shb * Math.max((iam-lastlessbuyx),0.01) + order.DealAmount * order.AvgPrice + (shb + huajia) * (Math.max((iam-lastlessbuyx),0.01) - order.DealAmount);
                 Log(order);

                 Log(hbss, "损失的钱=", "-火币卖一", shb, "*", "下单量", Math.max((iam-lastlessbuyx),0.01), "+", "已成交量", order.DealAmount, "*", "成交均价", order.AvgPrice, +"(", "火币卖一", shb, "+", "滑价", huajia, ")", "*", "(", "下单量", Math.max((iam-lastlessbuyx),0.01), "-", "已成交量", order.DealAmount);
                 Log(Math.max((iam-lastlessbuyx),0.01) * huajia);
                 Log("火币买损失率=", hbss / (Math.max((iam-lastlessbuyx),0.01) * huajia))

               
                 if (!okid) {
                    
                     break;
                 }
                 var order = exchanges[1].GetOrder(okid);
                 if (!order) {
                    
                     break;
                 }
                 okss = bok * Math.max((iam-lastlesssellx),0.01) - order.DealAmount * order.AvgPrice - (bok - huajia) * (Math.max((iam-lastlesssellx),0.01) - order.DealAmount);
                 Log(order);
                 Log(okss, "损失的钱=", "ok买一", bok, "*", "下单量", Math.max((iam-lastlesssellx),0.01), "-", "已成交量", order.DealAmount, "*", "成交均价", order.AvgPrice, "-(", "ok买一", bok, "-", "滑价", huajia, ")", "*", "(", "下单量", Math.max((iam-lastlesssellx),0.01), "-", "已成交量", order.DealAmount);
                 Log(Math.max((iam-lastlesssellx),0.01) * huajia);
                 Log("ok卖损失率=", okss / (Math.max((iam-lastlesssellx),0.01) * huajia))
                 
                  */
                break;
            }


        }
        Log("全部使用时间 ", (new Date().getTime() - tss.getTime()) / 1000, "秒！！！！！！！");
        if ((new Date().getTime() - ts.getTime()) < 500) {
            Sleep(500 - (new Date().getTime() - ts.getTime()))
        }


    }
}
