import "./App.css";
import { useGetUserQuery } from "./store/api/UserService";
import { userSlice } from "./store/reducers/userReducer";
import { useAppDispatch, useAppSelector } from "./store/store";

function App() {
  const { count } = useAppSelector((state) => state.userReducer);
  const { increment, dicrement } = userSlice.actions;
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
