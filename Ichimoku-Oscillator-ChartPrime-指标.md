
> Name

Ichimoku-Oscillator-ChartPrime-指标

> Author

镜花水月、



> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_source_1_close|0|(?Settings)Signal Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_int_1|9|Conversion Line Length|
|v_input_int_2|26|Base Line Length|
|v_input_int_3|52|Leading Span B Length|
|v_input_int_4|26|Lagging Span|
|v_input_int_5|12|Moving Average Length|
|v_input_int_6|3|(?Smoothing)Smoothing|
|v_input_bool_1|true|extra_smoothing|
|v_input_string_1|Window|(?Normalization)Normalize|
|v_input_int_7|20|window_size|
|v_input_bool_2|true|Clamp to Range|
|v_input_float_1|2|Max Bandwidth|
|v_input_float_2|1.5|Mid Bandwidth|
|v_input_int_8|10|(?Divergence)Divergence Look Right|
|v_input_int_9|15|Divergence Look Left|
|v_input_int_10|100|Maximum Lookback|
|v_input_int_11|5|Minimum Lookback|
|v_input_string_2|Symbol|Show Labels|
|v_input_bool_3|true|Regular Bullish|
|v_input_bool_4|false|Hidden Bullish|
|v_input_bool_5|true|Regular Bearish|
|v_input_bool_6|false|Hidden Bearish|
|v_input_bool_7|true|(?Visibility)Show Signal|
|v_input_bool_8|false|Show Chikou|
|v_input_bool_9|false|Show Conversion and Base|
|v_input_bool_10|false|Show Moving Average|
|v_input_bool_11|true|Show Min/Max|
|v_input_string_3|Full|Show Kumo|
|v_input_bool_12|false|Show Kumbo Lines|
|v_input_bool_13|true|(?Color)Color Signal by Conversion Cross|
|v_input_color_1|#F36B16|Signal Color|
|v_input_int_12|2|signal_width|
|v_input_color_2|#22EA70|Kumo Color|
|v_input_color_3|#FF2F1C|kumo_bearish_color|
|v_input_int_13|10|v_input_int_13|
|v_input_color_4|gray|Chikou Color|
|v_input_color_5|#79D8E0|Conversion/Base Color|
|v_input_color_6|#E462B2|base_color|
|v_input_color_7|#1c7a24|Bullish CB Color|
|v_input_color_8|#64a568|base_color_bullish|
|v_input_color_9|#df8c8c|Bearish CB Color|
|v_input_color_10|#ff4444|base_color_bearish|
|v_input_color_11|#F2DB2E|Neutral Color|
|v_input_int_14|10|v_input_int_14|
|v_input_color_12|#5398ff|Moving Average Color|
|v_input_color_13|#5C9970|Top Colors|
|v_input_color_14|#32533D|high_color|
|v_input_int_15|10|v_input_int_15|
|v_input_color_15|#DD6055|Bottom Colors|
|v_input_color_16|#CF3729|low_color|
|v_input_int_16|10|v_input_int_16|
|v_input_color_17|#111122|Text Color|
|v_input_color_18|#46c47a|Bullish Colors|
|v_input_color_19|#802ac7|hidden_bullish_color|
|v_input_color_20|#f82e2e|Bearish Colors|
|v_input_color_21|#3176f5|hidden_bearish_color|


> Source (PineScript)

