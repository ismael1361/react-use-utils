"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useWindowSize = exports.useToggle = exports.useStateHistory = exports.useScript = exports.useRouter = exports.useProxy = exports.usePrevious = exports.useOptimistic = exports.useOnScreen = exports.useOnClickOutside = exports.useMediaQuery = exports.useLocalStorage = exports.useKeyPress = exports.useId = exports.useHover = exports.useFitText = exports.useEventListener = exports.useElementRect = exports.useDebounceCallbackEffect = exports.useDebounce = exports.useCounterTimer = exports.useBezierEasing = exports.useAsync = void 0;
var _react = require("react");
var _utils = require("./utils");
var _queryString = _interopRequireDefault(require("query-string"));
var _excluded = ["toJSON"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var storage_ids = [];
/**
 * @description Hook que permite atualizar a IU de maneira otimista.
 * @template T Tipo do estado
 * @template V Tipo do valor otimista
 * @param {T} state Estado atual
 * @param {(currentState: T, optimisticValue: V) => T} updateFn Função de atualização
 * @returns {[T, function]} Estado otimista e função de adição otimista
 * @example
 * const App = () => {
 *  const [messages, setMessages] = useState([]);
 *
 *  const [optimisticMessages, addOptimisticMessage] = useOptimistic(
 *      messages,
 *      (currentState, optimisticValue) => {
 *          return [...currentState, {...optimisticValue, sending: true}];
 *      }
 *  );
 *
 *  const handleClick = () => {
 *      const id = uniqueid(16);
 *      addOptimisticMessage({id, text: "Nova mensagem"});
 *      fetch("https://api.example.com/messages", {
 *          method: "POST",
 *          body: JSON.stringify({id, text: "Nova mensagem"}),
 *          headers: {
 *              "Content-Type": "application/json",
 *          },
 *      });
 *  };
 *
 *  return (
 *      <div>
 *          <ul>
 *              {optimisticMessages.map((message) => (
 *                  <li key={message.id}>{message.text}</li>
 *              ))}
 *          </ul>
 *          <button onClick={handleClick}>Adicionar mensagem</button>
 *      </div>
 *  );
 * };
 */
var useOptimistic = exports.useOptimistic = function useOptimistic(state, updateFn) {
  var _useState = (0, _react.useState)(state),
    _useState2 = _slicedToArray(_useState, 2),
    optimisticState = _useState2[0],
    setOptimisticState = _useState2[1];
  (0, _react.useEffect)(function () {
    setOptimisticState(state);
  }, [state]);
  var addOptimistic = function addOptimistic(value) {
    setOptimisticState(function (currentState) {
      return updateFn(currentState, value);
    });
  };
  return [optimisticState, addOptimistic];
};
/**
 * @description Gancho para gerar um ID exclusivo
 * @param {string} [idName] Nome do ID (opcional)
 * @returns {string} ID exclusivo
 * @example
 * const App = () => {
 *  const id = useId();
 *  return <div>{id}</div>;
 * };
 */
var useId = exports.useId = function useId(idName) {
  var _useState3 = (0, _react.useState)(function () {
      if (typeof idName === "string") {
        if (storage_ids.includes(idName)) {
          return idName;
        } else {
          storage_ids.push(idName);
          return idName;
        }
      }
      var id = (0, _utils.uniqueid)(16);
      while (storage_ids.includes(id)) {
        id = (0, _utils.uniqueid)(16);
      }
      return id;
    }()),
    _useState4 = _slicedToArray(_useState3, 1),
    id = _useState4[0];
  return id;
};
/**
 * @description Observa as alterações em um objeto e executa uma função de retorno quando ocorre uma mudança.
 * @template T Tipo do objeto a ser observado
 * @param {T} target Objeto a ser observado
 * @param {(target: T) => void} [onChange] Função a ser chamada quando houver mudanças
 * @returns {T} Objeto observado
 * @example
 * const App = () => {
 *  const obj = useProxy({name: "John Doe"}, (target) => {
 *      console.log(target);
 *  });
 *  return (
 *      <button onClick={() => obj.name = "Jane Doe"}>Change name</button>
 *  );
 * };
 */
var useProxy = exports.useProxy = function useProxy(target, onChange) {
  var _useState5 = (0, _react.useState)(target !== null && target !== void 0 ? target : {}),
    _useState6 = _slicedToArray(_useState5, 2),
    targetMoment = _useState6[0],
    setTargetMoment = _useState6[1];
  var bySet = (0, _react.useCallback)(function (target, property, value, receiver) {
    target[property] = value;
    setTargetMoment(function (p) {
      return _objectSpread(_objectSpread({}, p), {}, _defineProperty({}, property, value));
    });
    if (typeof onChange === "function") {
      onChange(target);
    }
    return true;
  }, [onChange]);
  var state = new Proxy(targetMoment, {
    set: bySet
  });
  return state;
};
/**
 * @description Hook que executa um callback após um determinado tempo de espera (delay), mas só executa uma vez, mesmo que as dependências mudem antes do fim do delay.
 * @param {function} callback - A função a ser executada após o delay.
 * @param {number} delay - O tempo de espera em milissegundos antes de executar o callback.
 * @param {Array} dependencies - Um array de dependências que, se modificadas, fazem com que a execução do callback seja reiniciada.
 * @returns {void}
 * @example
 * const App = () => {
 *  const [count, setCount] = useState(0);
 *  const handleClick = () => {
 *      setCount(count + 1);
 *  };
 *  useDebounceCallbackEffect(() => {
 *      console.log("Count:", count);
 *  }, 1000, [count]);
 *  return (
 *      <button onClick={handleClick}>Click me</button>
 *  );
 * };
 */
var useDebounceCallbackEffect = exports.useDebounceCallbackEffect = function useDebounceCallbackEffect(callback, delay, dependencies) {
  var callbackBy = (0, _react.useCallback)(function () {
    callback();
  }, [callback]);
  (0, _react.useEffect)(function () {
    var handler = setTimeout(callbackBy, delay);
    return function () {
      clearTimeout(handler);
    };
  }, [].concat(_toConsumableArray(dependencies), [delay]));
};
/**
 * @description Hook para aplicar um atraso a um valor antes de atualizá-lo.
 * @template T Tipo do valor
 * @param {T} value Valor a ser atrasado
 * @param {number} [delay] Atraso em milissegundos
 * @returns {T} Valor atrasado
 * @example
 * const App = () => {
 *  const [value, setValue] = useState("");
 *  const delayedValue = useDebounce(value, 1000);
 *  return (
 *      <div>
 *          <input
 *              value={value}
 *              onChange={(e) => setValue(e.target.value)}
 *          />
 *          <p>Valor atrasado: {delayedValue}</p>
 *      </div>
 *  );
 * };
 */
var useDebounce = exports.useDebounce = function useDebounce(value) {
  var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1000;
  var _useState7 = (0, _react.useState)(value),
    _useState8 = _slicedToArray(_useState7, 2),
    debouncedValue = _useState8[0],
    setDebouncedValue = _useState8[1];
  (0, _react.useEffect)(function () {
    var handler = setTimeout(function () {
      setDebouncedValue(value);
    }, delay);
    return function () {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
};
/**
 * @description Hook que rastreia a largura e altura da janela do navegador.
 * @returns {{width: number, height: number}} Largura e altura da janela do navegador
 * @example
 * const App = () => {
 *  const {width, height} = useWindowSize();
 *  return (
 *      <div>
 *          <p>Width: {width}</p>
 *          <p>Height: {height}</p>
 *      </div>
 *  );
 * };
 */
var useWindowSize = exports.useWindowSize = function useWindowSize() {
  var _useState9 = (0, _react.useState)({
      width: 0,
      height: 0
    }),
    _useState10 = _slicedToArray(_useState9, 2),
    windowSize = _useState10[0],
    setWindowSize = _useState10[1];
  (0, _react.useEffect)(function () {
    var time;
    function handleResize() {
      clearTimeout(time);
      time = setTimeout(function () {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight
        });
      }, 100);
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return function () {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return windowSize;
};
/**
 * @descriptionHook Hook que executa uma função assíncrona e retorna o status da execução, o valor retornado e o erro, caso ocorra.
 * @template T Tipo do valor retornado pela função assíncrona
 * @param {function} asyncFunction Função assíncrona a ser executada
 * @param {boolean} [immediate] Se a função deve ser executada imediatamente
 * @returns {{execute: function, status: "idle" | "pending" | "success" | "error", value: T | null, error: any | null}}
 * @example
 * const fetchData = async () => {
 *   const response = await fetch('https://api.example.com/data');
 *   const data = await response.json();
 *   return data;
 * };
 *
 * const { execute, status, value, error } = useAsync(fetchData, false);
 *
 * useEffect(() => {
 *   execute();
 * }, []);
 *
 * if (status === 'idle') {
 *   return <div>Pronto para começar.</div>;
 * }
 *
 * if (status === 'pending') {
 *   return <div>Carregando...</div>;
 * }
 *
 * if (status === 'error') {
 *   return <div>Erro: {error.message}</div>;
 * }
 *
 * if (status === 'success') {
 *   return <div>Dados: {value}</div>;
 * }
 */
var useAsync = exports.useAsync = function useAsync(asyncFunction) {
  var immediate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var _useState11 = (0, _react.useState)("idle"),
    _useState12 = _slicedToArray(_useState11, 2),
    status = _useState12[0],
    setStatus = _useState12[1];
  var _useState13 = (0, _react.useState)(null),
    _useState14 = _slicedToArray(_useState13, 2),
    value = _useState14[0],
    setValue = _useState14[1];
  var _useState15 = (0, _react.useState)(null),
    _useState16 = _slicedToArray(_useState15, 2),
    error = _useState16[0],
    setError = _useState16[1];
  var execute = (0, _react.useCallback)(function () {
    setStatus("pending");
    //setValue(null);
    setError(null);
    for (var _len = arguments.length, props = new Array(_len), _key = 0; _key < _len; _key++) {
      props[_key] = arguments[_key];
    }
    return Promise.race([asyncFunction.apply(null, props)]).then(function (response) {
      setValue(response);
      setStatus("success");
    }).catch(function (error) {
      setError(error);
      setStatus("error");
    });
  }, [asyncFunction]);
  (0, _react.useEffect)(function () {
    if (immediate) {
      execute();
    }
  }, [immediate]);
  return {
    execute: execute,
    status: status,
    value: value,
    error: error
  };
};
/**
 * @description Um hook para lidar com o estado de alternância.
 * @param {boolean} [initialState] Estado inicial
 * @returns {[boolean, function]} Estado e função de alternância
 * @example
 * const [isOpen, toggleIsOpen] = useToggle(false);
 * console.log(isOpen); // Valor atual do estado (inicialmente false)
 * toggleIsOpen(); // Alternar o estado (de false para true)
 * console.log(isOpen); // Novo valor do estado (true)
 */
var useToggle = exports.useToggle = function useToggle() {
  var initialState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  var _useState17 = (0, _react.useState)(initialState),
    _useState18 = _slicedToArray(_useState17, 2),
    state = _useState18[0],
    setState = _useState18[1];
  var toggle = (0, _react.useCallback)(function () {
    return setState(function (state) {
      return !state;
    });
  }, []);
  return [state, toggle];
};
var historyLength = 0,
  historyCurrentIndex = 0;
var _wr = function _wr(type) {
  var orig = window.history[type];
  if (type === "back" || type === "forward") {
    return function () {
      var rv = orig.apply(window.history, []);
      historyCurrentIndex += type === "back" ? -1 : 1;
      return rv;
    };
  } else if (type === "go") {
    return function (delta) {
      var rv = orig.apply(window.history, [delta]);
      historyCurrentIndex += delta;
      var e = new PopStateEvent("popstate", {
        state: _objectSpread(_objectSpread({}, window.history.state), {}, {
          hash: (0, _utils.generateUniqueHash)(8)
        })
      });
      window.dispatchEvent(e);
      return rv;
    };
  }
  return function (state, title, url) {
    var rv = orig.apply(window.history, [state, title, url]);
    historyLength += type === "pushState" ? 1 : 0;
    historyCurrentIndex += type === "pushState" ? 1 : 0;
    var e = new PopStateEvent("popstate", {
      state: _objectSpread(_objectSpread({}, state), {}, {
        hash: (0, _utils.generateUniqueHash)(8)
      })
    });
    window.dispatchEvent(e);
    return rv;
  };
};
history.pushState = _wr("pushState");
history.replaceState = _wr("replaceState");
history.back = _wr("back");
history.forward = _wr("forward");
history.go = _wr("go");
/**
 * @description Hook para manipular a rota do navegador.
 * @param {string | string[] | RegExp | RegExp[]} [path] Caminho da rota
 * @returns {{go: function, back: function, forward: function, push: function, replace: function, state: any, hash: string, pathname: string, query: any, search: string, length: number, currentIndex: number}}
 * @example
 * const App = () => {
 *  const {pathname, query, search, push, replace, go, back, forward} = useRouter();
 *  return (
 *      <div>
 *          <p>Pathname: {pathname}</p>
 *          <p>Search: {search}</p>
 *          <p>Query: {JSON.stringify(query)}</p>
 *          <button onClick={() => push("/about")}>Go to About</button>
 *          <button onClick={() => replace("/contact")}>Go to Contact</button>
 *          <button onClick={() => go(-1)}>Back</button>
 *          <button onClick={() => forward()}>Forward</button>
 *      </div>
 *  );
 * };
 */
var useRouter = exports.useRouter = function useRouter() {
  var _window$history$state;
  var path = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
  var _useState19 = (0, _react.useState)((0, _utils.normalizePath)(window.location.pathname)),
    _useState20 = _slicedToArray(_useState19, 2),
    pathname = _useState20[0],
    setPathname = _useState20[1];
  var _useState21 = (0, _react.useState)(window.location.search),
    _useState22 = _slicedToArray(_useState21, 2),
    search = _useState22[0],
    setSearch = _useState22[1];
  var _useState23 = (0, _react.useState)(window.location.hash),
    _useState24 = _slicedToArray(_useState23, 2),
    hash = _useState24[0],
    setHash = _useState24[1];
  var _useState25 = (0, _react.useState)((_window$history$state = window.history.state) !== null && _window$history$state !== void 0 ? _window$history$state : {}),
    _useState26 = _slicedToArray(_useState25, 2),
    state = _useState26[0],
    setState = _useState26[1];
  var _useState27 = (0, _react.useState)({}),
    _useState28 = _slicedToArray(_useState27, 2),
    query = _useState28[0],
    setQuery = _useState28[1];
  var _useState29 = (0, _react.useState)(historyLength),
    _useState30 = _slicedToArray(_useState29, 2),
    length = _useState30[0],
    setLength = _useState30[1];
  var _useState31 = (0, _react.useState)(historyCurrentIndex),
    _useState32 = _slicedToArray(_useState31, 2),
    currentIndex = _useState32[0],
    setCurrentIndex = _useState32[1];
  var updateInformatio = function updateInformatio() {
    var _window$history$state2, _window$history$state3;
    setPathname((0, _utils.normalizePath)(window.location.pathname));
    setSearch(window.location.search);
    setHash(window.location.hash);
    setState((_window$history$state2 = window.history.state) !== null && _window$history$state2 !== void 0 ? _window$history$state2 : {});
    setLength(historyLength);
    setCurrentIndex(historyCurrentIndex);
    setQuery(_objectSpread(_objectSpread(_objectSpread({}, _queryString.default.parse(window.location.search)), (0, _utils.matchPath)(path, window.location.pathname)), (_window$history$state3 = window.history.state) !== null && _window$history$state3 !== void 0 ? _window$history$state3 : {}));
  };
  (0, _react.useEffect)(function () {
    var handleRoute = function handleRoute() {
      updateInformatio();
    };
    window.addEventListener("popstate", handleRoute);
    return function () {
      window.removeEventListener("popstate", handleRoute);
    };
  }, [path]);
  var push = function push(url) {
    var state = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    history.pushState(state, "", url);
    updateInformatio();
  };
  var replace = function replace(url) {
    var state = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    history.replaceState(state, "", url);
    updateInformatio();
  };
  var go = function go(delta) {
    history.go(delta);
    updateInformatio();
  };
  var back = function back() {
    history.back();
    updateInformatio();
  };
  var forward = function forward() {
    history.forward();
    updateInformatio();
  };
  return {
    go: go,
    back: back,
    forward: forward,
    push: push,
    replace: replace,
    state: state,
    hash: hash,
    pathname: pathname,
    query: query,
    search: search,
    length: length,
    currentIndex: currentIndex
  };
};
/**
 * @description Hook para adicionar um evento a um elemento.
 * @template E Tipo do elemento
 * @template K Tipo do evento
 * @param {React.RefObject<E | null>} element Elemento a ser adicionado o evento
 * @param {K} eventName Nome do evento
 * @param {(event: GlobalEventHandlersEventMap[K]) => void} eventHandler Função de retorno do evento
 * @param {boolean} [wantsUntrusted] Se deseja eventos não confiáveis
 * @returns {void}
 * @example
 * const App = () => {
 *  const elementRef = useRef<HTMLButtonElement>(null);
 *  useEventListener(elementRef, "click", () => {
 *      console.log("Button clicked");
 *  });
 *  return <button ref={elementRef}>Click me</button>;
 * };
 */
var useEventListener = exports.useEventListener = function useEventListener(element, eventName, eventHandler) {
  var wantsUntrusted = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  (0, _react.useEffect)(function () {
    if (!(element.current && element.current.addEventListener)) return;
    var actualName = eventName;
    var eventListener = function eventListener(event) {
      if (typeof eventHandler === "function") eventHandler(event);
    };
    element.current.addEventListener(actualName, eventListener, wantsUntrusted);
    return function () {
      var _element$current;
      (_element$current = element.current) === null || _element$current === void 0 ? void 0 : _element$current.removeEventListener(actualName, eventListener, wantsUntrusted);
    };
  }, [eventName, element.current, eventHandler, wantsUntrusted]);
};
/**
 * @description Retorna o valor associado à primeira consulta de mídia que corresponder às condições do navegador.
 * @template T Tipo do valor retornado
 * @param {{[query: string]: T}} queries Objeto com as consultas de mídia
 * @param {T} defaultValue Valor padrão
 * @returns {T} Valor associado à consulta de mídia
 * @example
 * const App = () => {
 *  const value = useMediaQuery(
 *      {
 *          "(min-width: 1000px)": "desktop",
 *          "(min-width: 600px)": "tablet",
 *          "(max-width: 599px)": "mobile",
 *      },
 *      "mobile"
 *  );
 *  return <div>Device: {value}</div>;
 * };
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries
 */
var useMediaQuery = exports.useMediaQuery = function useMediaQuery(queries, defaultValue) {
  var mediaQueryLists = Object.keys(queries).map(function (q) {
    return window.matchMedia(q);
  });
  var getValue = function getValue() {
    var _mediaQueryLists$find;
    var _ref = (_mediaQueryLists$find = mediaQueryLists.find(function (mql) {
        return mql.matches;
      })) !== null && _mediaQueryLists$find !== void 0 ? _mediaQueryLists$find : {},
      _ref$media = _ref.media,
      media = _ref$media === void 0 ? "" : _ref$media;
    return typeof queries[media] !== "undefined" ? queries[media] : defaultValue;
  };
  var _useState33 = (0, _react.useState)(getValue),
    _useState34 = _slicedToArray(_useState33, 2),
    value = _useState34[0],
    setValue = _useState34[1];
  (0, _react.useEffect)(function () {
    var handler = function handler() {
      return setValue(getValue);
    };
    mediaQueryLists.forEach(function (mql) {
      return mql.onchange = handler;
    });
  }, []);
  return value;
};
/**
 * @description Hook para gerenciar o histórico de estados.
 * @template T Tipo do estado
 * @param {T} initialPresent Estado inicial
 * @returns {{state: T, set: function, undo: function, redo: function, clear: function, canUndo: boolean, canRedo: boolean}}
 * @example
 * const App = () => {
 *  const {state, set, undo, redo, clear, canUndo, canRedo} = useStateHistory("initial");
 *  return (
 *      <div>
 *          <p>State: {state}</p>
 *          <button onClick={() => set("new state")}>Set new state</button>
 *          <button onClick={undo} disabled={!canUndo}>Undo</button>
 *          <button onClick={redo} disabled={!canRedo}>Redo</button>
 *          <button onClick={clear}>Clear</button>
 *      </div>
 *  );
 * };
 */
var useStateHistory = exports.useStateHistory = function useStateHistory(initialPresent) {
  var _useState35 = (0, _react.useState)({
      past: [],
      present: initialPresent,
      future: []
    }),
    _useState36 = _slicedToArray(_useState35, 2),
    state = _useState36[0],
    setState = _useState36[1];
  var canUndo = state.past.length !== 0;
  var canRedo = state.future.length !== 0;
  var undo = function undo() {
    var previous = state.past[state.past.length - 1];
    var newPast = state.past.slice(0, state.past.length - 1);
    setState(function (_ref2) {
      var future = _ref2.future,
        past = _ref2.past,
        present = _ref2.present;
      return {
        past: newPast,
        present: previous,
        future: [present].concat(_toConsumableArray(future))
      };
    });
  };
  var redo = function redo() {
    if (canRedo) {
      var next = state.future[0];
      var newFuture = state.future.slice(1);
      setState(function (_ref3) {
        var future = _ref3.future,
          past = _ref3.past,
          present = _ref3.present;
        return {
          past: [].concat(_toConsumableArray(past), [present]),
          present: next,
          future: newFuture
        };
      });
    }
  };
  var set = function set(newPresent) {
    if (newPresent === state.present) {
      return;
    }
    setState(function (_ref4) {
      var future = _ref4.future,
        past = _ref4.past,
        present = _ref4.present;
      return {
        past: [].concat(_toConsumableArray(past), [present]),
        present: newPresent,
        future: []
      };
    });
  };
  var clear = function clear() {
    setState(function (_ref5) {
      var future = _ref5.future,
        past = _ref5.past,
        present = _ref5.present;
      return {
        past: [],
        present: initialPresent,
        future: []
      };
    });
  };
  // If needed we could also return past and future state
  return {
    state: state.present,
    set: set,
    undo: undo,
    redo: redo,
    clear: clear,
    canUndo: canUndo,
    canRedo: canRedo
  };
};
/**
 * @description Hook para carregar um script externo.
 * @param {string} src URL do script
 * @returns {"idle" | "loading" | "ready" | "error"} Status do script
 * @example
 * const App = () => {
 *  const status = useScript("https://code.jquery.com/jquery-3.6.0.min.js");
 *  return (
 *      <div>
 *          {status === "ready" ? "Script carregado" : "Carregando script..."}
 *      </div>
 *  );
 * };
 */
var useScript = exports.useScript = function useScript(src) {
  var _useState37 = (0, _react.useState)(src ? "loading" : "idle"),
    _useState38 = _slicedToArray(_useState37, 2),
    status = _useState38[0],
    setStatus = _useState38[1];
  (0, _react.useEffect)(function () {
    if (!src) {
      setStatus("idle");
      return;
    }
    var script = document.querySelector("script[src=\"".concat(src, "\"]"));
    if (!script) {
      script = document.createElement("script");
      script.src = src;
      script.async = true;
      script.setAttribute("data-status", "loading");
      document.body.appendChild(script);
      var setAttributeFromEvent = function setAttributeFromEvent(event) {
        script.setAttribute("data-status", event.type === "load" ? "ready" : "error");
      };
      script.addEventListener("load", setAttributeFromEvent);
      script.addEventListener("error", setAttributeFromEvent);
    } else {
      setStatus(function (p) {
        var _script$getAttribute, _script;
        return (_script$getAttribute = (_script = script) === null || _script === void 0 ? void 0 : _script.getAttribute("data-status")) !== null && _script$getAttribute !== void 0 ? _script$getAttribute : p;
      });
    }
    var setStateFromEvent = function setStateFromEvent(event) {
      setStatus(event.type === "load" ? "ready" : "error");
    };
    script.addEventListener("load", setStateFromEvent);
    script.addEventListener("error", setStateFromEvent);
    return function () {
      if (script) {
        script.removeEventListener("load", setStateFromEvent);
        script.removeEventListener("error", setStateFromEvent);
      }
    };
  }, [src]);
  return status;
};
/**
 * @description Hook para detectar quando uma tecla específica é pressionada.
 * @param {KeyboardEvent["key"]} targetKey Tecla a ser pressionada
 * @param {(pressed: boolean) => void} handler Função de retorno
 * @returns {void}
 * @example
 * const App = () => {
 *  const [pressed, setPressed] = useState(false);
 *  useKeyPress("Enter", setPressed);
 *  return <div>{pressed ? "Enter pressionado" : "Enter não pressionado"}</div>;
 * };
 */
var useKeyPress = exports.useKeyPress = function useKeyPress(targetKey, handler) {
  var downHandler = function downHandler(_ref6) {
    var key = _ref6.key;
    if (key === targetKey) {
      handler(true);
    }
  };
  var upHandler = function upHandler(_ref7) {
    var key = _ref7.key;
    if (key === targetKey) {
      handler(false);
    }
  };
  (0, _react.useEffect)(function () {
    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);
    return function () {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
  }, []);
};
/**
 * @description Hook que verifica se um elemento está visível na tela.
 * @template T Tipo do elemento
 * @param {React.MutableRefObject<T>} ref Referência do elemento
 * @param {string} [rootMargin] Margem do elemento
 * @returns {boolean} Se o elemento está visível
 * @example
 * const App = () => {
 *  const ref = useRef<HTMLDivElement>(null);
 *  const isVisible = useOnScreen(ref);
 *  return <div ref={ref}>{isVisible ? "Visible" : "Not visible"}</div>;
 * };
 */
var useOnScreen = exports.useOnScreen = function useOnScreen(ref) {
  var rootMargin = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "0px";
  var _useState39 = (0, _react.useState)(false),
    _useState40 = _slicedToArray(_useState39, 2),
    isIntersecting = _useState40[0],
    setIntersecting = _useState40[1];
  (0, _react.useEffect)(function () {
    var observer = new IntersectionObserver(function (_ref8) {
      var _ref9 = _slicedToArray(_ref8, 1),
        entry = _ref9[0];
      setIntersecting(entry.isIntersecting);
    }, {
      rootMargin: rootMargin
    });
    if (ref.current) {
      observer.observe(ref.current);
    }
    return function () {
      observer.unobserve(ref.current);
    };
  }, []);
  return isIntersecting;
};
/**
 * @description Hook para obter o valor anterior de uma variável de estado.
 * @template T Tipo do valor
 * @param {T} value Valor
 * @returns {T | undefined} Valor anterior
 * @example
 * const App = () => {
 *  const [count, setCount] = useState(0);
 *  const previousCount = usePrevious(count);
 *  return (
 *      <div>
 *          <p>Count: {count}</p>
 *          <p>Previous count: {previousCount}</p>
 *          <button onClick={() => setCount(count + 1)}>Increment</button>
 *      </div>
 *  );
 * };
 */
var usePrevious = exports.usePrevious = function usePrevious(value) {
  var _useState41 = (0, _react.useState)({
      previous: undefined,
      actual: value
    }),
    _useState42 = _slicedToArray(_useState41, 2),
    state = _useState42[0],
    setState = _useState42[1];
  (0, _react.useEffect)(function () {
    setState(function (_ref10) {
      var actual = _ref10.actual;
      return {
        previous: actual,
        actual: value
      };
    });
  }, [value]);
  return state.previous;
};
/**
 * @description Hook para detectar se o usuário clicou fora de um elemento.
 * @template T Tipo do elemento
 * @param {React.MutableRefObject<T>} ref Referência do elemento
 * @param {(clickedOutside: boolean) => void} handler Função de retorno
 * @returns {void}
 * @example
 * const App = () => {
 *  const ref = useRef<HTMLDivElement>(null);
 *  const [clickedOutside, setClickedOutside] = useState(false);
 *  useOnClickOutside(ref, setClickedOutside);
 *  return <div ref={ref}>{clickedOutside ? "Clicked outside" : "Clicked inside"}</div>;
 * };
 */
var useOnClickOutside = exports.useOnClickOutside = function useOnClickOutside(ref, handler) {
  (0, _react.useEffect)(function () {
    var listener = function listener(event) {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(true);
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return function () {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
};
var useHover = exports.useHover = function useHover(ref) {
  var _useState43 = (0, _react.useState)(false),
    _useState44 = _slicedToArray(_useState43, 2),
    value = _useState44[0],
    setValue = _useState44[1];
  var handleMouseOver = function handleMouseOver() {
    return setValue(true);
  };
  var handleMouseOut = function handleMouseOut() {
    return setValue(false);
  };
  (0, _react.useEffect)(function () {
    var node = ref.current;
    if (node) {
      node.addEventListener("mouseover", handleMouseOver);
      node.addEventListener("mouseout", handleMouseOut);
      return function () {
        node.removeEventListener("mouseover", handleMouseOver);
        node.removeEventListener("mouseout", handleMouseOut);
      };
    }
  }, [ref.current]);
  return [ref, value];
};
/**
 * @description Hook que fornece um temporizador de contagem que atualiza o tempo decorrido.
 * @param {number} [delay] Atraso da contagem em milissegundos
 * @param {number} [duration] Tempo de duração em milissegundos
 * @param {number} [delayFrame] Atraso do frame em milissegundos
 * @returns {number} Tempo decorrido
 * @example
 * const App = () => {
 *  const elapsed = useCounterTimer(1000, 0);
 *  return <div>Tempo decorrido: {elapsed}</div>;
 * };
 */
var useCounterTimer = exports.useCounterTimer = function useCounterTimer() {
  var delay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1000;
  var delayFrame = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var _useState45 = (0, _react.useState)(0),
    _useState46 = _slicedToArray(_useState45, 2),
    elapsed = _useState46[0],
    setTime = _useState46[1];
  (0, _react.useEffect)(function () {
    var interval,
      current = Date.now(),
      count = 0;
    setTime(0);
    var timerDelay = setTimeout(function () {
      current = Date.now();
      interval = setInterval(function () {
        if (count >= duration) {
          clearInterval(interval);
          return;
        }
        var now = Date.now();
        count += now - current;
        current = now;
        setTime(count);
      }, delayFrame);
    }, delay);
    return function () {
      clearTimeout(timerDelay);
      clearInterval(interval);
    };
  }, [delay, duration, delayFrame]);
  return elapsed;
};
/**
 * @description Hook que fornece uma função de interpolação baseada em tempo.
 * @param {[number, number, number, number] | [[number, number], [number, number]] | "linear" | "elastic" | "ease" | "ease-in" | "ease-in-elastic" | "ease-in-bounce" | "ease-in-expo" | "ease-in-sine" | "ease-in-quad" | "ease-in-cubic" | "ease-in-back" | "ease-in-quart" | "ease-in-quint" | "ease-in-circ" | "ease-in-out" | "ease-in-out-elastic" | "ease-in-out-bounce" | "ease-in-out-sine" | "ease-in-out-quad" | "ease-in-out-cubic" | "ease-in-out-back" | "ease-in-out-quart" | "ease-in-out-quint" | "ease-in-out-expo" | "ease-in-out-circ" | "ease-out" | "ease-out-elastic" | "ease-out-bounce" | "ease-out-sine" | "ease-out-quad" | "ease-out-cubic" | "ease-out-back" | "ease-out-quart" | "ease-out-quint" | "ease-out-expo" | "ease-out-circ" | "fast-out-slow-in" | "fast-out-linear-in" | "linear-out-slow-in"} easing Curva de interpolação
 * @param {number} delay Atraso da interpolação em milissegundos
 * @param {number} duration Duração da interpolação em milissegundos
 * @param {number} delayFrame Atraso do frame em milissegundos
 * @returns {number} Valor interpolado (0-1)
 * @example
 * const App = () => {
 *  const value = useBezierEasing(1000, 0, 0);
 *  return <div>Valor interpolado: {value}</div>;
 * };
 */
var useBezierEasing = exports.useBezierEasing = function useBezierEasing() {
  var easing = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "linear";
  var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var duration = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 500;
  var delayFrame = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
  var elastic = function elastic(x) {
    return x * (33 * x * x * x * x - 106 * x * x * x + 126 * x * x - 67 * x + 15);
  };
  var easeInElastic = function easeInElastic(x) {
    var c4 = 2 * Math.PI / 3;
    return x === 0 ? 0 : x === 1 ? 1 : -Math.pow(2, 10 * x - 10) * Math.sin((x * 10 - 10.75) * c4);
  };
  var easeInOutElastic = function easeInOutElastic(x) {
    var c5 = 2 * Math.PI / 4.5;
    return x === 0 ? 0 : x === 1 ? 1 : x < 0.5 ? -(Math.pow(2, 20 * x - 10) * Math.sin((20 * x - 11.125) * c5)) / 2 : Math.pow(2, -20 * x + 10) * Math.sin((20 * x - 11.125) * c5) / 2 + 1;
  };
  var easeOutElastic = function easeOutElastic(x) {
    var c4 = 2 * Math.PI / 3;
    return x === 0 ? 0 : x === 1 ? 1 : Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * c4) + 1;
  };
  var easeOutBounce = function easeOutBounce(x) {
    var n1 = 7.5625;
    var d1 = 2.75;
    return x < 1 / d1 ? n1 * x * x : x < 2 / d1 ? n1 * (x -= 1.5 / d1) * x + 0.75 : x < 2.5 / d1 ? n1 * (x -= 2.25 / d1) * x + 0.9375 : n1 * (x -= 2.625 / d1) * x + 0.984375;
  };
  var easeInBounce = function easeInBounce(x) {
    return 1 - easeOutBounce(1 - x);
  };
  var easeInOutBounce = function easeInOutBounce(x) {
    return x < 0.5 ? (1 - easeOutBounce(1 - 2 * x)) / 2 : (1 + easeOutBounce(2 * x - 1)) / 2;
  };
  var easingList = {
    "linear": function linear(n) {
      return n;
    },
    "elastic": elastic,
    "ease": (0, _utils.bezierEasing)(0.25, 0.1, 0.25, 1.0),
    "ease-in": (0, _utils.bezierEasing)(0.42, 0.0, 1.0, 1.0),
    "ease-in-elastic": easeInElastic,
    "ease-in-bounce": easeInBounce,
    "ease-in-expo": (0, _utils.bezierEasing)(0.95, 0.05, 0.795, 0.035),
    "ease-in-sine": (0, _utils.bezierEasing)(0.47, 0, 0.75, 0.72),
    "ease-in-quad": (0, _utils.bezierEasing)(0.55, 0.09, 0.68, 0.53),
    "ease-in-cubic": (0, _utils.bezierEasing)(0.55, 0.06, 0.68, 0.19),
    "ease-in-back": (0, _utils.bezierEasing)(0.6, -0.28, 0.74, 0.05),
    "ease-in-quart": (0, _utils.bezierEasing)(0.895, 0.03, 0.685, 0.22),
    "ease-in-quint": (0, _utils.bezierEasing)(0.755, 0.05, 0.855, 0.06),
    "ease-in-circ": (0, _utils.bezierEasing)(0.6, 0.04, 0.98, 0.335),
    "ease-in-out": (0, _utils.bezierEasing)(0.42, 0.0, 0.58, 1.0),
    "ease-in-out-elastic": easeInOutElastic,
    "ease-in-out-bounce": easeInOutBounce,
    "ease-in-out-sine": (0, _utils.bezierEasing)(0.45, 0.05, 0.55, 0.95),
    "ease-in-out-quad": (0, _utils.bezierEasing)(0.46, 0.03, 0.52, 0.96),
    "ease-in-out-cubic": (0, _utils.bezierEasing)(0.65, 0.05, 0.36, 1),
    "ease-in-out-back": (0, _utils.bezierEasing)(0.68, -0.55, 0.27, 1.55),
    "ease-in-out-quart": (0, _utils.bezierEasing)(0.77, 0, 0.175, 1),
    "ease-in-out-quint": (0, _utils.bezierEasing)(0.86, 0, 0.07, 1),
    "ease-in-out-expo": (0, _utils.bezierEasing)(1, 0, 0, 1),
    "ease-in-out-circ": (0, _utils.bezierEasing)(0.785, 0.135, 0.15, 0.86),
    "ease-out": (0, _utils.bezierEasing)(0.0, 0.0, 0.58, 1.0),
    "ease-out-elastic": easeOutElastic,
    "ease-out-bounce": easeOutBounce,
    "ease-out-sine": (0, _utils.bezierEasing)(0.39, 0.58, 0.57, 1),
    "ease-out-quad": (0, _utils.bezierEasing)(0.25, 0.46, 0.45, 0.94),
    "ease-out-cubic": (0, _utils.bezierEasing)(0.22, 0.61, 0.36, 1),
    "ease-out-back": (0, _utils.bezierEasing)(0.18, 0.89, 0.32, 1.28),
    "ease-out-quart": (0, _utils.bezierEasing)(0.165, 0.84, 0.44, 1),
    "ease-out-quint": (0, _utils.bezierEasing)(0.23, 1, 0.32, 1),
    "ease-out-expo": (0, _utils.bezierEasing)(0.19, 1, 0.22, 1),
    "ease-out-circ": (0, _utils.bezierEasing)(0.075, 0.82, 0.165, 1),
    "fast-out-slow-in": (0, _utils.bezierEasing)(0.4, 0, 0.2, 1),
    "fast-out-linear-in": (0, _utils.bezierEasing)(0.4, 0, 1, 1),
    "linear-out-slow-in": (0, _utils.bezierEasing)(0, 0, 0.2, 1)
  };
  if (Array.isArray(easing)) {
    if (easing.every(function (n) {
      return typeof n === "number";
    }) && easing.length >= 4) {
      easing = _utils.bezierEasing.apply(null, easing);
    } else {
      easing = easing.filter(function (v) {
        return Array.isArray(v) && v.every(function (n) {
          return typeof n === "number";
        }) && v.length >= 2;
      });
      easing = easing.length === 2 ? _utils.bezierEasing.apply(null, Array.prototype.concat(easing[0].slice(0, 2), easing[1].slice(0, 2))) : "linear";
    }
  }
  if (typeof easing === "string") {
    easing = Object.keys(easingList).includes(easing) ? easingList[easing] : easingList["linear"];
  }
  var elapsed = useCounterTimer(delay, duration, delayFrame);
  var x = Math.min(1, elapsed / duration);
  return typeof easing === "function" ? easing(x) : x;
};
/**
 * @description Hook que permite armazenar e recuperar valores no armazenamento local do navegador.
 * @template T Tipo do valor
 * @param {string} key Chave do armazenamento local
 * @param {T} initialValue Valor inicial
 * @returns {[T, function]} Valor e função de armazenamento
 * @example
 * const App = () => {
 *  const [name, setName] = useLocalStorage("name", "John Doe");
 *  return (
 *      <div>
 *          <input
 *              type="text"
 *              placeholder="Enter your name"
 *              value={name}
 *              onChange={(e) => setName(e.target.value)}
 *          />
 *      </div>
 *  );
 * };
 */
var useLocalStorage = exports.useLocalStorage = function useLocalStorage(key, initialValue) {
  var _useState47 = (0, _react.useState)(function () {
      if (typeof window === "undefined") {
        return initialValue;
      }
      try {
        var _JSON$parse, _window$localStorage$;
        var _ref11 = (_JSON$parse = JSON.parse((_window$localStorage$ = window.localStorage.getItem(key)) !== null && _window$localStorage$ !== void 0 ? _window$localStorage$ : "{}")) !== null && _JSON$parse !== void 0 ? _JSON$parse : {},
          value = _ref11.value;
        return value !== null && value !== void 0 ? value : initialValue;
      } catch (error) {
        return initialValue;
      }
    }()),
    _useState48 = _slicedToArray(_useState47, 2),
    storedValue = _useState48[0],
    __setStoredValue = _useState48[1];
  var setStoredValue = function setStoredValue(value) {
    try {
      var _JSON$parse2;
      var valueToStore = JSON.stringify({
        value: value instanceof Function ? value(storedValue) : value,
        time: Date.now()
      });
      var _ref12 = (_JSON$parse2 = JSON.parse(valueToStore !== null && valueToStore !== void 0 ? valueToStore : "{}")) !== null && _JSON$parse2 !== void 0 ? _JSON$parse2 : {},
        valueNow = _ref12.value;
      __setStoredValue(valueNow);
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, valueToStore);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return [storedValue, setStoredValue];
};
/**
 * @description Hook que observa a lagura do elemento e seu posicionamento na tela.
 * @template T Tipo do elemento
 * @param {React.MutableRefObject<T | null>} ref Referência do elemento
 * @returns {{width: number, height: number, bottom: number, top: number, left: number, right: number, x: number, y: number}} Informações do elemento
 * @example
 * const App = () => {
 *  const ref = useRef<HTMLDivElement>(null);
 *  const {width, height, bottom, top, left, right, x, y} = useElementRect(ref);
 *  return (
 *      <div ref={ref}>
 *          <p>Width: {width}</p>
 *          <p>Height: {height}</p>
 *          <p>Bottom: {bottom}</p>
 *          <p>Top: {top}</p>
 *          <p>Left: {left}</p>
 *          <p>Right: {right}</p>
 *          <p>X: {x}</p>
 *          <p>Y: {y}</p>
 *      </div>
 *  );
 * };
 */
var useElementRect = exports.useElementRect = function useElementRect(ref) {
  var _useState49 = (0, _react.useState)({
      width: 0,
      height: 0,
      bottom: 0,
      top: 0,
      left: 0,
      right: 0,
      x: 0,
      y: 0
    }),
    _useState50 = _slicedToArray(_useState49, 2),
    rect = _useState50[0],
    setRect = _useState50[1];
  (0, _react.useEffect)(function () {
    var time;
    var getSize = function getSize() {
      clearTimeout(time);
      time = setTimeout(function () {
        try {
          var _ref$current$getBound, _ref$current;
          var _ref13 = (_ref$current$getBound = (_ref$current = ref.current) === null || _ref$current === void 0 ? void 0 : _ref$current.getBoundingClientRect()) !== null && _ref$current$getBound !== void 0 ? _ref$current$getBound : {
              width: 0,
              height: 0,
              bottom: 0,
              top: 0,
              left: 0,
              right: 0,
              x: 0,
              y: 0
            },
            toJSON = _ref13.toJSON,
            _rect = _objectWithoutProperties(_ref13, _excluded);
          setRect(_rect);
        } catch (e) {}
      }, 100);
    };
    window.addEventListener("resize", getSize);
    return function () {
      window.removeEventListener("resize", getSize);
    };
  }, [ref.current]);
  return rect;
};
/**
 * @description Hook que ajusta o tamanho de um texto para o contêiner pai com tamanhos de fonte mínimos e máximos especificados.
 * @template T Tipo do elemento de texto
 * @template I Tipo do contêiner
 * @param {React.MutableRefObject<T | null>} textRef Referência do elemento de texto
 * @param {React.MutableRefObject<I | null>} containerRef Referência do contêiner
 * @param {number} [minFontSize] Tamanho mínimo da fonte
 * @param {number} [maxFontSize] Tamanho máximo da fonte
 * @param {number} [increment] Incremento do tamanho da fonte
 * @returns {void}
 * @example
 * const App = () => {
 *  const textRef = useRef<HTMLDivElement>(null);
 *  const containerRef = useRef<HTMLDivElement>(null);
 *  useFitText(textRef, containerRef, 5, 50, 0);
 *  return (
 *      <div ref={containerRef}>
 *          <p ref={textRef}>Texto ajustado</p>
 *      </div>
 *  );
 * };
 */
var useFitText = exports.useFitText = function useFitText(textRef, containerRef) {
  var minFontSize = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 5;
  var maxFontSize = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : Infinity;
  var increment = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
  var measureTextSize = function measureTextSize(text) {
    var fontSize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;
    var phantomElement = document.createElement("div");
    phantomElement.style.position = "absolute";
    phantomElement.style.visibility = "hidden";
    phantomElement.style.whiteSpace = "nowrap";
    phantomElement.style.fontSize = "".concat(fontSize, "px");
    phantomElement.textContent = text;
    document.body.appendChild(phantomElement);
    var width = phantomElement.offsetWidth;
    var height = phantomElement.offsetHeight;
    document.body.removeChild(phantomElement);
    return {
      width: width,
      height: height
    };
  };
  (0, _react.useEffect)(function () {
    var frameNumber;
    var timeNumber;
    var fitText = function fitText() {
      clearTimeout(timeNumber);
      cancelAnimationFrame(frameNumber);
      if (containerRef.current && textRef.current) {
        var initialFontSize = Math.max(10, minFontSize);
        var _measureTextSize = measureTextSize(containerRef.current.innerText, initialFontSize),
          initialWidth = _measureTextSize.width;
        var desiredWidth = containerRef.current.clientWidth;
        var fontIdeal = initialFontSize / initialWidth * desiredWidth;
        var incr = 1 + increment;
        var fontSize = Math.max(Math.min(Math.round(fontIdeal * incr), maxFontSize), minFontSize);
        textRef.current.style.fontSize = "".concat(fontSize, "px");
      }
      timeNumber = setTimeout(function () {
        frameNumber = requestAnimationFrame(fitText);
      }, 200);
    };
    fitText();
    window.addEventListener("resize", fitText);
    return function () {
      clearTimeout(timeNumber);
      cancelAnimationFrame(frameNumber);
      window.removeEventListener("resize", fitText);
    };
  }, [minFontSize, maxFontSize, textRef.current, containerRef.current, increment]);
};