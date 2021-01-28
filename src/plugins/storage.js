/**
 * StorageManger Plugin For Vue @JalonUniversal
 * support save data by group namespace && exipre remove data
 */

export const storagePlugin = {
	install(vue) {
		class StorageManger {
			constructor(options) {
				this._defaultOptions = Object.assign({
					storage: window.localStorage,
					group: 'OP',
					expire: -1
				}, options);
			}
			getItem(getKey, group) {
				if(!getKey) throw new Error('storage key is undefined');
				const { group: defaultGroup, storage } = this._defaultOptions;
				const key = `${group || defaultGroup}-${getKey}`;
				const loadItem = storage.getItem(key);
				const loadValue = loadItem ? JSON.parse(loadItem) : {};
				if(loadValue && loadValue.expire === -1) return loadValue.value;
				if(loadValue.expire !== -1) {
					const now = Date.now();
					const { timeFlag, expire } = loadValue;
					if(now - timeFlag > expire * 1000) {
						storage.removeItem(key);
						return null;
					}
					return loadValue.value;
				}
				return null
			}
			setItem(setKey, value, exipreTime, group) {
				if(!setKey) throw new Error('storage key is required');
				const { group: defaultGroup, storage, expire: defaultExpire } = this._defaultOptions;
				const key = `${group || defaultGroup}-${setKey}`;
				const expire = exipreTime || defaultExpire;
				const saveItem = {
					value,
					expire,
					timeFlag: Date.now()
				}
				storage.setItem(key, JSON.stringify(saveItem));
			}
		}
		const storage = new StorageManger();
		const storageHandler = function(...args) {
			if([...args].length === 1) {
				return storage.getItem(...args);
			} else {
				storage.setItem(...args);
			}
		};
		storageHandler.setItem = storage.setItem.bind(storage);
		storageHandler.getItem = storage.getItem.bind(storage);
		vue.prototype.$storage = storageHandler;
	}
}
