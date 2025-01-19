export const SORT_OPTS = new Map([
  ['LATEST', { label: '최신 순', value: 'sortField=createdAt' }],
  ['OLDEST', { label: '오래된 순', value: 'sortField=createdAt&sortOrder=asc' }],
  ['HIGHER_PRICE', { label: '높은 가격순', value: 'sortField=price' }],
  ['LOWER_PRICE', { label: '낮은 가격순', value: 'sortField=price&sortOrder=asc' }],
]);

export const FILTER_LIST = [
  {
    label: '등급',
    category: 'grade',
    options: [
      {
        value: 'common',
        label: 'COMMON',
      },
      {
        value: 'rare',
        label: 'RARE',
      },
      {
        value: 'superRare',
        label: 'SUPER RARE',
      },
      {
        value: 'legendary',
        label: 'LEGENDARY',
      },
    ],
  },
  {
    label: '장르',
    category: 'genre',
    options: [
      {
        value: 'landscape',
        label: '풍경',
      },
      {
        value: 'people',
        label: '인물',
      },
      {
        value: 'object',
        label: '사물',
      },
    ],
  },
  {
    label: '매진 여부',
    category: 'status',
    options: [
      {
        value: 'onSale',
        label: '판매 중',
      },
      {
        value: 'soldOut',
        label: '판매 완료',
      },
    ],
  },
];