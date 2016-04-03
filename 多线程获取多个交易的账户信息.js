/*
策略出处: https://www.botvs.com/strategy/3297
策略名称: 多线程获取多个交易的账户信息
策略作者: Zero
策略描述:

多线程获取多个交易的账户信息

*/

function main() {
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
            Sleep(100);
        }
    }
}
