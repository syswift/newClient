import { supabase } from '../api';

export const getDataFromLeave = async () =>{
  let all2 = {};
  fetch('https://qyapi.weixin.qq.com/cgi-bin/oa/gettemplatedetail?access_token=z2MHnIsMC3ZxXUa6RhpW9hD7WfIBgJtthU7jf0wMSE7kYUypv8TnpSgyukgIDiFV1AFn5vH1p2GaiRah9SFXCMVZ24YrIORULRY0ePUi0uCvj27IGoi_1THs5P7_YrYDQlYjSDFwOjs0dFx1tSkQ',{
    method:'post',
    headers:{
      'Accept':'application/json,text/plain,*/*',/* 格式限制：json、文本、其他格式 */
      'Content-Type':'application/x-www-form-urlencoded',/* 请求内容类型 */
      // 指定允许其他域名访问  
      'Access-Control-Allow-Origin':'*',
      // 响应类型 
      'Access-Control-Allow-Methods':'POST',
      // 响应头设置 
      'Access-Control-Allow-Headers':'x-requested-with,content-type'
    },
    // body:`username=${this.state.username}&pwd=${this.state.pwd}`
    // body:`template_id=Bs5Gu5zh82JGb7gzbPHna5YA1rr2Xjk7bAud4TJ7v`
    body:{'template_id':'Bs5Gu5zh82JGb7gzbPHna5YA1rr2Xjk7bAud4TJ7v'}
  }).then((response)=>response.json()).then((data)=>{
    all2=data
    console.log(data)
  }).catch(function(error){
    console.log(error)
  })
  return(all2);
}
