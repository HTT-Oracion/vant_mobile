export const loginRules = {
  moblie: [
    { required: true, message: '请输入手机号码' },
    { pattern: /^1[3|5|7|8|9]\d{9}$/, message: '手机号格式错误' }
  ],
  code: [
    { required: true, message: '请输入验证码' },
    { pattern: /^\d{6}$/, message: '验证码格式错误' }
  ]
}