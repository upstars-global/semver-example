import { readFileSync } from 'node:fs'
const commitPartial = readFileSync('./changelog-template-commit.hbs', { encoding: 'utf-8' })

function finalizeContext (context) {
    for (const commitGroup of context.commitGroups) {
        for (const commit of commitGroup.commits) {
            commit.bodyLines = commit.body?.split('\n').filter((line) => line !== '') ?? []
        }
    }

    return context
}

export default {
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
                commitPartial,
                finalizeContext,
            },
            /*writerOpts: {

                transform: (commit, context) => {
                    const newCommit = { ...commit };

                    // Формируем `repositoryUrl`
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

                    // Проверяем, содержит ли `subject` уже ссылку на коммит
                    const commitUrl = `(${repoUrl}/commit/${newCommit.hash})`;
                    if (!newCommit.subject.includes(commitUrl)) {
                        newCommit.subject = `${commitText} ${newCommit.commit.short}`;
                    }

                    // Очищаем `commit.body` от пустых ссылок и `[skip ci]`
                    if (commit.body) {
                        const cleanedBody = commit.body
                        .replace(/\(\[\]\(.*?\)\)/g, "")  // Убираем пустые `[]()`
                        .replace(/\[skip ci\]/gi, "")    // Убираем `[skip ci]`
                        .replace(commitUrl, "")          // Убираем дублирующуюся ссылку
                        .trim();

                        // Добавляем `body` только если он не пустой
                        if (cleanedBody) {
                            newCommit.subject += `\n\n${cleanedBody}`;
                        }
                    }

                    return newCommit;
                }
            },*/
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
