
> Name

基于交叉移动均线的趋势追踪自适应期望值评估策略-Trend-Following-Adaptive-Expected-Value-Assessment-Strategy-Based-on-Crossover-Moving-Averages

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/12c105a3ea8feb747f4.png)


#### Overview
This strategy uses the crossover of two simple moving averages with different periods to determine the trend direction and enters trades when a trend appears. At the same time, the strategy also introduces an expected value panel to calculate and display the expected returns of the strategy at different time scales, allowing users to better assess the strategy's performance. The expected value panel takes into account key indicators such as the strategy's win rate, average profit, and average loss during historical periods, and presents the strategy's performance under different market conditions in an intuitive manner.

#### Strategy Principle
The core of this strategy is to use the crossover of two simple moving averages with different periods (14-day and 28-day in this example) to determine market trends. When the short-term average crosses above the long-term average from below, it is considered that the market has entered an upward trend, and the strategy opens a long position. Conversely, when the short-term average crosses below the long-term average from above, it is considered that the market has entered a downward trend, and the strategy opens a short position. In this way, the strategy can adapt to different market trends and establish positions in a timely manner when trends appear to capture the profits brought by the trends.

In addition to the basic trend determination and trading logic, the strategy also introduces an expected value panel to calculate and display the expected returns of the strategy at different time scales (monthly and yearly). The calculation of expected value is based on key statistical indicators of the strategy during historical periods, including:
1. Win rate: the proportion of profitable trades to total trades in the time period
2. Average profit: the average profit amount of all profitable trades in the time period
3. Average loss: the average loss amount of all losing trades in the time period

Using these indicators, the expected value of the strategy in that time period can be calculated:
Expected Value = Win Rate × Average Profit - (1 - Win Rate) × Average Loss

By displaying the expected values of different time periods in the form of a heatmap on the chart, users can see at a glance the expected performance of the strategy under different market conditions, thus better grasping the applicability and risk of the strategy.

#### Advantage Analysis
1. Strong adaptability to trends: By using moving average crossovers to determine trends, the strategy can adjust positions in a timely manner under different market trends to adapt to market changes. This enables the strategy to achieve good returns in trending markets.

2. Intuitive performance evaluation: The built-in expected value panel displays the expected returns of the strategy at different time periods in the form of a heatmap, allowing users to assess the performance of the strategy under different market conditions at a glance. This visualized performance presentation provides users with more decision-making references.

3. Consideration of key statistical indicators: The calculation of expected value not only considers the win rate of the strategy but also integrates the impact of average profit and average loss. This calculation method can reflect the actual performance of the strategy more comprehensively and accurately, providing users with more reliable references.

4. Flexible parameter settings: Users can flexibly set whether to display the expected value panel and its transparency according to their needs. This allows users to adjust the display effect of the chart according to their preferences, improving the user experience.

#### Risk Analysis
1. Poor performance in range-bound markets: Since the strategy mainly relies on trends to generate profits, frequent trading in range-bound or trend-unclear market conditions may lead to significant slippage and transaction costs, affecting the overall performance of the strategy.

2. Limitations of expected value calculation: Although the expected value panel provides an intuitive way to evaluate strategy performance, it is still based on historical data for calculation. When significant changes occur in the market or extreme situations arise, historical data may not well reflect the actual performance of the strategy, and the reference value of expected value may be reduced.

3. Large impact of parameter selection: The performance of the strategy largely depends on the selection of moving average periods. Different period combinations may bring completely different trading results. If the selected parameters cannot well adapt to market characteristics, the actual performance of the strategy may deviate significantly from the expected value.

#### Optimization Direction
1. Introduce more technical indicators: On the basis of the existing moving averages, other technical indicators such as MACD and RSI can be considered to better determine the strength and sustainability of trends, thereby improving the timing of strategy entries and exits.

2. Optimize position management: Currently, the strategy adopts a fixed position approach when trading signals appear. It can be considered to dynamically adjust positions based on factors such as market volatility and trend strength to better control risks and increase returns.

