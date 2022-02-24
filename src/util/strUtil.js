// export default {
//   methods: {
//     // Types are not supported by current JavaScript version
//     // js 参数  类型
//     // urlAdd(url:String,addStr:String){
//     urlAdd(url,addStr){
//       // if(url.endwith)
//       if (!url.endsWith("/")) {
//         url+="/"
//       }
//       url+=addStr
//       return url
//     }
//   }
// }

const strUtil = {
  // GITHUB_URL:"https://github.com",
  // Types are not supported by current JavaScript version
  // js 参数  类型
  // urlAdd(url:String,addStr:String){
  // localhost:8080/ +  user/save
  // 后面加的开头都不要有 斜杠
  urlAdd(url,addStr){
    // if(url.endwith)
    if (!url.endsWith("/")) {
      url+="/"
    }
    if(addStr.startsWith("/")){
      addStr=addStr.substring(1,addStr.length)
    }

    url+=addStr
    return url
  }
}

export default  strUtil
