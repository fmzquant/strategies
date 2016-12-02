/*
策略出处: https://www.botvs.com/strategy/23943
策略名称: jLibPub_借贷函数库
策略作者: J
策略描述:

目前仅支持 OKCoin 和火币的借贷、还款操作。

查询借贷信息: 
exchname = exchange.GetName();
loanInfo = $.loanBalance(exchname);
Log('比特币借款:' + loanInfo.btc);
Log('莱特币借款:‘ + loanInfo.ltc);
Log('人民币借款:‘ + loanInfo.cny);

人民币借款: $.loan("borrow", "cny", leverage);  
第三个参数为 0-1 之间的小数，借款金额 = 最大可借款数 x leverage，例如: $.loan("borrow", "cny", 0.3);  表示借款数为最大可借数量的 30%

比特币借款: $.loan("borrow", "btc", leverage);  
第三个参数为 0-1 之间的小数，借币数量 = 最大可借币数 x leverage，例如: $.loan("borrow", "btc", 0.3);  表示借币数为最大可借数量的 30%

人民币全额还款: $.loan("repayment", "cny", 1);

比特币全额还币: $.loan("repayment", "btc", 1);


如果想借款固定金额，也可以用
loanInfo = $.OKLoanBorrow("cny", 100);  // 从OKCoin 借入人民币100元
Log("借款单号: " + loanInfo.id);

loanInfo = $.HuobiLoanBorrow(1, 100);    // 从火币借入人民币100元， 币种：1 人民币 2 比特币 3 莱特币 4 美元
Log("借款单号: " + loanInfo.id);

loanInfo = $.HuobiLoanBorrow(2, 0.1);    // 从火币借入比特币0.1个， 币种：1 人民币 2 比特币 3 莱特币 4 美元
Log("借款单号: " + loanInfo.id);

*/

var account = null;

// 
// OKCoin 借款接口
// 

/*
功能: 查询借款信息

请求参数
symbol
btc_cny: 比特币 ltc_cny: 莱特币 cny: 人民币

返回值说明
borrow_btc：已经借到的btc数量
borrow_ltc：已经借到的ltc数量
borrow_cny：已经借到的人民币数量
can_borrow：可借金额
interest_btc：btc总利息
interest_ltc：ltc总利息
interest_cny：人民币总利息
today_interest_btc：btc今日新增利息
today_interest_ltc：ltc今日新增利息
today_interest_cny：人民币今日新增利息
*/
$.OKLoanInfo = function(symbol) {
    var returnInfo = exchange.IO("api", "borrows_info", "symbol=" + symbol);
    return returnInfo;
};

$.OKLoanBorrow = function(symbol, amount) {
    return exchange.IO("api", "borrow_money", "symbol=" + symbol + "&amount=" + amount + "&days=fifteen&rate=0.001");
};

/* 
功能: 用户还全款

请求参数
borrow_id：借款单ID

返回值说明
borrow_id: 借款单ID
result: 订单还款结果
*/
$.OKLoanRepayment = function(borrow_id) {
    return exchange.IO("api", "repayment", "borrow_id=" + borrow_id);
};

/*
功能: 未还款列表

请求参数
symbol：btc_cny: 比特币 ltc_cny: 莱特币 cny: 人民币

返回值说明
amount: 借款数量
borrow_date: 借款时间戳
borrow_id: 借款单ID
days: 借款时间
deal_amount: 已经借款金额
rate: 借款利率
status: 借款状态：'0等待成交 1部分成交'
symbol: 借款货币类型
*/
$.OKLoanUnrepayment = function(symbol) {
    return exchange.IO("api", "unrepayments_info", "symbol=" + symbol + "&current_page=1&page_length=50");
};

/*
功能: 获取借款订单记录

请求参数
borrow_id：借款单ID

返回值说明
amount: 借款数量
borrow_date: 借款时间戳
borrow_id: 借款单ID
days: 借款天数
deal_amount: 已经借款金额
rate: 借款利率
status: 借款状态：'0等待成交1部分成交2完全成交-1撤单'
symbol: 借款货币类型
*/
$.OKLoanOrderInfo = function(borrow_id) {
    return exchange.IO("api", "borrow_order_info", "borrow_id=" + borrow_id);
};

