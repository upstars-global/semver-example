module.exports = {
    branches: ['main'], // Релизные ветки
    preset: "conventionalcommits",
    plugins: [
        ['@semantic-release/commit-analyzer', {
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
                { breaking: true, release: "major" }, // Обрабатываем BREAKING CHANGE
                { release: "patch" }
            ]
        }],
        ['@semantic-release/release-notes-generator', {
            preset: "conventionalcommits",
            writerOpts: {
                transform: (commit, context) => {
                    const newCommit = { ...commit };

                    // Сопоставляем типы коммитов с заголовками секций
                    const typeMap = {
                        fix: "🐛 Bug Fixes",
                        feat: "🚀 Features",
                        chore: "🔧 Maintenance",
                        docs: "📖 Documentation",
                        style: "💅 Code Style",
                        refactor: "🔨 Refactoring",
                        perf: "⚡ Performance",
                        test: "🧪 Testing",
                        other: "📌 Other Changes"
                    };

                    // Проверяем, есть ли breaking change
                    if (newCommit.notes && newCommit.notes.length > 0) {
                        newCommit.type = "⚠ Breaking Changes";
                        newCommit.subject = `**BREAKING CHANGE:** ${newCommit.notes.map(note => note.text).join(" ")}`;
                    } else {
                        // Если тип коммита не найден, относим его в "📌 Other Changes"
                        newCommit.type = typeMap[newCommit.type] || "📌 Other Changes";
                    }

                    // Добавляем `scope`, если он есть
                    let commitText = newCommit.subject;
                    if (newCommit.scope) {
                        commitText = `**${newCommit.scope}:** ${commitText}`;
                    }

                    // Добавляем ссылку на коммит в GitHub
                    if (newCommit.hash) {
                        newCommit.subject = `${commitText} ([${newCommit.hash.substring(0, 7)}](${context.repositoryUrl}/commit/${newCommit.hash}))`;
                    } else {
                        newCommit.subject = commitText;
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
                    { type: "other", section: "📌 Other Changes", hidden: false },
                    { type: "BREAKING_CHANGES", section: "⚠ Breaking Changes", hidden: false } // Добавляем секцию для breaking changes
                ]
            }
        }],
        '@semantic-release/changelog',
        ['@semantic-release/exec', {
            prepareCmd: 'node -e "let pkg=require(\'./package.json\'); pkg.version=\'${nextRelease.version}\'; require(\'fs\').writeFileSync(\'package.json\', JSON.stringify(pkg, null, 2));"',
        }],
        ['@semantic-release/git', {
            assets: ['package.json', 'CHANGELOG.md'],
            message: 'chore(release): ${nextRelease.version} [skip ci]'
        }]
    ]
};
