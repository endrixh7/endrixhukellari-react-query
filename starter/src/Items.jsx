import SingleItem from './SingleItem';
import {useQuery} from '@tanstack/react-query';
import customFetch from './utils';

const Items = () => {
  // Destructure 'isLoading' and 'data'
  const {isLoading, data, error, isError} = useQuery(
    {
      queryKey:['tasks'],
      queryFn: async () => {
        // Destructure data here and return data
        const {data} = await customFetch.get('/');
        return data;
      },
    },
  )

  if (isLoading) {
    return <p style={{margin:'1rem'}}> ...Loading Data</p>;
  }

  // Front end error
  // if (isError) {
  //   return <p style={{margin:'1rem'}}> ...Error</p>;
  // }

  // Server Error
  if (error) {
    return <p style={{margin:'1rem'}}> {error.response.data}</p>;
  }




  return (
    <div className='items'>
      {data.taskList.map((item) => {
        return <SingleItem key={item.id} item={item} />;
      })}
    </div>
  );
};
export default Items;
