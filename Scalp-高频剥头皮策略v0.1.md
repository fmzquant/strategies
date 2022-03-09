
> 策略名称

Scalp-高频剥头皮策略v0.1

> 策略作者

Cowpea

> 策略描述

曾经2天1倍的剥头皮策略
现在已经不赚钱的，开源给大家学习交流一下

> 策略参数



|参数|默认值|描述|
|----|----|----|
|P_interval_time|1000|轮询间隔（毫秒）|
|P_margin_mode|0|保证金模式: 逐仓|全仓|
|P_level|10|杠杆倍数|
|P_vol_type|0|下单数量: 张数|U数|余额比例|
|P_vol|1|合约张数（币安为币数）|
|P_vol_u|2|合约金额（U数）|
|P_vol_p|50|帐户余额（百分比）|
|P_contract_value|1|合约价值|
|P_mode|0|做单方向: 双向都做|只做多|只做空|
|P_precision_price|2|价格精度|
|P_precision_vol|2|数量精度|
|P_balance_init|123|初始余额|
|P_fast_ema|9|Fast EMA|
|P_slow_ema|21|Slow EMA|
|P_exit_ema|5|Exit EMA|
|P_fast_conf_ema|true|FastConf EMA|
|P_slow_conf_ema|4|SlowConf EMA|
|P_stop_lose|2|Stop Loss(ATR)|
|P_take_profit|6|Take Profit(ATR)|
|P_profit_p|1|止盈比例（价差百分比）|




|按钮|默认值|描述|
|----|----|----|
|test||test|


> 源码 (javascript)

