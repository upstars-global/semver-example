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
                { breaking: true, release: "major" },
                { release: "patch" } // По умолчанию всегда patch
            ]
        }],
        ['@semantic-release/release-notes-generator', {
            preset: "conventionalcommits",
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
                    { type: "*", section: "📌 Other Changes", hidden: false }
                ]
            },
            includeCommits: "all" // 🔹 Теперь записываем все коммиты, даже без Conventional Commits
        }],
        '@semantic-release/changelog', // Обновляет CHANGELOG.md
        ['@semantic-release/exec', {
            prepareCmd: 'node -e "let pkg=require(\'./package.json\'); pkg.version=\'${nextRelease.version}\'; require(\'fs\').writeFileSync(\'package.json\', JSON.stringify(pkg, null, 2));"'
        }],
        ['@semantic-release/git', {
            assets: ['package.json', 'CHANGELOG.md'], // Фиксируем все изменения в Git
            message: 'chore(release): ${nextRelease.version} [skip ci]'
        }]
    ]
};
