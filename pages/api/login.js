import jwt from 'jsonwebtoken'

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    // 检查是否是默认测试账户
    if (email === 'test' && password === '111') {
      const user = { id: 1, email: 'test@example.com' }
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || 'your-secret-key', { expiresIn: '1h' })
      res.status(200).json({ user, token })
    } else {
      // 这里应该有实际的用户验证逻辑
      res.status(401).json({ message: '邮箱或密码错误' })
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