// 如借款时间接近一天，全额还款
$.OKLoanCheck = function() {
    var i = 0;
    var loanInfo = null;
    var date = new Date();
    var currentTime = date.getTime();

    var diffMs = 0;
    var diffDays = 0;
    var diffHrs = 0;
    var diffMins = 0;

    loanInfo = $.OKLoanUnrepayment("cny");
    if ( loanInfo.result ) {
        for (i = 0; i < loanInfo.unrepayments.length; i++) {
            Log(loanInfo.unrepayments[i]);
            diffMs = (currentTime - loanInfo.unrepayments[i].borrow_date);
            diffDays = Math.round(diffMs / 86400000); // days
            diffHrs = Math.round((diffMs % 86400000) / 3600000); // hours
            diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
            // Log("人民币借款时长: " + diffDays + "天" + diffHrs + "小时" + diffMins + "分钟");
            if ( diffHrs >= 23 ) {
            	// 借款时间超过23小时，开始还款
            	account = exchange.GetAccount();
            	if ( (loanInfo.unrepayments[i].symbol == "cny") && (account.Balance > loanInfo.unrepayments[i].deal_amount) ) {
                    loanInfo1 = $.OKLoanRepayment(loanInfo.unrepayments[i].borrow_id);
                    if ( loanInfo1.result ) {
           	            Log("人民币还款成功。订单号:" + loanInfo1.borrow_id);
                    } else {
           	            Log("人民币还款失败。@");
                    }
            	}
             }
        }
    } else {
    	Log("查询人民币借款出错！");
    }

    loanInfo = $.OKLoanUnrepayment("btc_cny");
    if ( loanInfo.result ) {
        for (i = 0; i < loanInfo.unrepayments.length; i++) {
            Log(loanInfo.unrepayments[i]);
            diffMs = (currentTime - loanInfo.unrepayments[i].borrow_date);
            diffDays = Math.round(diffMs / 86400000);                           // 借款天数
            diffHrs = Math.round((diffMs % 86400000) / 3600000);                // 借款小时
            diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);     // 借款分钟
            // Log("比特币借款时长: " + diffDays + "天" + diffHrs + "小时" + diffMins + "分钟");
            if ( diffHrs >= 23 ) {
            	// 借款时间超过23小时，如果账户里有钱，开始还款
            	account = exchange.GetAccount();
            	if ( (loanInfo.unrepayments[i].symbol == "btc_cny") && (account.Stocks > loanInfo.unrepayments[i].deal_amount) ) {
                    loanInfo1 = $.OKLoanRepayment(loanInfo.unrepayments[i].borrow_id);
                    if ( loanInfo1.result ) {
           	            Log("比特币还款成功。订单号:" + loanInfo1.borrow_id);
                    } else {
           	            Log("比特币还款失败。@");
                    }
            	}
             }
        }
    } else {
    	Log("查询比特币借款出错！");
    }
};


// 
// 火币借款接口
// 

/*
功能: 查询可申请杠杆额度

请求参数
(无)

返回结果
cny_net_asset	人民币净资产(market为cny时返回)
btc_net_asset	比特币净资产
ltc_net_asset	莱特币净资产
usd_net_asset	美元净资产(market为usd时返回)
loaned_cny	已申请的人民币(market为cny时返回)
loaned_btc	已申请的比特币
loaned_ltc	已申请的莱特币
loaned_usd	已申请的美元(market为usd时返回)
can_loan_cny	可申请的人民币(market为cny时返回)
can_loan_btc	可申请的比特币
can_loan_ltc	可申请的莱特币
can_loan_usd	可申请的美元(market为usd时返回)
*/
$.HuobiLoanInfo = function() {
    var date = new Date();
    var currentTime = date.getTime();
    return exchange.IO("api", "get_loan_available", "created=" + Math.floor(currentTime/1000));
};


/*
功能: 申请杠杆

请求参数
amount		申请杠杆数量
loan_type	申请杠杆类型：1 人民币 2 比特币 3 莱特币 4美元

返回结果
id			申请杠杆记录id
result		success 成功
*/
$.HuobiLoanBorrow = function(type, amount) {
    var date = new Date();
    var currentTime = date.getTime();
    return exchange.IO("api", "loan", "amount=" + amount + "&loan_type=" + type + "&created=" + Math.floor(currentTime/1000));
};


/*
功能: 归还杠杆

请求参数
loan_id		申请杠杆记录id
amount		归还杠杆数量
repay_all	是否归还全部：0 否 1是 默认是0 此项不参与sign签名过程

返回结果
id			申请杠杆记录id
result		success 成功
*/
$.HuobiLoanRepayment = function(loan_id, amount, repay_all) {
    var date = new Date();
    var currentTime = date.getTime();
    return exchange.IO("api", "repayment", "loan_id=" + loan_id + "&amount=" + amount + "&created=" + Math.floor(currentTime/1000) + "&!repay_all=" + repay_all);
};


