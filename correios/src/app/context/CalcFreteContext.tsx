'use client'

import { createContext, useContext, useState, ReactNode, useEffect } from 'react'

interface CalcFreteProviderProps {
    children: ReactNode;
}

const CalcFreteContext = createContext({
    calcFrete: [{
        name: '',
        price: '',
        discount: '',
        delivery_time: 0,
    }],
    setCalcFrete: function (value:any) { return value },
})

export const CalcFreteProvider : React.FC<CalcFreteProviderProps> = ({children}) => {

    const [calcFrete, setCalcFrete] = useState<any[]>([]);
    

    const value = {
        calcFrete,
        setCalcFrete,
    }

    return (
        <CalcFreteContext.Provider value={value} >{children}</CalcFreteContext.Provider>
    ) 
}

export const useCalcFreteContext = () => {
    
    const context = useContext(CalcFreteContext);

    if (!context) {
        throw new Error('Error')
    }

    return context;
}

