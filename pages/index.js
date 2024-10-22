import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useState } from 'react'
import { useRouter } from 'next/router'

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState('');
  const router = useRouter();

  const handleFreeTrial = () => {
    setShowModal(true);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      // 这里可以添加邮箱验证逻辑
      // 假设验证通过，我们跳转到对话页面
      router.push('/chat');
    } else {
      alert('请输入有效的邮箱地址');
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>AI Chat - 未来对话的方式</title>
        <meta name="description" content="体验下一代AI聊天技术" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        <nav className={styles.nav}>
          <a href="#" className={styles.logo}>AI Chat</a>
          <div className={styles.navLinks}>
            <a href="#features">功能</a>
            <a href="#testimonials">评价</a>
            <a href="#pricing">定价</a>
            <a href="#" className={styles.ctaButton}>立即开始</a>
          </div>
        </nav>
      </header>

      <main className={styles.main}>
        <section className={styles.hero}>
          <h1 className={styles.title}>未来对话的方式</h1>
          <p className={styles.description}>
            体验革命性的AI聊天技术，让沟通变得更智能、更高效
          </p>
          <button className={styles.heroButton} onClick={handleFreeTrial}>免费试用</button>
        </section>

        <section id="features" className={styles.features}>
          <h2>主要功能</h2>
          <div className={styles.featureGrid}>
            <div className={styles.featureItem}>
              <img src="/icon-ai.svg" alt="AI Icon" />
              <h3>先进的AI模型</h3>
              <p>采用最新的自然语言处理技术，提供智能、流畅的对话体验</p>
            </div>
            <div className={styles.featureItem}>
              <img src="/icon-customize.svg" alt="Customize Icon" />
              <h3>个性化定制</h3>
              <p>根据您的需求定制AI助手，满足各种场景的应用</p>
            </div>
            <div className={styles.featureItem}>
              <img src="/icon-secure.svg" alt="Secure Icon" />
              <h3>安全可靠</h3>
              <p>采用先进的加密技术，确保您的数据安全和隐私</p>
            </div>
          </div>
        </section>

        <section id="testimonials" className={styles.testimonials}>
          <h2>用户评价</h2>
          <div className={styles.testimonialGrid}>
            <div className={styles.testimonialItem}>
              <p>"这是我用过的最智能的AI聊天工具，完全改变了我的工作方式！"</p>
              <p className={styles.author}>- 张三，科技公司CEO</p>
            </div>
            <div className={styles.testimonialItem}>
              <p>"界面简洁，功能强大，用起来非常流畅。强烈推荐！"</p>
              <p className={styles.author}>- 李四，自由职业者</p>
            </div>
          </div>
        </section>

        <section id="pricing" className={styles.pricing}>
          <h2>定价方案</h2>
          <div className={styles.pricingGrid}>
            <div className={styles.pricingItem}>
              <h3>基础版</h3>
              <p className={styles.price}>¥99/月</p>
              <ul>
                <li>无限对话</li>
                <li>基础AI模型</li>
                <li>邮件支持</li>
              </ul>
              <button className={styles.pricingButton}>选择方案</button>
            </div>
            <div className={styles.pricingItem}>
              <h3>专业版</h3>
              <p className={styles.price}>¥299/月</p>
              <ul>
                <li>无限对话</li>
                <li>高级AI模型</li>
                <li>24/7在线支持</li>
                <li>API访问</li>
              </ul>
              <button className={styles.pricingButton}>选择方案</button>
            </div>
            <div className={styles.pricingItem}>
              <h3>企业版</h3>
              <p className={styles.price}>联系我们</p>
              <ul>
                <li>定制AI模型</li>
                <li>专属客户经理</li>
                <li>高级安全特性</li>
                <li>集成支持</li>
              </ul>
              <button className={styles.pricingButton}>联系销售</button>
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <p>&copy; 2023 AI Chat. 保留所有权利。</p>
        <div className={styles.footerLinks}>
          <a href="#">隐私政策</a>
          <a href="#">使用条款</a>
          <a href="#">联系我们</a>
        </div>
      </footer>

      {showModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>开始免费试用</h2>
            <p>请输入您的邮箱地址以开始免费试用。</p>
            <form onSubmit={handleSubmit}>
              <input 
                type="email" 
                placeholder="您的邮箱" 
                className={styles.emailInput} 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className={styles.submitButton}>提交</button>
              <button type="button" className={styles.closeButton} onClick={() => setShowModal(false)}>关闭</button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
