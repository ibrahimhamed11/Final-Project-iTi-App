export function emailValidator(email) {
  const re = /\S+@\S+\.\S+/;
  if (!email) return 'لا يمكن ترك حقل البريد الإلكتروني فارغًا.';
  if (!re.test(email)) return 'عفوًا! نحتاج إلى عنوان بريد إلكتروني صحيح.';
  return '';
}
