# react源码解析
* React 中最值得称道的部分莫过于 Virtual DOM 与 diff 的完美结合，特别是其高效的 diff 算法，让用户可以无需顾忌性能问题而”任性自由”的刷新页面，让开发者也可以无需关心 Virtual DOM 背后的运作原理，因为 React diff 会帮助我们计算出 Virtual DOM 中真正变化的部分，并只针对该部分进行实际 DOM 操作，而非重新渲染整个页面，从而保证了每次操作更新后页面的高效渲染，因此 Virtual DOM 与 diff 是保证 React 性能口碑的幕后推手。
### react事件合成机制
* react组件上绑定的事件最终绑定到了document的对应的节点上，故而对应的节点绑定原生的事件，这样减少了dom的原生事件，减少了内存开支
* React以队列的方式，从触发事件的组件向父组件回溯，调用它们在JSX中声明的callback。也就是React自身实现了一套事件冒泡机制。我们没办法用event.stopPropagation()来停止事件传播，应该使用event.preventDefault()
### 什么时候要在React组件中写shouldComponentUpdate？
* 添加shouldComponentUpdate方法一般都会拖慢组件的更新速度。
* React已经替我们实现了一个shouldComponentUpdate。为了简化，我们可以假装props不是绑在组件的this上的，而是直接传给了render，那么React的实现基本上就是下面这样的：

        shouldComponentUpdate(nextProps) {
            return !deepEquals(render(this.props), render(nextProps))
        }
* React团队说shouldComponentUpdate是个紧急出口，而不是加速按钮应该就是出于这个原因。
### react服务端渲染
* react提供了两个方法：reactToString和reactStaticMarkUp。通过这两个方法将Virtual DOM输出位HTML字符串，这是ract服务端渲染的基础，它移除了服务端对于浏览器的依赖。
* 服务器端渲染除了要解决对浏览器环境的依赖，还要解决两个问题：前后端代码共享和前后端路由统一处理
* **redux的运行机制**
    > Redux 提供了一套类似 Flux 的单向数据流，整个应用只维护一个 Store，以及面向函数式的特性让它对服务器端渲染支持很友好。
    > 关于store
    >> 整个应用只有一个唯一的 Store
    >> store对应的状态树，由一个reducer函数（root reducer）生成
    >> 状态树的每一个字段都可以进一步由不同的reducer生成
    >> store包括几个方法dispatch，getState
    >> store的状态树只能通过dispatch（action）来触发更改
    > redux的数据流
    >> action 是一个包含 { type, payload } 的对象
    >> reducer 函数通过 store.dispatch(action) 触发
    >> reducer 函数接受 (state, action) 两个参数，返回一个新的 state
    >> reducer 函数判断 action.type 然后处理对应的 action.payload 数据来更新状态树
    > 所以对于整个应用来说，一个 Store 就对应一个 UI 快照，服务器端渲染就简化成了在服务器端初始化 Store，将 Store 传入应用的根组件，针对根组件调用 renderToString 就将整个应用输出成包含了初始化数据的 HTML。
* **react-router**
    > react-router 通过一种声明式的方式匹配不同路由决定在页面上展示不同的组件，并且通过 props 将路由信息传递给组件使用，所以只要路由变更，props 就会变化，触发组件 re-render。

        import React from 'react';
        import { Route } from 'react-router';
        import { List, Item } from './components';

        // 无状态（stateless）组件，一个简单的容器，react-router 会根据 route
        // 规则匹配到的组件作为 `props.children` 传入
        const Container = (props) => {
        return (
            <div>{props.children}</div>
        );
        };

        // route 规则：
        // - `/list` 显示 `List` 组件
        // - `/item/:id` 显示 `Item` 组件
        const routes = (
        <Route path="/" component={Container} >
            <Route path="list" component={List} />
            <Route path="item/:id" component={Item} />
        </Route>
        );

        export default routes;
* **reducer**
    > Store 是由 reducer 产生的，所以 reducer 实际上反映了 Store 的状态树结构

        import listReducer from './list';
        import itemReducer from './item';
        // 整个reducer
        export default function rootReducer(state = {}, action) {
            return {
                list: listReducer(state.list, action),
                item: itemReducer(state.item, action)
            };
        }

        // 每一个reducer
        const initialState = [];
        export default function listReducer(state = initialState, action) {
            switch(action.type) {
            case 'FETCH_LIST_SUCCESS': return [...action.payload];
            default: return state;
            }
        }
    >> isomorphic-fetch 是一个前后端通用的 Ajax 实现，前后端要共享代码这点很重要。

        import fetch from 'isomorphic-fetch';
        export function fetchList() {
            return (dispatch) => {
                return fetch('/api/list')
                    .then(res => res.json())
                    .then(json => dispatch({ type: 'FETCH_LIST_SUCCESS', payload: json }));
            }
        }

        export function fetchItem(id) {
            return (dispatch) => {
                if (!id) return Promise.resolve();
                return fetch(`/api/item/${id}`)
                    .then(res => res.json())
                    .then(json => dispatch({ type: 'FETCH_ITEM_SUCCESS', payload: json }));
            }
        }
* 扩展链接[react服务端渲染原理解析](https://blog.coding.net/blog/React-server-rendering)