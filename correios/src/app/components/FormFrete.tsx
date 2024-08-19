'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {contactDataType} from '@/app/types/FormFreteType'
import { InputMask } from '../utils/InputMask';
import { products } from '../constants/products';
import { useCalcFreteContext } from '../context/CalcFreteContext';

export const FormFrete = () => {
    
    const [contactData, setContactData] = useState<contactDataType>({
        firstname: '',
        lastname: '',
        cep: '',
        adresses: '',
        houseNumber: '',
        cityComplement: '',
        neighborhood: '',
        city: '',
        uf: '',
        height: '',
        width: '',
        _length: '',
        weight: '',
    })

    const [errors,setErrors] = useState<any>({
        firstname: '',
        lastname: '',
        cep: '',
        adresses: '',
        houseNumber: '',
        cityComplement: '',
        neighborhood: '',
        city: '',
        uf: '',
        height: '',
        width: '',
        _length: '',
        weight: '',
        
    })

    const [_listUf, setListUf] = useState<any[]>([])
    const {setCalcFrete} = useCalcFreteContext()

    const handleOnChange = (e:any)=> {
        e.preventDefault()
        switch(e.target.name){

            case 'cep':
                const cepObj = {...contactData,[e.target.name]:InputMask('cep',e.target.value)}
                setContactData(cepObj)

                break;

            case 'weight':
                const weightObj = {...contactData,[e.target.name]:InputMask('weight',e.target.value)}
                setContactData(weightObj)

                break;
          
          default:
             const newObj = {...contactData,[e.target.name]:e.target.value}
             setContactData(newObj)
           
        }
     
    }

    const handleOnBlurCep = async(ev:any) => {

        const { value } = ev.target;

        const unmaskCep = value?.replace(/[^0-9]/g, '');
        
        if (unmaskCep?.length !== 8) {
            return;
        }

        const _url = 'http://localhost:3001/cep'

        const result = await axios.post(_url,{cep: unmaskCep})

        const {logradouro,localidade, bairro, uf} = result.data
        console.log(result)
        const newObj = {
            ...contactData,
            adresses:logradouro,
            neighborhood: bairro,
            city: localidade,
            uf,
            
        }
            setContactData(newObj)
        
        

    }
    
    const handleOnSubmit = async(e:any) => {
        e.preventDefault()

        const validationErrors = {

            firstname: '',
            lastname: '',
            cep: '',
            adresses: '',
            houseNumber: '',
            cityComplement: '',
            neighborhood: '',
            city: '',
            uf: '',
            height: '',
            width: '',
            _length: '',
            weight: '',

        }

        const unmaskCep = contactData.cep?.replace(/[^0-9]/g, '');
        

        if (!contactData.firstname.trim()){
            validationErrors.firstname = "Campo obrigatório"
            setErrors(validationErrors)
            return
        } else if (contactData.firstname.length < 3){
            validationErrors.firstname = 'Nome deve ter pelo menos 3 caracteres'
            setErrors(validationErrors)
            return
        }
        
        if (!contactData.lastname.trim()){
            validationErrors.lastname = "Campo obrigatório"
            setErrors(validationErrors)
            return
        } else if (contactData.lastname.length < 3){
            validationErrors.lastname = 'Sobrenome deve ter pelo menos 3 caracteres'
            setErrors(validationErrors)
            return
        }

        if (!contactData.cep.trim()){
            validationErrors.cep = "Campo obrigatório"
            setErrors(validationErrors)
            return
        } else if (unmaskCep?.length !== 8){
            validationErrors.cep = 'Cep deve ter pelo menos 8 caracteres'
            setErrors(validationErrors)
            return
        }
        
        if (!contactData.adresses.trim()){
            validationErrors.adresses = "Campo obrigatório"
            setErrors(validationErrors)
            return
        } else if (contactData.adresses.length < 4){
            validationErrors.adresses = 'Endereço deve ter pelo menos 4 caracteres'
            setErrors(validationErrors)
            return
        }
                
        if (!contactData.houseNumber.trim()){
            validationErrors.houseNumber = "Campo obrigatório"
            setErrors(validationErrors)
            return
        }
                
        if (!contactData.neighborhood.trim()){
            validationErrors.neighborhood = "Campo obrigatório"
            setErrors(validationErrors)
            return
        }
                
        if (!contactData.city.trim()){
            validationErrors.city = "Campo obrigatório"
            setErrors(validationErrors)
            return
        }
                
        if (!contactData.uf.trim()){
            validationErrors.uf = "Campo obrigatório"
            setErrors(validationErrors)
            return
        }
        
        
        const args = {
            
            ...contactData,
            cep: unmaskCep,
        }

        const _urlfrete = 'http://localhost:3001/frete'
        const result = await (await (axios.post(_urlfrete,args))).data
        console.log(result)
        setCalcFrete(result)
        // products.map(async(product, i) => {

        

        // })
        

        

    }

    useEffect(() => {
        const handleGetUf = async() => {
            const burl = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados';
      
            let listUf = (await axios.get(burl)).data
            setListUf(listUf)
          }
          handleGetUf()
        
    }, []);

  return (
    
    <div className="m-auto mt-32 ">
        
        <form onSubmit={handleOnSubmit} className='sm:w-[500px] lg:w-[600px] mb-32 bg-stone-950 shadow-2xl rounded-xl'>
        
        <h1 className='text-3xl pt-12 font-extrabold text-center text-yellow-400' >Calcular Frete</h1>
            
            <div className=" p-8 lg:grid lg:grid-cols-6 gap-4">

                    <div className='lg:col-span-3 flex flex-col'>

                        <label 
                        className='text-blue-400 my-2'
                        htmlFor='firstname'>Nome <span className='text-red-600'>*</span></label>

                        <input
                        id='firstname'
                        name='firstname'
                        placeholder='Digite seu nome'
                        className='text-blue-400 placeholder-blue-400 placeholder-opacity-25 focus:outline-none focus:ring-0 
                        focus:border-blue-600 p-1 bg-transparent border-b border-blue-400'
                        type="text"
                        onChange={handleOnChange}
                        value={contactData.firstname}
                        
                        />
                        {errors.firstname && <span className='text-[#e63939] text-[12px] mt-2'>{errors.firstname}</span>}

                    </div>

                    <div className='lg:col-span-3 flex flex-col'>

                        <label 
                        className='text-blue-400 my-2'
                        htmlFor='lastname'>Sobrenome <span className='text-red-600'>*</span></label>

                        <input
                        id='lastname'
                        name='lastname'
                        placeholder='Digite seu sobrenome'
                        className='text-blue-400 placeholder-blue-400 placeholder-opacity-25 focus:outline-none focus:ring-0 
                        focus:border-blue-600 p-1 bg-transparent border-b border-blue-400'
                        type="text" 
                        onChange={handleOnChange}
                        value={contactData.lastname}
                        />
                        {errors.lastname && <span className='text-[#e63939] text-[12px] mt-2'>{errors.lastname}</span>}

                    </div>

                    <div className='lg:col-span-3 flex flex-col'>

                        <label 
                        className='text-blue-400 my-2'
                        htmlFor='cep'>Pais <span className='text-red-600'>*</span></label>

                        <span

                        className='text-blue-400 font-extrabold placeholder-blue-400 placeholder-opacity-25 focus:outline-none focus:ring-0 
                        focus:border-blue-600 p-1 bg-transparent focus:bg-transparent border-blue-400'

                        >Brasil</span>
                        

                    </div>

                    <div className='lg:col-span-3 lg:col-start-1 flex flex-col'>

                        <label 
                        className='text-blue-400 my-2'
                        htmlFor='cep'>CEP <span className='text-red-600'>*</span></label>

                        <input
                        id='cep'
                        name='cep'
                        placeholder='Digite seu cep'
                        className='text-blue-400 placeholder-blue-400 placeholder-opacity-25 focus:outline-none focus:ring-0 
                        focus:border-blue-600 p-1 bg-transparent focus:bg-transparent border-b border-blue-400'
                        type="text"
                        onChange={handleOnChange}
                        value={contactData.cep}
                        onBlur={handleOnBlurCep}
                        />
                        {errors.cep && <span className='text-[#e63939] text-[12px] mt-2'>{errors.cep}</span>}

                    </div>

                    <div className='col-start-1 col-span-4 flex flex-col'>

                        <label 
                        className='text-blue-400 my-2'
                        htmlFor='adresses'>Endereço <span className='text-red-600'>*</span></label>

                        <input
                        id='adresses'
                        name='adresses'
                        placeholder='Digite seu endereço'
                        className='text-blue-400 placeholder-blue-400 placeholder-opacity-25 focus:outline-none focus:ring-0 
                        focus:border-blue-600 p-1 bg-transparent border-b border-blue-400'
                        type="text"
                        onChange={handleOnChange}
                        value={contactData.adresses}
                        />
                        {errors.adresses && <span className='text-[#e63939] text-[12px] mt-2'>{errors.adresses}</span>}

                    </div>

                    <div className='col-span-2 flex flex-col'>

                        <label 
                        className='text-blue-400 my-2'
                        htmlFor='houseNumber'>N° <span className='text-red-600'>*</span></label>

                        <input
                        id='houseNumber'
                        name='houseNumber'
                        placeholder='Número residencial'
                        className='text-blue-400 placeholder-blue-400 placeholder-opacity-25 focus:outline-none focus:ring-0 
                        focus:border-blue-600 p-1 bg-transparent border-b border-blue-400'
                        type="text"
                        onChange={handleOnChange}
                        value={contactData.houseNumber}
                        />
                        {errors.houseNumber && <span className='text-[#e63939] text-[12px] mt-2'>{errors.houseNumber}</span>}

                    </div>

                    <div className='col-start-1 col-span-6 flex flex-col'>

                        <label 
                        className='text-blue-400 my-2'
                        htmlFor='cityComplement'>Complemento (opcional)</label>

                        <input
                        id='cityComplement'
                        name='cityComplement'
                        placeholder='Digite o complemento'
                        className='text-blue-400 placeholder-blue-400 placeholder-opacity-25 focus:outline-none focus:ring-0 
                        focus:border-blue-600 p-1 bg-transparent border-b border-blue-400'
                        type="text"
                        onChange={handleOnChange}
                        value={contactData.cityComplement}
                        />
                        {errors.cityComplement && <span className='text-[#e63939] text-[12px] mt-2'>{errors.cityComplement}</span>}

                    </div>

                    <div className='col-span-3 flex flex-col'>

                        <label 
                        className='text-blue-400 my-2'
                        htmlFor='neighborhood'>Bairro <span className='text-red-600'>*</span></label>

                        <input
                        id='neighborhood'
                        name='neighborhood'
                        placeholder='Digite seu bairro'
                        className='text-blue-400 placeholder-blue-400 placeholder-opacity-25 focus:outline-none focus:ring-0 
                        focus:border-blue-600 p-1 bg-transparent border-b border-blue-400'
                        type="text"
                        onChange={handleOnChange}
                        value={contactData.neighborhood}
                        />
                        {errors.neighborhood && <span className='text-[#e63939] text-[12px] mt-2'>{errors.neighborhood}</span>}

                    </div>

                    <div className='col-start-1 col-span-3 flex flex-col'>

                        <label 
                        className='text-blue-400 my-2'
                        htmlFor='city'>Cidade <span className='text-red-600'>*</span></label>

                        <input
                        id='city'
                        name='city'
                        placeholder='Digite sua cidade'
                        className='text-blue-400 placeholder-blue-400 placeholder-opacity-25 focus:outline-none focus:ring-0 
                        focus:border-blue-600 p-1 bg-transparent border-b border-blue-400'
                        type="text"
                        onChange={handleOnChange}
                        value={contactData.city}
                        />
                        {errors.city && <span className='text-[#e63939] text-[12px] mt-2'>{errors.city}</span>}

                    </div>

                    <div className='col-span-3 flex flex-col'>

                        <label 
                        className='text-blue-400 my-2'
                        htmlFor='uf'>Estado <span className='text-red-600'>*</span></label>

                        <select
                        
                        name="uf"
                        id="uf"
    
                        className='text-blue-400 focus:text-black text-opacity-25 focus:outline-none focus:ring-0 
                        focus:border-blue-600 p-1 bg-transparent border-b border-blue-400'
                        onChange={handleOnChange}
                        value={contactData.uf}
                        >
                            <option value=''>Selecione um estado</option>
                                {
                                    
                            _listUf?.map((uf:any) => (<option key={uf.id} value={uf.sigla}>{uf.nome}</option>))
                            }
                        </select>
                        {errors.uf && <span className='text-[#e63939] text-[12px] mt-2'>{errors.uf}</span>}

                    </div>
                    
                    <div className='lg:col-span-3 flex flex-col'>

                        <label 
                        className='text-blue-400 my-2'
                        htmlFor='height'>Altura <span className='text-red-600'>*</span></label>

                        <input
                        id='height'
                        name='height'
                        placeholder='Digite a altura'
                        className='text-blue-400 placeholder-blue-400 placeholder-opacity-25 focus:outline-none focus:ring-0 
                        focus:border-blue-600 p-1 bg-transparent border-b border-blue-400'
                        type="text"
                        onChange={handleOnChange}
                        value={contactData.height}
                        
                        />
                        {errors.height && <span className='text-[#e63939] text-[12px] mt-2'>{errors.height}</span>}

                    </div>

                    <div className='lg:col-span-3 flex flex-col'>

                        <label 
                        className='text-blue-400 my-2'
                        htmlFor='width'>Largura <span className='text-red-600'>*</span></label>

                        <input
                        id='width'
                        name='width'
                        placeholder='Digite a largura'
                        className='text-blue-400 placeholder-blue-400 placeholder-opacity-25 focus:outline-none focus:ring-0 
                        focus:border-blue-600 p-1 bg-transparent border-b border-blue-400'
                        type="text" 
                        onChange={handleOnChange}
                        value={contactData.width}
                        />
                        {errors.width && <span className='text-[#e63939] text-[12px] mt-2'>{errors.width}</span>}

                    </div>
                    
                    <div className='lg:col-span-3 flex flex-col'>

                        <label 
                        className='text-blue-400 my-2'
                        htmlFor='_length'>Comprimento <span className='text-red-600'>*</span></label>

                        <input
                        id='_length'
                        name='_length'
                        placeholder='Digite o comprimento'
                        className='text-blue-400 placeholder-blue-400 placeholder-opacity-25 focus:outline-none focus:ring-0 
                        focus:border-blue-600 p-1 bg-transparent border-b border-blue-400'
                        type="text"
                        onChange={handleOnChange}
                        value={contactData._length}
                        
                        />
                        {errors._length && <span className='text-[#e63939] text-[12px] mt-2'>{errors._length}</span>}

                    </div>

                    <div className='lg:col-span-3 flex flex-col'>

                        <label 
                        className='text-blue-400 my-2'
                        htmlFor='weight'>Peso <span className='text-red-600'>*</span></label>

                        <input
                        
                        id='weight'
                        name='weight'
                        placeholder='Digite o peso'
                        className='text-blue-400 placeholder-blue-400 placeholder-opacity-25 focus:outline-none focus:ring-0 
                        focus:border-blue-600 p-1 bg-transparent border-b border-blue-400'
                        type="text" 
                        onChange={handleOnChange}
                        value={contactData.weight}
                        />
                        {errors.weight && <span className='text-[#e63939] text-[12px] mt-2'>{errors.weight}</span>}

                    </div>

                    <button className='col-start-6 col-span-2 mt-2 text-white rounded bg-blue-400 hover:bg-blue-600 p-2' type='submit'>Calcular</button>

            </div>

            </form>
                
        </div>
        
        
  
        
  )
}
