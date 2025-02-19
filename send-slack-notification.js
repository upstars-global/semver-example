const https = require('https');
const { execSync } = require('child_process');

const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL;
const version = process.argv[2]; // Версия релиза
const repoUrl = process.argv[3]; // Ссылка на репозиторий
const branch = process.env.GITHUB_REF?.replace("refs/heads/", "") || "main"; // Ветка
const author = process.env.GITHUB_ACTOR || "Unknown"; // Автор релиза
const timestamp = new Date().toLocaleString("ru-RU", { timeZone: "UTC" }); // Время релиза

if (!SLACK_WEBHOOK_URL) {
    console.error("❌ Ошибка: SLACK_WEBHOOK_URL не задан.");
    process.exit(1);
}

// Получаем последние изменения из CHANGELOG.md (5 строк)
let changelog = "";
try {
    changelog = execSync('head -n 5 CHANGELOG.md').toString().trim();
} catch (err) {
    console.error("❌ Ошибка чтения CHANGELOG.md:", err.message);
}

// GitHub Diff между последним и текущим релизом
const diffUrl = `${repoUrl}/compare/v${version.replace(/\.\d+$/, ".0")}...v${version}`;

const message = {
    text: `🚀 *Новый релиз:* *v${version}* \n🔗 [Ссылка на релиз](${repoUrl}/releases/tag/v${version})`,
    attachments: [
        {
            color: "#36a64f",
            fields: [
                { title: "Ветка", value: branch, short: true },
                { title: "Автор", value: author, short: true },
                { title: "Время релиза", value: timestamp, short: true },
                { title: "Изменения", value: changelog || "Нет данных", short: false },
                { title: "GitHub Diff", value: `<${diffUrl}|Посмотреть изменения>`, short: false }
            ]
        }
    ]
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
        let responseData = "";
        res.on("data", (chunk) => {
            responseData += chunk;
        });

        res.on("end", () => {
            console.log(`🔹 Ответ Slack: ${res.statusCode} ${responseData}`);
            if (res.statusCode === 200) {
                console.log("✅ Уведомление успешно отправлено в Slack.");
            } else {
                console.error(`❌ Ошибка отправки: ${res.statusCode}`);
            }
        });
    }
);

req.on('error', (err) => {
    console.error(`❌ Ошибка запроса: ${err.message}`);
});

req.write(requestData);
req.end();
