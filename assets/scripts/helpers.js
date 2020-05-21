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

export default {
  MONTH,
  getStatus,
};
