import { Controller, SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import "./App.css";
import { useGetUserQuery } from "./store/api/post-api";
import { counterSlice } from "./store/reducers/counter-clice";
import { useAppDispatch, useAppSelector } from "./store/store";

interface MyForm{
  name:string;
  age:number;
}

function App() {
  const { count } = useAppSelector((state) => state.counterReducer);
  const { increment, dicrement } = counterSlice.actions;
  const dispatch = useAppDispatch();

  const { data: posts, error, isLoading } = useGetUserQuery(10);

  const {register, handleSubmit, reset, watch,control, clearErrors, formState:{errors}, setValue} = useForm<MyForm>({
    defaultValues:{
      age:18
    }
  });

  const submitForm: SubmitHandler<MyForm> = (data) => console.log(data)
  const errorForm: SubmitErrorHandler<MyForm> = (data) => console.log(data)

  return (
    <>
      React Hook Form:
      <h1>{watch('name')}</h1>
      <form onSubmit={handleSubmit(submitForm, errorForm)}>
        <input type='text' {...register('name',{required:true})} aria-invalid={errors.name ? true : false}/>
        
        <Controller 
        name="age"
        control={control}
        render={({field})=> <input {...field }/>}
        />

        <button>Отправить</button>
        <button type="button" onClick={()=>clearErrors('name')}>Clear Errors</button>
        <button type="button" onClick={()=>reset({name: '', age:0})}>Clear Form</button>
        <button type="button" onClick={()=>setValue('name', 'Васген')}>Set Name</button>
      </form>

      <hr/>

      RTK Query demo:
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

      <hr/>

      Redux-tollkit:
      <div>{count}</div>
      <button onClick={() => dispatch(dicrement(1))}>dicrement</button>
      <button onClick={() => dispatch(increment(1))}>increment</button>
    </>
  );
}

export default App;
