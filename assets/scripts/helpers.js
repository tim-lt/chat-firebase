export const MONTH = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];

export function getStatus(status) {
  switch (status) {
    case 'test':
      return 'Тестирование';
    case 'completed':
      return 'Завершена';
    default: return 'В работе';
  }
}

export function numStr(n, textForms) {
  const cases = [2, 0, 1, 1, 1, 2];
  const number = Math.abs(n);
  return textForms[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
}

export default {
  MONTH,
  getStatus,
  numStr,
};
