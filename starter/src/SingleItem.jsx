import customFetch from './utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';

// This will take singel param and will be used below, item param is used for id
const SingleItem = ({ item }) => {
  // Refetch data using queryClient
  const queryClient = useQueryClient();
  // Create function and add the alias for that function
  const {mutate: editTask} = useMutation({
    mutationFn:({taskId, isDone}) => {
      return customFetch.patch(`/${taskId}`, {isDone});
    },
    // Add onSuccess
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:['tasks']});
    },
  });

  // Delete Task
  const {mutate: deleteTask, isLoading} = useMutation({
    mutationFn:(taskId) => {
      return customFetch.delete(`/${taskId}`);  
    },
    // Add onSuccess
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:['tasks']});
    },
  });

  return (
    <div className='single-item'>
      <input
        type='checkbox'
        checked={item.isDone}
        // Invoke the 'mutate' function here, alias editTask, make sure to add dynamic url
        // This line will change from true to false : isDone:!item.isDone
        onChange={() => editTask({taskId:item.id, isDone:!item.isDone})}
      />
      <p
        style={{
          textTransform: 'capitalize',
          textDecoration: item.isDone && 'line-through',
        }}
      >
        {item.title}
      </p>
      <button
        className='btn remove-btn'
        type='button'
        disabled={isLoading}
        onClick={() => deleteTask(item.id)}
      >
        delete
      </button>
    </div>
  );
};
export default SingleItem;
