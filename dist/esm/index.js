import { useCallback, useEffect, useState } from "react";
import { uniqueid, matchPath, normalizePath, generateUniqueHash, bezierEasing } from "./utils";
import queryString from "query-string";
const storage_ids = [];
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
export const useOptimistic = (state, updateFn) => {
    const [optimisticState, setOptimisticState] = useState(state);
    useEffect(() => {
        setOptimisticState(state);
    }, [state]);
    const addOptimistic = (value) => {
        setOptimisticState((currentState) => {
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
export const useId = (idName) => {
    const [id] = useState((() => {
        if (typeof idName === "string") {
            if (storage_ids.includes(idName)) {
                return idName;
            }
            else {
                storage_ids.push(idName);
                return idName;
            }
        }
        let id = uniqueid(16);
        while (storage_ids.includes(id)) {
            id = uniqueid(16);
        }
        return id;
    })());
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
export const useProxy = (target, onChange) => {
    const [targetMoment, setTargetMoment] = useState(target ?? {});
    const bySet = useCallback((target, property, value, receiver) => {
        target[property] = value;
        setTargetMoment((p) => {
            return { ...p, [property]: value };
        });
        if (typeof onChange === "function") {
            onChange(target);
        }
        return true;
    }, [onChange]);
    const state = new Proxy(targetMoment, {
        set: bySet,
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
export const useDebounceCallbackEffect = (callback, delay, dependencies) => {
    const callbackBy = useCallback(() => {
        callback();
    }, [callback]);
    useEffect(() => {
        const handler = setTimeout(callbackBy, delay);
        return () => {
            clearTimeout(handler);
        };
    }, [...dependencies, delay]);
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
export const useDebounce = (value, delay = 1000) => {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        return () => {
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
export const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState({
        width: 0,
        height: 0,
    });
    useEffect(() => {
        let time;
        function handleResize() {
            clearTimeout(time);
            time = setTimeout(() => {
                setWindowSize({
                    width: window.innerWidth,
                    height: window.innerHeight,
                });
            }, 100);
        }
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => {
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
export const useAsync = (asyncFunction, immediate = true) => {
    const [status, setStatus] = useState("idle");
    const [value, setValue] = useState(null);
    const [error, setError] = useState(null);
    const execute = useCallback((...props) => {
        setStatus("pending");
        //setValue(null);
        setError(null);
        return Promise.race([asyncFunction.apply(null, props)])
            .then((response) => {
            setValue(response);
            setStatus("success");
        })
            .catch((error) => {
            setError(error);
            setStatus("error");
        });
    }, [asyncFunction]);
    useEffect(() => {
        if (immediate) {
            execute();
        }
    }, [immediate]);
    return { execute, status, value, error };
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
export const useToggle = (initialState = false) => {
    const [state, setState] = useState(initialState);
    const toggle = useCallback(() => setState((state) => !state), []);
    return [state, toggle];
};
let historyLength = 0, historyCurrentIndex = 0;
const _wr = function (type) {
    const orig = window.history[type];
    if (type === "back" || type === "forward") {
        return function () {
            const rv = orig.apply(window.history, []);
            historyCurrentIndex += type === "back" ? -1 : 1;
            return rv;
        };
    }
    else if (type === "go") {
        return function (delta) {
            const rv = orig.apply(window.history, [delta]);
            historyCurrentIndex += delta;
            const e = new PopStateEvent("popstate", {
                state: { ...window.history.state, hash: generateUniqueHash(8) },
            });
            window.dispatchEvent(e);
            return rv;
        };
    }
    return function (state, title, url) {
        const rv = orig.apply(window.history, [state, title, url]);
        historyLength += type === "pushState" ? 1 : 0;
        historyCurrentIndex += type === "pushState" ? 1 : 0;
        const e = new PopStateEvent("popstate", {
            state: { ...state, hash: generateUniqueHash(8) },
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
export const useRouter = (path = "") => {
    const [pathname, setPathname] = useState(normalizePath(window.location.pathname));
    const [search, setSearch] = useState(window.location.search);
    const [hash, setHash] = useState(window.location.hash);
    const [state, setState] = useState(window.history.state ?? {});
    const [query, setQuery] = useState({});
    const [length, setLength] = useState(historyLength);
    const [currentIndex, setCurrentIndex] = useState(historyCurrentIndex);
    const updateInformatio = () => {
        setPathname(normalizePath(window.location.pathname));
        setSearch(window.location.search);
        setHash(window.location.hash);
        setState(window.history.state ?? {});
        setLength(historyLength);
        setCurrentIndex(historyCurrentIndex);
        setQuery({
            ...queryString.parse(window.location.search),
            ...matchPath(path, window.location.pathname),
            ...(window.history.state ?? {}),
        });
    };
    useEffect(() => {
        const handleRoute = () => {
            updateInformatio();
        };
        window.addEventListener("popstate", handleRoute);
        return () => {
            window.removeEventListener("popstate", handleRoute);
        };
    }, [path]);
    const push = (url, state = {}) => {
        history.pushState(state, "", url);
        updateInformatio();
    };
    const replace = (url, state = {}) => {
        history.replaceState(state, "", url);
        updateInformatio();
    };
    const go = (delta) => {
        history.go(delta);
        updateInformatio();
    };
    const back = () => {
        history.back();
        updateInformatio();
    };
    const forward = () => {
        history.forward();
        updateInformatio();
    };
    return {
        go,
        back,
        forward,
        push,
        replace,
        state,
        hash,
        pathname,
        query,
        search,
        length,
        currentIndex,
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
export const useEventListener = (element, eventName, eventHandler, wantsUntrusted = false) => {
    useEffect(() => {
        if (!(element.current && element.current.addEventListener))
            return;
        const actualName = eventName;
        const eventListener = (event) => {
            if (typeof eventHandler === "function")
                eventHandler(event);
        };
        element.current.addEventListener(actualName, eventListener, wantsUntrusted);
        return () => {
            element.current?.removeEventListener(actualName, eventListener, wantsUntrusted);
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
export const useMediaQuery = (queries, defaultValue) => {
    const mediaQueryLists = Object.keys(queries).map((q) => window.matchMedia(q));
    const getValue = () => {
        const { media = "" } = mediaQueryLists.find((mql) => mql.matches) ?? {};
        return typeof queries[media] !== "undefined" ? queries[media] : defaultValue;
    };
    const [value, setValue] = useState(getValue);
    useEffect(() => {
        const handler = () => setValue(getValue);
        mediaQueryLists.forEach((mql) => (mql.onchange = handler));
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
export const useStateHistory = (initialPresent) => {
    const [state, setState] = useState({
        past: [],
        present: initialPresent,
        future: [],
    });
    const canUndo = state.past.length !== 0;
    const canRedo = state.future.length !== 0;
    const undo = () => {
        const previous = state.past[state.past.length - 1];
        const newPast = state.past.slice(0, state.past.length - 1);
        setState(({ future, past, present }) => {
            return {
                past: newPast,
                present: previous,
                future: [present, ...future],
            };
        });
    };
    const redo = () => {
        if (canRedo) {
            const next = state.future[0];
            const newFuture = state.future.slice(1);
            setState(({ future, past, present }) => {
                return {
                    past: [...past, present],
                    present: next,
                    future: newFuture,
                };
            });
        }
    };
    const set = (newPresent) => {
        if (newPresent === state.present) {
            return;
        }
        setState(({ future, past, present }) => {
            return {
                past: [...past, present],
                present: newPresent,
                future: [],
            };
        });
    };
    const clear = () => {
        setState(({ future, past, present }) => {
            return {
                past: [],
                present: initialPresent,
                future: [],
            };
        });
    };
    // If needed we could also return past and future state
    return { state: state.present, set, undo, redo, clear, canUndo, canRedo };
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
export const useScript = (src) => {
    const [status, setStatus] = useState(src ? "loading" : "idle");
    useEffect(() => {
        if (!src) {
            setStatus("idle");
            return;
        }
        let script = document.querySelector(`script[src="${src}"]`);
        if (!script) {
            script = document.createElement("script");
            script.src = src;
            script.async = true;
            script.setAttribute("data-status", "loading");
            document.body.appendChild(script);
            const setAttributeFromEvent = (event) => {
                script.setAttribute("data-status", event.type === "load" ? "ready" : "error");
            };
            script.addEventListener("load", setAttributeFromEvent);
            script.addEventListener("error", setAttributeFromEvent);
        }
        else {
            setStatus((p) => script?.getAttribute("data-status") ?? p);
        }
        const setStateFromEvent = (event) => {
            setStatus(event.type === "load" ? "ready" : "error");
        };
        script.addEventListener("load", setStateFromEvent);
        script.addEventListener("error", setStateFromEvent);
        return () => {
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
export const useKeyPress = (targetKey, handler) => {
    const downHandler = ({ key }) => {
        if (key === targetKey) {
            handler(true);
        }
    };
    const upHandler = ({ key }) => {
        if (key === targetKey) {
            handler(false);
        }
    };
    useEffect(() => {
        window.addEventListener("keydown", downHandler);
        window.addEventListener("keyup", upHandler);
        return () => {
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
export const useOnScreen = (ref, rootMargin = "0px") => {
    const [isIntersecting, setIntersecting] = useState(false);
    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            setIntersecting(entry.isIntersecting);
        }, { rootMargin });
        if (ref.current) {
            observer.observe(ref.current);
        }
        return () => {
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
export const usePrevious = (value) => {
    const [state, setState] = useState({
        previous: undefined,
        actual: value,
    });
    useEffect(() => {
        setState(({ actual }) => {
            return {
                previous: actual,
                actual: value,
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
export const useOnClickOutside = (ref, handler) => {
    useEffect(() => {
        const listener = (event) => {
            if (!ref.current || ref.current.contains(event.target)) {
                return;
            }
            handler(true);
        };
        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);
        return () => {
            document.removeEventListener("mousedown", listener);
            document.removeEventListener("touchstart", listener);
        };
    }, [ref, handler]);
};
export const useHover = (ref) => {
    const [value, setValue] = useState(false);
    const handleMouseOver = () => setValue(true);
    const handleMouseOut = () => setValue(false);
    useEffect(() => {
        const node = ref.current;
        if (node) {
            node.addEventListener("mouseover", handleMouseOver);
            node.addEventListener("mouseout", handleMouseOut);
            return () => {
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
export const useCounterTimer = (delay = 0, duration = 1000, delayFrame = 0) => {
    const [elapsed, setTime] = useState(0);
    useEffect(() => {
        let interval, current = Date.now(), count = 0;
        setTime(0);
        const timerDelay = setTimeout(() => {
            current = Date.now();
            interval = setInterval(() => {
                if (count >= duration) {
                    clearInterval(interval);
                    return;
                }
                const now = Date.now();
                count += now - current;
                current = now;
                setTime(count);
            }, delayFrame);
        }, delay);
        return () => {
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
export const useBezierEasing = (easing = "linear", delay = 0, duration = 500, delayFrame = 0) => {
    const elastic = (x) => {
        return x * (33 * x * x * x * x - 106 * x * x * x + 126 * x * x - 67 * x + 15);
    };
    const easeInElastic = (x) => {
        const c4 = (2 * Math.PI) / 3;
        return x === 0 ? 0 : x === 1 ? 1 : -Math.pow(2, 10 * x - 10) * Math.sin((x * 10 - 10.75) * c4);
    };
    const easeInOutElastic = (x) => {
        const c5 = (2 * Math.PI) / 4.5;
        return x === 0 ? 0 : x === 1 ? 1 : x < 0.5 ? -(Math.pow(2, 20 * x - 10) * Math.sin((20 * x - 11.125) * c5)) / 2 : (Math.pow(2, -20 * x + 10) * Math.sin((20 * x - 11.125) * c5)) / 2 + 1;
    };
    const easeOutElastic = (x) => {
        const c4 = (2 * Math.PI) / 3;
        return x === 0 ? 0 : x === 1 ? 1 : Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * c4) + 1;
    };
    const easeOutBounce = (x) => {
        const n1 = 7.5625;
        const d1 = 2.75;
        return x < 1 / d1 ? n1 * x * x : x < 2 / d1 ? n1 * (x -= 1.5 / d1) * x + 0.75 : x < 2.5 / d1 ? n1 * (x -= 2.25 / d1) * x + 0.9375 : n1 * (x -= 2.625 / d1) * x + 0.984375;
    };
    const easeInBounce = (x) => {
        return 1 - easeOutBounce(1 - x);
    };
    const easeInOutBounce = (x) => {
        return x < 0.5 ? (1 - easeOutBounce(1 - 2 * x)) / 2 : (1 + easeOutBounce(2 * x - 1)) / 2;
    };
    const easingList = {
        "linear": (n) => n,
        "elastic": elastic,
        "ease": bezierEasing(0.25, 0.1, 0.25, 1.0),
        "ease-in": bezierEasing(0.42, 0.0, 1.0, 1.0),
        "ease-in-elastic": easeInElastic,
        "ease-in-bounce": easeInBounce,
        "ease-in-expo": bezierEasing(0.95, 0.05, 0.795, 0.035),
        "ease-in-sine": bezierEasing(0.47, 0, 0.75, 0.72),
        "ease-in-quad": bezierEasing(0.55, 0.09, 0.68, 0.53),
        "ease-in-cubic": bezierEasing(0.55, 0.06, 0.68, 0.19),
        "ease-in-back": bezierEasing(0.6, -0.28, 0.74, 0.05),
        "ease-in-quart": bezierEasing(0.895, 0.03, 0.685, 0.22),
        "ease-in-quint": bezierEasing(0.755, 0.05, 0.855, 0.06),
        "ease-in-circ": bezierEasing(0.6, 0.04, 0.98, 0.335),
        "ease-in-out": bezierEasing(0.42, 0.0, 0.58, 1.0),
        "ease-in-out-elastic": easeInOutElastic,
        "ease-in-out-bounce": easeInOutBounce,
        "ease-in-out-sine": bezierEasing(0.45, 0.05, 0.55, 0.95),
        "ease-in-out-quad": bezierEasing(0.46, 0.03, 0.52, 0.96),
        "ease-in-out-cubic": bezierEasing(0.65, 0.05, 0.36, 1),
        "ease-in-out-back": bezierEasing(0.68, -0.55, 0.27, 1.55),
        "ease-in-out-quart": bezierEasing(0.77, 0, 0.175, 1),
        "ease-in-out-quint": bezierEasing(0.86, 0, 0.07, 1),
        "ease-in-out-expo": bezierEasing(1, 0, 0, 1),
        "ease-in-out-circ": bezierEasing(0.785, 0.135, 0.15, 0.86),
        "ease-out": bezierEasing(0.0, 0.0, 0.58, 1.0),
        "ease-out-elastic": easeOutElastic,
        "ease-out-bounce": easeOutBounce,
        "ease-out-sine": bezierEasing(0.39, 0.58, 0.57, 1),
        "ease-out-quad": bezierEasing(0.25, 0.46, 0.45, 0.94),
        "ease-out-cubic": bezierEasing(0.22, 0.61, 0.36, 1),
        "ease-out-back": bezierEasing(0.18, 0.89, 0.32, 1.28),
        "ease-out-quart": bezierEasing(0.165, 0.84, 0.44, 1),
        "ease-out-quint": bezierEasing(0.23, 1, 0.32, 1),
        "ease-out-expo": bezierEasing(0.19, 1, 0.22, 1),
        "ease-out-circ": bezierEasing(0.075, 0.82, 0.165, 1),
        "fast-out-slow-in": bezierEasing(0.4, 0, 0.2, 1),
        "fast-out-linear-in": bezierEasing(0.4, 0, 1, 1),
        "linear-out-slow-in": bezierEasing(0, 0, 0.2, 1),
    };
    if (Array.isArray(easing)) {
        if (easing.every((n) => typeof n === "number") && easing.length >= 4) {
            easing = bezierEasing.apply(null, easing);
        }
        else {
            easing = easing.filter((v) => Array.isArray(v) && v.every((n) => typeof n === "number") && v.length >= 2);
            easing = easing.length === 2 ? bezierEasing.apply(null, Array.prototype.concat(easing[0].slice(0, 2), easing[1].slice(0, 2))) : "linear";
        }
    }
    if (typeof easing === "string") {
        easing = (Object.keys(easingList).includes(easing) ? easingList[easing] : easingList["linear"]);
    }
    const elapsed = useCounterTimer(delay, duration, delayFrame);
    const x = Math.min(1, elapsed / duration);
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
export const useLocalStorage = (key, initialValue) => {
    const [storedValue, __setStoredValue] = useState((() => {
        if (typeof window === "undefined") {
            return initialValue;
        }
        try {
            const { value } = JSON.parse(window.localStorage.getItem(key) ?? "{}") ?? {};
            return value ?? initialValue;
        }
        catch (error) {
            return initialValue;
        }
    })());
    const setStoredValue = (value) => {
        try {
            const valueToStore = JSON.stringify({ value: value instanceof Function ? value(storedValue) : value, time: Date.now() });
            const { value: valueNow } = JSON.parse(valueToStore ?? "{}") ?? {};
            __setStoredValue(valueNow);
            if (typeof window !== "undefined") {
                window.localStorage.setItem(key, valueToStore);
            }
        }
        catch (error) {
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
export const useElementRect = (ref) => {
    const [rect, setRect] = useState({ width: 0, height: 0, bottom: 0, top: 0, left: 0, right: 0, x: 0, y: 0 });
    useEffect(() => {
        let time;
        const getSize = () => {
            clearTimeout(time);
            time = setTimeout(() => {
                try {
                    const { toJSON, ...rect } = ref.current?.getBoundingClientRect() ?? {
                        width: 0,
                        height: 0,
                        bottom: 0,
                        top: 0,
                        left: 0,
                        right: 0,
                        x: 0,
                        y: 0,
                    };
                    setRect(rect);
                }
                catch (e) { }
            }, 100);
        };
        window.addEventListener("resize", getSize);
        return () => {
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
export const useFitText = (textRef, containerRef, minFontSize = 5, maxFontSize = Infinity, increment = 0) => {
    const measureTextSize = (text, fontSize = 10) => {
        const phantomElement = document.createElement("div");
        phantomElement.style.position = "absolute";
        phantomElement.style.visibility = "hidden";
        phantomElement.style.whiteSpace = "nowrap";
        phantomElement.style.fontSize = `${fontSize}px`;
        phantomElement.textContent = text;
        document.body.appendChild(phantomElement);
        const width = phantomElement.offsetWidth;
        const height = phantomElement.offsetHeight;
        document.body.removeChild(phantomElement);
        return { width, height };
    };
    useEffect(() => {
        let frameNumber;
        let timeNumber;
        const fitText = () => {
            clearTimeout(timeNumber);
            cancelAnimationFrame(frameNumber);
            if (containerRef.current && textRef.current) {
                const initialFontSize = Math.max(10, minFontSize);
                const { width: initialWidth } = measureTextSize(containerRef.current.innerText, initialFontSize);
                const desiredWidth = containerRef.current.clientWidth;
                const fontIdeal = (initialFontSize / initialWidth) * desiredWidth;
                const incr = 1 + increment;
                const fontSize = Math.max(Math.min(Math.round(fontIdeal * incr), maxFontSize), minFontSize);
                textRef.current.style.fontSize = `${fontSize}px`;
            }
            timeNumber = setTimeout(() => {
                frameNumber = requestAnimationFrame(fitText);
            }, 200);
        };
        fitText();
        window.addEventListener("resize", fitText);
        return () => {
            clearTimeout(timeNumber);
            cancelAnimationFrame(frameNumber);
            window.removeEventListener("resize", fitText);
        };
    }, [minFontSize, maxFontSize, textRef.current, containerRef.current, increment]);
};
//# sourceMappingURL=index.js.map