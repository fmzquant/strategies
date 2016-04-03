/*
策略出处: https://www.botvs.com/strategy/8954
策略名称: 融资融币统计
策略作者: 数·狂
策略描述:

使用交易所api功能显示当前交易所的融资融币情况（未还部分，含手续费）。目前只支持OKCoin和火币，欢迎继续完善。
需要最新版托管者。

*/

function getLoanInfo(exchange, type) {
    var loanInfo;
    var dueAmount;
    if (exchange.GetName() == "OKCoin") { 
        loanInfo = exchange.IO("api", "borrows_info", "symbol=cny");
        if (type == "btc") {
            dueAmount = loanInfo.borrow_btc + loanInfo.interest_btc;
        }
        else if (type == "ltc") {
            dueAmount = loanInfo.borrow_ltc + loanInfo.interest_ltc;
        }   
        else if (type == "cny") {
            dueAmount = loanInfo.borrow_cny + loanInfo.interest_cny;
        }
    }
    else if (exchange.GetName() == "Huobi") {
        loanInfo = exchange.IO("api", "get_loans", "market=cny");
        dueAmount = 0;
            for (var i = 0; i < loanInfo.length; i++) {
                if (type == "cny" && loanInfo[i].type == 1 || type == "btc" && loanInfo[i].type == 2 || type == "ltc" && loanInfo[i].type == 3) {
                    dueAmount += (Number(loanInfo[i].loan_amount) - Number(loanInfo[i].repayment_amount) + Number(loanInfo[i].interest_nopay) + Number(loanInfo[i].interest_payed));
                }
            }
    }
    else 
        throw "暂不支持交易所: " + exchange.GetName();
    return dueAmount;
}

function main() {
    for (var i = 0; i < exchanges.length; i++)
        Log(exchanges[i].GetName(),
            "未归还CNY:", getLoanInfo(exchanges[i], "cny"),
            "未归还BTC:", getLoanInfo(exchanges[i], "btc"),
            "未归还LTC:", getLoanInfo(exchanges[i], "ltc")
           );
}
