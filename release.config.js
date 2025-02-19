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
                { release: "patch" } // 🔹 Гарантия, что любой коммит поднимает PATCH
            ]
        }],
        ['@semantic-release/release-notes-generator', {
            preset: "conventionalcommits",
            writerOpts: {
                transform: (commit, context) => {
                    // ✅ Если коммит не имеет типа (fix, feat и т.д.), поместим его в "📌 Other Changes"
                    if (!commit.type) {
                        commit.type = "other";
                    }
                    return commit;
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
                    { type: "other", section: "📌 Other Changes", hidden: false } // ✅ Теперь все коммиты без типа будут логироваться
                ]
            }
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
