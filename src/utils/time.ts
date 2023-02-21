/*
 * 时间相关方法集成
 * @Author: Wang jianLei
 * @Date: 2023-01-12 16:12:16
 * @Last Modified by: Wang JianLei
 * @Last Modified time: 2023-01-12 16:12:45
 */
/**
 * 获取当前时间
 * @returns{} { yy:年, mm:月, dd:日, hh:小时, mf:分, ss:秒, ww:星期几 }"
 */
const getTimeNow = () => {
  const date = new Date();
  let yy = date.getFullYear();
  let mm = formatTime(date.getMonth() + 1);
  let dd = formatTime(date.getDate());
  let hh = formatTime(date.getHours());
  let mf = formatTime(date.getMinutes());
  let ss = formatTime(date.getSeconds());
  let week = new Array('日', '一', '二', '三', '四', '五', '六');
  let day = new Date().getDay();
  let ww = week[day];
  const ymdw = yy + '-' + mm + '-' + dd + ' 星期' + ww;
  const hms = hh + ':' + mf + ':' + ss;
  return { hms, ymdw };
};

/**
 * 时间数值补0
 * @param value 数值
 * @returns
 */
const formatTime = (value: number) => {
  return value < 10 ? '0' + value : value.toString();
};
export { getTimeNow };
