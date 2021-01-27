declare const appReducer: import("redux").Reducer<import("redux").CombinedState<{
    context: import("./red_con").ContextState;
}>, import("../actions/act_con").ContextAction>;
export default appReducer;
export declare type RootState = ReturnType<typeof appReducer>;
