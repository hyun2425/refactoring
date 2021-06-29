import createStatementData from './createStatementData-ex006.js';
import fs from 'fs';
const invoice = JSON.parse(fs.readFileSync('./invoices.json', 'utf8'));
const plays = JSON.parse(fs.readFileSync('./plays.json', 'utf8'));

function htmlStatement(invoice, plays) {
  return renderPlainHtml(createStatementData(invoice, plays));
}

function statement(invoice, plays) {
  return renderPlainText(createStatementData(invoice, plays));
}

function renderPlainHtml(data) {
  let result = `<h1>청구 내역 (고객명 : ${data.customer})</h1>\n`;
  result += `<table>\n`;
  result += `<tr><td>연극</td><td>좌석 수</td><td>금액</td></tr>`;
  for (let perf of data.performances) {
    result += `<tr><td>${perf.play.name}</td><td>(${perf.play.audience}석)</td><td>${usd(perf.amount)}</td></tr>\n`;
  }
  result += `</table>\n`;
  result += `<p>총액 : <em>${usd(data.totalAmount)}</em></p>\n`;
  result += `<p>적립 포인트 : <em>${data.totalVolumeCredits}</em>점</p>\n`;
  return result;
}

function renderPlainText(data) {
  let result = `청구 내역 (고객명 : ${data.customer})\n`;

  for (let perf of data.performances) {
    result += `${perf.play.name} : ${usd(perf.amount)} (${perf.audience}석)\n`;
  }
  result += `총액: ${usd(data.totalAmount)}\n`;
  result += `적립 포인트: ${data.totalVolumeCredits}점\n`;
  return result;
}

function usd(aNumber) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(aNumber / 100);
}

console.log(statement(invoice, plays));
console.log(htmlStatement(invoice, plays));
