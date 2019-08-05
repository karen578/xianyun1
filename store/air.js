export const state=()=>{
    return{
        history:[]
    }
}
//设置保存vuex数据,是一个方法，不需要return
export const mutations={
    setHistory(state,arr){
        state.history=arr
    }
   
}