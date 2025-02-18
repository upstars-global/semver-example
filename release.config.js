module.exports = {
    branches: [ 'main' ], //релизные ветки
    preset: 'conventionalcommits',
    plugins: [
        [ '@semantic-release/commit-analyzer', { // Определяет, какой тип коммита сделан (major, minor, patch)
            releaseRules: [
                { type: 'fix', release: 'patch' },
                { type: 'minor', release: 'minor' },
                { breaking: true, release: 'major' },
                { release: 'patch' } // По умолчанию всегда patch
            ]
        } ],
        '@semantic-release/release-notes-generator', // Генерирует release notes
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
