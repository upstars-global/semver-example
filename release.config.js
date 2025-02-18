module.exports = {
    branches: [ 'main' ], //релизные ветки
    preset: "conventionalcommits",
    plugins: [
        [ '@semantic-release/commit-analyzer', { // Определяет, какой тип коммита сделан (major, minor, patch)
            "preset": "angular",
            releaseRules: [
                { type: "fix", release: "patch" },
                { type: "perf", release: "patch" },
                { type: "minor", release: "minor" },
                { type: "feat", release: "minor" },
                { type: "refactor", release: "minor" },
                { type: "style", release: "minor" },
                { type: "docs", release: "minor" },
                { type: "test", release: "minor" },
                { type: "chore", release: "minor" },
                { breaking: true, release: "major" },
                { type: 'BREAKING_CHANGES', release: 'major' },
                { release: "patch" } // По умолчанию всегда patch

            ]
        } ],
        ["@semantic-release/release-notes-generator", {  // Генерирует release notes
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
                    { type: "test", section: "🧪 Testing", hidden: false }
                ]
            }
        }],
        '@semantic-release/changelog', // Обновляет CHANGELOG.md
        [ '@semantic-release/exec', {
            'prepareCmd': 'node -e "let pkg=require(\'./package.json\'); pkg.version=\'${nextRelease.version}\'; require(\'fs\').writeFileSync(\'package.json\', JSON.stringify(pkg, null, 2));"'
        } ],
        [ '@semantic-release/git', {
            'assets': [ 'package.json', 'yarn.lock', 'CHANGELOG.md' ], // Добавляем package.json и yarn.lock
            'message': 'chore(release): ${nextRelease.version} [skip ci]'
        } ],
    ]
}
