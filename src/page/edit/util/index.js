import store from '../store/index.js'
export const hasSelected = function(){
	if(store.getters.currentItemId == -1){
		return false;
	}else{
		return true;
	}
}
