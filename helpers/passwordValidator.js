export function passwordValidator(password) {
  if (!password) return 'لا يمكن ترك حقل كلمة المرور فارغًا.';
  if (password.length < 5) return 'يجب أن تكون كلمة المرور على الأقل 5 أحرف.';
  return '';
}
