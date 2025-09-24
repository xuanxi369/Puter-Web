# Puter-Web

> 基于 **Node.js + noVNC + 内置 Websockify** 的远程桌面服务  
> 通过浏览器即可在 **公网 / 局域网** 访问远程计算机桌面  

项目地址：[github.com/xuanxi369/Puter-Web](https://github.com/xuanxi369/Puter-Web)

---

## 📖 项目背景

现实问题在于：  
- 世界上几乎不存在两台环境配置完全相同的主机；  
- 当更换学习/工作设备时，往往需要重新配置环境，耗时巨大；  
- 市面上的远程桌面软件虽然成熟、安全，但获取设备识别码等步骤复杂，难以及时解决燃眉之急。

为此，本项目 **Puter-Web** 应运而生。它的目标是：  
- 降低时间损耗，快速响应用户需求；  
- 使用难度极低，无需复杂配置；  
- 轻量化运行，后台资源占用小；  
- 通过 **浏览器** 即可访问远程桌面，无需额外安装软件。  

---

## ⚠️ 注意事项

- 本项目的设计目标是 **快速解决临时性需求**，并非取代市面成熟的远程控制软件；  
- 安全性与舒适性 **低于专业远程软件**，因此：  
  - 🚫 不建议在涉及 **隐私/敏感数据** 的主机上使用；  
  - 🚫 禁止在 **涉密环境（内网/外网）** 部署或访问。

---

## ✨ 功能特性

- ✅ **内置 Websockify** —— 无需额外运行 `websockify`  
- ✅ **全平台浏览器支持** —— Chrome / Firefox / Edge / Safari 皆可访问  
- ✅ **公网 / 内网远程访问** —— 支持云服务器或局域网环境  
- ✅ **配置简单** —— 通过 `config.json` 即可自定义参数  
- ✅ **轻量化部署** —— 仅依赖 Node.js，无需额外客户端  

---

## 📂 项目目录结构

```
Puter-Web/
├── config.json          # 配置文件 (VNC 地址、端口、HTTP 端口等)
├── node_modules/        # Node.js 依赖
├── package.json         # 项目信息
├── server.js            # Node.js 服务 (内置 Websockify)
└── public/              # noVNC 前端资源
    ├── vnc.html         # 主页面
    └── ...
```

---

## ⚙️ 环境准备

### 1. 安装 VNC 服务端

#### Windows
推荐：[TightVNC](https://www.tightvnc.com/) / [TigerVNC](https://tigervnc.org/)  
安装后启动 **VNC Server**，设置访问密码，监听 `5900` 端口。

#### Linux (Ubuntu / Debian)
```bash
sudo apt update
sudo apt install tigervnc-standalone-server tigervnc-common -y

# 启动 VNC Server (示例: 映射到 :1 → 5901 端口)
vncserver :1
```

> ⚠️ 请记住 VNC 服务端监听的端口（默认 5900）。

---

### 2. 安装 Node.js 环境

确保已安装 **Node.js 18+**  
下载：[https://nodejs.org/](https://nodejs.org/)

---

## 🚀 本地部署步骤

1. 克隆仓库
```bash
git clone https://github.com/xuanxi369/Puter-Web.git
cd Puter-Web
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

5. 打开浏览器访问：
```
http://localhost:8080/
```

即可通过 noVNC 页面连接到远程 VNC 服务。

---

## 🌍 公网部署

1. 在云服务器安装并运行 VNC 服务端；  
2. 部署 `Puter-Web` 到服务器；  
3. 配置域名和端口转发（推荐 **Nginx / Caddy 反向代理**）；  
4. 浏览器访问：
```
https://your-domain/vnc.html?host=your-domain&port=6080
```

---

## 🔮 项目未来拓展方向

- [ ] 支持 **HTTPS**（Let’s Encrypt 免费证书）  
- [ ] 增加 **Token/密码认证**，提升安全性  
- [ ] 多用户/多会话支持，实现多台主机联动  
- [ ] 宿主机与远程机间的 **文件传输 / 共享**  
- [ ] 借助浏览器插件扩展远程主机功能（如翻译、辅助工具等）  
- [ ] 自定义 UI（项目 Logo、标题等）  

---

## 📄 License

本项目基于 [MPL 2.0](./LICENSE.txt) 与 [BSD-2-Clause](./LICENSE.txt) 开源。  
原始 noVNC 项目版权归 noVNC authors 所有。

