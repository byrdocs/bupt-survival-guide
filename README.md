# BUPT 生存手册

> 北京邮电大学生存指南，从沙河到本部，从入学到毕业的全程陪伴

[![Built with Starlight](https://astro.badg.es/v2/built-with-starlight/tiny.svg)](https://starlight.astro.build)
[![License: CC BY-SA 4.0](https://img.shields.io/badge/License-CC_BY--SA_4.0-lightgrey.svg)](https://creativecommons.org/licenses/by-sa/4.0/)

## 📖 项目简介

BUPT 生存手册是一个开源的北京邮电大学学生生活指南，旨在帮助新老同学更好地适应校园生活。手册覆盖了沙河校区和本部校区的详细信息，包含住宿、餐饮、学习、交通、生活服务等方方面面的实用指南。

### 🎯 主要特色

- **📍 双校区覆盖**：详细介绍沙河校区和本部校区的生活指南
- **🔄 持续更新**：基于最新校园变化和同学反馈及时更新内容  
- **👥 社区驱动**：来源于众多学长学姐的实际经验分享
- **📱 响应式设计**：支持电脑、平板、手机等多种设备访问
- **🔍 快速搜索**：内置搜索功能，快速定位所需信息

## 🏫 内容结构

### 沙河校区指南
- 🎒 新生报到：入学流程、必备物品、注意事项
- 🏠 住宿生活：雁北园、雁南园宿舍环境介绍
- 📖 学业指导：课程安排、成绩计算、保研攻略
- 🌐 内网资源：校园网络、VPN 配置、资源下载
- 🍽️ 生活相关：餐饮、购物、快递、交通等
- 🎖️ 军训相关：军训准备、注意事项、实用建议
- 🏛️ 学生组织：社团介绍、加入方式、活动福利
- 💡 其他事项：校园卡使用、银行业务、生活技巧

### 本部校区指南
- 📦 搬家攻略：从沙河到本部的搬家详细指南
- 🏠 宿舍条件：各楼宇分布、住宿环境、生活设施
- 🍽️ 餐饮指南：校内食堂和周边美食完整攻略
- 📚 学习环境：图书馆、自习室、学习场所介绍
- 🚇 交通出行：地铁公交、校门开放、出行建议
- 🏥 生活服务：医疗、体育、维修、娱乐等服务
- 📱 生活相关：快递外卖、购物娱乐、日常服务

## 🚀 本地开发

### 环境要求

- Node.js 18+ 
- pnpm（推荐）或 npm

### 快速开始

1. **克隆仓库**
```bash
git clone https://github.com/byrdocs/SurviveBUPTManual.git
cd SurviveBUPTManual
```

2. **安装依赖**
```bash
pnpm install
```

3. **启动开发服务器**
```bash
pnpm dev
```

4. **访问网站**
打开浏览器访问 `http://localhost:4321`

### 🧞 常用命令

| 命令 | 说明 |
| :--- | :--- |
| `pnpm install` | 安装依赖 |
| `pnpm dev` | 启动开发服务器 (`localhost:4321`) |
| `pnpm build` | 构建生产版本到 `./dist/` |
| `pnpm preview` | 预览构建结果 |
| `pnpm astro ...` | 运行 Astro CLI 命令 |

## 🤝 参与贡献

我们欢迎所有 BUPT 同学为这个项目贡献内容！

### 如何贡献

1. **Fork 本仓库**
2. **创建功能分支** (`git checkout -b feature/AmazingFeature`)
3. **提交更改** (`git commit -m 'Add some AmazingFeature'`)
4. **推送到分支** (`git push origin feature/AmazingFeature`)
5. **创建 Pull Request**

### 贡献类型

- 📝 **内容贡献**：更新校园信息、分享生活经验、纠正错误信息
- 🛠️ **技术贡献**：改进网站功能、优化用户体验、修复技术问题
- 🎨 **设计贡献**：改善页面设计、优化视觉效果、提升可用性

详细的贡献指南请参考：[贡献指南](./src/content/docs/contributing.md)

## 📄 内容来源

### 致谢

本手册的内容来源于多个项目和众多同学的无私贡献：

- **沙河校区部分**：主要来源于 [BUPTSE/welcome](https://github.com/BUPTSE/welcome) 开源项目
- **本部校区部分**：来源于同学们在腾讯在线文档中的集体创作

感谢所有贡献者的无私分享！完整的致谢名单请查看：[致谢页面](./src/content/docs/acknowledgments.md)

## 🔧 技术栈

- [Astro](https://astro.build/) - 静态站点生成器
- [Starlight](https://starlight.astro.build/) - 文档主题
- [Catppuccin](https://github.com/catppuccin/starlight) - 配色主题
- Markdown - 内容编写
- TypeScript - 类型安全

## 📊 项目状态

- 🔄 沙河校区指南更新中
- 🔄 本部校区指南更新中
- ✅ 响应式设计支持
- ✅ 搜索功能集成
- 🔄 内容持续更新中
- 🔄 社区反馈收集中

## 📞 联系我们

如有问题或建议，欢迎通过以下方式联系：

- **GitHub Issues**: [提交问题](https://github.com/byrdocs/SurviveBUPTManual/issues)
- **Pull Requests**: [贡献代码](https://github.com/byrdocs/SurviveBUPTManual/pulls)

## 📄 开源协议

本项目采用 MIT 协议，详情请参考 [LICENSE](LICENSE) 文件。

---

**Made with ❤️ by BUPT Students**

> 愿这份手册能成为你 BUPT 求学路上的好伙伴！
