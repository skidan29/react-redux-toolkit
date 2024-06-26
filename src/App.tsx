import {
  Controller,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from 'react-hook-form'
import { postApi, useGetPostsQuery } from './store/rtk-query/post-api'
import { counterSlice } from './store/slices/counter-clice'
import { useAppDispatch, useAppSelector } from './store/store'
import { Button, Input } from './styled-component/style.style'
import { ZodError, z } from 'zod'


interface MyForm {
  name: string
  age: number
}

function App() {
  const { count } = useAppSelector((state) => state.counterReducer)
  const { increment, dicrement } = counterSlice.actions
  const dispatch = useAppDispatch()

  const { data: posts, error, isLoading } = useGetPostsQuery(10)

  const schemaPost = z.object({
    userId: z.number(),
    id: z.number(),
    title: z.string(),
    body: z.string(),
  })


  const fn = async()=>{
    try{
    const res  = await dispatch(postApi.endpoints.getPosts.initiate(100))
    const post = res?.data;
    schemaPost.array().parseAsync(post);
    }catch(e){

      if(e instanceof ZodError){
        throw e
      }
    }
}
fn()

  

  
 





  

  const {
    register,
    handleSubmit,
    reset,
    watch,
    control,
    clearErrors,
    formState: { errors },
    setValue,
  } = useForm<MyForm>({
    defaultValues: {
      age: 18,
    },
  })

  const submitForm: SubmitHandler<MyForm> = (data) => console.log(data)
  const errorForm: SubmitErrorHandler<MyForm> = (data) => console.log(data)


  return (
    <>
      React Hook Form:
      <h1>{watch('name')}</h1>
      <form onSubmit={handleSubmit(submitForm, errorForm)}>
        <input
          type="text"
          {...register('name', { required: true })}
          aria-invalid={errors.name ? true : false}
        />

        <Controller
          name="age"
          control={control}
          render={({ field }) => <Input $invalidColor={'red'} {...field} />}
        />

        <Button>Отправить</Button>
        <button type="button" onClick={() => clearErrors('name')}>
          Clear Errors
        </button>
        <button type="button" onClick={() => reset({ name: '', age: 0 })}>
          Clear Form
        </button>
        <button type="button" onClick={() => setValue('name', 'Васген')}>
          Set Name
        </button>
      </form>
      <hr />
      RTK Query demo:
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        posts &&
        posts.map((post) => (
          <div key={post.id}>
            <span>{post.id}:</span> {post.title}{' '}
          </div>
        ))
      )}
      {error && 'Error'}
      <hr />
      Redux-tollkit:
      <div>{count}</div>
      <button onClick={() => dispatch(dicrement(1))}>dicrement</button>
      <button onClick={() => dispatch(increment(1))}>increment</button>
    </>
  )
}

export default App
