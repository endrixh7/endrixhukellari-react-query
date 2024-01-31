# React Query tutorial
    - Axios
    - HTTP methods
    - API Docs

## Starting the Local Server
    - Open 'Server' folder and run commands:
        - npm install
        - npm start
    - To access server go to 'localhost:5000'
        - You will see 'Hello from server'
    - Make sure to leave the server up and running

## Working on the Client Side 
    - Open 'Starter' folder and run commands:
        - npm i
        - npm run dev (vite configurations)
    - Install React Query (check version , stick with v4 or install v5)
        - npm i @tanstack/react-query
        - import QueryClient, QueryCLientProvider, wrap the 'app' with 'QueryClientProvider'
        - create instance for the Query Client
        - add this prop to our app
        - Done ✅

## Note
    Important Update !!!
    In the latest version of React Query (V5), the 'isLoading' property has been replaced with 'isPending'. This change is purely in naming; the functionality remains the same, where the property is true if the query has not yet received data. If you are using a different version of React Query than the one provided in the starter package, remember to use 'isPending' instead of 'isLoading'.

## First Query
    Important:
        - Query Key
            - Used internally for refetching, caching and sharing your queries thoughout your application
        - Query Function
            - A function that returns a promise, must return a response/error
    - Combined with Context API (Done ✅)
        - Combined with Axios
    - Make the request
        - Check the console
            - data
                - data
                    - array
                    
## Render Data
    - Destructure 'isLoading' and 'data'
    - Make sure that data is checked
        - isLoading
    - Now lets return data
    - We have nested 'data'
        - find the taskList in this case
    - Render the data from the taskList, remove the hardcoded
    - Done ✅
    - Make sure that the 'name' is correct
    - Check the Network Tab
    - Skiping the 'data.data.taskList' using async/await inside of the queryFn
        - data.taskList

## Error Handling
    - isError (generic approach)
    - since we are using axios it will be actually 'axios error'
    - destructure 'isError' 'error' first
    - Now we 'messed up' the url and set the error section
        - Check how react query will try 3 times by default and then let 'axios' to throw the error
    - Now lets get the actual 'error'
        - error is 'Request failed with status code 404' (this is error from our front end)
        - to get the error from server we need to specify the error 'error.response.data'
            - response from server is 'Route does not exist'

## Thunder Client
    - A testing tool
    - Test API endpoints if its correct
    - New Request
        - Type of the Method
        - Url
    - Send
    - The Response is to the Right
        - response
        - headers
        - cookies
        - results
        - docs
    - Done ✅

## Create Task - challenge
    - Go to Thunder Client
        - Collections
            - New Collection
                - Tasks
                    - Click on Tasks
                        - new request
                        - set the Method (get or post)
    - Create 'ENV' inside of the thunderclient
        - New Env
            - Global
                - Name
                - value
    - Now go to Collections
        - Tasks
        - At the URL type {{URL}}
        - body , json and the message
    - Accessing the Resources of the Servers
    - Challenge:
        - Create Task
            - Url
            - POST
            - Body , JSON
                - {
                    "title": "another task"
                }
            - title must be exact and make sure to use double ""

## Create Task - initial setup
    - We will refactor later
    - Add the function to Form
    - Note:
        - We are going to use useMutation for:
            - Create
            - Edit
            - Delete
        - To fetch Data we use 'useQuery'
            - Read or Get data
    - Import custom fetch, useMutation
    - Make the post request using useMutation and axios.post
    - clg
        - open console
            - go to mutate
        - we need to invoke this function when user click the submit
        - we can destructure 'mutate' property
        - we can give an alias
    - We disabled the 'submit' btn while the data 'isLoading'
    - Lets invoke the useMutation fn
        - createTask is the alias
        - createTask()
        - Now when we press the button, our list will be filled with 'some titile' that is typed in function
        - Now pass a parameter to mutationFn and to the value of the title prop
    - Check errors from server (when user leave empty, server respond with and error/response)
## Use Mutation Helpers
    - useMutation hook has two functions:
        - onSucces() => {}
        - onError()
            - we can catch the error directly
        - React Toastify Library
            - onSuccess modal
            - onError modal
        - How to get the latest value without refreshing the browser
            - hard part using useEffect
            - easy part using React Query
                - invalidate queries
        - Access 'useQueryCLient'
        - Import 'useQueryCLient' and create that instance
            - Now onSuccess I will do three things:
                1- invalidate tasks query (query key)
                2- notify user using toast
                3- render the changes using useState
        - Done ✅

## Edit Task - challenge (patch to edit, get to refetch data using react query)
    We need :
    - URL
    - id
    - body, json
        - property
            - isDone: 'true' or 'false'
    - use Thunder Client
    - we need to invalidate that task again
    - After we tested our endpoint using Thunder Client now lets create that function
    - Go on SingeItem
        - import useMutation
        - import customfetch
        - create the function
    - invoke to 'edit task button'
    - add the onSuccess
    - refetch the latest data
        - use queryClient

## Edit Task - complete
    - Lets test it using Thunder Client
    - Create a new request on Collections
    - Set the Method Delete
    - Response will be task removed
    - Go to 'SingleItem component and set up the functionality to the button
    - Create another instance of useMutation
    - Function will take only one argument
    - Set the method .delete to axios
    - onSucces stayes the same
    - we can access 'isLoading' and disable that button

## Delete Task
    - Done ✅

## Refactor
    - Remove local data
    - remove useState, nanoId on App.jsx
    - Create Task will be tricky
    - Create a file for the customHooks
        - we will have 4 different hooks
            - fetch data
            - create task
            - edit
            - delete
        - this customHook will be invoke in different places, remember that
        - dont forget to import all necessary
            - careful with the queryClient
                - you need to create more than once instance
                
## Alternative Server Setup (server configurations)
    - After finishing our app we can store all items on server
    - We used array to store data (we will lose all data)
    - Saving on a local file system
        - local server (nodemon localDataServer)
        - npm run local-server
            - Now go to the Starter and add a Random Task through the UI
        - Stop and Start the server again on the 'Server'
            - Refresh the App and Data will be there
        - Normally this will be saved to the Database (MongoDB)

