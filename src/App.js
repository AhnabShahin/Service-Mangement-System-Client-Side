import './App.css';
import AuthProvider from './context/AuthProvider';
import Main from './Main';


function App() {

  return (
    <>
      <AuthProvider>
        <Main/>
      </AuthProvider>
    </>
  );
}

export default App;
