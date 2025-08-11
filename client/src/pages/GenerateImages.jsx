import { Image, Sparkles } from 'lucide-react'
import React from 'react'
import { useState } from 'react'

const GenerateImages = () => {

  const imageStyle = [ 'Realistic' , 
                       'Gibli Style' , 
                       'Anime Style', 
                       'Cartoon Style' , 
                       '3D Style',
                       'Portrait Style' 
                    ]
    
      const [selectedImage, setSelectedImage] = useState('Realistic')
      const [input , setInput] = useState('')
      const [publish , setPublish] = useState(false)

      const onSubmitHandler = async (e) => {
        e.preventDefault()
      }


  return (
    <div className='h-full overflow-y-scroll p-6 flex items-start flex-warp gap-4 text-slate-700'>
          {/* left-col */}
          <form  onSubmit={onSubmitHandler} className='w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200'>
            <div className='flex gap-3 items-center'>
              <Sparkles className='w-6 text-[#00AD25]'/>
              <h1 className='text-xl font-semibold'>AI Image Generetor</h1>
            </div>
            <p className='mt-6 text-sm font-semibold'>Describe Your Image</p>
    
            <textarea onChange={(e) => setInput (e.target.value)} 
                      value={input} 
                      rows={4} 
                      className='w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300  ' 
                      placeholder='Describe what you want to see in the image...' 
                      required />
    
            <p className='mt-4 text-sm font-semibold'>
              Style
            </p>
    
            <div className='mt-3 flex gap-3 flex-wrap sm:max-w-9/11 '>
              {
                imageStyle.map((item) => (
                  <span onClick={() => setSelectedImage(item)} 
                        className={`text-xs px-4 py-1 border rounded-full cursor-pointer ${selectedImage === item ? ' bg-green-50  text-green-700 ' : ' text-gray-500 border-gray-300 '}`} 
                        key={item}> {item}
                        </span>
                ))
              }
            </div>

            <div className='my-6 flex item-center gap-2'>
              <label className='cursor-pointer relative'>
                <input type="checkbox"
                       onChange={(e) =>setPublish(e.target.checked)}
                       checked= {publish} 
                       className='sr-only peer'
                       />

                    <div className='rounded-full w-9 h-5 bg-slate-300 peer-checked:bg-green-500 transition'></div>

                    <span className='rounded-full bg-white absolute w-3 h-3 left-1 top-1 transition peer-checked:translate-x-4'></span>   
              </label>
              
              <p className='text-sm '> Make this image public</p>

            </div>

            <br />
    
            <button className='w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#00AD25] to-[#04FF50] text-white
                               px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer'>
              <Image className='w-5' />
              Generate Image
            </button>
    
            
          </form>
          {/* right col */}
    
          <div className='width-full max-w-lg p-4 rounded-lg flex flex-col border border-gray-200 min-h-96 bg-white '>
            <div className='flex items-center gap-3'>
              <Image className='w-5 h-5 text-[#00AD25]' />
              <h1 className='text-xl font-semibold'>Generated image</h1>
            </div>
    
            <div className='flex flex-1 justify-center items-center'>
              <div className='text-sm flex flex-col items-center gap-5 text-gray-400'>
              <Image className='w-9 h-9'/>
              <p>Enter a topic and click "Generate images" to get started</p>
              </div>
    
            </div>
    
          </div>
    
        </div>
  )
}

export default GenerateImages