# noVNC Node Service

基于 Node.js + noVNC + 内置 Websockify 的远程桌面服务。  
支持在公网或局域网中通过浏览器直接访问远程计算机桌面。

---

## 📂 项目目录结构

```
novnc-node-service/
├── config.json          # 配置文件 (VNC 地址、端口、HTTP 端口等)
├── node_modules/        # Node.js 依赖
├── package.json         # 项目信息
├── server.js            # Node.js 服务 (内置 Websockify)
└── public/              # noVNC 前端资源
    ├── vnc.html         # 主页面
    └── ...
```

---

## 🚀 功能

- 内置 **Websockify**（无需额外开终端运行 `websockify` 命令）
- 支持 **公网 / 内网浏览器远程桌面访问**
- 基于 **noVNC 前端**，支持全平台浏览器
- 可通过修改 `config.json` 进行自定义配置

---

## ⚙️ 环境准备

### 1. 安装 VNC 服务端

#### Windows
推荐使用 [TightVNC](https://www.tightvnc.com/) 或 [TigerVNC](https://tigervnc.org/)。  
安装后启动 **VNC Server**，设置访问密码，监听 `5900` 端口。

#### Linux (Ubuntu / Debian)
```bash
sudo apt update
sudo apt install tigervnc-standalone-server tigervnc-common -y

# 启动 VNC Server (示例: 映射到 :1 → 5901 端口)
vncserver :1
```

> ⚠️ 注意：请记住 VNC 服务端监听的端口（默认 5900）。

---

### 2. 安装 Node.js 环境

确保已安装 Node.js 18+  
下载：[https://nodejs.org/](https://nodejs.org/)

---

## 📦 本地部署步骤

1. 克隆仓库
```bash
git clone https://github.com/yourname/novnc-node-service.git
cd novnc-node-service
```

2. 安装依赖
```bash
npm install
```

3. 编辑配置文件 `config.json`
```json
{
  "vncHost": "127.0.0.1",
  "vncPort": 5900,
  "webPort": 6080,
  "httpPort": 8080
}
```

4. 启动服务
```bash
node server.js
```

5. 访问页面  
在浏览器中打开：
```
http://localhost:8080/
```

即可通过 noVNC 页面连接到本机的 VNC 服务。

---

## 🌍 公网部署

1. 在云服务器安装 VNC 服务端（同本地步骤）。
2. 将 `novnc-node-service` 部署到服务器。
3. 配置域名和端口转发（推荐使用 Nginx 或 Caddy 反向代理）。  
4. 访问：
```
https://your-domain/vnc.html?host=your-domain&port=6080
```

---

## 📝 TODO (社区可共同迭代)

- [ ] HTTPS 支持（Let’s Encrypt 免费证书）
- [ ] Token/密码认证（避免公网裸连）
- [ ] 自定义 noVNC Logo 与标题（例如 "Taylor Remote Desktop"）
- [ ] 多用户/多会话支持

---

## 📄 License

本项目基于 [MPL 2.0](./LICENSE.txt) 与 [BSD-2-Clause](./LICENSE.txt) 开源。  
原始 noVNC 项目版权归 noVNC authors 所有。
