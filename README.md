# react-use-utils

Essa lib é um conjunto de hooks que facilitam o desenvolvimento de aplicações React. Ela foi criada para ser utilizada em conjunto com o [create-react-app](https://create-react-app.dev/) e o [Typescript](https://www.typescriptlang.org/).

- [react-use-utils](#react-use-utils)
  - [Instalação](#instalação)
  - [Uso](#uso)
  - [Hooks](#hooks)
    - [useOptimistic](#useoptimistic)
    - [useId](#useid)
    - [useProxy](#useproxy)
    - [useDebounceCallbackEffect](#usedebouncecallbackeffect)
    - [useDebounce](#usedebounce)
    - [useWindowSize](#usewindowsize)
    - [useAsync](#useasync)
    - [useToggle](#usetoggle)
    - [useRouter](#userouter)
    - [useEventListener](#useeventlistener)
    - [useMediaQuery](#usemediaquery)
    - [useStateHistory](#usestatehistory)
    - [useScript](#usescript)
    - [useKeyPress](#usekeypress)
    - [useOnScreen](#useonscreen)
    - [usePrevious](#useprevious)
    - [useOnClickOutside](#useonclickoutside)
    - [useHover](#usehover)
    - [useCounterTimer](#usecountertimer)
    - [useBezierEasing](#usebeziereasing)
    - [useLocalStorage](#uselocalstorage)
    - [useElementRect](#useelementrect)
    - [useFitText](#usefittext)

## Instalação

```bash
npm install react-use-utils
```

## Uso

```tsx
import React from 'react';
import { useLocalStorage } from 'react-use-utils';

const App: React.FC = () => {
  const [name, setName] = useLocalStorage('name', 'John Doe');

  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </div>
  );
};
```

## Hooks

### useOptimistic

```ts
useOptimistic<T = any, V = any>(
    state: T, 
    updateFn: (currentState: T, optimisticValue: V) => T
): [T, (value: V) => void]
```

Hook que permite atualizar o estado de forma otimista.

- `state`: Estado atual.
- `updateFn`: Função que atualiza o estado de forma otimista.
- `value`: Valor otimista.
- `return`: Retorna o estado atual e uma função para adicionar um valor otimista.

```tsx
import React from 'react';
import { useOptimistic } from 'react-use-utils';

const App: React.FC = () => {
  const [messages, setMessages] = useState([]);

  const [optimisticMessages, addOptimisticMessage] = useOptimistic(messages, (currentState, optimisticValue) => {
    return [...currentState, {...optimisticValue, sending: true}];
  });

  const addMessage = (message) => {
    addOptimisticMessage(message);
    fetch('https://api.example.com/messages', {
      method: 'POST',
      body: JSON.stringify(message),
    }).then(() => {
      setMessages([...messages, message]);
    });
  };

  return (
    <div>
      {optimisticMessages.map((message) => (
        <div key={message.id}>{message.text}</div>
      ))}
      <button onClick={() => addMessage({ id: messages.length, text: 'Hello' })}>
        Add message
      </button>
    </div>
  );
};
```

### useId

```ts
useId(idName?: string): string
```

Gancho para gerar um ID exclusivo.

- `idName`: Nome do ID.
- `return`: Retorna um ID exclusivo.

```tsx
import React from 'react';
import { useId } from 'react-use-utils';

const App: React.FC = () => {
  const id = useId();

  return <div id={id}>Hello World</div>;
};
```

### useProxy

```ts
useProxy<T extends object>(target: T, onChange?: (target: T) => void): T
```

Observa as alterações em um objeto e executa uma função de retorno quando ocorre uma mudança.

- `target`: Objeto alvo.
- `onChange`: Função de retorno.
- `return`: Retorna um objeto proxy.

```tsx
import React from 'react';
import { useProxy } from 'react-use-utils';

const App: React.FC = () => {
  const user = useProxy({ name: 'John Doe', age: 30 }, (newUser) => {
    console.log('User changed:', newUser);
  });

  return (
    <div>
      <input
        type="text"
        value={user.name}
        onChange={(e) => {
            user.name = e.target.value
        }}
      />
    </div>
  );
};
```

### useDebounceCallbackEffect

```ts
useDebounceCallbackEffect(
    callback: () => void, 
    delay: number, 
    dependencies: any[]
): void
```

Hook que executa um callback após um determinado tempo de espera (delay), mas só executa uma vez, mesmo que as dependências mudem antes do fim do delay.

- `callback`: Função de retorno.
- `delay`: Tempo de espera.
- `dependencies`: Dependências.
- `return`: Retorna `void`.

```tsx
import React, { useState } from 'react';
import { useDebounceCallbackEffect } from 'react-use-utils';

const App: React.FC = () => {
  const [value, setValue] = useState('');
  const [debouncedValue, setDebouncedValue] = useState('');

  useDebounceCallbackEffect(() => {
    setDebouncedValue(value);
  }, 500, [value]);

  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <p>Debounced value: {debouncedValue}</p>
    </div>
  );
};
```

### useDebounce

```ts
useDebounce<T = any>(value: T, delay: number): T
```

Hook que retorna um valor após um determinado tempo de espera (delay).

- `value`: Valor.
- `delay`: Tempo de espera.
- `return`: Retorna o valor após o tempo de espera.

```tsx
import React, { useState } from 'react';
import { useDebounce } from 'react-use-utils';

const App: React.FC = () => {
  const [value, setValue] = useState('');
  const debouncedValue = useDebounce(value, 500);

  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <p>Debounced value: {debouncedValue}</p>
    </div>
  );
};
```

### useWindowSize

```ts
useWindowSize(): { width: number; height: number }
```

Hook que retorna a largura e a altura da janela do navegador.

- `width`: Largura da janela.
- `height`: Altura da janela.
- `return`: Retorna a largura e a altura da janela.

```tsx
import React from 'react';
import { useWindowSize } from 'react-use-utils';

const App: React.FC = () => {
  const { width, height } = useWindowSize();

  return (
    <div>
      <p>Width: {width}</p>
      <p>Height: {height}</p>
    </div>
  );
};
```

### useAsync

```ts
useAsync<T = any>(asyncFunction: (...props: any[]) => Promise<T>, immediate?: boolean): {
    execute: (...props: any[]) => Promise<void>;
    status: "idle" | "pending" | "success" | "error";
    value: T | null;
    error: any;
}
```

Hook que executa uma função assíncrona e retorna o status da execução, o valor retornado e o erro, caso ocorra.

- `asyncFunction`: Função assíncrona.
- `immediate`: Se `true`, a função é executada imediatamente.
- `execute`: Função para executar a função assíncrona.
- `status`: Status da execução.
- `value`: Valor retornado.
- `error`: Erro, caso ocorra.
- `return`: Retorna um objeto com as propriedades `execute`, `status`, `value` e `error`.

```tsx
import React from 'react';
import { useAsync } from 'react-use-utils';

const fetchData = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
  return response.json();
};

const App: React.FC = () => {
  const { execute, status, value, error } = useAsync(fetchData, false);

  return (
    <div>
      {status === 'idle' && <div>Start your journey by clicking a button</div>}
      {status === 'pending' && <div>Loading...</div>}
      {status === 'success' && <div>{JSON.stringify(value)}</div>}
      {status === 'error' && <div>{error.message}</div>}
      <button onClick={execute} disabled={status === 'pending'}>
        {status !== 'pending' ? 'Click me' : 'Loading...'}
      </button>
    </div>
  );
};
```

### useToggle

```ts
useToggle(initialValue: boolean): [boolean, () => void]
```

Hook que retorna um valor booleano e uma função para alternar entre `true` e `false`.

- `initialValue`: Valor inicial.
- `return`: Retorna um array com o valor booleano e a função para alternar.
- `value`: Valor booleano.
- `toggle`: Função para alternar.
- `return`: Retorna um array com o valor booleano e a função para alternar.

```tsx
import React from 'react';
import { useToggle } from 'react-use-utils';

const App: React.FC = () => {
  const [isOn, toggle] = useToggle(false);

  return (
    <div>
      <p>{isOn ? 'ON' : 'OFF'}</p>
      <button onClick={toggle}>Toggle</button>
    </div>
  );
};
```

### useRouter

```ts
useRouter(path?: string | string[] | RegExp | RegExp[]): {
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
}
```

Hook que retorna informações sobre a rota atual e funções para navegar entre as rotas.

- `path`: Caminho da rota.
- `go`: Navega para uma rota específica.
- `back`: Navega para a rota anterior.
- `forward`: Navega para a próxima rota.
- `push`: Adiciona uma nova rota ao histórico.
- `replace`: Substitui a rota atual.
- `state`: Estado da rota.
- `hash`: Hash da rota.
- `pathname`: Caminho da rota.
- `query`: Query string da rota.
- `search`: Parâmetros da query string.
- `length`: Número de rotas no histórico.
- `currentIndex`: Índice da rota atual.
- `return`: Retorna um objeto com as propriedades `go`, `back`, `forward`, `push`, `replace`, `state`, `hash`, `pathname`, `query`, `search`, `length` e `currentIndex`.

```tsx
import React from 'react';
import { useRouter } from 'react-use-utils';

const App: React.FC = () => {
  const { pathname, query, push } = useRouter();

  return (
    <div>
      <p>Pathname: {pathname}</p>
      <p>Query: {JSON.stringify(query)}</p>
      <button onClick={() => push('/about')}>Go to About</button>
    </div>
  );
};
```

### useEventListener

```ts
useEventListener<E extends HTMLElement, K extends keyof GlobalEventHandlersEventMap>(
    element: React.RefObject<E | null>, 
    eventName: K, 
    eventHandler: (event: GlobalEventHandlersEventMap[K]) => void, 
    wantsUntrusted?: boolean
): void
```

Hook que adiciona um ouvinte de eventos a um elemento.

- `element`: Elemento.
- `eventName`: Nome do evento.
- `eventHandler`: Função de retorno.
- `wantsUntrusted`: Se `true`, o ouvinte de eventos também recebe eventos não confiáveis.
- `return`: Retorna `void`.

```tsx
import React, { useRef } from 'react';
import { useEventListener } from 'react-use-utils';

const App: React.FC = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEventListener(buttonRef, 'click', () => {
    console.log('Button clicked');
  });

  return (
    <div>
      <button ref={buttonRef}>Click me</button>
    </div>
  );
};
```

### useMediaQuery

```ts
useMediaQuery<T = any>(queries: {
    [query: string]: T;
}, defaultValue: T): T
```

Hook que retorna um valor com base em uma consulta de mídia.

- `queries`: Consultas de mídia.
- `defaultValue`: Valor padrão.
- `return`: Retorna um valor com base na consulta de mídia.

```tsx
import React from 'react';
import { useMediaQuery } from 'react-use-utils';

const App: React.FC = () => {
  const theme = useMediaQuery(
    {
      '(prefers-color-scheme: dark)': 'dark',
      '(prefers-color-scheme: light)': 'light',
    },
    'light'
  );

  const device = useMediaQuery(
    {
      '(min-width: 1000px)': 'desktop',
      '(min-width: 600px)': 'tablet',
      '(max-width: 599px)': 'mobile',
    },
    'mobile'
  );

  return (
    <div>
      <p>Theme: {theme}</p>
      <p>Device: {device}</p>
    </div>
  );
};
```

### useStateHistory

```ts
useStateHistory<T = any>(initialPresent: T): {
    state: T;
    set: (newPresent: T) => void;
    undo: () => void;
    redo: () => void;
    clear: () => void;
    canUndo: boolean;
    canRedo: boolean;
}
```

Hook que gerencia o histórico de estados.

- `initialPresent`: Estado inicial.
- `state`: Estado atual.
- `set`: Função para definir um novo estado.
- `undo`: Função para desfazer a última ação.
- `redo`: Função para refazer a última ação.
- `clear`: Função para limpar o histórico.
- `canUndo`: Se `true`, é possível desfazer a última ação.
- `canRedo`: Se `true`, é possível refazer a última ação.
- `return`: Retorna um objeto com as propriedades `state`, `set`, `undo`, `redo`, `clear`, `canUndo` e `canRedo`.

```tsx
import React from 'react';
import { useStateHistory } from 'react-use-utils';

const App: React.FC = () => {
  const { state, set, undo, redo, clear, canUndo, canRedo } = useStateHistory(0);

  return (
    <div>
      <p>Value: {state}</p>
      <button onClick={() => set(state + 1)}>Increment</button>
      <button onClick={() => set(state - 1)}>Decrement</button>
      <button onClick={undo} disabled={!canUndo}>
        Undo
      </button>
      <button onClick={redo} disabled={!canRedo}>
        Redo
      </button>
      <button onClick={clear}>Clear</button>
    </div>
  );
};
```

### useScript

```ts
useScript(src: string): "error" | "idle" | "loading" | "ready"
```

Hook que carrega um script.

- `src`: URL do script.
- `return`: Retorna o status do script.

```tsx
import React from 'react';
import { useScript } from 'react-use-utils';

const App: React.FC = () => {
  const status = useScript('https://code.jquery.com/jquery-3.6.0.min.js');

  return <p>Script status: {status}</p>;
};
```

### useKeyPress

```ts
useKeyPress(targetKey: KeyboardEvent["key"], callback: (pressed:boolean) => void): void
```

Hook que executa um callback quando uma tecla é pressionada.

- `targetKey`: Tecla alvo.
- `callback`: Função de retorno.
- `return`: Retorna `void`.

```tsx
import React from 'react';
import { useKeyPress } from 'react-use-utils';

const App: React.FC = () => {
  useKeyPress('Enter', (pressed) => {
    console.log('Enter key pressed:', pressed);
  });

  return <div>Press Enter key</div>;
};
```

### useOnScreen

```ts
useOnScreen<T extends HTMLElement>(
    ref: React.RefObject<T>, 
    rootMargin?: string
): boolean
```

Hook que verifica se um elemento está visível na tela.

- `ref`: Referência do elemento.
- `rootMargin`: Margem do elemento.
- `return`: Retorna `true` se o elemento estiver visível.

```tsx
import React, { useRef } from 'react';
import { useOnScreen } from 'react-use-utils';

const App: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useOnScreen(ref, '-100px');

  return (
    <div>
      <div style={{ height: '100vh' }}>Scroll down</div>
      <div ref={ref} style={{ height: '100vh', background: isVisible ? 'red' : 'blue' }}>
        {isVisible ? 'Visible' : 'Not visible'}
      </div>
    </div>
  );
};
```

### usePrevious

```ts
usePrevious<T = any>(value: T): T | undefined
```

Hook que retorna o valor anterior.

- `value`: Valor atual.
- `return`: Retorna o valor anterior.

```tsx
import React, { useState } from 'react';
import { usePrevious } from 'react-use-utils';

const App: React.FC = () => {
  const [count, setCount] = useState(0);
  const previousCount = usePrevious(count);

  return (
    <div>
      <p>Previous count: {previousCount}</p>
      <p>Current count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};
```

### useOnClickOutside

```ts
useOnClickOutside<T extends HTMLElement>(
    ref: React.RefObject<T>, 
    handler: (event: MouseEvent | TouchEvent) => void
): void
```

Hook que executa um callback quando um clique fora de um elemento é detectado.

- `ref`: Referência do elemento.
- `handler`: Função de retorno.
- `return`: Retorna `void`.

```tsx
import React, { useRef } from 'react';
import { useOnClickOutside } from 'react-use-utils';

const App: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);

  useOnClickOutside(ref, () => {
    console.log('Clicked outside');
  });

  return (
    <div>
      <div ref={ref} style={{ width: 200, height: 200, background: 'red' }}>
        Click outside
      </div>
    </div>
  );
};
```

### useHover

```ts
useHover<T extends HTMLElement>(ref: React.RefObject<T>): boolean
```

Hook que verifica se um elemento está sendo passado o mouse por cima.

- `ref`: Referência do elemento.
- `return`: Retorna `true` se o mouse estiver passando por cima do elemento.

```tsx
import React, { useRef } from 'react';
import { useHover } from 'react-use-utils';

const App: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isHovered = useHover(ref);

  return (
    <div>
      <div ref={ref} style={{ width: 200, height: 200, background: isHovered ? 'red' : 'blue' }}>
        Hover me
      </div>
    </div>
  );
};
```

### useCounterTimer

```ts
useCounterTimer(delay?: number, duration?: number, delayFrame?: number): number
```

Hook que retorna o tempo decorrido desde o início da contagem.

- `delay`: Tempo de espera.
- `duration`: Duração da contagem.
- `delayFrame`: Quadro de atraso.
- `return`: Retorna o tempo decorrido.

```tsx
import React from 'react';
import { useCounterTimer } from 'react-use-utils';

const App: React.FC = () => {
  const elapsed = useCounterTimer(1000, 5000, 100);

  return <div>Elapsed time: {elapsed}ms</div>;
};
```

### useBezierEasing

```ts
useBezierEasing(
    easing: 
        | [number, number, number, number]
        | [[number, number], [number, number]]
        | "linear"
        | "elastic"
        | "ease"
        | "ease-in"
        | "ease-in-elastic"
        | "ease-in-bounce"
        | "ease-in-expo"
        | "ease-in-sine"
        | "ease-in-quad"
        | "ease-in-cubic"
        | "ease-in-back"
        | "ease-in-quart"
        | "ease-in-quint"
        | "ease-in-circ"
        | "ease-in-out"
        | "ease-in-out-elastic"
        | "ease-in-out-bounce"
        | "ease-in-out-sine"
        | "ease-in-out-quad"
        | "ease-in-out-cubic"
        | "ease-in-out-back"
        | "ease-in-out-quart"
        | "ease-in-out-quint"
        | "ease-in-out-expo"
        | "ease-in-out-circ"
        | "ease-out"
        | "ease-out-elastic"
        | "ease-out-bounce"
        | "ease-out-sine"
        | "ease-out-quad"
        | "ease-out-cubic"
        | "ease-out-back"
        | "ease-out-quart"
        | "ease-out-quint"
        | "ease-out-expo"
        | "ease-out-circ"
        | "fast-out-slow-in"
        | "fast-out-linear-in"
        | "linear-out-slow-in" = "linear", 
    delay: number, 
    duration: number, 
    delayFrame?: number
): any
```

Hook que retorna um valor com base em uma função de easing.

- `easing`: Função de easing.
  - `[number, number, number, number]`: Curva de Bezier.
  - `[[number, number], [number, number]]`: Curva de Bezier.
  - `"linear"`: Linear.
  - `"elastic"`: Elástico.
  - `"ease"`: Suave.
  - `"ease-in"`: Suave de entrada.
  - `"ease-in-elastic"`: Suave de entrada elástica.
  - `"ease-in-bounce"`: Suave de entrada de salto.
  - `"ease-in-expo"`: Suave de entrada exponencial.
  - `"ease-in-sine"`: Suave de entrada senoidal.
  - `"ease-in-quad"`: Suave de entrada quadrática.
  - `"ease-in-cubic"`: Suave de entrada cúbica.
  - `"ease-in-back"`: Suave de entrada de volta.
  - `"ease-in-quart"`: Suave de entrada quartica.
  - `"ease-in-quint"`: Suave de entrada quintica.
  - `"ease-in-circ"`: Suave de entrada circular.
  - `"ease-in-out"`: Suave de entrada e saída.
  - `"ease-in-out-elastic"`: Suave de entrada e saída elástica.
  - `"ease-in-out-bounce"`: Suave de entrada e saída de salto.
  - `"ease-in-out-sine"`: Suave de entrada e saída senoidal.
  - `"ease-in-out-quad"`: Suave de entrada e saída quadrática.
  - `"ease-in-out-cubic"`: Suave de entrada e saída cúbica.
  - `"ease-in-out-back"`: Suave de entrada e saída de volta.
  - `"ease-in-out-quart"`: Suave de entrada e saída quartica.
  - `"ease-in-out-quint"`: Suave de entrada e saída quintica.
  - `"ease-in-out-expo"`: Suave de entrada e saída exponencial.
  - `"ease-in-out-circ"`: Suave de entrada e saída circular.
  - `"ease-out"`: Suave de saída.
  - `"ease-out-elastic"`: Suave de saída elástica.
  - `"ease-out-bounce"`: Suave de saída de salto.
  - `"ease-out-sine"`: Suave de saída senoidal.
  - `"ease-out-quad"`: Suave de saída quadrática.
  - `"ease-out-cubic"`: Suave de saída cúbica.
  - `"ease-out-back"`: Suave de saída de volta.
  - `"ease-out-quart"`: Suave de saída quartica.
  - `"ease-out-quint"`: Suave de saída quintica.
  - `"ease-out-expo"`: Suave de saída exponencial.
  - `"ease-out-circ"`: Suave de saída circular.
  - `"fast-out-slow-in"`: Rápido de saída lento de entrada.
  - `"fast-out-linear-in"`: Rápido de saída linear de entrada.
  - `"linear-out-slow-in"`: Linear de saída lento de entrada.
- `delay`: Tempo de espera.
- `duration`: Duração.
- `delayFrame`: Quadro de atraso.
- `return`: Retorna um valor com base na função de easing.

```tsx
import React from 'react';
import { useBezierEasing } from 'react-use-utils';

const App: React.FC = () => {
  const value = useBezierEasing('ease-in-out', 100, 1000, 10);

  return <div>Value: {value}</div>;
};
```

### useLocalStorage

```ts
useLocalStorage<T = any>(key: string, initialValue: T): [T, (value: T|(previous: T)=>T) => void]
```

Hook que armazena um valor no `localStorage`.

- `key`: Chave.
- `initialValue`: Valor inicial.
- `return`: Retorna um array com o valor e uma função para definir um novo valor.

```tsx
import React from 'react';
import { useLocalStorage } from 'react-use-utils';

const App: React.FC = () => {
  const [name, setName] = useLocalStorage('name', 'John Doe');

  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </div>
  );
};
```

### useElementRect

```ts
useElementRect<T extends HTMLElement>(ref: React.RefObject<T>): {
    width: number;
    height: number;
    bottom: number;
    top: number;
    left: number;
    right: number;
    x: number;
    y: number;
}
```

Hook que retorna as dimensões de um elemento.

- `ref`: Referência do elemento.
- `width`: Largura.
- `height`: Altura.
- `bottom`: Distância do topo.
- `top`: Distância da base.
- `left`: Distância da esquerda.
- `right`: Distância da direita.
- `x`: Posição horizontal.
- `y`: Posição vertical.
- `return`: Retorna um objeto com as propriedades `width`, `height`, `bottom`, `top`, `left`, `right`, `x` e `y`.

```tsx
import React, { useRef } from 'react';
import { useElementRect } from 'react-use-utils';

const App: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const rect = useElementRect(ref);

  return (
    <div>
      <div ref={ref} style={{ width: 200, height: 200, background: 'red' }}>
        Element
      </div>
      <p>Width: {rect.width}</p>
      <p>Height: {rect.height}</p>
    </div>
  );
};
```

### useFitText

```ts
useFitText<T extends HTMLElement, I extends HTMLElement>(
    textRef: React.MutableRefObject<T | null>, 
    containerRef: React.MutableRefObject<I | null>, 
    minFontSize?: number, 
    maxFontSize?: number, 
    increment?: number
): void
```

Hook que ajusta o tamanho do texto para caber no contêiner.

- `textRef`: Referência do texto.
- `containerRef`: Referência do contêiner.
- `minFontSize`: Tamanho mínimo da fonte.
- `maxFontSize`: Tamanho máximo da fonte.
- `increment`: Incremento.
- `return`: Retorna `void`.

```tsx
import React, { useRef } from 'react';
import { useFitText } from 'react-use-utils';

const App: React.FC = () => {
  const textRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useFitText(textRef, containerRef, 12, 24, 1);

  return (
    <div>
      <div ref={containerRef} style={{ width: 200, height: 200, background: 'red' }}>
        <div ref={textRef}>Fit text</div>
      </div>
    </div>
  );
};
```