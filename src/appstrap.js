(function() {

  const rootElement = document.getElementById('root');
  const appDispatch$ = new Rx.Subject();

  const timer$ = Rx.Observable
    .interval(1000)
    .map(x => prev => ({ ...prev, timer: prev.timer + x }));

  // timer$.subscribe({
  //   next: c => appDispatch$
  //     .next(prev => ({ ...prev, timer: prev.timer + c }))
  // });

  const reducers$ = appDispatch$.asObservable()
    // .map(rd => timer$.take(1).map(rd)).switch();

  // const state$ = Rx.Observable.merge(reducers$, timer$).startWith({ timer: 0 });
  const state$ = reducers$
    .map(rd => state$.take(1).map(rd))
    .switch().startWith({ timer: 0 });

  const appInstance = getAppInstance({
    store$: state$,
    dispatch$: appDispatch$
  });

  //////////

  document.addEventListener(
    'WebComponentsReady',
    getAppInjector(rootElement, appInstance)
  );

  //////////

  function getAppElement(appTag) {
    return document.createElement(appTag); // REVIEW: side-effect from the DOM
  }
  function getAppInjector(targetEle, appElement) {
    return function appInjector() {
      // eslint-disable-next-line
      targetEle.innerHTML = ''; // REVIEW: side-effect on the DOM
      setTimeout(function () { // ensure async
        targetEle.appendChild(appElement); // REVIEW: side-effect on the DOM
      }, 0);
    }
  }
  function setManyProps(comp, props) {
    return Object.keys(props).reduce(((comp, key) => {
      comp.set(key, props[key]);
      return comp;
    }), comp);
  }
  function getAppInstance(config = {}) {
    return setManyProps(getAppElement('polypink-app'), config);
  }
}());
