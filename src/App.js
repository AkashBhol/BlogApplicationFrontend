import logo from './logo.svg';
import './App.css';
import Login from './Login';
import AppRoutes from './AppRotes';
import MainLayout from './Components/MainLayout';
import { SnackbarProvider } from 'notistack';



function App() {
  return (
    <div className="App">
      <SnackbarProvider>
        <MainLayout />
        <AppRoutes />
      </SnackbarProvider>
    </div>
  );
}

export default App;
