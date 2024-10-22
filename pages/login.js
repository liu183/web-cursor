import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../store/authSlice'
import { useRouter } from 'next/router'
import styles from '../styles/Login.module.css'

export default function Login() {
  const [email, setEmail] = useState('test')
  const [password, setPassword] = useState('111')
  const [error, setError] = useState('')
  const dispatch = useDispatch()
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await dispatch(login({ email, password })).unwrap()
      router.push('/chat')
    } catch (err) {
      setError('登录失败：' + (err.message || '未知错误'))
    }
  }

  return (
    <div className={styles.container}>
      <h1>登录</h1>
      {error && <p className={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="用户名"
          required
          className={styles.input}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="密码"
          required
          className={styles.input}
        />
        <button type="submit" className={styles.button}>登录</button>
      </form>
      <p className={styles.hint}>
        测试账户：用户名 test，密码 111
      </p>
    </div>
  )
}
