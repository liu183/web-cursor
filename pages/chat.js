import { useState, useEffect, useRef } from 'react'
import Head from 'next/head'
import styles from '../styles/Chat.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { sendMessage, fetchMessages } from '../store/chatSlice'
import { selectUser } from '../store/authSlice'
import { useRouter } from 'next/router'
import { FaPaperPlane, FaMicrophone, FaImage, FaPaperclip } from 'react-icons/fa'
import axios from 'axios'

const DEEPSEEK_API_KEY = 'sk-9967ede904c44d53afa01c113ecd1f30'

export default function Chat() {
  const [input, setInput] = useState('')
  const messages = useSelector(state => state.chat.messages)
  const user = useSelector(selectUser)
  const dispatch = useDispatch()
  const router = useRouter()
  const chatContainerRef = useRef(null)

  useEffect(() => {
    if (!user) {
      router.push('/login')
    } else {
      dispatch(fetchMessages())
    }
  }, [user, dispatch, router])

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [messages])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (input.trim()) {
      const userMessage = { role: 'user', content: input }
      dispatch(sendMessage({ content: input, userId: user.id }))
      setInput('')

      try {
        const response = await axios.post('/api/chat', {
          messages: [...messages, userMessage].map(msg => ({
            role: msg.userId === user.id ? 'user' : 'assistant',
            content: msg.content
          }))
        });

        const aiResponse = response.data.choices[0].message.content
        dispatch(sendMessage({ content: aiResponse, userId: 'ai' }))
      } catch (error) {
        console.error('Error calling chat API:', error)
        dispatch(sendMessage({ content: "抱歉，我遇到了一些问题。请稍后再试。", userId: 'ai' }))
      }
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>AI Chat - 智能对话</title>
        <meta name="description" content="AI Chat 智能对话界面" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.chatHeader}>
          <h1>AI Assistant</h1>
          <div className={styles.userInfo}>
            <img src="/user-avatar.png" alt="User Avatar" className={styles.avatar} />
            <span>{user?.email}</span>
          </div>
        </div>

        <div className={styles.chatContainer} ref={chatContainerRef}>
          {messages.map((message, index) => (
            <div key={index} className={`${styles.message} ${message.userId === user.id ? styles.userMessage : styles.aiMessage}`}>
              <div className={styles.messageContent}>
                {message.content}
              </div>
              <div className={styles.messageTime}>
                {new Date(message.timestamp).toLocaleTimeString()}
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className={styles.inputForm}>
          <button type="button" className={styles.attachButton}>
            <FaPaperclip />
          </button>
          <button type="button" className={styles.imageButton}>
            <FaImage />
          </button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="输入您的消息..."
            className={styles.input}
          />
          <button type="button" className={styles.voiceButton}>
            <FaMicrophone />
          </button>
          <button type="submit" className={styles.sendButton}>
            <FaPaperPlane />
          </button>
        </form>
      </main>
    </div>
  )
}
