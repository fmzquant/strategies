
> Name

OKEX交易对信息

> Author

leviyuan





> Source (javascript)

``` javascript
// https://github.com/okcoin-okex/API-docs-OKEx.com/blob/master/%E5%B8%81%E5%AF%B9%E7%B2%BE%E5%BA%A6(pairs_increment).csv
var data = {}

$.GetTradeInfo = function(tradeName) {
    return data[tradeName]
}

$.GetAllTradeNames = function() {
    var list = []
    for (var n in data)
        list[list.length] = n
    return list
}

data.bch_btc = {
    base_min_size: 0.001,
    base_increment: 0.00000001,
    quote_increment: 0.00000001
}
data.ltc_btc = {
    base_min_size: 0.001,
    base_increment: 0.000001,
    quote_increment: 0.00000001
}
data.eth_btc = {
    base_min_size: 0.001,
    base_increment: 0.000001,
    quote_increment: 0.00000001
}
data.etc_btc = {
    base_min_size: 0.01,
    base_increment: 0.00001,
    quote_increment: 0.00000001
}
data.eth_usdt = {
    base_min_size: 0.001,
    base_increment: 0.000001,
    quote_increment: 0.0001
}
data.btc_usdt = {
    base_min_size: 0.001,
    base_increment: 0.00000001,
    quote_increment: 0.0001
}
data.bt2_btc = {
    base_min_size: 0.01,
    base_increment: 0.00001,
    quote_increment: 0.00000001
}
data.etc_eth = {
    base_min_size: 0.01,
    base_increment: 0.00001,
    quote_increment: 0.00000001
}
data.btg_btc = {
    base_min_size: 0.01,
    base_increment: 0.00001,
    quote_increment: 0.00000001
}
data.ltc_usdt = {
    base_min_size: 0.001,
    base_increment: 0.000001,
    quote_increment: 0.0001
}
data.etc_usdt = {
    base_min_size: 0.01,
    base_increment: 0.00001,
    quote_increment: 0.0001
}
data.bch_usdt = {
    base_min_size: 0.001,
    base_increment: 0.00000001,
    quote_increment: 0.0001
}
data.qtum_btc = {
    base_min_size: 0.01,
    base_increment: 0.00001,
    quote_increment: 0.00000001
}
data.qtum_usdt = {
    base_min_size: 0.01,
    base_increment: 0.00001,
    quote_increment: 0.0001
}
data.qtum_eth = {
    base_min_size: 0.01,
    base_increment: 0.00001,
    quote_increment: 0.00000001
}
data.neo_btc = {
    base_min_size: 0.01,
    base_increment: 0.00001,
    quote_increment: 0.00000001
}
data.gas_btc = {
    base_min_size: 0.01,
    base_increment: 0.00001,
    quote_increment: 0.00000001
}
data.hsr_btc = {
    base_min_size: 0.1,
    base_increment: 0.0001,
    quote_increment: 0.00000001
}
data.neo_eth = {
    base_min_size: 0.01,
    base_increment: 0.00001,
    quote_increment: 0.00000001
}
data.gas_eth = {
    base_min_size: 0.01,
    base_increment: 0.00001,
    quote_increment: 0.00000001
}
data.hsr_eth = {
    base_min_size: 0.1,
    base_increment: 0.0001,
    quote_increment: 0.00000001
}
data.neo_usdt = {
    base_min_size: 0.01,
    base_increment: 0.00001,
    quote_increment: 0.0001
}
data.gas_usdt = {
    base_min_size: 0.01,
    base_increment: 0.00001,
    quote_increment: 0.0001
}
data.hsr_usdt = {
    base_min_size: 0.1,
    base_increment: 0.0001,
    quote_increment: 0.0001
}
data.dash_btc = {
    base_min_size: 0.001,
    base_increment: 0.000001,
    quote_increment: 0.00000001
}
data.xrp_btc = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.00000001
}
data.zec_btc = {
    base_min_size: 0.001,
    base_increment: 0.000001,
    quote_increment: 0.00000001
}
data.dash_eth = {
    base_min_size: 0.001,
    base_increment: 0.000001,
    quote_increment: 0.00000001
}
data.xrp_eth = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.00000001
}
data.zec_eth = {
    base_min_size: 0.001,
    base_increment: 0.000001,
    quote_increment: 0.00000001
}
data.dash_usdt = {
    base_min_size: 0.001,
    base_increment: 0.000001,
    quote_increment: 0.0001
}
data.xrp_usdt = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.0001
}
data.zec_usdt = {
    base_min_size: 0.001,
    base_increment: 0.000001,
    quote_increment: 0.0001
}
data.iota_btc = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.00000001
}
data.xuc_btc = {
    base_min_size: 0.1,
    base_increment: 0.0001,
    quote_increment: 0.00000001
}
data.iota_eth = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.00000001
}
data.xuc_eth = {
    base_min_size: 0.1,
    base_increment: 0.0001,
    quote_increment: 0.00000001
}
data.iota_usdt = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.0001
}
data.xuc_usdt = {
    base_min_size: 0.1,
    base_increment: 0.0001,
    quote_increment: 0.0001
}
data.eos_btc = {
    base_min_size: 0.1,
    base_increment: 0.0001,
    quote_increment: 0.00000001
}
data.omg_btc = {
    base_min_size: 0.1,
    base_increment: 0.0001,
    quote_increment: 0.00000001
}
data.eos_eth = {
    base_min_size: 0.1,
    base_increment: 0.0001,
    quote_increment: 0.00000001
}
data.omg_eth = {
    base_min_size: 0.1,
    base_increment: 0.0001,
    quote_increment: 0.00000001
}
data.eos_usdt = {
    base_min_size: 0.1,
    base_increment: 0.0001,
    quote_increment: 0.0001
}
data.omg_usdt = {
    base_min_size: 0.1,
    base_increment: 0.0001,
    quote_increment: 0.0001
}
data.act_btc = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.00000001
}
data.btm_btc = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.00000001
}
data.act_eth = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.00000001
}
data.btm_eth = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.00000001
}
data.act_usdt = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.0001
}
data.btm_usdt = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.0001
}
data.bcd_btc = {
    base_min_size: 0.1,
    base_increment: 0.0001,
    quote_increment: 0.00000001
}
data.bcd_usdt = {
    base_min_size: 0.1,
    base_increment: 0.0001,
    quote_increment: 0.0001
}
data.storj_btc = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.00000001
}
data.snt_btc = {
    base_min_size: 10,
    base_increment: 0.01,
    quote_increment: 0.00000001
}
data.storj_eth = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.00000001
}
data.snt_eth = {
    base_min_size: 10,
    base_increment: 0.01,
    quote_increment: 0.00000001
}
data.storj_usdt = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.0001
}
data.snt_usdt = {
    base_min_size: 10,
    base_increment: 0.01,
    quote_increment: 0.0001
}
data.pay_btc = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.00000001
}
data.dgd_btc = {
    base_min_size: 0.001,
    base_increment: 0.000001,
    quote_increment: 0.00000001
}
data.gnt_btc = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.00000001
}
data.pay_eth = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.00000001
}
data.dgd_eth = {
    base_min_size: 0.001,
    base_increment: 0.000001,
    quote_increment: 0.00000001
}
data.gnt_eth = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.00000001
}
data.pay_usdt = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.0001
}
data.dgd_usdt = {
    base_min_size: 0.001,
    base_increment: 0.000001,
    quote_increment: 0.0001
}
data.gnt_usdt = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.0001
}
data.lrc_btc = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.00000001
}
data.nuls_btc = {
    base_min_size: 0.1,
    base_increment: 0.0001,
    quote_increment: 0.00000001
}
data.mco_btc = {
    base_min_size: 0.1,
    base_increment: 0.0001,
    quote_increment: 0.00000001
}
data.lrc_eth = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.00000001
}
data.nuls_eth = {
    base_min_size: 0.1,
    base_increment: 0.0001,
    quote_increment: 0.00000001
}
data.mco_eth = {
    base_min_size: 0.1,
    base_increment: 0.0001,
    quote_increment: 0.00000001
}
data.lrc_usdt = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.0001
}
data.nuls_usdt = {
    base_min_size: 0.1,
    base_increment: 0.0001,
    quote_increment: 0.0001
}
data.mco_usdt = {
    base_min_size: 0.1,
    base_increment: 0.0001,
    quote_increment: 0.0001
}
data.btg_usdt = {
    base_min_size: 0.01,
    base_increment: 0.00001,
    quote_increment: 0.0001
}
data.cmt_btc = {
    base_min_size: 10,
    base_increment: 0.01,
    quote_increment: 0.00000001
}
data.itc_btc = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.00000001
}
data.cmt_eth = {
    base_min_size: 10,
    base_increment: 0.01,
    quote_increment: 0.00000001
}
data.itc_eth = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.00000001
}
data.cmt_usdt = {
    base_min_size: 10,
    base_increment: 0.01,
    quote_increment: 0.0001
}
data.itc_usdt = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.0001
}
data.sbtc_btc = {
    base_min_size: 0.1,
    base_increment: 0.0001,
    quote_increment: 0.00000001
}
data.pra_btc = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.00000001
}
data.san_btc = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.00000001
}
data.edo_btc = {
    base_min_size: 0.1,
    base_increment: 0.0001,
    quote_increment: 0.00000001
}
data.avt_btc = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.00000001
}
data.pra_eth = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.00000001
}
data.san_eth = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.00000001
}
data.edo_eth = {
    base_min_size: 0.1,
    base_increment: 0.0001,
    quote_increment: 0.00000001
}
data.avt_eth = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.00000001
}
data.pra_usdt = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.0001
}
data.san_usdt = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.0001
}
data.edo_usdt = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.0001
}
data.avt_usdt = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.0001
}
data.ltc_eth = {
    base_min_size: 0.001,
    base_increment: 0.000001,
    quote_increment: 0.00000001
}
data.link_btc = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.00000001
}
data.salt_btc = {
    base_min_size: 0.1,
    base_increment: 0.0001,
    quote_increment: 0.00000001
}
data["1st_btc"] = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.00000001
}
data.wtc_btc = {
    base_min_size: 0.1,
    base_increment: 0.0001,
    quote_increment: 0.00000001
}
data.sngls_btc = {
    base_min_size: 10,
    base_increment: 0.01,
    quote_increment: 0.00000001
}
data.snm_btc = {
    base_min_size: 10,
    base_increment: 0.01,
    quote_increment: 0.00000001
}
data.zrx_btc = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.00000001
}
data.bnt_btc = {
    base_min_size: 0.1,
    base_increment: 0.0001,
    quote_increment: 0.00000001
}
data.cvc_btc = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.00000001
}
data.link_eth = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.00000001
}
data.salt_eth = {
    base_min_size: 0.1,
    base_increment: 0.0001,
    quote_increment: 0.00000001
}
data["1st_eth"] = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.00000001
}
data.wtc_eth = {
    base_min_size: 0.1,
    base_increment: 0.0001,
    quote_increment: 0.00000001
}
data.sngls_eth = {
    base_min_size: 10,
    base_increment: 0.01,
    quote_increment: 0.00000001
}
data.snm_eth = {
    base_min_size: 10,
    base_increment: 0.01,
    quote_increment: 0.00000001
}
data.zrx_eth = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.00000001
}
data.bnt_eth = {
    base_min_size: 0.1,
    base_increment: 0.0001,
    quote_increment: 0.00000001
}
data.cvc_eth = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.00000001
}
data.link_usdt = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.0001
}
data.salt_usdt = {
    base_min_size: 0.1,
    base_increment: 0.0001,
    quote_increment: 0.0001
}
data["1st_usdt"] = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.0001
}
data.wtc_usdt = {
    base_min_size: 0.1,
    base_increment: 0.0001,
    quote_increment: 0.0001
}
data.sngls_usdt = {
    base_min_size: 10,
    base_increment: 0.01,
    quote_increment: 0.0001
}
data.snm_usdt = {
    base_min_size: 10,
    base_increment: 0.01,
    quote_increment: 0.0001
}
data.zrx_usdt = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.0001
}
data.bnt_usdt = {
    base_min_size: 0.1,
    base_increment: 0.0001,
    quote_increment: 0.0001
}
data.cvc_usdt = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.0001
}
data.bcx_btc = {
    base_min_size: 10,
    base_increment: 0.1,
    quote_increment: 0.00000001
}
data.mana_btc = {
    base_min_size: 10,
    base_increment: 0.01,
    quote_increment: 0.00000001
}
data.rcn_btc = {
    base_min_size: 10,
    base_increment: 0.01,
    quote_increment: 0.00000001
}
data.mana_eth = {
    base_min_size: 10,
    base_increment: 0.01,
    quote_increment: 0.00000001
}
data.mana_usdt = {
    base_min_size: 10,
    base_increment: 0.01,
    quote_increment: 0.0001
}
data.vee_btc = {
    base_min_size: 10,
    base_increment: 0.01,
    quote_increment: 0.00000001
}
data.vee_eth = {
    base_min_size: 10,
    base_increment: 0.01,
    quote_increment: 0.00000001
}
data.vee_usdt = {
    base_min_size: 10,
    base_increment: 0.01,
    quote_increment: 0.0001
}
data.tnb_btc = {
    base_min_size: 10,
    base_increment: 0.01,
    quote_increment: 0.00000001
}
data.tnb_eth = {
    base_min_size: 10,
    base_increment: 0.01,
    quote_increment: 0.00000001
}
data.tnb_usdt = {
    base_min_size: 10,
    base_increment: 0.01,
    quote_increment: 0.0001
}
data.amm_btc = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.00000001
}
data.amm_eth = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.00000001
}
data.amm_usdt = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.0001
}
data.knc_btc = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.00000001
}
data.knc_eth = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.00000001
}
data.knc_usdt = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.0001
}
data.dat_eth = {
    base_min_size: 10,
    base_increment: 0.01,
    quote_increment: 0.00000001
}
data.dat_btc = {
    base_min_size: 10,
    base_increment: 0.01,
    quote_increment: 0.00000001
}
data.dat_usdt = {
    base_min_size: 10,
    base_increment: 0.01,
    quote_increment: 0.0001
}
data.gnx_btc = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.00000001
}
data.gnx_eth = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.00000001
}
data.gnx_usdt = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.0001
}
data.icx_btc = {
    base_min_size: 0.1,
    base_increment: 0.0001,
    quote_increment: 0.00000001
}
data.icx_eth = {
    base_min_size: 0.1,
    base_increment: 0.0001,
    quote_increment: 0.00000001
}
data.icx_usdt = {
    base_min_size: 0.1,
    base_increment: 0.0001,
    quote_increment: 0.0001
}
data.ark_btc = {
    base_min_size: 0.1,
    base_increment: 0.0001,
    quote_increment: 0.00000001
}
data.ark_eth = {
    base_min_size: 0.1,
    base_increment: 0.0001,
    quote_increment: 0.00000001
}
data.ark_usdt = {
    base_min_size: 0.1,
    base_increment: 0.0001,
    quote_increment: 0.0001
}
data.yoyo_btc = {
    base_min_size: 10,
    base_increment: 0.01,
    quote_increment: 0.00000001
}
data.yoyo_eth = {
    base_min_size: 10,
    base_increment: 0.01,
    quote_increment: 0.00000001
}
data.yoyo_usdt = {
    base_min_size: 10,
    base_increment: 0.01,
    quote_increment: 0.0001
}
data.qvt_btc = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.00000001
}
data.qvt_eth = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.00000001
}
data.qvt_usdt = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.0001
}
data.elf_eth = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.00000001
}
data.elf_btc = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.00000001
}
data.elf_usdt = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.0001
}
data.ast_btc = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.00000001
}
data.ast_eth = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.00000001
}
data.ast_usdt = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.0001
}
data.sub_btc = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.00000001
}
data.sub_eth = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.00000001
}
data.sub_usdt = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.0001
}
data.dnt_btc = {
    base_min_size: 10,
    base_increment: 0.01,
    quote_increment: 0.00000001
}
data.dnt_eth = {
    base_min_size: 10,
    base_increment: 0.01,
    quote_increment: 0.00000001
}
data.dnt_usdt = {
    base_min_size: 10,
    base_increment: 0.01,
    quote_increment: 0.0001
}
data.fun_btc = {
    base_min_size: 10,
    base_increment: 0.01,
    quote_increment: 0.00000001
}
data.fun_eth = {
    base_min_size: 10,
    base_increment: 0.01,
    quote_increment: 0.00000001
}
data.fun_usdt = {
    base_min_size: 10,
    base_increment: 0.01,
    quote_increment: 0.0001
}
data.ace_btc = {
    base_min_size: 10,
    base_increment: 0.01,
    quote_increment: 0.00000001
}
data.ace_eth = {
    base_min_size: 10,
    base_increment: 0.01,
    quote_increment: 0.00000001
}
data.ace_usdt = {
    base_min_size: 10,
    base_increment: 0.01,
    quote_increment: 0.0001
}
data.trx_btc = {
    base_min_size: 10,
    base_increment: 0.01,
    quote_increment: 0.00000001
}
data.trx_eth = {
    base_min_size: 10,
    base_increment: 0.01,
    quote_increment: 0.00000001
}
data.trx_usdt = {
    base_min_size: 10,
    base_increment: 0.01,
    quote_increment: 0.0001
}
data.evx_btc = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.00000001
}
data.evx_eth = {
    base_min_size: 0.1,
    base_increment: 0.0001,
    quote_increment: 0.00000001
}
data.evx_usdt = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.0001
}
data.mda_btc = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.00000001
}
data.mda_eth = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.00000001
}
data.mda_usdt = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.0001
}
data.mth_btc = {
    base_min_size: 10,
    base_increment: 0.01,
    quote_increment: 0.00000001
}
data.mth_eth = {
    base_min_size: 10,
    base_increment: 0.01,
    quote_increment: 0.00000001
}
data.mth_usdt = {
    base_min_size: 10,
    base_increment: 0.01,
    quote_increment: 0.0001
}
data.mtl_btc = {
    base_min_size: 0.1,
    base_increment: 0.0001,
    quote_increment: 0.00000001
}
data.mtl_eth = {
    base_min_size: 0.1,
    base_increment: 0.0001,
    quote_increment: 0.00000001
}
data.mtl_usdt = {
    base_min_size: 0.1,
    base_increment: 0.0001,
    quote_increment: 0.0001
}
data.xem_btc = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.00000001
}
data.xem_eth = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.00000001
}
data.xem_usdt = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.0001
}
data.icn_btc = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.00000001
}
data.icn_eth = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.00000001
}
data.icn_usdt = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.0001
}
data.eng_btc = {
    base_min_size: 0.1,
    base_increment: 0.0001,
    quote_increment: 0.00000001
}
data.req_btc = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.00000001
}
data.oax_btc = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.00000001
}
data.dgb_btc = {
    base_min_size: 10,
    base_increment: 0.01,
    quote_increment: 0.00000001
}
data.ppt_btc = {
    base_min_size: 0.01,
    base_increment: 0.00001,
    quote_increment: 0.00000001
}
data.dgb_eth = {
    base_min_size: 10,
    base_increment: 0.01,
    quote_increment: 0.00000001
}
data.dgb_usdt = {
    base_min_size: 10,
    base_increment: 0.01,
    quote_increment: 0.0001
}
data.ppt_eth = {
    base_min_size: 0.01,
    base_increment: 0.00001,
    quote_increment: 0.00000001
}
data.ppt_usdt = {
    base_min_size: 0.01,
    base_increment: 0.00001,
    quote_increment: 0.0001
}
data.oax_eth = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.00000001
}
data.oax_usdt = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.0001
}
data.req_eth = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.00000001
}
data.req_usdt = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.0001
}
data.eng_eth = {
    base_min_size: 0.1,
    base_increment: 0.0001,
    quote_increment: 0.00000001
}
data.eng_usdt = {
    base_min_size: 0.1,
    base_increment: 0.0001,
    quote_increment: 0.0001
}
data.rcn_eth = {
    base_min_size: 10,
    base_increment: 0.01,
    quote_increment: 0.00000001
}
data.rcn_usdt = {
    base_min_size: 10,
    base_increment: 0.01,
    quote_increment: 0.0001
}
data.swftc_btc = {
    base_min_size: 10,
    base_increment: 0.1,
    quote_increment: 0.00000001
}
data.swftc_eth = {
    base_min_size: 10,
    base_increment: 0.1,
    quote_increment: 0.00000001
}
data.swftc_usdt = {
    base_min_size: 10,
    base_increment: 0.1,
    quote_increment: 0.0001
}
data.rdn_btc = {
    base_min_size: 0.1,
    base_increment: 0.0001,
    quote_increment: 0.00000001
}
data.rdn_eth = {
    base_min_size: 0.1,
    base_increment: 0.0001,
    quote_increment: 0.00000001
}
data.rdn_usdt = {
    base_min_size: 0.1,
    base_increment: 0.0001,
    quote_increment: 0.0001
}
data.xmr_btc = {
    base_min_size: 0.001,
    base_increment: 0.000001,
    quote_increment: 0.00000001
}
data.xmr_eth = {
    base_min_size: 0.001,
    base_increment: 0.000001,
    quote_increment: 0.00000001
}
data.xmr_usdt = {
    base_min_size: 0.001,
    base_increment: 0.000001,
    quote_increment: 0.0001
}
data.xlm_btc = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.00000001
}
data.xlm_eth = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.00000001
}
data.xlm_usdt = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.0001
}
data.kcash_btc = {
    base_min_size: 10,
    base_increment: 0.01,
    quote_increment: 0.00000001
}
data.kcash_eth = {
    base_min_size: 10,
    base_increment: 0.01,
    quote_increment: 0.00000001
}
data.kcash_usdt = {
    base_min_size: 10,
    base_increment: 0.01,
    quote_increment: 0.0001
}
data.mdt_btc = {
    base_min_size: 10,
    base_increment: 0.01,
    quote_increment: 0.00000001
}
data.mdt_eth = {
    base_min_size: 10,
    base_increment: 0.01,
    quote_increment: 0.00000001
}
data.mdt_usdt = {
    base_min_size: 10,
    base_increment: 0.01,
    quote_increment: 0.0001
}
data.nas_btc = {
    base_min_size: 0.1,
    base_increment: 0.0001,
    quote_increment: 0.00000001
}
data.nas_eth = {
    base_min_size: 0.1,
    base_increment: 0.0001,
    quote_increment: 0.00000001
}
data.nas_usdt = {
    base_min_size: 0.1,
    base_increment: 0.0001,
    quote_increment: 0.0001
}
data.rnt_btc = {
    base_min_size: 10,
    base_increment: 0.01,
    quote_increment: 0.00000001
}
data.rnt_eth = {
    base_min_size: 10,
    base_increment: 0.01,
    quote_increment: 0.00000001
}
data.rnt_usdt = {
    base_min_size: 10,
    base_increment: 0.01,
    quote_increment: 0.0001
}
data.wrc_btc = {
    base_min_size: 10,
    base_increment: 0.01,
    quote_increment: 0.00000001
}
data.wrc_eth = {
    base_min_size: 10,
    base_increment: 0.01,
    quote_increment: 0.00000001
}
data.wrc_usdt = {
    base_min_size: 10,
    base_increment: 0.01,
    quote_increment: 0.0001
}
data.ukg_btc = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.00000001
}
data.ukg_eth = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.00000001
}
data.ukg_usdt = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.0001
}
data.ugc_btc = {
    base_min_size: 10,
    base_increment: 0.01,
    quote_increment: 0.00000001
}
data.ugc_eth = {
    base_min_size: 10,
    base_increment: 0.01,
    quote_increment: 0.00000001
}
data.ugc_usdt = {
    base_min_size: 10,
    base_increment: 0.01,
    quote_increment: 0.0001
}
data.dpy_btc = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.00000001
}
data.dpy_eth = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.00000001
}
data.dpy_usdt = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.0001
}
data.read_btc = {
    base_min_size: 10,
    base_increment: 0.01,
    quote_increment: 0.00000001
}
data.read_eth = {
    base_min_size: 10,
    base_increment: 0.01,
    quote_increment: 0.00000001
}
data.read_usdt = {
    base_min_size: 10,
    base_increment: 0.01,
    quote_increment: 0.0001
}
data.ssc_btc = {
    base_min_size: 10,
    base_increment: 0.01,
    quote_increment: 0.00000001
}
data.ssc_eth = {
    base_min_size: 10,
    base_increment: 0.01,
    quote_increment: 0.00000001
}
data.ssc_usdt = {
    base_min_size: 10,
    base_increment: 0.01,
    quote_increment: 0.0001
}
data.aac_btc = {
    base_min_size: 10,
    base_increment: 0.01,
    quote_increment: 0.00000001
}
data.fair_btc = {
    base_min_size: 10,
    base_increment: 0.01,
    quote_increment: 0.00000001
}
data.aac_eth = {
    base_min_size: 10,
    base_increment: 0.01,
    quote_increment: 0.00000001
}
data.aac_usdt = {
    base_min_size: 10,
    base_increment: 0.01,
    quote_increment: 0.0001
}
data.fair_eth = {
    base_min_size: 10,
    base_increment: 0.01,
    quote_increment: 0.00000001
}
data.fair_usdt = {
    base_min_size: 10,
    base_increment: 0.01,
    quote_increment: 0.0001
}
data.ubtc_btc = {
    base_min_size: 0.1,
    base_increment: 0.0001,
    quote_increment: 0.00000001
}
data.ubtc_eth = {
    base_min_size: 0.1,
    base_increment: 0.0001,
    quote_increment: 0.00000001
}
data.ubtc_usdt = {
    base_min_size: 0.1,
    base_increment: 0.0001,
    quote_increment: 0.0001
}
data.cag_btc = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.00000001
}
data.cag_eth = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.00000001
}
data.cag_usdt = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.0001
}
data.dna_btc = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.00000001
}
data.lend_btc = {
    base_min_size: 10,
    base_increment: 0.01,
    quote_increment: 0.00000001
}
data.lend_eth = {
    base_min_size: 10,
    base_increment: 0.01,
    quote_increment: 0.00000001
}
data.dna_eth = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.00000001
}
data.lend_usdt = {
    base_min_size: 10,
    base_increment: 0.01,
    quote_increment: 0.0001
}
data.dna_usdt = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.0001
}
data.rct_btc = {
    base_min_size: 10,
    base_increment: 0.01,
    quote_increment: 0.00000001
}
data.rct_eth = {
    base_min_size: 10,
    base_increment: 0.01,
    quote_increment: 0.00000001
}
data.rct_usdt = {
    base_min_size: 10,
    base_increment: 0.01,
    quote_increment: 0.0001
}
data.bch_eth = {
    base_min_size: 0.001,
    base_increment: 0.00000001,
    quote_increment: 0.00000001
}
data.show_btc = {
    base_min_size: 10,
    base_increment: 0.1,
    quote_increment: 0.00000001
}
data.show_eth = {
    base_min_size: 10,
    base_increment: 0.1,
    quote_increment: 0.00000001
}
data.show_usdt = {
    base_min_size: 10,
    base_increment: 0.1,
    quote_increment: 0.0001
}
data.vib_btc = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.00000001
}
data.vib_eth = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.00000001
}
data.vib_usdt = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.0001
}
data.mot_btc = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.00000001
}
data.mot_eth = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.00000001
}
data.mot_usdt = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.0001
}
data.utk_btc = {
    base_min_size: 10,
    base_increment: 0.01,
    quote_increment: 0.00000001
}
data.utk_eth = {
    base_min_size: 10,
    base_increment: 0.01,
    quote_increment: 0.00000001
}
data.utk_usdt = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.0001
}
data.mag_btc = {
    base_min_size: 10,
    base_increment: 0.1,
    quote_increment: 0.00000001
}
data.mag_eth = {
    base_min_size: 10,
    base_increment: 0.1,
    quote_increment: 0.00000001
}
data.mag_usdt = {
    base_min_size: 10,
    base_increment: 0.1,
    quote_increment: 0.0001
}
data.topc_btc = {
    base_min_size: 10,
    base_increment: 0.01,
    quote_increment: 0.00000001
}
data.topc_eth = {
    base_min_size: 10,
    base_increment: 0.01,
    quote_increment: 0.00000001
}
data.brd_btc = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.00000001
}
data.topc_usdt = {
    base_min_size: 10,
    base_increment: 0.01,
    quote_increment: 0.0001
}
data.qun_btc = {
    base_min_size: 10,
    base_increment: 0.01,
    quote_increment: 0.00000001
}
data.brd_eth = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.00000001
}
data.qun_eth = {
    base_min_size: 10,
    base_increment: 0.01,
    quote_increment: 0.00000001
}
data.qun_usdt = {
    base_min_size: 10,
    base_increment: 0.01,
    quote_increment: 0.0001
}
data.brd_usdt = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.0001
}
data.viu_btc = {
    base_min_size: 10,
    base_increment: 0.1,
    quote_increment: 0.00000001
}
data.viu_eth = {
    base_min_size: 10,
    base_increment: 0.1,
    quote_increment: 0.00000001
}
data.ost_btc = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.00000001
}
data.viu_usdt = {
    base_min_size: 10,
    base_increment: 0.1,
    quote_increment: 0.0001
}
data.ost_eth = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.00000001
}
data.ost_usdt = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.0001
}
data.aidoc_btc = {
    base_min_size: 10,
    base_increment: 0.01,
    quote_increment: 0.00000001
}
data.aidoc_eth = {
    base_min_size: 10,
    base_increment: 0.01,
    quote_increment: 0.00000001
}
data.aidoc_usdt = {
    base_min_size: 10,
    base_increment: 0.01,
    quote_increment: 0.0001
}
data.int_btc = {
    base_min_size: 10,
    base_increment: 0.01,
    quote_increment: 0.00000001
}
data.la_btc = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.00000001
}
data.la_eth = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.00000001
}
data.la_usdt = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.0001
}
data.int_eth = {
    base_min_size: 10,
    base_increment: 0.01,
    quote_increment: 0.00000001
}
data.int_usdt = {
    base_min_size: 10,
    base_increment: 0.01,
    quote_increment: 0.0001
}
data.ipc_btc = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.00000001
}
data.ipc_eth = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.00000001
}
data.ipc_usdt = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.0001
}
data.ngc_btc = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.00000001
}
data.ngc_eth = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.00000001
}
data.ngc_usdt = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.0001
}
data.tio_btc = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.00000001
}
data.tio_eth = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.00000001
}
data.tio_usdt = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.0001
}
data.iost_btc = {
    base_min_size: 0.1,
    base_increment: 0.01,
    quote_increment: 0.00000001
}
data.iost_eth = {
    base_min_size: 10,
    base_increment: 0.01,
    quote_increment: 0.00000001
}
data.iost_usdt = {
    base_min_size: 10,
    base_increment: 0.01,
    quote_increment: 0.0001
}
data.poe_btc = {
    base_min_size: 10,
    base_increment: 0.01,
    quote_increment: 0.00000001
}
data.poe_eth = {
    base_min_size: 10,
    base_increment: 0.01,
    quote_increment: 0.00000001
}
data.poe_usdt = {
    base_min_size: 10,
    base_increment: 0.01,
    quote_increment: 0.0001
}
data.mof_btc = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.00000001
}
data.yee_btc = {
    base_min_size: 10,
    base_increment: 0.1,
    quote_increment: 0.00000001
}
data.mof_eth = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.00000001
}
data.yee_eth = {
    base_min_size: 10,
    base_increment: 0.1,
    quote_increment: 0.00000001
}
data.yee_usdt = {
    base_min_size: 10,
    base_increment: 0.1,
    quote_increment: 0.0001
}
data.mof_usdt = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.0001
}
data.ins_btc = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.00000001
}
data.ins_eth = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.00000001
}
data.ins_usdt = {
    base_min_size: 0.1,
    base_increment: 0.0001,
    quote_increment: 0.0001
}
data.tct_btc = {
    base_min_size: 10,
    base_increment: 0.01,
    quote_increment: 0.00000001
}
data.tct_eth = {
    base_min_size: 10,
    base_increment: 0.01,
    quote_increment: 0.00000001
}
data.tct_usdt = {
    base_min_size: 10,
    base_increment: 0.01,
    quote_increment: 0.0001
}
data.atl_btc = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.00000001
}
data.atl_eth = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.00000001
}
data.atl_usdt = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.0001
}
data.theta_btc = {
    base_min_size: 10,
    base_increment: 0.01,
    quote_increment: 0.00000001
}
data.theta_eth = {
    base_min_size: 10,
    base_increment: 0.01,
    quote_increment: 0.00000001
}
data.lev_btc = {
    base_min_size: 10,
    base_increment: 0.01,
    quote_increment: 0.00000001
}
data.theta_usdt = {
    base_min_size: 10,
    base_increment: 0.01,
    quote_increment: 0.0001
}
data.lev_eth = {
    base_min_size: 10,
    base_increment: 0.01,
    quote_increment: 0.00000001
}
data.lev_usdt = {
    base_min_size: 10,
    base_increment: 0.01,
    quote_increment: 0.0001
}
data.stc_btc = {
    base_min_size: 10,
    base_increment: 0.01,
    quote_increment: 0.00000001
}
data.spf_btc = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.00000001
}
data.stc_eth = {
    base_min_size: 10,
    base_increment: 0.01,
    quote_increment: 0.00000001
}
data.spf_eth = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.00000001
}
data.spf_usdt = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.0001
}
data.stc_usdt = {
    base_min_size: 10,
    base_increment: 0.01,
    quote_increment: 0.0001
}
data.ref_btc = {
    base_min_size: 0.01,
    base_increment: 0.00001,
    quote_increment: 0.00000001
}
data.ref_eth = {
    base_min_size: 0.01,
    base_increment: 0.00001,
    quote_increment: 0.00000001
}
data.ref_usdt = {
    base_min_size: 0.01,
    base_increment: 0.00001,
    quote_increment: 0.0001
}
data.snc_btc = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.00000001
}
data.snc_eth = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.00000001
}
data.snc_usdt = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.0001
}
data.pst_btc = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.00000001
}
data.pst_eth = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.00000001
}
data.pst_usdt = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.0001
}
data.can_btc = {
    base_min_size: 10,
    base_increment: 0.01,
    quote_increment: 0.00000001
}
data.can_eth = {
    base_min_size: 10,
    base_increment: 0.01,
    quote_increment: 0.00000001
}
data.can_usdt = {
    base_min_size: 10,
    base_increment: 0.01,
    quote_increment: 0.0001
}
data.hot_btc = {
    base_min_size: 10,
    base_increment: 0.01,
    quote_increment: 0.00000001
}
data.mkr_btc = {
    base_min_size: 0.001,
    base_increment: 0.000001,
    quote_increment: 0.00000001
}
data.mkr_eth = {
    base_min_size: 0.001,
    base_increment: 0.000001,
    quote_increment: 0.00000001
}
data.mkr_usdt = {
    base_min_size: 0.001,
    base_increment: 0.00000001,
    quote_increment: 0.0001
}
data.hot_eth = {
    base_min_size: 10,
    base_increment: 0.01,
    quote_increment: 0.00000001
}
data.key_btc = {
    base_min_size: 10,
    base_increment: 0.1,
    quote_increment: 0.00000001
}
data.hot_usdt = {
    base_min_size: 10,
    base_increment: 0.01,
    quote_increment: 0.0001
}
data.key_eth = {
    base_min_size: 10,
    base_increment: 0.1,
    quote_increment: 0.00000001
}
data.key_usdt = {
    base_min_size: 10,
    base_increment: 0.1,
    quote_increment: 0.0001
}
data.light_btc = {
    base_min_size: 10,
    base_increment: 1,
    quote_increment: 1E-10
}
data.light_eth = {
    base_min_size: 10,
    base_increment: 1,
    quote_increment: 0.000000001
}
data.light_usdt = {
    base_min_size: 10,
    base_increment: 1,
    quote_increment: 0.000001
}
data.true_btc = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.00000001
}
data.true_eth = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.00000001
}
data.true_usdt = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.0001
}
data.of_btc = {
    base_min_size: 10,
    base_increment: 0.1,
    quote_increment: 1E-10
}
data.of_eth = {
    base_min_size: 10,
    base_increment: 0.1,
    quote_increment: 1E-10
}
data.of_usdt = {
    base_min_size: 10,
    base_increment: 0.1,
    quote_increment: 0.000001
}
data.soc_btc = {
    base_min_size: 10,
    base_increment: 0.01,
    quote_increment: 0.00000001
}
data.soc_eth = {
    base_min_size: 10,
    base_increment: 0.01,
    quote_increment: 0.00000001
}
data.soc_usdt = {
    base_min_size: 10,
    base_increment: 0.01,
    quote_increment: 0.0001
}
data.wbtc_btc = {
    base_min_size: 10,
    base_increment: 0.01,
    quote_increment: 0.00000001
}
data.dent_btc = {
    base_min_size: 10,
    base_increment: 0.1,
    quote_increment: 0.00000001
}
data.dent_eth = {
    base_min_size: 10,
    base_increment: 0.1,
    quote_increment: 0.00000001
}
data.dent_usdt = {
    base_min_size: 10,
    base_increment: 0.1,
    quote_increment: 0.0001
}
data.zen_btc = {
    base_min_size: 0.01,
    base_increment: 0.00001,
    quote_increment: 0.00000001
}
data.zen_eth = {
    base_min_size: 0.01,
    base_increment: 0.00001,
    quote_increment: 0.00000001
}
data.zen_usdt = {
    base_min_size: 0.01,
    base_increment: 0.00001,
    quote_increment: 0.0001
}
data.hmc_btc = {
    base_min_size: 10,
    base_increment: 0.01,
    quote_increment: 0.00000001
}
data.hmc_eth = {
    base_min_size: 10,
    base_increment: 0.01,
    quote_increment: 0.00000001
}
data.hmc_usdt = {
    base_min_size: 10,
    base_increment: 0.01,
    quote_increment: 0.0001
}
data.zip_btc = {
    base_min_size: 10,
    base_increment: 1,
    quote_increment: 0.000000001
}
data.zip_eth = {
    base_min_size: 10,
    base_increment: 1,
    quote_increment: 0.00000001
}
data.zip_usdt = {
    base_min_size: 10,
    base_increment: 1,
    quote_increment: 0.000001
}
data.nano_btc = {
    base_min_size: 0.1,
    base_increment: 0.0001,
    quote_increment: 0.00000001
}
data.nano_eth = {
    base_min_size: 0.1,
    base_increment: 0.0001,
    quote_increment: 0.00000001
}
data.nano_usdt = {
    base_min_size: 0.1,
    base_increment: 0.0001,
    quote_increment: 0.0001
}
data.cic_btc = {
    base_min_size: 10,
    base_increment: 0.1,
    quote_increment: 0.00000001
}
data.cic_eth = {
    base_min_size: 10,
    base_increment: 0.1,
    quote_increment: 0.00000001
}
data.cic_usdt = {
    base_min_size: 10,
    base_increment: 0.1,
    quote_increment: 0.0001
}
data.gto_btc = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.00000001
}
data.gto_eth = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.00000001
}
data.gto_usdt = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.0001
}
data.chat_btc = {
    base_min_size: 10,
    base_increment: 0.01,
    quote_increment: 0.00000001
}
data.chat_eth = {
    base_min_size: 10,
    base_increment: 0.01,
    quote_increment: 0.00000001
}
data.chat_usdt = {
    base_min_size: 10,
    base_increment: 0.01,
    quote_increment: 0.0001
}
data.insur_btc = {
    base_min_size: 10,
    base_increment: 0.1,
    quote_increment: 0.00000001
}
data.insur_eth = {
    base_min_size: 10,
    base_increment: 0.1,
    quote_increment: 0.00000001
}
data.insur_usdt = {
    base_min_size: 10,
    base_increment: 0.1,
    quote_increment: 0.0001
}
data.cbt_btc = {
    base_min_size: 10,
    base_increment: 0.01,
    quote_increment: 0.00000001
}
data.cbt_eth = {
    base_min_size: 10,
    base_increment: 0.01,
    quote_increment: 0.00000001
}
data.cbt_usdt = {
    base_min_size: 10,
    base_increment: 0.01,
    quote_increment: 0.0001
}
data.r_btc = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.00000001
}
data.r_eth = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.00000001
}
data.r_usdt = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.0001
}
data.uct_btc = {
    base_min_size: 10,
    base_increment: 0.01,
    quote_increment: 0.00000001
}
data.uct_eth = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.00000001
}
data.uct_usdt = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.0001
}
data.bec_btc = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.00000001
}
data.bec_eth = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.00000001
}
data.bec_usdt = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.0001
}
data.mith_btc = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.00000001
}
data.mith_eth = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.00000001
}
data.mith_usdt = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.0001
}
data.abt_btc = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.00000001
}
data.abt_eth = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.00000001
}
data.abt_usdt = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.0001
}
data.bkx_btc = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.00000001
}
data.bkx_eth = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.00000001
}
data.bkx_usdt = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.0001
}
data.gtc_btc = {
    base_min_size: 10,
    base_increment: 0.01,
    quote_increment: 0.00000001
}
data.gtc_eth = {
    base_min_size: 10,
    base_increment: 0.01,
    quote_increment: 0.00000001
}
data.gtc_usdt = {
    base_min_size: 10,
    base_increment: 0.01,
    quote_increment: 0.0001
}
data.auto_btc = {
    base_min_size: 10,
    base_increment: 0.1,
    quote_increment: 0.00000001
}
data.auto_eth = {
    base_min_size: 10,
    base_increment: 0.1,
    quote_increment: 0.00000001
}
data.auto_usdt = {
    base_min_size: 10,
    base_increment: 0.1,
    quote_increment: 0.0001
}
data.gsc_btc = {
    base_min_size: 10,
    base_increment: 0.01,
    quote_increment: 0.00000001
}
data.gsc_eth = {
    base_min_size: 10,
    base_increment: 0.01,
    quote_increment: 0.00000001
}
data.gsc_usdt = {
    base_min_size: 10,
    base_increment: 0.01,
    quote_increment: 0.0001
}
data.rfr_btc = {
    base_min_size: 10,
    base_increment: 0.1,
    quote_increment: 0.00000001
}
data.rfr_eth = {
    base_min_size: 10,
    base_increment: 0.1,
    quote_increment: 0.00000001
}
data.rfr_usdt = {
    base_min_size: 10,
    base_increment: 0.1,
    quote_increment: 0.0001
}
data.trio_btc = {
    base_min_size: 10,
    base_increment: 0.1,
    quote_increment: 0.00000001
}
data.trio_eth = {
    base_min_size: 10,
    base_increment: 0.1,
    quote_increment: 0.00000001
}
data.trio_usdt = {
    base_min_size: 10,
    base_increment: 0.1,
    quote_increment: 0.0001
}
data.tra_btc = {
    base_min_size: 10,
    base_increment: 0.1,
    quote_increment: 0.00000001
}
data.tra_eth = {
    base_min_size: 10,
    base_increment: 0.1,
    quote_increment: 0.00000001
}
data.tra_usdt = {
    base_min_size: 10,
    base_increment: 0.1,
    quote_increment: 0.0001
}
data.ren_btc = {
    base_min_size: 10,
    base_increment: 0.01,
    quote_increment: 0.00000001
}
data.ren_eth = {
    base_min_size: 10,
    base_increment: 0.01,
    quote_increment: 0.00000001
}
data.ren_usdt = {
    base_min_size: 10,
    base_increment: 0.01,
    quote_increment: 0.0001
}
data.wfee_btc = {
    base_min_size: 10,
    base_increment: 0.1,
    quote_increment: 0.00000001
}
data.wfee_eth = {
    base_min_size: 10,
    base_increment: 0.1,
    quote_increment: 0.00000001
}
data.wfee_usdt = {
    base_min_size: 10,
    base_increment: 0.1,
    quote_increment: 0.0001
}
data.dadi_btc = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.00000001
}
data.dadi_eth = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.00000001
}
data.dadi_usdt = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.0001
}
data.enj_btc = {
    base_min_size: 10,
    base_increment: 0.01,
    quote_increment: 0.00000001
}
data.enj_eth = {
    base_min_size: 10,
    base_increment: 0.01,
    quote_increment: 0.00000001
}
data.enj_usdt = {
    base_min_size: 10,
    base_increment: 0.01,
    quote_increment: 0.0001
}
data.ont_btc = {
    base_min_size: 0.1,
    base_increment: 0.001,
    quote_increment: 0.00000001
}
data.ont_eth = {
    base_min_size: 0.1,
    base_increment: 0.001,
    quote_increment: 0.00000001
}
data.ont_usdt = {
    base_min_size: 0.1,
    base_increment: 0.001,
    quote_increment: 0.0001
}
data.okb_usdt = {
    base_min_size: 1,
    base_increment: 0.0001,
    quote_increment: 0.0001
}
data.okb_btc = {
    base_min_size: 1,
    base_increment: 0.0001,
    quote_increment: 0.00000001
}
data.okb_eth = {
    base_min_size: 1,
    base_increment: 0.0001,
    quote_increment: 0.00000001
}
data.ltc_okb = {
    base_min_size: 0.01,
    base_increment: 0.000001,
    quote_increment: 0.0001
}
data.etc_okb = {
    base_min_size: 0.01,
    base_increment: 0.00001,
    quote_increment: 0.0001
}
data.bch_okb = {
    base_min_size: 0.001,
    base_increment: 0.000001,
    quote_increment: 0.0001
}
data.xrp_okb = {
    base_min_size: 0.01,
    base_increment: 0.000001,
    quote_increment: 0.0001
}
data.eos_okb = {
    base_min_size: 0.01,
    base_increment: 0.000001,
    quote_increment: 0.0001
}
data.qtum_okb = {
    base_min_size: 0.01,
    base_increment: 0.000001,
    quote_increment: 0.0001
}
data.dash_okb = {
    base_min_size: 0.01,
    base_increment: 0.000001,
    quote_increment: 0.0001
}
data.neo_okb = {
    base_min_size: 0.01,
    base_increment: 0.000001,
    quote_increment: 0.0001
}
data.iota_okb = {
    base_min_size: 0.01,
    base_increment: 0.000001,
    quote_increment: 0.0001
}
data.zec_okb = {
    base_min_size: 0.01,
    base_increment: 0.000001,
    quote_increment: 0.0001
}
data.ctxc_btc = {
    base_min_size: 0.01,
    base_increment: 0.001,
    quote_increment: 0.00000001
}
data.ctxc_eth = {
    base_min_size: 0.01,
    base_increment: 0.001,
    quote_increment: 0.00000001
}
data.ctxc_usdt = {
    base_min_size: 0.01,
    base_increment: 0.001,
    quote_increment: 0.0001
}
data.zil_btc = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.00000001
}
data.zil_eth = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.00000001
}
data.zil_usdt = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.0001
}
data.you_okb = {
    base_min_size: 10,
    base_increment: 0.00000001,
    quote_increment: 0.00001
}
data.you_btc = {
    base_min_size: 0.1,
    base_increment: 0.00000001,
    quote_increment: 0.00000001
}
data.you_eth = {
    base_min_size: 0.1,
    base_increment: 0.0001,
    quote_increment: 0.00000001
}
data.you_usdt = {
    base_min_size: 0.1,
    base_increment: 0.0001,
    quote_increment: 0.00001
}
data.lba_okb = {
    base_min_size: 0.1,
    base_increment: 0.001,
    quote_increment: 0.0001
}
data.lba_btc = {
    base_min_size: 0.1,
    base_increment: 0.0001,
    quote_increment: 0.00000001
}
data.lba_eth = {
    base_min_size: 0.1,
    base_increment: 0.0001,
    quote_increment: 0.00000001
}
data.lba_usdt = {
    base_min_size: 0.1,
    base_increment: 0.0001,
    quote_increment: 0.0001
}
data.ok06ett_usdt = {
    base_min_size: 0.01,
    base_increment: 0.00000001,
    quote_increment: 0.0001
}
data.cai_okb = {
    base_min_size: 10,
    base_increment: 0.001,
    quote_increment: 0.000001
}
data.lsk_btc = {
    base_min_size: 0.01,
    base_increment: 0.00000001,
    quote_increment: 0.00000001
}
data.lsk_eth = {
    base_min_size: 0.01,
    base_increment: 0.00000001,
    quote_increment: 0.00000001
}
data.lsk_usdt = {
    base_min_size: 0.01,
    base_increment: 0.00000001,
    quote_increment: 0.0001
}
data.cai_btc = {
    base_min_size: 10,
    base_increment: 0.0001,
    quote_increment: 0.00000001
}
data.cai_eth = {
    base_min_size: 10,
    base_increment: 0.0001,
    quote_increment: 0.00000001
}
data.cai_usdt = {
    base_min_size: 10,
    base_increment: 0.0001,
    quote_increment: 0.000001
}
data.ae_btc = {
    base_min_size: 0.01,
    base_increment: 0.00000001,
    quote_increment: 0.00000001
}
data.ae_okb = {
    base_min_size: 0.01,
    base_increment: 0.00000001,
    quote_increment: 0.00001
}
data.sc_okb = {
    base_min_size: 10,
    base_increment: 0.00000001,
    quote_increment: 0.00001
}
data.kan_okb = {
    base_min_size: 10,
    base_increment: 0.00000001,
    quote_increment: 0.00001
}
data.win_okb = {
    base_min_size: 10,
    base_increment: 0.001,
    quote_increment: 0.000001
}
data.sc_eth = {
    base_min_size: 10,
    base_increment: 0.00000001,
    quote_increment: 0.00000001
}
data.sc_btc = {
    base_min_size: 10,
    base_increment: 0.00000001,
    quote_increment: 0.00000001
}
data.sc_usdt = {
    base_min_size: 10,
    base_increment: 0.0001,
    quote_increment: 0.0001
}
data.ae_eth = {
    base_min_size: 0.01,
    base_increment: 0.00000001,
    quote_increment: 0.00000001
}
data.ae_usdt = {
    base_min_size: 0.01,
    base_increment: 0.0001,
    quote_increment: 0.0001
}
data.kan_btc = {
    base_min_size: 10,
    base_increment: 0.00000001,
    quote_increment: 0.00000001
}
data.kan_eth = {
    base_min_size: 10,
    base_increment: 0.00000001,
    quote_increment: 0.00000001
}
data.kan_usdt = {
    base_min_size: 10,
    base_increment: 0.0001,
    quote_increment: 0.00001
}
data.win_btc = {
    base_min_size: 10,
    base_increment: 0.001,
    quote_increment: 0.00000001
}
data.win_eth = {
    base_min_size: 10,
    base_increment: 0.001,
    quote_increment: 0.00000001
}
data.win_usdt = {
    base_min_size: 10,
    base_increment: 0.001,
    quote_increment: 0.000001
}
data.ors_okb = {
    base_min_size: 1,
    base_increment: 0.00000001,
    quote_increment: 0.00001
}
data.mvp_okb = {
    base_min_size: 10,
    base_increment: 0.0001,
    quote_increment: 0.00001
}
data.dcr_okb = {
    base_min_size: 0.01,
    base_increment: 0.0001,
    quote_increment: 0.0001
}
data.dcr_btc = {
    base_min_size: 0.01,
    base_increment: 0.00000001,
    quote_increment: 0.00000001
}
data.dcr_eth = {
    base_min_size: 0.01,
    base_increment: 0.00000001,
    quote_increment: 0.00000001
}
data.dcr_usdt = {
    base_min_size: 0.01,
    base_increment: 0.00000001,
    quote_increment: 0.0001
}
data.waves_okb = {
    base_min_size: 0.01,
    base_increment: 0.0001,
    quote_increment: 0.0001
}
data.waves_btc = {
    base_min_size: 0.01,
    base_increment: 0.00000001,
    quote_increment: 0.00000001
}
data.waves_eth = {
    base_min_size: 0.01,
    base_increment: 0.00000001,
    quote_increment: 0.00000001
}
data.waves_usdt = {
    base_min_size: 0.01,
    base_increment: 0.00000001,
    quote_increment: 0.0001
}
data.ors_btc = {
    base_min_size: 1,
    base_increment: 0.00000001,
    quote_increment: 0.00000001
}
data.ors_eth = {
    base_min_size: 1,
    base_increment: 0.00000001,
    quote_increment: 0.00000001
}
data.ors_usdt = {
    base_min_size: 1,
    base_increment: 0.00000001,
    quote_increment: 0.00001
}
data.mvp_btc = {
    base_min_size: 10,
    base_increment: 0.00000001,
    quote_increment: 0.00000001
}
data.mvp_eth = {
    base_min_size: 10,
    base_increment: 0.00000001,
    quote_increment: 0.00000001
}
data.mvp_usdt = {
    base_min_size: 10,
    base_increment: 0.00000001,
    quote_increment: 0.00001
}
data.nas_okb = {
    base_min_size: 0.1,
    base_increment: 0.00000001,
    quote_increment: 0.00001
}
data.xas_okb = {
    base_min_size: 0.1,
    base_increment: 0.00000001,
    quote_increment: 0.00001
}
data.cvt_okb = {
    base_min_size: 1,
    base_increment: 0.00000001,
    quote_increment: 0.00001
}
data.nxt_btc = {
    base_min_size: 1,
    base_increment: 0.0001,
    quote_increment: 0.00000001
}
data.zco_okb = {
    base_min_size: 1,
    base_increment: 0.00000001,
    quote_increment: 0.00001
}
data.ardr_btc = {
    base_min_size: 1,
    base_increment: 0.0001,
    quote_increment: 0.00000001
}
data.egt_okb = {
    base_min_size: 1,
    base_increment: 0.00000001,
    quote_increment: 0.00001
}
data.xas_btc = {
    base_min_size: 0.1,
    base_increment: 0.0001,
    quote_increment: 0.00000001
}
data.xas_eth = {
    base_min_size: 0.1,
    base_increment: 0.0001,
    quote_increment: 0.00000001
}
data.xas_usdt = {
    base_min_size: 0.1,
    base_increment: 0.0001,
    quote_increment: 0.00000001
}
data.cvt_btc = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.00000001
}
data.cvt_eth = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.00000001
}
data.cvt_usdt = {
    base_min_size: 1,
    base_increment: 0.001,
    quote_increment: 0.00001
}
data.egt_btc = {
    base_min_size: 1,
    base_increment: 0.0001,
    quote_increment: 0.00000001
}
data.egt_eth = {
    base_min_size: 1,
    base_increment: 0.0001,
    quote_increment: 0.00000001
}
data.egt_usdt = {
    base_min_size: 1,
    base_increment: 0.0001,
    quote_increment: 0.00001
}
data.zco_btc = {
    base_min_size: 1,
    base_increment: 0.0001,
    quote_increment: 0.00000001
}
data.zco_eth = {
    base_min_size: 1,
    base_increment: 0.0001,
    quote_increment: 0.00000001
}
data.bcn_okb = {
    base_min_size: 10,
    base_increment: 0.00000001,
    quote_increment: 0.00001
}
data.bcn_btc = {
    base_min_size: 10,
    base_increment: 0.00000001,
    quote_increment: 0.00000001
}
data.bcn_usdt = {
    base_min_size: 10,
    base_increment: 0.00000001,
    quote_increment: 0.00001
}
data.let_okb = {
    base_min_size: 1,
    base_increment: 0.00000001,
    quote_increment: 0.00001
}
data.let_btc = {
    base_min_size: 1,
    base_increment: 0.00000001,
    quote_increment: 0.00000001
}
data.let_eth = {
    base_min_size: 1,
    base_increment: 0.00000001,
    quote_increment: 0.00000001
}
data.let_usdt = {
    base_min_size: 1,
    base_increment: 0.00000001,
    quote_increment: 0.00001
}
data.cit_okb = {
    base_min_size: 1,
    base_increment: 0.00000001,
    quote_increment: 0.00001
}
```

> Detail

https://www.fmz.com/strategy/117000

> Last Modified

2018-09-17 00:22:01
