import { useState, useEffect, useRef } from 'react'
import Head from 'next/head'
import styles from '../styles/Chat.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { sendMessage, fetchMessages } from '../store/chatSlice'
import { selectUser } from '../store/authSlice'
import { useRouter } from 'next/router'
import { FaPaperPlane, FaMicrophone, FaImage, FaPaperclip, FaCopy } from 'react-icons/fa'
import axios from 'axios'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { tomorrow } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import rehypeKatex from 'rehype-katex'
import 'katex/dist/katex.min.css'

const DEEPSEEK_API_KEY = 'sk-9967ede904c44d53afa01c113ecd1f30'

const CopyButton = ({ text }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <button onClick={handleCopy} className={styles.copyButton}>
      {copied ? 'Copied!' : <FaCopy />}
    </button>
  );
};

export default function Chat() {
  const [input, setInput] = useState('')
  const [isAiThinking, setIsAiThinking] = useState(false)
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
      setIsAiThinking(true)

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
      } finally {
        setIsAiThinking(false)
      }
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>AI Chat - 智能对话</title>
        <meta name="description" content="AI Chat 智能对话界面" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/katex@0.13.11/dist/katex.min.css"
          integrity="sha384-Um5gpz1odJg5Z4HAmzPtgZKdTBHZdw8S29IecapCSB31ligYPhHQZMIlWLYQGVoc"
          crossOrigin="anonymous"
        />
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
                <ReactMarkdown
                  rehypePlugins={[rehypeKatex]}
                  components={{
                    code({node, inline, className, children, ...props}) {
                      const match = /language-(\w+)/.exec(className || '')
                      return !inline && match ? (
                        <div className={styles.codeBlock}>
                          <SyntaxHighlighter
                            style={tomorrow}
                            language={match[1]}
                            PreTag="div"
                            {...props}
                          >
                            {String(children).replace(/\n$/, '')}
                          </SyntaxHighlighter>
                          <CopyButton text={String(children)} />
                        </div>
                      ) : (
                        <code className={className} {...props}>
                          {children}
                        </code>
                      )
                    },
                    math({value}) {
                      return (
                        <div className={styles.mathBlock}>
                          <span>{value}</span>
                          <CopyButton text={value} />
                        </div>
                      )
                    },
                    inlineMath({value}) {
                      return <span>{value}</span>
                    }
                  }}
                >
                  {message.content}
                </ReactMarkdown>
              </div>
              <div className={styles.messageTime}>
                {new Date(message.timestamp).toLocaleTimeString()}
              </div>
            </div>
          ))}
          {isAiThinking && (
            <div className={`${styles.message} ${styles.aiMessage} ${styles.thinkingMessage}`}>
              AI正在思考...
            </div>
          )}
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
