"use client"

import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const MetaMaskLogin = ({signer, setSigner, provider, setProvider}: any) => {
  const [isConnected, setIsConnected] = useState<any>(false);


  const [account, setAccount] = useState<any>(null);

  useEffect(() => {
    // Check if MetaMask is available
    if (window.ethereum) {
      const ethereumProvider = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(ethereumProvider);

      // Check if the user is connected
      ethereumProvider.listAccounts().then((accounts) => {
        if (accounts.length > 0) {
          setIsConnected(true);
          setSigner(ethereumProvider.getSigner());
          setAccount(accounts[0]);
        }
      });

      // Listen for account changes
      window.ethereum.on('accountsChanged', (newAccounts) => {
        if (newAccounts.length > 0) {
          setAccount(newAccounts[0]);
        } else {
          setAccount(null);
        }
      });
    }
  }, []);

  const handleLogin = async () => {
    try {
      if (provider) {
        const accounts = await provider.send('eth_requestAccounts', []);
        if (accounts.length > 0) {
          setIsConnected(true);
          setSigner(provider.getSigner());
          setAccount(accounts[0]);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    if (provider) {
      provider.removeAllListeners(); // Remove event listeners
    }
    setIsConnected(false);
    setProvider(null);
    setSigner(null);
    setAccount(null);
  };

  return (
    <div>
      {!isConnected && <p>Please install and connect MetaMask to use this feature.</p>}
      {isConnected && !account && <button onClick={handleLogin}>Connect with MetaMask</button>}
      {isConnected && account && (
        <div>
          <p>Connected Account: {account}</p>
          <button onClick={handleLogout}>Disconnect</button>
        </div>
      )}
    </div>
  );
};

export default MetaMaskLogin;
