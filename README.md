# Node.js Zendesk Ticket Creation

## 簡介
這個專案是一個 Node.js 函數，主要用於從調查問卷回應中提取數據並自動在 Zendesk 創建支援工單。當用戶提供的數據（如 SVID 和 HASH）被接收到時，該函數會解密資料並將其格式化為 Zendesk 工單所需的格式，從而提高了回應客戶查詢的效率。

## 功能
- 接收來自調查的數據（SVID 和 HASH）。
- 解密數據並提取必要的訊息。
- 根據提取的數據自動填寫 Zendesk 的工單資料。
- 支援創建包括標籤、自定義欄位的工單。

## 安裝與使用方式
1. 克隆或下載本專案的程式碼。
   ```bash
   git clone https://github.com/yourusername/zendesk-ticket-creation.git
   cd zendesk-ticket-creation
   ```

2. 安裝必要的依賴模組：
   ```bash
   npm install axios node-fetch
   ```

3. 配置環境變數或在程式碼中填寫以下變數：
   - `zendeskUrl` (Zendesk API 的網址)
   - `zendeskUsername` (Zendesk 帳戶的使用者名稱)
   - `zendeskToken` (Zendesk API 的访问令牌)

4. 部署到支持 Node.js 的雲平台（如 AWS Lambda）。

5. 當然也可以在本地執行測試。

## 必要的依賴模組清單
- `axios`：用於發送 HTTP 請求。
- `node-fetch`：用於執行 fetch API 操作。

## 授權條款
本專案的代碼依據 MIT 授權條款釋出。自由使用、修改及分發，但必須保留原始的版權和授權聲明。

如有任何問題或建議，請隨時在 GitHub 上提出問題或拉取請求。