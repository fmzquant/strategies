/*
策略出处: https://www.botvs.com/strategy/16845
策略名称: 定期定额投资BTC盈利验证
策略作者: 春哥
策略描述:

每次按照固定金额购买比特币持有


参数              默认值  描述
------------  -----  --------
FIXED_AMOUNT    100  每次买多少人民币
PERIOD        86400  周期(单位秒)
*/


var total_cny = 0;
var days = 0;
var total_btc = 0;

function main() {
    
    var chart = createChart();
    while( true) {
        total_cny+=FIXED_AMOUNT;
        days++;
    
        var ticker = exchange.GetTicker();
        total_btc += FIXED_AMOUNT/ticker.Last;
    
        var current_value = ticker.Last * total_btc;
    
        LogProfit(current_value - total_cny);
        
        var time = new Date().getTime();
        chart.add([0, [time, total_cny ]]);
        chart.add([1, [time, current_value]]);
        
        Sleep(PERIOD*1000);
    }
}



function createChart() {

    var options = {
        rangeSelector: {
            selected: 4
        },
        __isStock: true,
        yAxis: {
            labels: {
                formatter: function () {
                    return (this.value > 0 ? ' + ' : '') + this.value + '%';
                }
            },
            plotLines: [{
                value: 0,
                width: 2,
                color: 'silver'
            }]
        },

        plotOptions: {
            series: {
                compare: 'percent'
            }
        },

        tooltip: {
            pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.change}%)<br/> {point.text}',
            valueDecimals: 2
        },

        series: [ 
        {
            name: '成本',
            data: []
        },
           {
            name: '账户价值',
            data: []
        }
        ]
    };

    return Chart(options);
}



