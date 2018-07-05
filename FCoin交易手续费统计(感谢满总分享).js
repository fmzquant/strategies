/*
策略出处: https://www.fmz.com/strategy/98405
策略名称: FCoin交易手续费统计(感谢满总分享)
策略作者: 每日一嫩模
策略描述:



*/

//2018-6-13 22:19
var Trades = [];
var fees = {"usdt": 0, "btc": 0, "eth": 0, "etc": 0, "ft": 0};
var num = 0;
var table = {
    type: "table",
    title: "标题",
    cols: ["ts", "时间", "买卖", "委托数", "委托价", "成交额", "成交数", "成交均价", "手续费", "来源", "状态", "交易对", "委托类型", "手续费币"],
    rows: []
};
var FC_pairs = FC_pairs();

function main() {

    /*
     symbol      交易对
     states      订单状态

     submitted   已提交
     partial_filled  部分成交
     partial_canceled    部分成交已撤销
     filled  完全成交
     canceled    已撤销
     pending_cancel  撤销已提交

     before      查询某个页码之前的订单
     after       查询某个页码之后的订单
     limit       每页的订单数量，默认为 20 条

     */

    var Pairs = Object.keys(FC_pairs);//["btcusdt","ltcusdt","ethusdt","ftusdt","ftbtc","etcusdt","bchusdt"];
    var States = ["partial_canceled", "filled", "partial_filled"];

    var after = new Date().setHours(0, 0, 0, 0);
    var end = after + 24 * 3600 * 1000;

    var ts0 = new Date().getTime();
    Pairs.forEach(function (Symbol) {
        var ts = after;

        States.forEach(function (State) {
            while (true) {
                Sleep(1000);
//Log(56,new Date().getTime()-ts0);
                ts0 = new Date().getTime();
                var ordersHistory = FC_ordersHistory(Symbol, State, "after", ts);
                calcFees(ordersHistory, end);
                if (ordersHistory.length < 100) {
                    break;
                }
                ts = ordersHistory[0].created_at + 1;
            }
        });

    });

    Log(fees, after, new Date(after));//new Date().format("M-d h:m:s")

    table.title = JSON.stringify(fees);
    table.rows = Trades;
    // LogStatus("`" + JSON.stringify([table]) + "`" + "\n");
}

function calcFees(ordersHistory, end) {
    ordersHistory.forEach(function (v) {
        if (v.created_at < end) {
            var quote = FC_pairs[v.symbol][v.side === "buy" ? 0 : 1];
            if (!fees.hasOwnProperty(quote)) {
                fees[quote] = 0;
            }
            fees[quote] += Number(v.fill_fees);
            Trades.push(FC_ordersformat(v).concat([quote]));
        }
    });
}

function FC_pairs() {
    var info;
    var sleep = 1000;
    try {
        info = exchange.IO("api", "GET", "/v2/public/symbols");//
    } catch (e) {
        Log("FC_pairs()出错重试");
        Sleep(sleep);
        sleep += sleep;
        FC_pairs();
    }

    if (info.hasOwnProperty("status") && info.status === 429) {
        Log("429错误");
        Sleep(10000);
        FC_pairs();
    } else {
        info = info.data;
    }
    var ret = {};
    info.forEach(function (v) {
        if (!ret.hasOwnProperty(v)) {
            ret[v.name] = {};
        }
        ret[v.name] = [v.base_currency, v.quote_currency];
    });

    return ret;
}

function FC_ordersHistory(symbol, states, after_before, ts) {
    Log(ts, new Date(ts));
    var args = "symbol=" + symbol + "&limit=100&states=" + states + "&" + after_before + "=" + ts;
    var info;
    var sleep = 3000;
    try {
        info = exchange.IO("api", "GET", "/v2/orders", args);
        Log(args);
        Log(info.data.length);
    } catch (e) {
        Log("FC_ordersHistory 出错重试");
        Sleep(sleep);
        sleep += sleep;
        return FC_ordersHistory(symbol, states, after_before, ts);
    }

    if (info.hasOwnProperty("status") && info.status === 429) {
        Log("429错误");
        Sleep(10000);
        return FC_ordersHistory(symbol, states, after_before, ts);
    }
    return info.data;
}

function FC_ordersformat(v) {
    var ret = [v.created_at, new Date(v.created_at), v.side, Number(v.amount), Number(v.price), Number(v.executed_value), Number(v.filled_amount), _N(Number(v.executed_value) / Number(v.filled_amount), 8), Number(v.fill_fees), v.source, v.state, v.symbol, v.type];
    return ret;
}

