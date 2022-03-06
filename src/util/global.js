

const ip = 'localhost'
// const port = '8889'
const port = '7001'
const axiosUrl = `http://${ip}:${port}/`

const GITHUB_URL="https://github.com"
const dataGitHub="dataGitHub"
const code = {
    codeSuccess: 200,
    codeError: 500,
};
const Global={
    axiosUrl,
    GITHUB_URL,
    dataGitHub,
    code
}
// export Global



export default Global
