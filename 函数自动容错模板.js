/*
策略出处: https://www.botvs.com/strategy/11609
策略名称: 函数自动容错模板
策略作者: Zero
策略描述:

打勾调用此模板后会自动对指定的Api函数进行重试容错, 支持多交易所


参数                 默认值                                                                           描述
-----------------  ----------------------------------------------------------------------------  ----------
RetryInterval      500                                                                           容错重试间隔(毫秒)
Debug              true                                                                          显示重试记录
EnableErrorFilter  false                                                                         屏蔽常见网络错误信息
ApiList            GetAccount,GetDepth,GetTicker,GetRecords,GetTrades,GetOrders,SetContractType  容错API列表
*/

// 模板初始化时调用
function init() {
    // 过滤常见错误
    if (EnableErrorFilter) {
        SetErrorFilter("502:|503:|tcp|character|connection|unexpected|network|timeout|WSARecv|Connect|GetAddr|no such|reset|http|received|EOF|reused");
    }
    // 重定义需要容错的函数
    var names = ApiList.split(',');
    _.each(exchanges, function(e) {
        _.each(names, function(name) {
            if (typeof(e[name]) !== 'function') {
                throw "尝试容错 " + name + " 失败, 请确认存在此API并且输入正确.";
            }
            var old = e[name];
            e[name] = function() {
                var r;
                while (!(r = old.apply(this, Array.prototype.slice.call(arguments)))) {
                    if (Debug) {
                        Log(e.GetLabel(), name, "调用失败", RetryInterval, "毫秒后重试...");
                    }
                    Sleep(RetryInterval);
                }
                return r;
            };
        });
    });
    Log("容错机制开启", names);
}

// Test
function main() {
    // 此时GetTicker就不需要重试了
    Log(exchange.GetTicker());
}
