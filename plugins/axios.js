import {Message} from 'element-ui'
// axios拦截器处理错误
export default({$axios})=>{
    // console.log($axios);
    // onError是$axios自带的属性
    $axios.onError(err=>{
        // 用es6新语法结构出来
    const {statusCode,message}=err.response.data
    // console.log(message);
    
    if(statusCode===400){
        Message.warning(message)
    }
    })

}
// import {Message} from "element-ui";

// export default function({$axios, redirect}){
//     $axios.onError(err => {
//         const {statusCode, message} = err.response.data;
        
//         // 还未使用
//         // if(statusCode === 401 || statusCode === 403){
//         //     Message.warning({message: "请先登录"});
//         //     redirect("/user/login");
//         // }

//         if(statusCode === 400){
//             Message.warning({message});
//         }
//     })
// }