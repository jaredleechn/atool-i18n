import 'babel-polyfill';

export default async function fetch() {
  const data = {
    totalPrice: {
      en: 'totalPrice',
      cn: '总价'
    },
    count: {
      en: 'count',
      cn: '数量'
    }
  };

  return data;
}
