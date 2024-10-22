import jwt from 'jsonwebtoken'

// 模拟数据库
let messages = []

export default function handler(req, res) {
  // 验证 token
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) {
    return res.status(401).json({ message: 'Authentication required' })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key')
    req.userId = decoded.userId
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' })
  }

  if (req.method === 'GET') {
    res.status(200).json(messages)
  } else if (req.method === 'POST') {
    const newMessage = {
      id: Date.now(),
      content: req.body.content,
      userId: req.body.userId, // 这里使用传入的userId，可能是用户ID或'ai'
      timestamp: new Date().toISOString()
    }
    messages.push(newMessage)
    res.status(201).json(newMessage)
  } else {
    res.setHeader('Allow', ['GET', 'POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
