# 健康助理

## 项目简介

健康助理是一个网页应用程序，旨在帮助用户监控和管理个人健康数据。目前，该应用提供BMI（身体质量指数）计算功能，并根据计算结果提供个性化的健康建议。

## 功能特点

- **BMI计算**：根据用户输入的身高、体重和性别，计算BMI值
- **体型基数分析**：根据性别和身高提供标准体重范围参考
- **健康状态评估**：根据BMI值判断用户的健康状态（偏瘦、标准、偏重、肥胖）
- **个性化健康建议**：根据BMI结果提供针对性的健康和饮食建议
- **数据本地存储**：保存用户上次输入的数据，提高使用便捷性

## 安装说明

1. 克隆仓库到本地：
   ```
   git clone [仓库URL]
   ```

2. 进入项目目录：
   ```
   cd HealthAssistant
   ```

3. 安装依赖：
   ```
   npm install
   ```

## 使用方法

1. 在浏览器中打开 `index.html` 文件
2. 输入您的身高(cm)、体重(kg)和性别
3. 点击"计算BMI"按钮获取您的健康报告
4. 查看BMI值、体型基数分析和个性化健康建议

## 技术栈

- HTML5
- CSS3
- JavaScript (原生)
- 本地存储 (localStorage)

## 贡献指南

欢迎对本项目提出改进建议或直接贡献代码。请遵循以下步骤：

1. Fork 本仓库
2. 创建您的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交您的更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启一个 Pull Request

## 许可证

本项目采用 MIT 许可证 - 详情请参阅 LICENSE 文件

## 联系方式

如有任何问题或建议，请通过 [项目Issues](https://github.com/yourusername/HealthAssistant/issues) 与我们联系。