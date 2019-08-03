export const state=()=>{
    return{
        userInfo:{
            token:'',
            user:''
        }
    }
}

// 储存数据到store的
export const mutations={
    setUserInfo(state,data){
     state.userInfo=data
    },

    //清除存在store的数据
    clearUserInfo(state){
        state.userInfo={}
    }
}