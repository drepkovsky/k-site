declare const store: import("redux").Store<import("redux").CombinedState<{
    context: import("./reducers/red_con").ContextState;
}>, import("./actions/act_con").ContextAction>;
export default store;
