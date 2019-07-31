// 保持数据的属性 state
// export const state={
//     userInfo:{
//      token:'',
//      user:{
//      }
//  }
// }
export const state=()=>{
    return {
        userInfo:{
            token:"",
            user:{}
        }
    }
}
//同步修改数据mutations
export const mutations={
    // 函数，里面有两个参数，第一个参数是 state就是上面的state，这个参数是固定的
    //第二个参数data是使用该方法时传入的数据
    setUserInfo(state,data){
        //把获取到的数据存储到上面的state中
      state.userInfo=data

    },
    clearUserInfo(state){
      state.userInfo={}
    }
}