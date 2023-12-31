function hasScripts(src: string, doc = document) {
  let bool = false;
  const scripts = doc.getElementsByTagName('script');
  for (let i = 0; i < scripts.length; i++) {
    if (scripts[i].src === src) {
      bool = true;
    }
  }
  return bool;
}
window['_fz_pkg_state_'] = window['_fz_pkg_state_'] || {};
window['_fz_pkg_plist_'] = window['_fz_pkg_plist_'] || {};

const state: any = window['_fz_pkg_state_'];
const p: any = window['_fz_pkg_plist_'];

export function loadPkg(src: string, varName: string) {
  if (!state[src]) {
    state[src] = {};
  }
  if (!p[src]) {
    p[src] = new Promise((resolve) => (state[src].resolve = resolve));
  }
  return new Promise((resolve) => {
    if (window[varName]) {
      return resolve(window[varName]);
    }
    if (hasScripts(src)) {
      return p[src].then((v) => {
        resolve(v);
      });
    }

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = src;
    script.onload = function () {
      state[src].resolve(window[varName as any]);
      resolve(window[varName as any]);
    };
    document.head.appendChild(script);
  });
}

const hasStylesheet = (href: string, container?: HTMLElement) => {
  const links = (container || document).getElementsByTagName('link');
  return !!Array.from(links).find((link) => link.href === href);
};

export function loadStylesheet(src: string, container?: any) {
  return new Promise((resolve, reject) => {
    if (hasStylesheet(src)) {
      resolve('');
      return;
    }
    const stylesheet = document.createElement('link');
    stylesheet.rel = 'stylesheet';
    stylesheet.type = 'text/css';
    stylesheet.href = src;
    stylesheet.onload = function () {
      resolve('');
    };
    stylesheet.onerror = function (e) {
      reject(e);
    };
    (container || document.head).appendChild(stylesheet);
  });
}
