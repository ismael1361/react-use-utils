import React from "react";
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
export declare const useId: (idName?: string) => string;
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
export declare const useProxy: <T extends object>(target: T, onChange?: (target: T) => void) => T;
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
export declare const useDebounceCallbackEffect: (callback: () => void, delay: number, dependencies: any[]) => void;
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
export declare const useDebounce: <T = any>(value: T, delay?: number) => T;
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
export declare const useWindowSize: () => {
    width: number;
    height: number;
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
export declare const useAsync: <T = any>(asyncFunction: (...props: any[]) => Promise<T>, immediate?: boolean) => {
    execute: (...props: any[]) => Promise<void>;
    status: "error" | "idle" | "pending" | "success";
    value: T | null;
    error: any;
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
export declare const useToggle: (initialState?: boolean) => (boolean | (() => void))[];
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
export declare const useRouter: (path?: string | string[] | RegExp | RegExp[]) => {
    go: (delta: number) => void;
    back: () => void;
    forward: () => void;
    push: (url: string, state?: any) => void;
    replace: (url: string, state?: any) => void;
    state: any;
    hash: string;
    pathname: string;
    query: any;
    search: string;
    length: number;
    currentIndex: number;
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
export declare const useEventListener: <E extends HTMLElement, K extends keyof GlobalEventHandlersEventMap>(element: React.RefObject<E | null>, eventName: K, eventHandler: (event: GlobalEventHandlersEventMap[K]) => void, wantsUntrusted?: boolean) => void;
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
export declare const useMediaQuery: <T = any>(queries: {
    [query: string]: T;
}, defaultValue: T) => T;
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
export declare const useStateHistory: <T = any>(initialPresent: T) => {
    state: T;
    set: (newPresent: T) => void;
    undo: () => void;
    redo: () => void;
    clear: () => void;
    canUndo: boolean;
    canRedo: boolean;
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
export declare const useScript: (src: string) => "error" | "idle" | "loading" | "ready";
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
export declare const useKeyPress: (targetKey: KeyboardEvent["key"], handler: (pressed: boolean) => void) => void;
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
export declare const useOnScreen: <T extends HTMLElement>(ref: React.MutableRefObject<T>, rootMargin?: string) => boolean;
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
export declare const usePrevious: <T = any>(value: T) => T | undefined;
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
export declare const useOnClickOutside: <T extends HTMLElement>(ref: React.MutableRefObject<T>, handler: (clickedOutside: boolean) => void) => void;
export declare const useHover: <T extends HTMLElement>(ref: React.MutableRefObject<T>) => [React.MutableRefObject<T | null>, boolean];
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
export declare const useCounterTimer: (delay?: number, duration?: number, delayFrame?: number) => number;
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
export declare const useBezierEasing: (easing?: [
    number,
    number,
    number,
    number
] | [
    [
        number,
        number
    ],
    [
        number,
        number
    ]
] | "linear" | "elastic" | "ease" | "ease-in" | "ease-in-elastic" | "ease-in-bounce" | "ease-in-expo" | "ease-in-sine" | "ease-in-quad" | "ease-in-cubic" | "ease-in-back" | "ease-in-quart" | "ease-in-quint" | "ease-in-circ" | "ease-in-out" | "ease-in-out-elastic" | "ease-in-out-bounce" | "ease-in-out-sine" | "ease-in-out-quad" | "ease-in-out-cubic" | "ease-in-out-back" | "ease-in-out-quart" | "ease-in-out-quint" | "ease-in-out-expo" | "ease-in-out-circ" | "ease-out" | "ease-out-elastic" | "ease-out-bounce" | "ease-out-sine" | "ease-out-quad" | "ease-out-cubic" | "ease-out-back" | "ease-out-quart" | "ease-out-quint" | "ease-out-expo" | "ease-out-circ" | "fast-out-slow-in" | "fast-out-linear-in" | "linear-out-slow-in", delay?: number, duration?: number, delayFrame?: number) => any;
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
export declare const useLocalStorage: <T = any>(key: string, initialValue: T) => (T | ((value: T | ((velua: T) => T)) => void))[];
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
export declare const useElementRect: <T extends HTMLElement>(ref: React.MutableRefObject<T | null>) => {
    width: number;
    height: number;
    bottom: number;
    top: number;
    left: number;
    right: number;
    x: number;
    y: number;
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
export declare const useFitText: <T extends HTMLElement, I extends HTMLElement>(textRef: React.MutableRefObject<T | null>, containerRef: React.MutableRefObject<I | null>, minFontSize?: number, maxFontSize?: number, increment?: number) => void;
//# sourceMappingURL=index.d.ts.map