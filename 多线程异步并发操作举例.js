/*
策略出处: https://www.botvs.com/strategy/3292
策略名称: 多线程异步并发操作举例
策略作者: Zero
策略描述:

exchange.Go函数的多线程并发实例

*/

function main() {
    if (parseFloat(Version()) < 2.72) {
        throw "并发只支持2.72或以上版本";
    }
    var a = exchange.Go("GetTicker");
    var b = exchange.Go("GetDepth");
    var c = exchange.Go("GetAccount");
    // 以上三个操作是并发执行的
    var ts = new Date();
    Log(a.wait());
    Log(b.wait());
    Log(c.wait(1000)); // 1秒超时, 超时会返回null, 超时后可以再次wait
    Log("耗时 ", (new Date().getTime() - ts.getTime())/1000, "秒");
}