3. Add stop-profit and stop-loss mechanisms: Adding reasonable stop-profit and stop-loss mechanisms to the strategy can help the strategy lock in existing profits in a timely manner while limiting potential losses. This helps to improve the risk-reward ratio of the strategy and maintain relatively steady performance in various market environments.

4. Optimize the calculation of expected value: The calculation method of expected value can be further optimized, such as considering transaction costs and introducing moving windows to improve the effectiveness and practicality of the expected value indicator. In addition, other strategy performance evaluation indicators can be explored to provide users with more comprehensive references.

#### Summary
This strategy determines market trends by using moving average crossovers and establishes positions in a timely manner when trends appear to capture the profits brought by the trends. At the same time, the strategy also introduces an intuitive expected value panel to display the expected returns of the strategy at different time scales, providing users with more decision-making references. Although the strategy may perform poorly in range-bound markets and the calculation of expected value has certain limitations, by introducing more technical indicators, optimizing position management, adding stop-profit and stop-loss mechanisms, and other measures, the risk-reward ratio of the strategy can be further improved, enabling it to better adapt to changing market environments.



> Source (PineScript)

``` pinescript
/*backtest
start: 2023-06-11 00:00:00
end: 2024-06-16 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This Pine Script™ code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © ir0nantc2

//@version=5
strategy("Expected Value Panel", overlay=true)

// ロングエントリー条件 / Long entry condition
longCondition = ta.crossover(ta.sma(close, 14), ta.sma(close, 28))
if (longCondition)
    strategy.entry("My Long Entry Id", strategy.long)

// ショートエントリー条件 / Short entry condition
shortCondition = ta.crossunder(ta.sma(close, 14), ta.sma(close, 28))
if (shortCondition)
    strategy.entry("My Short Entry Id", strategy.short)



// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
// Please copy the code below and paste it into the strategy where you want to display the expected value.
// 以下のコードをコピーして期待値を表示させたいストラテジーに貼り付けて下さい。
// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

// 表示選択 / Display selection
show_performance = input.bool(true, '期待値ON/OFF (Show Expected Value)', group='Expected Value / ©ir0nantc2')
transparency = input.int(50, '透過度 (Transparency)', minval=0, maxval=100, group='Expected Value / ©ir0nantc2')
prec = 2

// 背景色 / Background color
bg_color(value) =>
    na(value) ? color.new(color.gray, transparency) : value > 0.0 ? color.new(color.green, transparency) :
   value < 0.0 ? color.new(color.red, transparency) :color.new(color.gray, transparency)

// 利益と損失の追跡 / Track profits and losses
var float total_monthly_profit = 0.0
var float total_yearly_profit = 0.0

if show_performance
    new_month = month(time) != month(time[1])
    new_year  = year(time)  != year(time[1])
    cur_month_pnl = 0.0, cur_year_pnl  = 0.0
    eq = strategy.equity
    bar_pnl = eq / eq[1] - 1

    // 月次・年次 期待値 / Monthly & Yearly Expected Value
    cur_month_pnl := new_month ? 0.0 : (1 + cur_month_pnl[1]) * (1 + bar_pnl) - 1 
    cur_year_pnl := new_year ? 0.0 : (1 + cur_year_pnl[1]) * (1 + bar_pnl) - 1  
    
    // 年次および月次期待値を格納 / Store monthly and yearly expected values
    var month_pnl  = array.new_float(), var month_time = array.new_int()
    var year_pnl  = array.new_float(), var year_time = array.new_int()
    
    // 期待値計算の変数 / Variables for expected value calculation
    var month_wins = array.new_int(), var month_losses = array.new_int()
    var month_avg_win = array.new_float(), var month_avg_loss = array.new_float()
    var year_wins = array.new_int(), var year_losses = array.new_int()
    var year_avg_win = array.new_float(), var year_avg_loss = array.new_float()

    // 月次および年次期待値の配列更新 / Update arrays for monthly and yearly expected values
    bool last_computed = false
    if (not na(cur_month_pnl[1]) and (new_month or barstate.islastconfirmedhistory))
        if (last_computed and array.size(month_pnl) > 0)
            array.pop(month_pnl), array.pop(month_time)
            array.pop(month_wins), array.pop(month_losses)
            array.pop(month_avg_win), array.pop(month_avg_loss)

        array.push(month_pnl, cur_month_pnl[1]), array.push(month_time, time[1])
        array.push(month_wins, 0), array.push(month_losses, 0)
        array.push(month_avg_win, 0.0), array.push(month_avg_loss, 0.0)
    
    if (not na(cur_year_pnl[1]) and (new_year or barstate.islastconfirmedhistory))
        if (last_computed and array.size(year_pnl) > 0)
            array.pop(year_pnl), array.pop(year_time)
            array.pop(year_wins), array.pop(year_losses)
            array.pop(year_avg_win), array.pop(year_avg_loss)

        array.push(year_pnl, cur_year_pnl[1]), array.push(year_time, time[1])
        array.push(year_wins, 0), array.push(year_losses, 0)
        array.push(year_avg_win, 0.0), array.push(year_avg_loss, 0.0)

    last_computed := barstate.islastconfirmedhistory ? true : last_computed

    // 勝ち取引と負け取引を追跡 / Track winning and losing trades
    if (strategy.closedtrades > 0 and na(strategy.closedtrades[1]) == false)
        closed_profit = strategy.netprofit - strategy.netprofit[1]
        if closed_profit > 0
            if array.size(month_wins) > 0
                wins = array.get(month_wins, array.size(month_wins) - 1) + 1
                avg_win = (array.get(month_avg_win, array.size(month_avg_win) - 1) * (wins - 1) + closed_profit) / wins
                array.set(month_wins, array.size(month_wins) - 1, wins)
                array.set(month_avg_win, array.size(month_avg_win) - 1, avg_win)
            if array.size(year_wins) > 0
                wins = array.get(year_wins, array.size(year_wins) - 1) + 1
                avg_win = (array.get(year_avg_win, array.size(year_avg_win) - 1) * (wins - 1) + closed_profit) / wins
                array.set(year_wins, array.size(year_wins) - 1, wins)
                array.set(year_avg_win, array.size(year_avg_win) - 1, avg_win)
        else
            if array.size(month_losses) > 0
                losses = array.get(month_losses, array.size(month_losses) - 1) + 1
                avg_loss = (array.get(month_avg_loss, array.size(month_avg_loss) - 1) * (losses - 1) + closed_profit) / losses
                array.set(month_losses, array.size(month_losses) - 1, losses)
                array.set(month_avg_loss, array.size(month_avg_loss) - 1, avg_loss)
            if array.size(year_losses) > 0
                losses = array.get(year_losses, array.size(year_losses) - 1) + 1
                avg_loss = (array.get(year_avg_loss, array.size(year_avg_loss) - 1) * (losses - 1) + closed_profit) / losses
                array.set(year_losses, array.size(year_losses) - 1, losses)
                array.set(year_avg_loss, array.size(year_avg_loss) - 1, avg_loss)

    // 月次テーブル / Monthly table
    var monthly_table = table(na)
    if (barstate.islastconfirmedhistory)
        monthly_table := table.new(position.bottom_right, columns = 14, rows = array.size(year_time) + 1, border_width = 1)
        table.cell(monthly_table, 0,  0, "",     bgcolor = #bbbbbb00)
        table.cell(monthly_table, 1,  0, "Jan",  bgcolor = #bbbbbb)
        table.cell(monthly_table, 2,  0, "Feb",  bgcolor = #bbbbbb)
        table.cell(monthly_table, 3,  0, "Mar",  bgcolor = #bbbbbb)
        table.cell(monthly_table, 4,  0, "Apr",  bgcolor = #bbbbbb)
        table.cell(monthly_table, 5,  0, "May",  bgcolor = #bbbbbb)
        table.cell(monthly_table, 6,  0, "Jun",  bgcolor = #bbbbbb)
        table.cell(monthly_table, 7,  0, "Jul",  bgcolor = #bbbbbb)
        table.cell(monthly_table, 8,  0, "Aug",  bgcolor = #bbbbbb)
        table.cell(monthly_table, 9,  0, "Sep",  bgcolor = #bbbbbb)
        table.cell(monthly_table, 10, 0, "Oct",  bgcolor = #bbbbbb)
        table.cell(monthly_table, 11, 0, "Nov",  bgcolor = #bbbbbb)
        table.cell(monthly_table, 12, 0, "Dec",  bgcolor = #bbbbbb)
        table.cell(monthly_table, 13, 0, "Year", bgcolor = #bbbbbb)
    
        // 年次データの集計 / Collecting yearly data
        var year_total_pnl = array.new_float()
        var year_exp_val = array.new_float()
        
        for yt = 0 to array.size(year_time) - 1
            total_year_wins = 0, total_year_losses = 0
            total_year_avg_win = 0.0, total_year_avg_loss = 0.0
            total_year_pnl = 0.0

            for mt = 1 to 12
                idx = -1
                for j = 0 to array.size(month_time) - 1
                    if year(array.get(month_time, j)) == year(array.get(year_time, yt)) and month(array.get(month_time, j)) == mt
                        idx := j
                        break
                if idx != -1
                    total_year_pnl := total_year_pnl + array.get(month_pnl, idx)
                    total_year_wins := total_year_wins + array.get(month_wins, idx)
                    total_year_losses := total_year_losses + array.get(month_losses, idx)
                    total_year_avg_win := total_year_avg_win + (array.get(month_avg_win, idx) * array.get(month_wins, idx))
                    total_year_avg_loss := total_year_avg_loss + (array.get(month_avg_loss, idx) * array.get(month_losses, idx))
            
            total_year_avg_win := total_year_wins > 0 ? total_year_avg_win / total_year_wins : 0.0
            total_year_avg_loss := total_year_losses > 0 ? total_year_avg_loss / total_year_losses : 0.0
            win_rate = total_year_wins + total_year_losses > 0 ? total_year_wins / (total_year_wins + total_year_losses) : na
            exp_val = win_rate ? (win_rate * total_year_avg_win) - ((1 - win_rate) * math.abs(total_year_avg_loss)) : na
            array.push(year_total_pnl, total_year_pnl)
            array.push(year_exp_val, exp_val)
            
        for yt = 0 to array.size(year_time) - 1
            table.cell(monthly_table, 0,  yt + 1, str.tostring(year(array.get(year_time, yt))), bgcolor = #bbbbbb)
            
            y_color = bg_color(array.get(year_exp_val, yt))
            value_to_display = na(array.get(year_exp_val, yt)) ? "" : str.tostring(math.round(array.get(year_exp_val, yt) * 100, prec))
            table.cell(monthly_table, 13, yt + 1, value_to_display, bgcolor = y_color, text_color=color.new(color.white, 0))
            
        for mt = 0 to array.size(month_time) - 1
            m_row = year(array.get(month_time, mt)) - year(array.get(year_time, 0)) + 1
            m_col = month(array.get(month_time, mt))
            
            if array.size(month_wins) > mt and array.size(month_losses) > mt and array.size(month_avg_win) > mt and array.size(month_avg_loss) > mt
                win_rate = array.get(month_wins, mt) / (array.get(month_wins, mt) + array.get(month_losses, mt))
                exp_val = (win_rate * array.get(month_avg_win, mt)) - ((1 - win_rate) * math.abs(array.get(month_avg_loss, mt)))
                m_color = bg_color(exp_val)
                value_to_display = na(exp_val) ? "" : str.tostring(math.round(exp_val * 100, prec))
                table.cell(monthly_table, m_col, m_row, value_to_display, bgcolor = m_color, text_color=color.new(color.white, 0))
            else
                table.cell(monthly_table, m_col, m_row, "", bgcolor = color.new(color.gray, transparency), text_color=color.new(color.white, 0))
// [EOF]

```

> Detail

https://www.fmz.com/strategy/454362

> Last Modified

2024-06-17 16:29:02
