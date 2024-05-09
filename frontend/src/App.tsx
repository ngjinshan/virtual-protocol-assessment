import "./App.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { SwipeContainer } from "./component/swipeContainer";

function App() {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false,
                refetchOnMount: true,
                refetchOnReconnect: true,
                retry: true,
                staleTime: 120000,
            },
        },
    });

    return (
        <QueryClientProvider client={queryClient}>
            <SwipeContainer />
        </QueryClientProvider>
    );
}

export default App;