/*
功能: 查询杠杆列表

请求参数
(无)

返回结果
id	杠杆id
type	杠杆类型：1 人民币 2 比特币 3 莱特币 4 美元
status	杠杆状态：0 未还清 1 部分归还 2 已还清
loan_amount	申请的杠杆额度
repayment_amount	已归还的杠杆额度
interest_rate	杠杆费率
interest_nopay	未归还杠杆手续费
interest_payed	已归还杠杆手续费
interest_time	计息时间
apply_time	申请杠杆时间
last_processed_time	最后处理时间
free_interest	免息额度
free_end_time	免息结束时间
*/
$.HuobiLoanOrderInfo = function() {
    var date = new Date();
    var currentTime = date.getTime();
    return exchange.IO("api", "get_loans", "created=" + Math.floor(currentTime/1000));
};


// 如借款时间接近一天，全额还款
$.HuobiLoanCheck = function() {
    var i = 0;
    var loanInfo = null;
    var loanInfo1 = null;
    var date = new Date();
    var currentTime = date.getTime();

    var diffMs = 0;
    var diffDays = 0;
    var diffHrs = 0;
    var diffMins = 0;
    var paymentValue = 0;

    loanInfo = $.HuobiLoanOrderInfo();
    if ( !loanInfo.code ) {
        for (i = 0; i < loanInfo.length; i++) {
        	if (loanInfo[i].status > 1) { continue; }
            Log(loanInfo[i]);
            diffMs = (currentTime - loanInfo[i].apply_time * 1000);
            diffDays = Math.round(diffMs / 86400000);                       // 借款天数
            diffHrs = Math.round((diffMs % 86400000) / 3600000);            // 借款小时
            diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // 借款分钟
            Log("借款时长: " + diffDays + "天" + diffHrs + "小时" + diffMins + "分钟");
            if ( diffHrs >= 23 ) {
            	// 借款时间超过23小时，如果账户里有钱，开始还款
            	account = exchange.GetAccount();
            	paymentValue = Number(loanInfo[i].loan_amount) - Number(loanInfo[i].repayment_amount) + Number(loanInfo[i].interest_nopay);

                // 杠杆类型：1 人民币 2 比特币 3 莱特币 4 美元
            	if ( (loanInfo[i].type == 1) && (account.Balance >= paymentValue) 
            	) {
                    loanInfo1 = $.HuobiLoanRepayment(loanInfo[i].id, paymentValue, 1);
                    if ( !!loanInfo1.result && loanInfo1.result === "success" ) {
           	            Log("人民币还款成功。订单号:" + loanInfo1.id);
                    } else {
           	            Log("人民币还款失败。@");
                    }
            	}

            	if ( (loanInfo[i].type == 2) && (account.Stocks >= paymentValue) 
            	) {
                    loanInfo1 = $.HuobiLoanRepayment(loanInfo[i].id, paymentValue, 1);
                    if ( !!loanInfo1.result && loanInfo1.result === "success" ) {
           	            Log("比特币还款成功。订单号:" + loanInfo1.id);
                    } else {
           	            Log("比特币还款失败。@");
                    }
            	}

             }
        }
    } else {
    	Log("查询借款出错！");
    }

};

