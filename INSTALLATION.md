# 安装和使用指南

## 系统要求

- Node.js 18 或更高版本
- npm 或 yarn 包管理器

## 安装步骤

### 1. 克隆项目

```bash
git clone https://github.com/xiaomuahua666/nprofile.git
cd nprofile
```

### 2. 安装依赖

```bash
npm install
```

### 3. 启动开发服务器

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看你的网站。

## 自定义网站

### 编辑个人信息

编辑 `app/page.tsx` 中的自我介绍部分

### 更换头像

1. 准备一张头像图片（建议 400x400px 或更大）
2. 保存为 `public/avatar.jpg`

### 修改联系信息

编辑 `app/data.ts`：

```typescript
export const EMAIL = 'your@email.com'

export const SOCIAL_LINKS: SocialLink[] = [
  {
    label: 'Github',
    link: 'https://github.com/your-username',
  },
  // 更多社交链接...
]
```

### 更改网页标题和描述

编辑 `app/layout.tsx`

### 修改网站上线时间

编辑 `app/footer.tsx` 中的 `launchDate`

### 修改主题色

编辑 `app/layout.tsx` 中的 `viewport`

## 构建和部署

### 构建生产版本

```bash
npm run build
```

### 本地运行生产版本

```bash
npm run start
```

### 部署到 Vercel

1. 推送代码到 GitHub
2. 访问 [Vercel](https://vercel.com)
3. 导入你的 GitHub 仓库
4. Vercel 会自动部署和构建

## 常见问题

如遇到问题，请检查：
- [Next.js 文档](https://nextjs.org/docs)
- 项目的 GitHub Issues
- 发邮件联系: xiaomuahua666@gmail.com
