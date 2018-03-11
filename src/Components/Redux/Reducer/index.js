const reducer=(state='home',action)=>{
	let {type,payload}=action;
	switch(type){
		case "CHANGE_TITAL":
		return payload
		default :
		return state
	}
}
const reducer2=(state='搜索商品，发现更多优选',action)=>{
	let {type,payload}=action;
		switch(type){
			case "CHANGE_SEARCH":
			return payload
			default :
			return state
		}
}
const reducer3=(state='',action)=>{
	let {type,payload}=action;
	switch(type){
		case "CHANGE_VALUE":
		return payload
		default :
		return state
	}
}
export {reducer,reducer2,reducer3}