// 借款 borrow、还款 repayment
// type: cny 人民币 btc 比特币
$.loan = function(action, type, leverage) {

    var i = 0;
    var loanInfo = null;
    var loanInfo1 = null;
    var paymentValue = 0;

    var exchname = exchange.GetName();

    switch (action + "|" + type) {
        case "borrow|cny":
            switch (exchname) {
                case "OKCoin":                                // OKCoin 人民币借款接口
                    loanInfo1 = $.OKLoanInfo("cny");
                    if (loanInfo1.can_borrow > 100) {
                        loanInfo3 = $.OKLoanBorrow("cny", loanInfo1.can_borrow * leverage);
                        if ( !!loanInfo3.result ) {
                            Log("借人民币: " + loanInfo1.can_borrow * leverage + "元，借款单号: " + loanInfo3.borrow_id);
                        } else {
                           Log("人民币借款出错！");
                        }
                    }
                    break;
                case "Huobi":                                 // 火币 人民币借款接口
                    loanInfo1 = $.HuobiLoanInfo("");
                    if (loanInfo1.can_loan_cny > 100) {
                        // 杠杆类型：1 人民币 2 比特币 3 莱特币 4 美元
                        loanInfo3 = $.HuobiLoanBorrow(1, loanInfo1.can_loan_cny * leverage);
                        if ( !!loanInfo3.result && loanInfo3.result == "success" ) {
                            Log("借人民币: " + loanInfo1.can_loan_cny * leverage + "元，借款单号: " + loanInfo3.id);
                        } else {
                           Log("人民币借款出错！");
                        }
                    }
                    break;
                default:
                    // Log("交易所" + exchname + "借款接口暂未实现");
                    break;
            }
            break;

        case "borrow|btc":
            switch (exchname) {
                case "OKCoin":                                // OKCoin 比特币借款接口
                    loanInfo2 = $.OKLoanInfo("btc_cny");
                    if (loanInfo2.can_borrow > 0.1) {
                        loanInfo3 = $.OKLoanBorrow("btc_cny", loanInfo2.can_borrow * leverage);
                        if ( !!loanInfo3.result ) {
                            Log("借比特币: " + loanInfo2.can_borrow * leverage + "个，借款单号: " + loanInfo3.borrow_id);
                        } else {
                           Log("比特币借款出错！");
                        }
                    }
                    break;
                case "Huobi":                                 // 火币 比特币借款接口
                    loanInfo1 = $.HuobiLoanInfo("");
                    if (loanInfo1.can_loan_btc > 0.1) {
                        // 杠杆类型：1 人民币 2 比特币 3 莱特币 4 美元
                        loanInfo4 = $.HuobiLoanBorrow(2, loanInfo1.can_loan_btc * leverage);
                        if ( !!loanInfo4.result && loanInfo4.result == "success" ) {
                            Log("借比特币: " + loanInfo1.can_loan_btc * leverage + "个，借款单号: " + loanInfo4.id);     
                        } else {
                            Log("比特币借款出错！");
                        }
                    }
                    break;
                default:
                    // Log("交易所" + exchname + "借款接口暂未实现");
                    break;
            }
            break;

        case "repayment|cny":
            account = exchange.GetAccount();
            switch (exchname) {
                case "OKCoin":                                // OKCoin 人民币还款
                    loanInfo = $.OKLoanUnrepayment("cny");
                    if ( !!loanInfo.result ) {
                        for (i = 0; i < loanInfo.unrepayments.length; i++) {
                                if ( (loanInfo.unrepayments[i].symbol == "cny") && (account.Balance > loanInfo.unrepayments[i].deal_amount) ) {
                                    loanInfo1 = $.OKLoanRepayment(loanInfo.unrepayments[i].borrow_id);
                                    if ( loanInfo1.result ) {
                                        Log("人民币还款成功。订单号:" + loanInfo1.borrow_id);
                                    } else {
                                        Log("人民币还款失败。@");
                                    }
                                }
                        }
                    } else {
                        Log("查询人民币借款出错！");
                    }
                    break;

                case "Huobi":                                 // 火币 人民币还款
                    loanInfo = $.HuobiLoanOrderInfo();
                    if ( !loanInfo.code ) {
                        for (i = 0; i < loanInfo.length; i++) {
                            if (loanInfo[i].status > 1) { continue; }
                            paymentValue = Number(loanInfo[i].loan_amount) - Number(loanInfo[i].repayment_amount) + Number(loanInfo[i].interest_nopay);

                            // 杠杆类型：1 人民币 2 比特币 3 莱特币 4 美元
                            if ( (loanInfo[i].type == 1) && (account.Balance >= paymentValue) 
                            ) {
                                loanInfo1 = $.HuobiLoanRepayment(loanInfo[i].id, paymentValue, 1);
                                if ( !!loanInfo1.result && loanInfo1.result === "success" ) {
                                    Log("人民币还款成功。订单号:" + loanInfo1.id);
                                } else {
                                    Log("人民币还款失败。@");
                                }
                            }
                        }
                    } else {
                        Log("查询借款出错！");
                    }
                    break;

                default:
                    // Log("交易所" + exchname + "借款接口暂未实现");
                    break;
            }
            break;
        case "repayment|btc":
            account = exchange.GetAccount();
            switch (exchname) {
                case "OKCoin":                                // OKCoin 比特币还款
                    loanInfo = $.OKLoanUnrepayment("btc_cny");
                    if ( !!loanInfo.result ) {
                        for (i = 0; i < loanInfo.unrepayments.length; i++) {
                                if ( (loanInfo.unrepayments[i].symbol == "btc_cny") && (account.Stocks > loanInfo.unrepayments[i].deal_amount) ) {
                                    loanInfo1 = $.OKLoanRepayment(loanInfo.unrepayments[i].borrow_id);
                                    if ( loanInfo1.result ) {
                                        Log("比特币还款成功。订单号:" + loanInfo1.borrow_id);
                                    } else {
                                        Log("比特币还款失败。@");
                                    }
                                }
                        }
                    } else {
                        Log("查询比特币借款出错！");
                    }
                    break;

                case "Huobi":                                 // 火币 比特币还款
                    loanInfo = $.HuobiLoanOrderInfo();
                    if ( !loanInfo.code ) {
                        for (i = 0; i < loanInfo.length; i++) {
                            if (loanInfo[i].status > 1) { continue; }
                            paymentValue = Number(loanInfo[i].loan_amount) - Number(loanInfo[i].repayment_amount) + Number(loanInfo[i].interest_nopay);

                            // 杠杆类型：1 人民币 2 比特币 3 莱特币 4 美元
                            if ( (loanInfo[i].type == 2) && (account.Stocks >= paymentValue) 
                            ) {
                                loanInfo1 = $.HuobiLoanRepayment(loanInfo[i].id, paymentValue, 1);
                                if ( !!loanInfo1.result && loanInfo1.result === "success" ) {
                                    Log("比特币还款成功。订单号:" + loanInfo1.id);
                                } else {
                                    Log("比特币还款失败。@");
                                }
                            }
                        }
                    } else {
                        Log("查询借款出错！");
                    }
                    break;

                default:
                    // Log("交易所" + exchname + "借款接口暂未实现");
                    break;
            }
            break;
        default:
            break;
    }
};

