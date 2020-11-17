export const burryPlugin = {
  install(vue) {
    vue.prototype.$log = function (src) {
      if(!src) return;
      const img = new Image();
      const id = Math.random().toString(36).slice(2);
      window[id] = img;
      img.onload = img.onerror = function() {
        window[id] = null;
      }
      img.src = src;
    };
  }
}