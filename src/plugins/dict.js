export const dictPlugin = {
  install(vue){
    const getDict = async (dataType) => {
			const res = await vue.prototype.$fetch(`/mobile/dict/getWebDictData?dataType=${dataType}`)
      if(res && res.data){
        return res.data[0].value
      }
    }

    vue.prototype.$getDict = getDict
  }
}
