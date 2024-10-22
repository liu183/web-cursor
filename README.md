# AI Chat - 智能对话系统

## 项目概述

AI Chat 是一个基于 Next.js 和 DeepSeek API 构建的智能对话系统。它提供了一个直观的用户界面，允许用户与 AI 助手进行实时对话。该项目旨在展示如何将先进的 AI 技术集成到现代 web 应用中。

## 主要功能

1. 用户认证：支持用户登录功能。
2. 实时对话：用户可以与 AI 助手进行实时对话。
3. 消息历史：保存并显示对话历史。
4. 响应式设计：适配各种设备尺寸。
5. AI 集成：使用 DeepSeek API 提供智能回复。

## 技术栈

- **前端**：
  - Next.js：React 框架，用于服务端渲染和静态站点生成
  - Redux Toolkit：状态管理
  - Axios：HTTP 客户端
  - React Icons：图标库

- **后端**：
  - Next.js API Routes：服务器端 API
  - jsonwebtoken：用于生成和验证 JWT token

- **AI 集成**：
  - DeepSeek API：提供 AI 对话能力

- **样式**：
  - CSS Modules：组件级样式隔离

## 架构设计

1. **前端架构**：
   - 使用 Next.js 的页面路由系统
   - 使用 Redux 进行全局状态管理
   - 组件化设计，实现 UI 的模块化和可重用性

2. **后端架构**：
   - 利用 Next.js 的 API Routes 功能实现后端 API
   - 实现用户认证和消息存储功能
   - 与 DeepSeek API 集成，处理 AI 对话请求

3. **数据流**：
   - 用户输入 -> Redux Action -> API 请求 -> DeepSeek API -> 更新 Redux Store -> 更新 UI

## 安装指南

1. 克隆仓库：   ```
   git clone https://github.com/your-repo/ai-chat.git
   cd ai-chat   ```

2. 安装依赖：   ```
   npm install   ```

3. 设置环境变量：
   创建 `.env.local` 文件并添加以下内容：   ```
   DEEPSEEK_API_KEY=your_deepseek_api_key
   JWT_SECRET=your_jwt_secret   ```

4. 运行开发服务器：   ```
   npm run dev   ```

5. 访问 `http://localhost:3000` 查看应用。

## 使用说明

1. 访问首页，点击"免费试用"或"立即开始"。
2. 在登录页面，使用测试账户（用户名：test，密码：111）登录。
3. 进入聊天界面后，在输入框中输入消息并发送。
4. AI 助手将会回复您的消息。

## 项目结构