``` pinescript
// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © ChartPrime

//@version=5
indicator("Ichimoku Oscillator [ChartPrime]", max_lines_count = 500, max_labels_count = 500)

source = input.source(close, "Signal Source", group = "Settings")
conversion_periods = input.int(9, "Conversion Line Length", minval = 1, group = "Settings")
base_periods = input.int(26, "Base Line Length", minval = 1, group = "Settings")
lagging_span_periods = input.int(52, "Leading Span B Length", minval = 1, group = "Settings")
displacement = input.int(26, "Lagging Span", minval = 1, group = "Settings")
ma_length = input.int(12, "Moving Average Length", minval = 1, group = "Settings")

smoothing_length = input.int(3, "Smoothing", minval = 1, inline = "signal smoothing", group = "Smoothing")
extra_smoothing = input.bool(true, "", inline = "signal smoothing", tooltip = "Enable for extra smoothing.", group = "Smoothing")

normalize = input.string("Window", "Normalize", ["All", "Window", "Disabled"], group = "Normalization", inline = "Normalize")
window_size = input.int(20, "", minval = 5, tooltip = "When enabled it will scale from 100 to -100. If Normalize is set to 'All' it will take into account the whole series. If its set to 'Window', it use a window of data to normalize.", group = "Normalization", inline = "Normalize")
clamp = input.bool(true, "Clamp to Range", group = "Normalization")
top_band = input.float(2, "Max Bandwidth", minval = 0, step = 0.25, group = "Normalization")
mid_band = input.float(1.5, "Mid Bandwidth", minval = 0, step = 0.25, group = "Normalization")

right = input.int(10, "Divergence Look Right", minval = 0, group = "Divergence")
left = input.int(15, "Divergence Look Left", minval = 0, group = "Divergence")
upper_range = input.int(100, "Maximum Lookback", minval = 0, group = "Divergence")
lower_range = input.int(5, "Minimum Lookback", minval = 0, group = "Divergence")
labels = input.string("Symbol", "Show Labels", ["Disabled", "Symbol", "Text"], group = "Divergence")
enable_regular_bullish = input.bool(true, "Regular Bullish", group = "Divergence", inline = "Bld")
enable_hidden_bullish = input.bool(false, "Hidden Bullish", group = "Divergence", inline = "Bld")
enable_regular_bearish = input.bool(true, "Regular Bearish", group = "Divergence", inline = "Brd")
enable_hidden_bearish = input.bool(false, "Hidden Bearish", group = "Divergence", inline = "Brd")

show_signal = input.bool(true, "Show Signal", group = "Visibility")
show_chikou = input.bool(false, "Show Chikou", group = "Visibility")
show_conversion_base = input.bool(false, "Show Conversion and Base", group = "Visibility")
show_ma = input.bool(false, "Show Moving Average", group = "Visibility")
show_min_max = input.bool(true, "Show Min/Max", group = "Visibility")
show_kumo = input.string("Full", "Show Kumo", ["Full", "Current", "Disabled"], group = "Visibility")
show_kumo_lines = input.bool(false, "Show Kumbo Lines", group = "Visibility")

color_on_conversion = input.bool(true, "Color Signal by Conversion Cross", group = "Color")
signal_color = input.color(#F36B16, "Signal Color", group = "Color", inline = "Signal")
signal_width = input.int(2, "", minval = 1, maxval = 5, group = "Color", inline = "Signal")
kumo_bullish_color = input.color(#22EA70, "Kumo Color", group = "Color", inline = "Kumo")
kumo_bearish_color = input.color(#FF2F1C, "", group = "Color", inline = "Kumo")
kumo_alpha = 100 - input.int(10, "", minval = 0, maxval = 100, group = "Color", inline = "Kumo")
chikou_color = input.color(color.gray, "Chikou Color", group = "Color")
conversion_color = input.color(#79D8E0, "Conversion/Base Color", group = "Color", inline = "CB")
base_color = input.color(#E462B2, "", group = "Color", inline = "CB")
conversion_color_bullish = input.color(#1c7a24, "Bullish CB Color", group = "Color", inline = "SC")
base_color_bullish = input.color(#64a568, "", group = "Color", inline = "SC")
conversion_color_bearish = input.color(#df8c8c, "Bearish CB Color", group = "Color", inline = "BC")
base_color_bearish = input.color(#ff4444, "", group = "Color", inline = "BC")
n_color = input.color(#F2DB2E, "Neutral Color", group = "Color")
cb_alpha = 100 - input.int(10, "", minval = 0, maxval = 100, group = "Color", inline = "CB")
ma_color = input.color(color.rgb(83, 152, 255), "Moving Average Color", group = "Color")
max_color = input.color(#5C9970, "Top Colors", group = "Color", inline = "Top")
high_color = input.color(#32533D, "", group = "Color", inline = "Top")
top_alpha = 100 - input.int(10, "", minval = 0, maxval = 100, group = "Color", inline = "Top")
min_color = input.color(#DD6055, "Bottom Colors", group = "Color", inline = "Bottom")
low_color = input.color(#CF3729, "", group = "Color", inline = "Bottom")
low_alpha = 100 - input.int(10, "", minval = 0, maxval = 100, group = "Color", inline = "Bottom")
text_color = input.color(#111122, "Text Color", group = "Color")
regular_bullish_color = input.color(color.rgb(70, 196, 122), "Bullish Colors", group = "Color", inline = "BD")
hidden_bullish_color = input.color(color.rgb(128, 42, 199), "", group = "Color", inline = "BD")
regular_bearish_color = input.color(color.rgb(248, 46, 46), "Bearish Colors", group = "Color", inline = "bD")
hidden_bearish_color = input.color(color.rgb(49, 118, 245), "", group = "Color", inline = "bD")

in_range(cond, lower_range, upper_range) =>
    bars = ta.barssince(cond == true)
    lower_range <= bars and bars <= upper_range


min_max(source, min, max, enable, clamp)=>
    if enable != "Disabled"
        if clamp 
            (math.max(math.min(1, (source - min)/(max - min)), 0) - 0.5) * 200
        else
            ((source - min)/(max - min) - 0.5) * 200
    else
        source

donchian(len) => math.avg(ta.lowest(len), ta.highest(len))

// Custom cosh function
cosh(float x) =>
    (math.exp(x) + math.exp(-x)) / 2

// Custom acosh function
acosh(float x) =>
    x < 1 ? na : math.log(x + math.sqrt(x * x - 1))

// Custom sinh function
sinh(float x) =>
    (math.exp(x) - math.exp(-x)) / 2

// Custom asinh function
asinh(float x) =>
    math.log(x + math.sqrt(x * x + 1))

// Chebyshev Type I Moving Average
chebyshevI(float src, float len = 8, float ripple = 0.05) =>
    a = 0.
    b = 0.
    c = 0.
    chebyshev = 0.
    
    a := cosh(1 / len * acosh(1 / (1 - ripple)))
    b := sinh(1 / len * asinh(1 / ripple))
    c := (a - b) / (a + b)
    chebyshev := (1 - c) * src + c * nz(chebyshev[1])
    chebyshev

gaussian(source, bandwidth) => 
    math.exp(-math.pow(source / bandwidth, 2) / 2) / math.sqrt(2 * math.pi) 

gaussian_kernel(source, size = 64, h = 4, r = 0.5) =>
    float weight = 0
    float weight_sum = 0
    for i = 0 to size
        src = source[i]
        k = math.pow(i, 2) / (math.pow(h, 2) * r)
        w = gaussian(k, r)
        weight := weight + src * w
        weight_sum := weight_sum + w
    weight / weight_sum

smoothing(float source, float length, bool extra)=>
    extra 
     ? gaussian_kernel(chebyshevI(source, length, 0.5), 4, 2, 1) 
     : chebyshevI(source, length, 0.5)

alpha = color.new(color.black, 100)
start = bar_index >= lagging_span_periods + displacement - 1

conversion = donchian(conversion_periods)
base = donchian(base_periods)
kumo_a = smoothing(math.avg(conversion, base), smoothing_length, extra_smoothing)
kumo_b = smoothing(donchian(lagging_span_periods), smoothing_length, extra_smoothing)
kumo_a_offset = kumo_a[displacement - 1]
kumo_b_offset = kumo_b[displacement - 1]

kumo_condition = kumo_a > kumo_b
kumo_offset_condition = kumo_a_offset > kumo_b_offset

kumo_center = math.avg(kumo_a, kumo_b)
kumo_center_offset = kumo_center[displacement - 1]

kumo_a_centered = kumo_a - kumo_center
kumo_b_centered = kumo_b - kumo_center

kumo_a_offset_centered = kumo_a_offset - kumo_center_offset
kumo_b_offset_centered = kumo_b_offset - kumo_center_offset

future_kumo_a = kumo_a - kumo_center_offset
future_kumo_b = kumo_b - kumo_center_offset

chikou = source[displacement + 1]
chikou_centered = smoothing(source - chikou, smoothing_length, extra_smoothing)

conversion_base_condition = conversion > base

conversion_centered = smoothing(conversion - kumo_center_offset, smoothing_length, extra_smoothing)
base_centered = smoothing(base - kumo_center_offset, smoothing_length, extra_smoothing)

signal = smoothing(source - kumo_center_offset, smoothing_length, extra_smoothing)
ma = ta.wma(signal, ma_length)

kumo_color = kumo_condition ? kumo_bullish_color : kumo_bearish_color
kumo_offset_color = kumo_offset_condition ? kumo_bullish_color : kumo_bearish_color

var float dev = 0

if normalize == "All" and not na(kumo_a_offset)
    dev := math.sqrt(ta.cum(math.pow(signal, 2)) /ta.cum(1)) 
else if normalize == "Window"
    dev := math.sqrt(math.sum(math.pow(signal, 2), window_size) / (window_size - 1))
else
    dev := 0

max_level = dev * top_band
min_level = -dev * top_band
high_level = dev * mid_band
low_level = -dev * mid_band

hline(0)

// Define conditions
bool show_kumo_full = show_kumo == "Current"
bool show_kumo_current = show_kumo == "Full"

// Define the sources and offsets for the plots based on the condition
plot_source_a = show_kumo_full ? kumo_a_offset_centered : show_kumo_current ? kumo_a_centered : na
plot_source_b = show_kumo_full ? kumo_b_offset_centered : show_kumo_current ? kumo_b_centered : na
offset_val = show_kumo_full ? 0 : displacement - 1
color_val = show_kumo_full ? kumo_offset_color : show_kumo_current ? kumo_color : na

normal_plot_source_a = min_max(plot_source_a, min_level[show_kumo_full ? displacement - 1 : 0], max_level[show_kumo_full ? displacement - 1 : 0], normalize[show_kumo_full ? displacement - 1 : 0], clamp)
normal_plot_source_b = min_max(plot_source_b, min_level[show_kumo_full ? displacement - 1 : 0], max_level[show_kumo_full ? displacement - 1 : 0], normalize[show_kumo_full ? displacement - 1 : 0], clamp)
normal_max_level = min_max(max_level, min_level, max_level, normalize, clamp)
normal_high_level = min_max(high_level, min_level, max_level, normalize, clamp)
normal_min_level = min_max(min_level, min_level, max_level, normalize, clamp)
normal_low_level = min_max(low_level, min_level, max_level, normalize, clamp)
normal_conversion_centered =  min_max(conversion_centered, min_level, max_level, normalize, clamp)
normal_base_centered = min_max(base_centered, min_level, max_level, normalize, clamp)
normal_chikou_centered = min_max(chikou_centered, min_level, max_level, normalize, clamp)
normal_ma = min_max(ma, min_level, max_level, normalize, clamp)
normal_signal = min_max(signal, min_level, max_level, normalize, clamp)

normal_kumo_a_offset_centered = min_max(kumo_a_offset_centered, min_level[displacement - 1], max_level[displacement - 1], normalize[displacement - 1], clamp)
normal_kumo_b_offset_centered = min_max(kumo_b_offset_centered, min_level[displacement - 1], max_level[displacement - 1], normalize[displacement - 1], clamp)

kumo_max = math.max(normal_kumo_a_offset_centered, normal_kumo_b_offset_centered)
kumo_min = math.min(normal_kumo_a_offset_centered, normal_kumo_b_offset_centered)

conversion_base_max = math.max(normal_conversion_centered, normal_base_centered)
conversion_base_min = math.min(normal_conversion_centered, normal_base_centered)

conversion_base_color = 
 normal_signal >= kumo_max ? 
  conversion_base_condition ? 
   conversion_color_bullish : 
   base_color_bullish : 

 normal_signal <= kumo_min ? 
  conversion_base_condition ? 
   conversion_color_bearish : 
   base_color_bearish : 

 n_color

main_color = color_on_conversion ? conversion_base_color : signal_color

var bounce_flag = 0

bounce_up = false
bounce_down = false

if ta.crossunder(normal_signal, kumo_max) and bounce_flag == 0
    bounce_flag := 1

if ta.crossunder(normal_signal, kumo_min) and bounce_flag == 1  
    bounce_flag := 0

if ta.crossover(normal_signal, kumo_min) and bounce_flag == 0
    bounce_flag := -1

if ta.crossover(normal_signal, kumo_min) and bounce_flag == -1
    bounce_flag := 0

if ta.crossover(normal_signal, kumo_max) and bounce_flag == 1
    bounce_up := true
    bounce_flag := 0

if ta.crossunder(normal_signal, kumo_min) and bounce_flag == -1
    bounce_down := true
    bounce_flag := 0

// Plotting kumo
fill_top_plot = plot(normal_plot_source_a, "Kumo Upper", show_kumo_lines ? kumo_bullish_color : alpha, offset = offset_val)
fill_bottom_plot = plot(normal_plot_source_b, "Kumo Lower", show_kumo_lines ? kumo_bearish_color : alpha, offset = offset_val)

fill(fill_top_plot, fill_bottom_plot, color.new(color_val, kumo_alpha))
max_plot = plot(show_min_max and normalize != "Disabled" ? normal_max_level : na, "Top Range", max_color)
high_plot = plot(show_min_max and normalize != "Disabled" ? normal_high_level : na, "High Range", high_color)
min_plot = plot(show_min_max and normalize != "Disabled" ? normal_min_level : na, "Bottom Range", min_color)
low_plot = plot(show_min_max and normalize != "Disabled" ? normal_low_level : na, "Low Range", low_color)

fill(max_plot, high_plot, color.new(max_color, top_alpha), "Top Fill")
fill(min_plot, low_plot, color.new(min_color, low_alpha), "Bottom Fill")

conversion_plot = plot(show_conversion_base ? normal_conversion_centered : na, "Conversion", conversion_color)
base_plot = plot(show_conversion_base ? normal_base_centered : na, "Base", base_color)

fill(conversion_plot, base_plot, color.new(conversion_base_color, cb_alpha), "Conversion and Base Fill")

plot(show_chikou and start ? normal_chikou_centered : na, "Chikou", chikou_color, 1)
plot(show_ma ? normal_ma : na, "Moving Average", ma_color, 2)
plot(show_signal ? normal_signal : na, "Signal", main_color, signal_width)



```

> Detail

https://www.fmz.com/strategy/436305

> Last Modified

2023-12-23 00:03:40
