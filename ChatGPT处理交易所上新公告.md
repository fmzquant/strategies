
> Name

ChatGPT处理交易所上新公告

> Author

ChaoZhang

> Strategy Description

解决交易所上架时间不统一问题的一种有效方法是利用 ChatGPT 进行处理，避免使用正则表达式进行繁琐的匹配。将公告直接交给 ChatGPT，让其识别和处理各种交易所的时间格式，成为了一种便捷且高效的应用场景。

通过将公告文本传递给 openaiCompletions 函数，您可以利用 ChatGPT 的强大能力，从各种交易所的上架公告中提取关键信息。这种方法不仅提高了处理效率，还增强了对不同时间格式的兼容性。

在使用此函数之前，需要设置策略参数 OPENAI_API_KEY，该参数用于提供您的 OpenAI API 密钥。您可以使用自己的密钥以访问 gpt-3.5-turbo API。

函数名称：openaiCompletions

功能简介：这个函数通过调用 OpenAI 的 gpt-3.5-turbo 模型，判断输入的公告内容是否为交易所现货上新交易对的公告。若公告符合条件，函数会返回一个 JSON 对象，包含成功标识、交易对以及北京时间；若公告不符合条件，则仅返回一个失败标识。

输入参数：
content：需要判断的公告内容。

输出结果：
JSON 对象，包含以下键值对：

success：布尔值，表示判断结果是否成功。
pair：（仅在 success 为 true 时存在）字符串数组，表示交易对。
time：（仅在 success 为 true 时存在）字符串，表示公告发布时间，已转换为北京时间（UTC+8）。
函数执行流程：

定义请求 gpt-3.5-turbo API 的 URL、请求头以及请求数据。
调用 HttpQuery 方法，将请求数据以 JSON 格式发送给 gpt-3.5-turbo API。
解析 gpt-3.5-turbo API 返回的 JSON 数据，并提取所需信息。
返回处理后的 JSON 对象。

使用示例：

```
var content = "某交易所宣布，将于2023年3月22日12:00（UTC+8）上线ID/USDT交易对。";
var result = openaiCompletions(content);
Log(result);
```

输出结果：

```
{
  "success": true,
  "pair": ["ID_USDT"],
  "time": "2023-03-22 12:00:00"
}

```

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|OPENAI_API_KEY|xxxx|API KEY|


> Source (javascript)

``` javascript

// 封装的函数
function openaiCompletions(content) {
    var url = 'https://api.openai.com/v1/chat/completions';
    var headers = 'Content-Type: application/json\nAuthorization: Bearer ' + OPENAI_API_KEY;
    var data = {
        model: 'gpt-4',//如果api没有gpt-4的权限,这里可以修改为gpt-3.5-turbo
        messages: [
          {role: "system", "content": '判断公告内容,是交易所现货上新交易对的公告吗?如果是你只需要以json的{"success":true,"pair":["ID_USDT"],"time":"2023-03-22 12:00:00"}格式,时间转换为北京时间utc+8,如果不是返回{"success":false}'},
          {role: 'user', content: content}
          ]
    };

    var response = HttpQuery(url, JSON.stringify(data),null,headers,false);
    response = JSON.parse(response)
    return JSON.parse(response.choices[0].message.content);
}

// 使用示例
function main() {
    let announcement = `Fellow Binancians,
Binance will list Radiant Capital (RDNT) in the Innovation Zone and will open trading for these spot trading pairs at 2023-03-30 07:30 (UTC):
New Spot Trading Pairs: RDNT/BTC, RDNT/USDT, RDNT/TUSD
Users can now start depositing RDNT in preparation for trading
Withdrawals for RDNT will open at 2023-03-31 07:30 (UTC)
RDNT Listing Fee: 0 BNB
Users will enjoy zero maker fees on the RDNT/TUSD trading pairs until further notice
Note: The withdrawal open time is an estimated time for users’ reference. Users can view the actual status of withdrawals on the withdrawal page.
In addition, Binance will add RDNT as a new borrowable asset with these new margin pairs on Isolated Margin, within 48 hours from 2023-03-30 07:30 (UTC):
New Isolated Margin Pairs: RDNT/USDT
Please refer to Margin Data for a list of the most updated marginable assets and further information on specific limits and rates.
What is Radiant Capital (RDNT)?
Radiant Capital is a decentralized omnichain money market protocol. Users can stake their collateral on one of the major chains and borrow from another chain. RDNT is the utility token for liquidity mining and governance.
Reminder:
The Innovation Zone is a dedicated trading zone where users are able to trade new, innovative tokens that are likely to have higher volatility and pose a higher risk than other tokens.
Before being able to trade in the Innovation Zone, all users are required to visit the web version of the Innovation Zone trading page to carefully read the Binance Terms of Use and complete a questionnaire as part of the Initial Disclaimer. Please note that there will not be any trading restrictions on trading pairs in the Innovation Zone.
RDNT is a relatively new token that poses a higher than normal risk, and as such will likely be subject to high price volatility. Please ensure that you exercise sufficient risk management, have done your own research in regards to RDNT’s fundamentals, and fully understand the project before opting to trade the token.
Details:
Radiant Capital Website
RDNT Token Contract Addresses - Arbitrum, BNB Chain
Fees
Rules
Thanks for your support!
Binance Team
2023-03-30`
Log(openaiCompletions(announcement))

}

```

> Detail

https://www.fmz.com/strategy/407636

> Last Modified

2023-04-03 14:03:09
