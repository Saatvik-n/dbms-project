const date = new Date();  // 2009-11-10
export const CURRENT_MONTH = date.toLocaleString('default', { month: 'short' }).toLocaleUpperCase();
export const CURRENT_YEAR = date.getFullYear().toString();