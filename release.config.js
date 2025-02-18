module.exports = {
    branches: ["main"], //релизные ветки
    plugins: [
        "@semantic-release/commit-analyzer", // Определяет, какой тип коммита сделан (major, minor, patch)
        "@semantic-release/release-notes-generator", // Генерирует release notes
        "@semantic-release/changelog", // Обновляет CHANGELOG.md
        ["@semantic-release/git", {
            "assets": ["package.json", "CHANGELOG.md"],
            "message": "chore(release): ${nextRelease.version} [skip ci]"
        }],
        ["@semantic-release/exec", {
            "prepareCmd": "node -e \"let pkg=require('./package.json'); pkg.version='${nextRelease.version}'; require('fs').writeFileSync('package.json', JSON.stringify(pkg, null, 2));\""
        }]
    ]
};
