import { useState } from "react";
import Connect from "./components/connect";

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [id, setId] = useState('')
  const [currentAccount, setCurrentAccount] = useState(null);
  const [balance, setBalance] = useState(0);
  const [view, setView] = useState(0)

  const onLogout = () => {
    setIsConnected(false);
    setView(0)
    setCurrentAccount(null)
    setBalance(0)
  };
  return (
    <div>
      {isConnected ? (
        <p className="uppercase font-semibold text-center my-10">loading...</p>
      ) :
      
        view === 0 ? (
          <Connect
            setCurrentAccount={setCurrentAccount}
            setView={setView}
            setId={setId}
            setBalance={setBalance}
            setIsConnected={setIsConnected}
            currentAccount={currentAccount}
          />
        ) : null}
         { view === 1 ? (
          <div className="flex space-y-5 items-center justify-center my-10 flex-col">
            <h3 className="text-gray-500 text-2xl capitalize font-bold">
              connected
            </h3>
            <h4 className="font-semibold capitalize text-sm">
              account number : {currentAccount}
            </h4>
            <h4 className="font-semibold capitalize text-sm">
               {id ? <p>id number : {id}</p> : null}
            </h4>
            <h4 className="font-semibold capitalize text-xs">
              account balance : {balance}
            </h4>
            <button
              onClick={onLogout}
              className="w-max bg-red-500 text-white rounded p-2"
            >
              log out
            </button>
          </div>
        ) : null}
    </div>
  );
}

export default App;
