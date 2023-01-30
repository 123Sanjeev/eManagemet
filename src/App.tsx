import Dashboard from './compontents/Dashboard';

function App() {
  return (
    <div className="App">
      {/* <Navbar app="eManagement" userData = { loggedInUser as user } username={uid} isLoggedin={(loginStatus || uid) ? true : false} /> */}
      <Dashboard />
    </div>
  );
}

export default App;
