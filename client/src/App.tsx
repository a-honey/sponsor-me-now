import Router from './Router';
import './styles/reset.css';
import './styles/global.scss';
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onSuccess: () => {},
    onSettled: () => {},
    onError: (err, query) => {
      if (err) {
        console.log(`${query.queryKey} 에러`);
      }
    },
  }),
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
    </QueryClientProvider>
  );
}

export default App;
