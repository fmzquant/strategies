/*
策略出处: https://www.botvs.com/strategy/3651
策略名称: 多线程获取多个交易的深度信息
策略作者: Zero
策略描述:

多线程获取多个交易的深度信息

*/

function main() {
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
            Sleep(100);
        }
    }
}

