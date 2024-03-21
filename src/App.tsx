import "./App.css";
import { useGetUserQuery } from "./store/api/post-api";
import { counterSlice } from "./store/reducers/counter-reducer";
import { useAppDispatch, useAppSelector } from "./store/store";

function App() {
  const { count } = useAppSelector((state) => state.counterReducer);
  const { increment, dicrement } = counterSlice.actions;
  const dispatch = useAppDispatch();
  
  const { data: posts, error, isLoading } = useGetUserQuery(10);

  return (
    <>
      Posts:
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        posts &&
        posts.map((post) => (
          <div key={post.id}>
            <span>{post.id}:</span> {post.title}{" "}
          </div>
        ))
      )}
      {error && "Error"}
      <div>{count}</div>
      <button onClick={() => dispatch(dicrement(1))}>dicrement</button>
      <button onClick={() => dispatch(increment(1))}>increment</button>
    </>
  );
}

export default App;