$.loanBalance = function(exchname) {
    switch (exchname) {
        case "OKCoin":
            loanInfo1 = $.OKLoanInfo("cny");
            return { cny: loanInfo1.borrow_cny,
                     btc: loanInfo1.borrow_btc
                   };
        case "Huobi":
            loanInfo1 = $.HuobiLoanInfo("");
            return { cny: loanInfo1.loaned_cny,
                     btc: loanInfo1.loaned_btc
                   };
        default:
            // Log("交易所" + exchname + "借款接口暂未实现");
            return null;
    }
};

// 仅调试模板策略用
function main() {

    var borrow_id = 0;
    var exchname = exchange.GetName();

    var loanInfo1 = null;
    var loanInfo2 = null;
    var loanInfo3 = null;
    var loanInfo4 = null;

    switch (exchname) {
        case "OKCoin":                                // 测试 OKCoin 借款接口
            loanInfo1 = $.OKLoanInfo("cny");
            Log(loanInfo1);
            Log("OKCoin可借人民币: " + loanInfo1.can_borrow + "元");

            loanInfo2 = $.OKLoanInfo("btc_cny");
            Log(loanInfo2);
            Log("OKCoin可借比特币: " + loanInfo2.can_borrow + "个");

            // 借款人民币 100元
            // loanInfo3 = $.OKLoanBorrow("cny", 100);
            // if ( loanInfo3.result ) {
            //     Log("OKCoin借款单号: " + loanInfo3.borrow_id);    	
            // } else {
            //     Log("OKCoin借款出错！");
            // }

            $.OKLoanCheck();
            break;
        case "Huobi":                                 // 测试火币借款接口
            loanInfo1 = $.HuobiLoanInfo("");
            Log(loanInfo1);
            Log("火币可借人民币: " + loanInfo1.can_loan_cny + "元");
            Log("火币可借比特币: " + loanInfo1.can_loan_btc + "个");

            // 杠杆类型：1 人民币 2 比特币 3 莱特币 4 美元

            // 借款人民币 100元
            // loanInfo3 = $.HuobiLoanBorrow(1, 100);
            // if ( !!loanInfo3.result && loanInfo3.result == "success" ) {
            //     Log("火币借款单号: " + loanInfo3.id);    	
            // } else {
            //    Log("火币借款出错！");
            // }

            // 借款比特币 0.1 个
            // loanInfo4 = $.HuobiLoanBorrow(2, 0.1);
            // if ( !!loanInfo4.result && loanInfo4.result == "success" ) {
            //     Log("火币借款单号: " + loanInfo4.id);    	
            // } else {
            //     Log("火币借款出错！");
            // }

            $.HuobiLoanCheck();
            break;
        default:
            Log("交易所" + exchname + "借款接口暂未实现");
    }

}