``` javascript
/*backtest
start: 2019-02-01 00:00:00
end: 2020-03-01 00:00:00
period: 1m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"ETH_USDT"}]
args: [["P_balance_init",10000]]
*/


var tradeArr = {};
var balance_total, balance_total_init, balance_position, balance_available, pos_profit_total;
var total_today,balance_total,balance_total_init,running_days;
var loop_time = 0;
var symbols_arr = {};

var account_status = {
    type: 'table',
    title: '帐户信息',
    cols: ['初始余额', '当前余额', '可用余额', '总收益(收益率)', '当日收益', '平均日化', '预估月化', '预估年化'],
    rows: []
}

var trade_status = {
    type: 'table',
    title: '持仓信息',
    cols: ['持仓币种', '持仓方向', '持仓数量', '持仓均价', '强平价格', '保证金', '未实现盈亏'],
    rows: []
}

function getPara(val, i){
    var str = val.split(",").length>i?val.split(",")[i]:val.split(",")[val.split(",").length-1];
    var ret = parseFloat(str.trim())
    if(isNaN(ret)){
        return str;
    }
    return ret;
}

function main() {
    LogReset(8000);   //保留日志数量
    LogProfitReset(8000); //清空所有收益日志，可以带一个数字参数，指定保留的条数。
    LogStatus("")

    //首次启动时间， P_margin_mode  保证金模式  下拉框(selected)  逐仓|全仓       
    begin_run_time = $.G("begin_run_time", new Date().getTime())
    Log("begin_run_time", begin_run_time)
    
    for(var i=0; i<exchanges.length; i++){
        trade = new GridTrade(exchanges[i]);
        trade.idx = i;
        var symbol = exchanges[i].GetCurrency();
        trade.symbol = symbol;
        trade.base = trade.symbol.split("_")[0];
        trade.level = getPara(P_level, i);
        trade.e.level = getPara(P_level, i);
        trade.mode = P_mode;
        trade.vol = 1*getPara(P_vol, i);
        trade.vol_u = 1*getPara(P_vol_u, i);
        trade.vol_p = 1*getPara(P_vol_p, i);
        trade.precision_price = 1*getPara(P_precision_price, i);
        trade.precision_vol = 1*getPara(P_precision_vol, i);
        trade.contract_value = 1*getPara(P_contract_value, i);
        trade.profit_p = 1*getPara(P_profit_p, i);
        exchanges[i].SetContractType("swap"); //设置合约。
        exchanges[i].contract_type = "swap"; //必须要设置这个，后续获取持仓时需要用到。
        exchanges[i].SetMarginLevel(parseFloat(trade.level)); //必须要设置这个，后续获取持仓时需要用到。
        
        trade.pos_time = 0;

        //保证金模式，逐仓、改全仓。
        if(!IsVirtual()){
            if(exchanges[i].GetName()=="Futures_Binance"){
                var para = "symbol="+exchanges[i].GetCurrency().replace("_","")+"&marginType="+(P_margin_mode==0?"ISOLATED":"CROSSED")
                var rt = exchanges[i].IO("api", "POST", "/fapi/v1/marginType", para);
                Log("设置全仓、逐仓", rt);
            }else{
                exchanges[i].IO("cross", P_margin_mode == 1)
            }
        }

        //清空所有持仓。
        $.cancel_pending_orders(exchanges[i]);

        tradeArr[symbol] = trade; //交易货币。
        account = _C(exchanges[i].GetAccount);
        Log(account);
    }
    
    while (true) {
        Sleep(P_interval_time);

        //获取交互信息
        get_command();

        //每个币种循环。
        for(var symbol in tradeArr){
            //更新表格。
            trade.update_table();
            trade = tradeArr[symbol];
            trade.ontick();  
        }
    }
}

//画收益曲线。
var draw_profit_time = 0;
var draw_profit_interval = 10*60*1000;
function draw_profit(){
    if(new Date().getTime() - draw_profit_time > draw_profit_interval) {
        balance_total = 0;
        balance_total_init = 0;
        for(var symbol in tradeArr){
            var t = tradeArr[symbol];
            balance_total += t.balance_total;
            balance_total_init += t.balance_total_init;
        }
        LogProfit(balance_total-balance_total_init, "&");
        draw_profit_time = new Date().getTime();
    }
}

function GridTrade(e){
    this.e = e;
    //帐户信息，
    this.update_account = function(){
        var account = _C(e.GetAccount);
        this.balance_position = 0;
        this.pos = {Amount:0, Price:0, Margin:0, Profit:0};
        var pos_arr = _C(e.GetPosition);
        for(var pos of pos_arr){
            this.balance_position += pos.Margin+pos.Profit;  //持仓占用保证金。
            if(pos.Amount) {
                this.pos = pos;                
            }
        }
        this.balance_total = account.Balance+account.FrozenBalance + this.balance_position; //总的
        //Log(account.Balance, account.FrozenBalance, this.balance_position)
        this.balance_available = account.Balance //可用的。
        
        if(!this.balance_total_init){
            if(P_balance_init){
                this.balance_total_init = parseFloat(P_balance_init);
            }else{
                this.balance_total_init = this.balance_total;
            }
            Log("初始余额", this.balance_total_init)
        }
    }

    //更新表格。
    this.update_table_time = 0;
    this.update_table = function(){
        //更新帐户、持仓信息，
        this.update_account();

        //记录新的一天开始的权益。
        if(!this.update_table_time || new Date().getDate() > new Date(this.update_table_time).getDate()){
            this.total_today = this.balance_total;
            Log("更新当天初始余额", this.total_today)
        }
        
        running_days = (new Date().getTime() - begin_run_time)/(24*60*60*1000)

        //交易信息。
        //['持仓币种', '持仓方向', '持仓数量', '持仓均价', '强平价格', '保证金', '未实现盈亏'],
        var direction = this.pos.Type===0?"多":this.pos.Type===1?"空":"";
        var qiangping_price = 0
        if(direction=="多"){
            var qiangping_price = _N(this.pos.Price - this.balance_total/(this.contract_value*this.pos.Amount), this.precision_price);
        }else if(direction=="空"){
            var qiangping_price = _N(this.pos.Price + this.balance_total/(this.contract_value*this.pos.Amount), this.precision_price);
        }
        
        var line = [this.base, direction, this.pos.Amount, this.pos.Price, qiangping_price, this.pos.Margin, this.pos.Profit, ];

        //Log(line)

        trade_status.rows[this.idx] = line;

        //帐户信息，
        var level = (this.pos.Amount*this.last_price)/this.balance_total;
        var profit_total = this.balance_total-this.balance_total_init;
        var profit_total_rate = _N(profit_total/this.balance_total_init*100, 2);
        var profit_today = this.balance_total - this.total_today;
        var profit_today_rate = _N(profit_today/this.balance_total_init*100, 2);
        
        var profit_by_day = profit_total/running_days;
        var profit_by_day_rate = _N(profit_by_day/this.balance_total_init*100, 2)
        var profit_by_month = profit_total/running_days*30;
        var profit_by_month_rate = _N(profit_by_month/this.balance_total_init*100, 2)
        var profit_by_year = profit_total/running_days*365;
        var profit_by_year_rate = _N(profit_by_year/this.balance_total_init*100, 2)
        
        //帐户信息。
        //['初始余额', '当前余额', '可用余额', '总收益(收益率)', '当日收益', '平均日化', '预估月化', '预估年化'],
        //Log(balance_total_init, balance_total, balance_available, balance_position , level, profit_total , profit_total_rate, ,, profit_today , profit_today_rate, profit_by_day, profit_by_day_rate, profit_by_month, profit_by_month_rate, profit_by_year, profit_by_year_rate, loop_time)
        //Log(balance_total_init, balance_total, balance_available, balance_position, profit_total, profit_total_rate, profit_today, profit_by_day, profit_by_month, profit_by_year) 

        account_status.rows[this.idx] = [_N(this.balance_total_init,2), _N(this.balance_total,2), _N(this.balance_available,2), _N(profit_total,2)+"("+_N(profit_total_rate,2)+"%)", _N(profit_today,2)+"("+profit_today_rate+"%)", _N(profit_by_day,2)+"("+profit_by_day_rate+"%)", _N(profit_by_month,2)+"("+profit_by_month_rate+"%)", _N(profit_by_year,2)+"("+profit_by_year_rate+"%)"]; 

        var status_msg = "初始化时间: " + _D(begin_run_time)
                        +"\n运行时间: " + $.get_time_diff_str(new Date().getTime(), begin_run_time) 
                        +"\n更新时间:" + _D()
                         +"\nWX: Letv_13#FF0000"
        
        LogStatus(status_msg  + '\n`' + JSON.stringify([account_status]) 
                            + '`\n`' + JSON.stringify([trade_status]) + '`');

        //画收益曲线。
        draw_profit();
        this.update_table_time = new Date().getTime();
    }


    //传入的是u数时，要计算为合约张数。
    this.cal_vol = function(){
        var vol = this.vol;
        if(P_vol_type==1){ //u数，
            Log("计算", this.vol_u, this.last_price, this.contract_value)
            vol = this.vol_u/this.last_price/this.contract_value;
        }else if(P_vol_type==2){//帐户余额百分比，
            Log("计算", this.vol_p, this.last_price, this.contract_value)
            var account = _C(this.e.GetAccount);
            vol = account.Balance*this.level*this.vol_p/100/this.last_price/this.contract_value;
        }
        Log("计算开仓数量", vol, this.last_price, this.contract_value);
        return _N(vol, this.precision_vol);
    }
    
    this.get_column = function(lines, col_name){
        var arr = [];
        for(var line of lines){
            arr.push(line[col_name]);
        }
        return arr;
    }

    //指定方向下单，
    this.place_order = function(side){
        if(side=="buy" || side=="sell"){
            var vol = this.cal_vol();
        }else{
            vol = this.pos_vol;
        }

        var ord = $.place_order(this.e, side, -1, vol, "chase");
        if(!ord){
            Log("下单失败", ord);
            return;
        }
        if(side=="buy"){
            this.stop_price = this.last_rd.Low - this.atr[this.atr.length-1] * P_stop_lose;
            this.profit_price = this.last_rd.High + this.atr[this.atr.length-1] * P_take_profit;
            if(this.profit_p && this.profit_price > ord.AvgPrice*(1+this.profit_p/100)) this.profit_price = ord.AvgPrice*(1+this.profit_p/100);
            this.pos_direction = 1;
            this.pos_price = ord.AvgPrice;
            this.pos_vol = ord.DealAmount;
        }else if(side=="sell"){
            this.stop_price = this.last_rd.High + this.atr[this.atr.length-1] * P_stop_lose;
            this.profit_price = this.last_rd.Low - this.atr[this.atr.length-1] * P_take_profit;
            if(this.profit_p && this.profit_price < ord.AvgPrice*(1-this.profit_p/100)) this.profit_price = ord.AvgPrice*(1-this.profit_p/100);
            this.pos_direction = -1;
            this.pos_price = ord.AvgPrice;
            this.pos_vol = ord.DealAmount;
        }else if(side=="closebuy" || side=="closesell"){  
            var profit = 0;
            if(side=="closebuy"){
                profit = (ord.AvgPrice-this.pos_price)*ord.DealAmount*this.contract_value;
            }else if(side=="closesell"){
                profit = (this.pos_price-ord.AvgPrice)*ord.DealAmount*this.contract_value;
            }
            Log("本次交易盈亏：", profit, "#FF0000")
            this.pos_direction = 0;
            
        }

        if(side=="buy" || side=="sell"){
            this.pos_time = this.rd_time;
        }

        
    }

    this.ontick = function(){
        this.rds = _C(this.e.GetRecords);
        this.last_rd = this.rds[this.rds.length-1];
        this.rd_time = this.last_rd.Time;
        this.last_price = this.last_rd.Close;
        this.opens = this.get_column(this.rds, "Open");
        var fastEMA = TA.EMA(this.opens, P_fast_ema)
        var slowEMA = TA.EMA(this.opens, P_slow_ema)
        var exitEMA = TA.EMA(this.opens, P_exit_ema)
        var conf1EMA = TA.EMA(this.opens, P_fast_conf_ema)
        var conf2EMA = TA.EMA(this.opens, P_slow_conf_ema)
        this.atr = TA.ATR(this.rds, 5)

        //多空条件
        var long = _Cross(fastEMA, slowEMA)==2 && (conf1EMA[conf1EMA.length-1] > conf2EMA[conf2EMA.length-1]) && (fastEMA[fastEMA.length-1] < exitEMA[exitEMA.length-1])
        var short= _Cross(fastEMA, slowEMA)==-2 && (conf1EMA[conf1EMA.length-1] < conf2EMA[conf2EMA.length-1]) && (fastEMA[fastEMA.length-1] > exitEMA[exitEMA.length-1])
        
        //开仓
        if(this.rd_time > this.pos_time && P_mode !=2 && long && this.pos_direction !=1){ //做多
            Log("开多", "#0000FF")
            if(this.pos_direction==-1){
                this.place_order("closesell");
            }
            this.place_order("buy");
        }else if(this.rd_time > this.pos_time && P_mode !=1 && short && this.pos_direction !=-1){//做空
            Log("开空", "#0000FF")
            if(this.pos_direction==1){
                this.place_order("closebuy");
            }
            this.place_order("sell");
        }

        //止损
        if(this.pos_direction==1 && this.last_price < this.stop_price){ //多头止损
            Log("多单止损", "#FF0000")
            this.place_order("closebuy");
        }else if(this.pos_direction==-1 && this.last_price > this.stop_price){ //空头止损
            Log("空单止损", "#FF0000")
            this.place_order("closesell");
        }

        //止盈
        if(this.pos_direction==1 && this.last_price > this.profit_price){ //多头止盈
            Log("多单止盈", "#FF0000");
            this.place_order("closebuy");
        }else if(this.pos_direction==-1 && this.last_price < this.profit_price){ //空头止盈
            Log("空单止盈", "#FF0000");
            this.place_order("closesell");
        }

        //出场
        if(this.rd_time > this.pos_time){
            if(this.pos_direction==1 && _Cross(exitEMA, fastEMA)==2){ //多头出场
                Log("多单止盈", "#FF0000");
                this.place_order("closebuy");
            }else if(this.pos_direction==-1 && _Cross(exitEMA, fastEMA)==-2){ //空头出场
                Log("空单止盈", "#FF0000");
                this.place_order("closesell");
            }
        }
    }
}

//通过交互按扭，修改最大、最小值、超过此范围，就不再开仓。
function get_command(){
    var cmd = GetCommand();
    if (cmd) {
        Log("收到命令", cmd);
        try{
            var p_name = cmd.split(':', 2)[0]; 
            var p_val = cmd.replace(p_name+":", "");
            if(p_name=='test' && p_val){
                if(p_val.slice(0,4) == "whl:"){
                    eval(p_val.slice(4));
                }else{
                    Log("invalid")
                }
            }
        }catch(ex){
            Log("异常", ex.message)
        }
    }
    
}

function onexit() {
    Log("正在退出......");

    Log("策略成功停止");
}
```

> 策略出处

https://www.fmz.com/strategy/297001

> 更新时间

2022-03-04 10:46:10
