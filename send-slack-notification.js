const https = require('https');

const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL; // URL вебхука
const version = process.argv[2]; // Версия из аргумента
const repoUrl = process.argv[3]; // Ссылка на репозиторий

if (!SLACK_WEBHOOK_URL) {
    console.error("❌ Ошибка: Переменная окружения SLACK_WEBHOOK_URL не задана.");
    process.exit(1);
}

const message = {
    text: `🚀 Вышел новый релиз: *v${version}* \n🔗 [Ссылка на релиз](${repoUrl}/releases/tag/v${version})`
};

const requestData = JSON.stringify(message);

const requestOptions = new URL(SLACK_WEBHOOK_URL);
const req = https.request(
    {
        hostname: requestOptions.hostname,
        path: requestOptions.pathname,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(requestData),
        },
    },
    (res) => {
        if (res.statusCode === 200) {
            console.log("✅ Уведомление успешно отправлено в Slack.");
        } else {
            console.error(`❌ Ошибка отправки: ${res.statusCode}`);
        }
    }
);

req.on('error', (err) => {
    console.error(`❌ Ошибка запроса: ${err.message}`);
});

req.write(requestData);
req.end();
