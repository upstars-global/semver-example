## [1.2.0](https://github.com/upstars-global/semver-example/compare/v1.1.1...v1.2.0) (2025-03-17)

### 🐛 Bug Fixes

* Protected 3 ([#29](https://github.com/upstars-global/semver-example/issues/29))
 ([46f68cb](https://github.com/upstars-global/semver-example/commit/46f68cbdc083ad349437f7d6a07709743e7ae0c0))



    fix: release.yml

### 🧪 Testing

* 2 Improve release workflow and fix config formatting ([#26](https://github.com/upstars-global/semver-example/issues/26))
 ([50e5bf6](https://github.com/upstars-global/semver-example/commit/50e5bf6b7297d78c98f58adb5bc463906fcaedc9))



    Co-authored-by: DT <kabak133@gmail.com>
* add add @octokit/auth-app ([#28](https://github.com/upstars-global/semver-example/issues/28))
 ([5dce4ad](https://github.com/upstars-global/semver-example/commit/5dce4ade041988001f35e86cba92ddacf69ecc93))



    * test: use GitApp

    * test: @octokit/auth-app
* commit to protected-release-branch ([#16](https://github.com/upstars-global/semver-example/issues/16))
 ([c867c9b](https://github.com/upstars-global/semver-example/commit/c867c9b82ef850e75bf26bade9c4bb0e194de7fa))



    test commit to protected-release-branch
* commit to protected-release-branch 2 ([#19](https://github.com/upstars-global/semver-example/issues/19))
 ([b32a901](https://github.com/upstars-global/semver-example/commit/b32a901e008e8b6bb8a43a7896c1d5b7e77627b8))


* Improve release workflow and fix config formatting ([#23](https://github.com/upstars-global/semver-example/issues/23))
 ([0fe7dc3](https://github.com/upstars-global/semver-example/commit/0fe7dc3dc026cd86fdeaec6c0a4a1572a2d25969))



    Added permissions for contents and pull-requests in the workflow. Integrated auto Pull Request creation with semantic-release and improved auto-merge setup. Also fixed inconsistent code formatting in `release.config.js`.

    Co-authored-by: DT <kabak133@gmail.com>
* Improve release workflow and fix config formatting ([#24](https://github.com/upstars-global/semver-example/issues/24))
 ([389aba5](https://github.com/upstars-global/semver-example/commit/389aba56c62017f1a17c996b996cab0d3eee93e7))



    Co-authored-by: DT <kabak133@gmail.com>
* PR to Protected branch ([#21](https://github.com/upstars-global/semver-example/issues/21))
 ([11ad362](https://github.com/upstars-global/semver-example/commit/11ad36274e66ed9a8a925939c8ac3e11f66b908f))



    test: Improve release process with GitHub comments and auto-merge

    Updated the release configuration to include GitHub success and failure comments, disable direct pushes, and add a new "automerge" label. Also integrated auto-approve and auto-merge workflows to streamline PR merging after a successful release.

    Co-authored-by: DT <kabak133@gmail.com>
* Protected t1 ([#18](https://github.com/upstars-global/semver-example/issues/18))
 ([98d1180](https://github.com/upstars-global/semver-example/commit/98d1180758b396c2c58fad0555f697bce5593815))

, closes [#16](https://github.com/upstars-global/semver-example/issues/)

    * test commit to protected-release-branch

    * test: Add 'protected-release-branch' to release branches

    * Add 'protected-release-branch' to release branches

    Updated the release configuration to include 'protected-release-branch' alongside 'main'. This enables semantic-release to manage releases on the additional branch.

    * test commit to protected-release-branch
* Protected t2 ([#20](https://github.com/upstars-global/semver-example/issues/20))
 ([5a281e5](https://github.com/upstars-global/semver-example/commit/5a281e5f66d29979f4d6bbf5c0d407c4c357e342))



    * test: commit to protected-release-branch 2

    * test: Update GITHUB_TOKEN to use GH_PAT in release workflow

    Replaced the default GITHUB_TOKEN with GH_PAT for semantic-release. This ensures compatibility with custom token permissions and enhances workflow flexibility. No other changes were made to the release process.
* Update release workflow permissions and token usage ([#22](https://github.com/upstars-global/semver-example/issues/22))
 ([20151d5](https://github.com/upstars-global/semver-example/commit/20151d543bd13200f6a60805565e205789a5e8b2))



    Added write permissions for contents and pull-requests to the workflow. Changed Node.js version to "22" for flexibility and updated GITHUB_TOKEN to use GH_PAT for improved clarity and consistency in multiple steps.

    Co-authored-by: DT <kabak133@gmail.com>
* use GitHubApp
 ([210be82](https://github.com/upstars-global/semver-example/commit/210be82382b811e3f5e6d8412110646ca76d57a0))



    try to use GitHubApp token

## [1.1.1](https://github.com/upstars-global/semver-example/compare/v1.1.0...v1.1.1) (2025-02-21)

### 🐛 Bug Fixes

* - test deleted changelog
 ([016f7a8](https://github.com/upstars-global/semver-example/commit/016f7a89f50fab6e39e3481f9ed1de9b08f7111f))

## [1.1.0](https://github.com/upstars-global/semver-example/compare/v1.0.0...v1.1.0) (2025-02-21)

### 🔨 Refactoring

* - test changelog
    ([dfe2197](https://github.com/upstars-global/semver-example/commit/dfe21973506e0a4fee483228257f9e7085306c35))

## 1.0.0 (2025-02-21)

### ⚠ BREAKING CHANGES

* add semVer config

### 🚀 Features

* add semVer config
  ([a9e438f](https://github.com/upstars-global/semver-example/commit/a9e438fa33471c330fc4bb23e819af876026281d))



    **BREAKING CHANGE**: add semVer config
