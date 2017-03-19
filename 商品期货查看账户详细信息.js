/*
策略出处: https://www.botvs.com/strategy/37793
策略名称: 商品期货查看账户详细信息
策略作者: Zero
策略描述:



*/

var trans = {
    "AccountID": "投资者帐号",
    "Available": "可用资金",
    "Balance": "期货结算准备金",
    "BrokerID": "经纪公司代码",
    "CashIn": "资金差额",
    "CloseProfit": "平仓盈亏",
    "Commission": "手续费",
    "Credit": "信用额度",
    "CurrMargin": "当前保证金总额",
    "CurrencyID": "币种代码",
    "DeliveryMargin": "投资者交割保证金",
    "Deposit": "入金金额",
    "ExchangeDeliveryMargin": "交易所交割保证金",
    "ExchangeMargin": "交易所保证金",
    "FrozenCash": "冻结的资金",
    "FrozenCommission": "冻结的手续费",
    "FrozenMargin": "冻结的保证金",
    "FundMortgageAvailable": "货币质押余额",
    "FundMortgageIn": "货币质入金额",
    "FundMortgageOut": "货币质出金额",
    "Interest": "利息收入",
    "InterestBase": "利息基数",
    "Mortgage": "质押金额",
    "MortgageableFund": "可质押货币金额",
    "PositionProfit": "持仓盈亏",
    "PreBalance": "上次结算准备金",
    "PreCredit": "上次信用额度",
    "PreDeposit": "上次存款额",
    "PreFundMortgageIn": "上次货币质入金额",
    "PreFundMortgageOut": "上次货币质出金额",
    "PreMargin": "上次占用的保证金",
    "PreMortgage": "上次质押金额",
    "Reserve": "基本准备金",
    "ReserveBalance": "保底期货结算准备金",
    "SettlementID": "结算编号",
    "SpecProductCloseProfit": "特殊产品持仓盈亏",
    "SpecProductCommission": "特殊产品手续费",
    "SpecProductExchangeMargin": "特殊产品交易所保证金",
    "SpecProductFrozenCommission": "特殊产品冻结手续费",
    "SpecProductFrozenMargin": "特殊产品冻结保证金",
    "SpecProductMargin": "特殊产品占用保证金",
    "SpecProductPositionProfit": "特殊产品持仓盈亏",
    "SpecProductPositionProfitByAlg": "根据持仓盈亏算法计算的特殊产品持仓盈亏",
    "TradingDay": "交易日",
    "Withdraw": "出金金额",
    "WithdrawQuota": "可取资金",
};

function AccountToTable(jsStr, title) {
    if (typeof(title) === 'undefined') {
        title = '账户信息';
    }
    var tbl = {
        type: "table",
        title: title,
        cols: ["字段", "描述", "值"],
        rows: []
    };
    try {
        var fields = JSON.parse(jsStr);
        for (var k in fields) {
            if (k == 'AccountID' || k == 'BrokerID') {
                continue
            }
            var desc = trans[k];
            var v = fields[k];
            if (typeof(v) === 'number') {
                v = _N(v, 5);
            }
            tbl.rows.push([k, typeof(desc) === 'undefined' ? '--' : desc, v]);
        }
    } catch (e) {}
    return tbl;
}


function main() {
    var account = _C(exchange.GetAccount);
    var raw = exchange.GetRawJSON()
    LogStatus('`' + JSON.stringify(AccountToTable(raw))+'`')
    Log(raw)
    Log("已经在状态栏以表格形式显示")
}
