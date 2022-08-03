


//解析歌词封装工具函数
const parseExp = /\[\d{2}:(\d{2})\.(\d{2,3})\]/

export function parseLyric(LyricString) {
  const lineStrings = LyricString.split('\n')
  let lyrics = []
  for (let line of lineStrings) {
    if (line) {
      const result = parseExp.exec(line)
      const time1 = result[1] * 60 * 1000;
      const time2 = result[2] * 1000;
      const time3 = result[3].length === 3 ? result[3] * 1 : result[3] * 10;
      const time = time1 + time2 + time3; //总时长毫秒数
      const content = line.replace(parseExp, "").trim();//使用replace将正则部分进行替换得到歌词部分
      const lineObj = { time, content };
      lyrics.push(lineObj);
    }
  }
  return lyrics
}
