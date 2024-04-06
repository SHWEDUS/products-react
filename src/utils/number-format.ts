
export default function numberFormat(value: number, locale: string = 'ru-RU', options: Record<string, string> = {}) {
  return new Intl.NumberFormat(locale, options).format(value);
}
