'use client'

import React from 'react'
import { useCalcFreteContext } from '../context/CalcFreteContext'

export const ContainerFrete = () => {
    const {calcFrete} = useCalcFreteContext()
    console.log(calcFrete[0])
  return (
        
        <div className='m-auto sm:w-[500px] lg:h-full lg:w-[600px] mt-32 bg-stone-950 shadow-2xl rounded-xl'>
            <h1 className='text-3xl font-extrabold pt-12 mb-4 text-center text-yellow-400' >Informações Frete</h1>
            <div className="grid grid-cols-2 lg:mx-14">

            {calcFrete.map((frete:any,i)=>{
                if (i < 6){
                    return (
                    
                        <div key={i} className="m-auto flex w-40 lg:w-max lg:text-sm text-xs flex-col p-4 text-start text-blue-400 my-2">
                        <p className=''>Nome: {frete.name}</p>
                        <p className=''>Preço: {frete.price} R$</p>
                        <p className=''>Desconto: {frete.discount} R$</p>
                        <p className=''>Tempo: {frete.delivery_time}Dias</p>
                        </div>
    
                    )
                }
                
            })}
            

            </div>
            
        
        
    </div>
  )
}
