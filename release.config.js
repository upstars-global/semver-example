module.exports = {
    branches: ["main"],
    preset: "conventionalcommits",
    plugins: [
        ["@semantic-release/commit-analyzer", {
            releaseRules: [
                { type: "fix", release: "patch" },
                { type: "perf", release: "patch" },
                { type: "feat", release: "minor" },
                { type: "minor", release: "minor" },
                { type: "refactor", release: "minor" },
                { type: "style", release: "minor" },
                { type: "docs", release: "minor" },
                { type: "test", release: "minor" },
                { type: "chore", release: "minor" },
                { breaking: true, release: "major" },
                { release: "patch" }
            ]
        }],
        ["@semantic-release/release-notes-generator", {
            preset: "conventionalcommits",
            parserOpts: {
                noteKeywords: ["BREAKING CHANGE", "BREAKING CHANGES"]
            },
            writerOpts: {
                transform: (commit, context) => {
                    const newCommit = { ...commit };

                    // Формируем `repositoryUrl`, если он не передан в `context`
                    let repoUrl = context.repositoryUrl;
                    if (!repoUrl && context.host && context.owner && context.repository) {
                        repoUrl = `${context.host}/${context.owner}/${context.repository}`;
                    }
                    if (!repoUrl) {
                        console.error("❌ repositoryUrl is undefined, constructed URL is also empty.");
                    }

                    // Карта типов коммитов для заголовков
                    const typeMap = {
                        fix: "🐛 Bug Fixes",
                        feat: "🚀 Features",
                        chore: "🔧 Maintenance",
                        docs: "📖 Documentation",
                        style: "💅 Code Style",
                        refactor: "🔨 Refactoring",
                        perf: "⚡ Performance",
                        test: "🧪 Testing",
                        breaking: "⚠ Breaking Changes",
                        other: "📌 Other Changes"
                    };

                    // Проверяем, есть ли breaking change
                    if (commit.breaking || (commit.notes && commit.notes.length > 0)) {
                        newCommit.type = "⚠ Breaking Changes";
                        newCommit.subject = `**BREAKING CHANGE:** ${commit.notes.map(note => note.text).join(" ")}`;
                    } else {
                        newCommit.type = typeMap[newCommit.type] || "📌 Other Changes";
                    }

                    // Удаляем коммиты с `[skip ci]`
                    if (newCommit.subject.includes("[skip ci]")) {
                        return false;
                    }

                    // Добавляем `scope`, если он есть
                    let commitText = newCommit.subject;
                    if (newCommit.scope) {
                        commitText = `**${newCommit.scope}:** ${commitText}`;
                    }

                    // Добавляем ссылку на коммит
                    if (newCommit.hash && repoUrl) {
                        newCommit.subject = `${commitText} ([${newCommit.hash.substring(0, 7)}](${repoUrl}/commit/${newCommit.hash}))`;
                    } else {
                        newCommit.subject = commitText;
                    }

                    // Добавляем `body`, если есть, и убираем пустые ссылки
                    if (commit.body) {
                        newCommit.subject += `\n\n${commit.body.replace(/\(\[\]\(.*?\)\)/g, "")}`;
                    }

                    return newCommit;
                }
            },
            presetConfig: {
                types: [
                    { type: "fix", section: "🐛 Bug Fixes", hidden: false },
                    { type: "feat", section: "🚀 Features", hidden: false },
                    { type: "chore", section: "🔧 Maintenance", hidden: false },
                    { type: "docs", section: "📖 Documentation", hidden: false },
                    { type: "style", section: "💅 Code Style", hidden: false },
                    { type: "refactor", section: "🔨 Refactoring", hidden: false },
                    { type: "perf", section: "⚡ Performance", hidden: false },
                    { type: "test", section: "🧪 Testing", hidden: false },
                    { type: "breaking", section: "⚠ Breaking Changes", hidden: false },
                    { type: "other", section: "📌 Other Changes", hidden: false }
                ]
            }
        }],
        "@semantic-release/changelog",
        ["@semantic-release/exec", {
            prepareCmd: "node -e \"let pkg=require('./package.json'); pkg.version='${nextRelease.version}'; require('fs').writeFileSync('package.json', JSON.stringify(pkg, null, 2));\"",
            // successCmd: "node send-slack-notification.js \"${nextRelease.version}\" \"${process.env.REPO_URL}\"",
        }],
        ["@semantic-release/git", {
            assets: ["package.json", "CHANGELOG.md"],
            message: "chore(release): ${nextRelease.version} [skip ci]"
        }]
    ]
};
