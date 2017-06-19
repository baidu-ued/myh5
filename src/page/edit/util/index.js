import store from '../store/index.js'
export const hasSelected = function(){
	if(store.getters.currentItemId == -1){
		return false;
	}else{
		return true;
	}
}

/*
	是否选中， 是否单选， 是否多选
*/

//是否单选
export const oneSelected = function(index){
	if(store.getters.currentItemId == -1){
		return false;
	}else{
		return true;
	}
}
//是否多选

export const multSelected = function(index){
	if(store.state.m_phone.multSelect.length == 0){
		return false;
	}else{
		return true;
	}
}
