/*
策略出处: https://www.botvs.com/strategy/46484
策略名称: 均线MA指标使用范例
策略作者: yilidalei
策略描述:



*/

function main(){
    while(true){
        var records = exchange.GetRecords(PERIOD_D1)
        if(!records || records.length < 60){
            continue
        }
        
        $.PlotRecords(records, 'K线 - MA60')
        
        var MA60 = TA.MA(records, 60)
        
        $.PlotLine('MA60', MA60[MA60.length - 1], records[records.length - 1].Time)
        
        LogStatus(_D(), '\n', "当前K线bar", records[records.length - 1], '\n', "当前MA60指标：", MA60[MA60.length - 1])
        
        Sleep(500)
    }
}
