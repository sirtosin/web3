import React, { useState, useEffect, useMemo } from "react";
import Web3 from "web3";

const Connect = ({
  setCurrentAccount,
  currentAccount,
  setIsConnected,
  setView,
  setBalance,
  setId,
}) => {
  const [provider, setProvider] = useState(null);
  const web3 = new Web3(provider);
  const onLogin = async (provider) => {
    const accounts = await web3.eth.getAccounts();
    if (accounts.length === 0) {
      console.log("Please connect to MetaMask!");
    } else if (accounts[0] !== currentAccount) {
      setCurrentAccount(accounts[0]);
      const accBalanceEth = web3.utils.fromWei(
        await web3.eth.getBalance(accounts[0]),
        "ether"
      );

      setBalance(Number(accBalanceEth).toFixed(6));
      setView(1);
      setIsConnected(false);
    }
  };
  const detectProvider = () => {
    let provider;
    if (window.ethereum) {
      provider = window.ethereum;
    } else if (window.web3) {
      provider = window.web3.currentProvider;
    } else {
      window.alert("No Ethereum browser detected! Check out MetaMask");
    }
    return provider;
  };

  const newProvider = useMemo(async () => {
    if (provider !== null) {
      await provider.on("accountsChanged", async (accounts) => {
        // Handle the new accounts, or lack thereof.
        if (accounts.length > 0) {
          window.alert("new account found");
          setCurrentAccount(accounts[0]);
          const accBalanceEth = web3.utils.fromWei(
            await web3.eth.getBalance(accounts[0]),
            "ether"
          );

          setBalance(Number(accBalanceEth).toFixed(6));
        }

        console.log("acc -now", accounts);
      });

      await provider.on("chainChanged", (chainId) => {
        if (chainId) {
          window.alert("new network found");
          console.log("chainId", chainId);
          setId(chainId);
        }

        // window.location.reload();
      });
    }
  }, [provider]);

  useEffect(() => {
    setProvider(detectProvider());
  }, [provider]);

  const onLoginHandler = async () => {
    setIsConnected(true);

    if (provider) {
      if (provider !== window.ethereum) {
        console.error(
          "Not window.ethereum provider. Do you have multiple wallet installed ?"
        );
      }
      await provider.request({
        method: "eth_requestAccounts",
      });
      setIsConnected(true);

      setIsConnected(false);
    }
    onLogin(provider);
  };

  return (
    <div className="flex items-center justify-center my-10 flex-col">
      <h3 className="text-gray-500 text-2xl capitalize font-bold">
        connect your metamask account
      </h3>
      <button
        onClick={onLoginHandler}
        className="w-max bg-blue-500 text-white my-10 rounded p-2"
      >
        connect
      </button>
    </div>
  );
};

export default Connect;
