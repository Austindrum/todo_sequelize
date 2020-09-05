# 代辦清單
建立你的代辦清單

## 功能
- 註冊功能
- 登入、登出功能(包含Facebook登入)
- 新增、修改、刪除餐廳資料
- 可針對單一代辦點選完成

## 安裝及設定
1. Clone 至本機環境
```bash
git clone https://github.com/Austindrum/todo_sequelize.git
```
2. 安裝 Dependencies
```bash
npm install
```
3. 初始化 Sequelize
```bash
npx sequelize init 
```
4. 設定 /config/config.json

5. 建立資料庫
```bash
npx sequelize db:migrate
```
6. Seed
```bash
npx sequelize db:seed:all
```
7. 環境變數
- SESSION_SECRET
- FACEBOOK_ID
- FACEBOOK_SECRET
- FACEBOOK_CALLBACK
## 開發人員
[Austin Liu](https://github.com/Austindrum)