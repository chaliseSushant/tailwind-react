import React, { useCallback, useEffect, useRef, useState } from 'react'

const PasswordGenerator = () => {
    const [length,setLength] = useState(8)
    const [numberAllowed,setNumberAllowed] = useState(false)
    const [charsAllowed, setCharsAllowed] = useState(false)
    const [password,setPassword] = useState("")
    const passwordRef = useRef(null)

    const passwordGenerator = useCallback(()=>{
      let pass = ""
      let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
      if(numberAllowed) str +="0123456789"
      if (charsAllowed) str += "!@#$%^&*()-_=={}[]~`;?"

      for (let i=0; i <length;i++){
        let char = Math.floor(Math.random()*str.length+1)
        pass+=str.charAt(char)
      }

      setPassword(pass)

    },[length,numberAllowed,charsAllowed,setPassword])

    const copyToClipboard = useCallback(()=>{

      passwordRef.current?.select()
      passwordRef.current?.setSelectionRange(0,50)
      window.navigator.clipboard.writeText(password)
    },[password])
    useEffect(()=>{
      passwordGenerator()
    },[length,numberAllowed,charsAllowed,passwordGenerator])
  return (
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500'>
        <h1 className='text-white text-center my-3'>Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input type="text" value={password} ref={passwordRef} className='outline-none w-full py-1 px-2' placeholder='Password' readOnly />
          <button className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0' onClick={copyToClipboard}>Copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
              <input type="range" id='range' min={8} max={50} value={length} className='cursor-pointer' onChange={(e)=>setLength(e.target.value)}/>
              <label htmlFor="range">Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input type="checkbox" id='numAllowed' onClick={()=>setNumberAllowed((prev)=>!prev)}/>
            <label htmlFor="numbeAllowed">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input type="checkbox" id='charAllowed' onClick={()=>setCharsAllowed((prev)=>!prev)}/>
            <label htmlFor="charAllowed">Characters</label>
          </div>
        </div>


    </div>
  )
}

export default PasswordGenerator