import { useRouter } from 'next/router'
import React from 'react'

const Header = () => {
  const router = useRouter();
  
  const clickHandler= () => {
    router.push('/completed')
  }
  return (
    <header className='w-full h-[60px] flex justify-between mb-10 items-center px-10 bg-[#43077d] text-gray-300'>
      <nav className='text-white font-bold text-2xl' onClick={() => router.push('/')}>To do App</nav>
      <p onClick={clickHandler} className='hover:pointer'>Completed Todos</p>
    </header>
  )
}

export default Header