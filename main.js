//参考:https://juejin.cn/post/7201332537338462264

const { Octokit } = require("@octokit/core")
const sodium = require("libsodium-wrappers")

const GP_TOKEN = process.env.GP_TOKEN
const OWNER = process.env.GITHUB_REPOSITORY.split('/')[0]
const REPO = process.env.GITHUB_REPOSITORY.split('/')[1]

const DEFAULT_HEADERS = {
    'X-GitHub-Api-Version': '2022-11-28'
}


// https://github.com/octokit/core.js#readme
const octokit = new Octokit({
    // auth = GitHub token，参考 https://github.com/settings/tokens ，其中至少要有 repo 或 public_repo 权限才能修改 Actions Secrets
    auth: GP_TOKEN,
    request: {
        timeout: 10 * 1000, // 记得设置超时，否则会无限等待
    }
})


/**
 * 获取 存储库 公共密钥
 文档：https://docs.github.com/en/rest/actions/secrets?apiVersion=2022-11-28#get-a-repository-public-key
 */
async function getARepositoryPublicKey(owner, repo) {
    return (await octokit.request('GET /repos/{owner}/{repo}/actions/secrets/public-key', {
        owner: owner,
        repo: repo,
        headers: DEFAULT_HEADERS
    })).data
}

/**
 * 创建或更新 Repository Secret
 文档：https://docs.github.com/en/rest/actions/secrets?apiVersion=2022-11-28#create-or-update-a-repository-secret
 */
 async function createOrUpdateARepositorySecret(data) {

    
    const { secret_value, owner, repo, ...other } = data

    // Convert Secret & Base64 key to Uint8Array.
    const { key, key_id } = await getARepositoryPublicKey(owner, repo) // 获取公钥

    const binkey = sodium.from_base64(key, sodium.base64_variants.ORIGINAL)
    const binsec = sodium.from_string(secret_value)

    // Encrypt the secret using LibSodium
    const encBytes = sodium.crypto_box_seal(binsec, binkey)

    // Convert encrypted Uint8Array to Base64
    const encrypted_value = sodium.to_base64(encBytes, sodium.base64_variants.ORIGINAL) // 根据公钥计算加密后的值

    const newData = {
        ...other,
        owner,
        repo,
        encrypted_value,
        key_id,
        headers: DEFAULT_HEADERS
    }

    return (await octokit.request('PUT /repos/{owner}/{repo}/actions/secrets/{secret_name}', newData))
}

!(async () => {
    console.log('GP_TOKEN ' + GP_TOKEN);
    console.log('OWNER' + OWNER);
    console.log('REPO' + REPO);

    try {
        let res = await createOrUpdateARepositorySecret({
            owner: OWNER, // GitHub 用户名
            repo: REPO, // 仓库的名称
            secret_name: 'SECRET_NAME_TEST', // 要更改的 secret
            secret_value: 'SECRET_NAME_TEST_VALUE1', // 这里是 secret 的原始值
        })
        console.log('更新 REFRESH_TOKENS 成功 res = ' + res.status)
    } catch (e) {
        console.error('更新 REFRESH_TOKENS 失败' + e)
    }

})()
