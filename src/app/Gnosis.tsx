"use client"

import React, { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import { EthersAdapter, SafeAccountConfig, SafeFactory } from '@safe-global/protocol-kit'
import SafeApiKit from '@safe-global/api-kit'



const Gnosis = ({ signer, provider }: any) => {

    const [factory, setFactory] = useState<any>(null)
    const [owner1, setOwner1] = useState<any>("")
    const [owner2, setOwner2] = useState<any>("")
    const [safes, setSafes] = useState<string[]>([])

    useEffect(() => {
        const getSafes = async () => {
            const ethAdapterOwner1 = new EthersAdapter({
                ethers,
                signerOrProvider: signer
            })
            const txServiceUrl = 'http://localhost:8000/txs'
            const safeService = new SafeApiKit({ txServiceUrl, ethAdapter: ethAdapterOwner1 })
            const safes = await safeService.getSafesByOwner("0x39e6A943F3C81E053Bd4Ef03828E5dC4f9F625Bc")
            setSafes(safes.safes)
        }
        if(signer){getSafes()}
    }, [signer])



    const createSafe = async () => {
        const ethAdapterOwner1 = new EthersAdapter({
            ethers,
            signerOrProvider: signer
        })
        const txServiceUrl = 'http://localhost:8000/txs'
        const safeService = new SafeApiKit({ txServiceUrl, ethAdapter: ethAdapterOwner1 })
        const safeAccountConfig: SafeAccountConfig = {
            owners: [
                owner1 || "0x39e6A943F3C81E053Bd4Ef03828E5dC4f9F625Bc",
                owner2 || "0x7De7d12cf78CaB49a50895cfc975cA6915d4A7e1"
            ],
            threshold: 2,
        }
        const safeFactory = await SafeFactory.create({ ethAdapter: ethAdapterOwner1 })
        const safeSdkOwner1 = await safeFactory.deploySafe({ safeAccountConfig })
        const safeAddress = await safeSdkOwner1.getAddress()

        console.log('Your Safe has been deployed:', safeAddress)
    }
    return (
        <>
            <div>Gnosis</div>

            <div>
                <p> Enter addr1 of the owner:</p>
                <input value={owner1} onChange={(e) => setOwner1(e.target.value)} />
            </div>
            <div>
                <p> Enter addr2 of the owner:</p>
                <input value={owner2} onChange={(e) => setOwner2(e.target.value)} />
            </div>
            <button onClick={createSafe} >Create Safe</button>
            <ol>
                {safes.length > 0 && safes.map(safe => {
                    return (<li key={safe}>{safe}</li>)
                })}
            </ol>
        </>
    )

}



export default Gnosis