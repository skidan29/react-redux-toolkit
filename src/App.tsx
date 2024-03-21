import "./App.css";
import { useAppDispatch, useAppSelector } from "./store/hooks/redux";
import { userSlice } from "./store/reducers/userReducer";

function App() {
  const { count } = useAppSelector((state) => state.userReducer);
  const { increment, dicrement } = userSlice.actions;
  const dispatch = useAppDispatch();

  return (
    <>
      Hello!!!
      <div>{count}</div>
      <button onClick={() => dispatch(increment(1))}>increment</button>
      <button onClick={() => dispatch(dicrement(1))}>increment</button>
    </>
  );
}

export default App;
