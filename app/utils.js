export const parseURL = () => {
  const href = window.location.href;
  let owner = href.match(/#.*\?/) && href.match(/#.*\?/)[0];
  owner = owner ? owner.slice(1, -1) : owner;
  let params = href.match(/\?.*/) && href.match(/\?.*/)[0];
  params = params ? params.slice(1).split('&') : [];
  
  const paramsObj = {};
  const filtersParams = {};
  const stateParams = {};
  const stateParamsMap = {
    sort: 'sortBy',
    order: 'sortOrder',
    page: 'numberOfPages'
  }

  params.forEach((param) => {
    if(~param.indexOf('=')) {
      const [key, value] = param.split('=');
      paramsObj[key] = value;
    } else {
      paramsObj[param] = true;
    }
  });

  for(const key in paramsObj) {
    if (key in stateParamsMap) {
      const value = paramsObj[key];
      const newKey = stateParamsMap[key];
      stateParams[newKey] = value;
    } else {
      filtersParams[key] = paramsObj[key];
    }
  }
  const newState = Object.assign({}, {owner}, stateParams, {filtersParams});
  return newState;
}
