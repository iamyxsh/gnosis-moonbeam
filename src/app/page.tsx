"use client"
import MetaMaskLogin from './Login'
import Gnosis from './Gnosis'
import { useState } from 'react';

export default function Home() {
  const [signer, setSigner] = useState<any>(null);
    const [provider, setProvider] = useState<any>(null);
  return (
    <>
      <MetaMaskLogin signer={signer} setSigner={setSigner} provider={provider} setProvider={setProvider} />
      <Gnosis signer={signer} />
    </>
  )
}
