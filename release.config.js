module.exports = {
    branches: ["main"], //релизные ветки
    plugins: [
        "@semantic-release/commit-analyzer", // Определяет, какой тип коммита сделан (major, minor, patch)
        "@semantic-release/release-notes-generator", // Генерирует release notes
        "@semantic-release/changelog", // Обновляет CHANGELOG.md
        "@semantic-release/npm", // Обновляет package.json
        ["@semantic-release/git", {
            "assets": ["package.json", "CHANGELOG.md"],
            "message": "chore(release): ${nextRelease.version} [skip ci]"
        }]
    ]
};
