import type { NextPage } from 'next'

const Styleguide: NextPage = () => {
  return (
    <div className='flex flex-col p-4'>
      <header className='font-sans-serif text-xxxl font-semibold mb-16 text-black pb-4 border-b'>Pebbles Styleguide</header>
      <h1 className='font-sans-serif text-xxxl font-semibold mb-4 text-black'>Title</h1>
      <h2 className='font-sans-serif text-xxl font-semibold mb-4 text-black'>Subtitle</h2>
      <h3 className='font-sans-serif text-xl font-medium mb-4 text-black'>Heading XL</h3>
      <h4 className='font-sans-serif text-lg font-medium mb-4 text-black'>Heading L</h4>
      <h5 className='font-sans-serif text-md font-medium mb-4 text-black'>Heading M</h5>
      <p className='font-sans-serif text-md font-normal mb-4 text-black'>Body M</p>
      <p className='font-sans-serif text-base font-normal mb-4 text-black'>Body</p>
      <p className='font-sans-serif text-sm font-normal mb-4 text-black'>Body S</p>
      <span className='font-sans-serif text-md font-medium mb-4 text-black'>Button M</span>
      <span className='font-sans-serif text-sm font-medium mb-4 text-black'>Button</span>

      <div className='flex mt-16'>
        <div className='bg-red w-32 h-32'></div>
        <div className='bg-red-light w-32 h-32'></div>
        <div className='bg-red-dark w-32 h-32'></div>
        <div className='bg-blue w-32 h-32'></div>
        <div className='bg-blue-light w-32 h-32'></div>
        <div className='bg-blue-dark w-32 h-32'></div>
        <div className='bg-green w-32 h-32'></div>
        <div className='bg-green-light w-32 h-32'></div>
        <div className='bg-green-dark w-32 h-32'></div>
      </div>
    </div>
  )
}

export default Styleguide