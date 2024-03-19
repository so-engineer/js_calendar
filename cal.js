// コマンドライン引数の取得とオプションの設定
import {program} from 'commander';
program.option('-m, --month <number>');
program.parse(process.argv);
const options = program.opts();

// 日時の取得
let now = new Date();
let year = now.getFullYear();
// letをスコープ外で宣言することでmonthをスコープ外で使用可能
let month;
if (options.month) {
  month = options.month;
} else {
  month = now.getMonth() + 1;
}

// エラーハンドリング
const arg_month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
if ((!arg_month.includes(Number(month))) && (month)) {
  console.log('不正な月です');
  process.exit(1);
}

// Dateオブジェクトの月は0から始まるためmonthは次月になる
// Dateオブジェクトでは日付に0を設定すると前月の最後の日になる
let last_date = new Date(year, month, 0);
let first_date = new Date(year, month-1, 1)

// 曜日
const days = ["日", "月", "火", "水", "木", "金", "土"];
let dayOfWeekNumber = first_date.getDay();

// 空白数を返す
let fn_blank = (num) => {
  return '   '.repeat(num);
}

///////////////////////////////////////////////////////////////////////////////////
console.log(`       ${month}月` + year);
console.log(`${days[0]} ${days[1]} ${days[2]} ${days[3]} ${days[4]} ${days[5]} ${days[6]} `);

process.stdout.write(`${fn_blank(dayOfWeekNumber)}`);
for (let i=1; i <= last_date.getDate(); i++) {
  // 二桁表示
  i = i.toString().padStart(2, '0');
  if (dayOfWeekNumber <= 6) {
    process.stdout.write(`${i} `);
    dayOfWeekNumber ++;
  } else {
    // 改行
    console.log();
    process.stdout.write(`${i} `);
    dayOfWeekNumber = 1;
  }
}
