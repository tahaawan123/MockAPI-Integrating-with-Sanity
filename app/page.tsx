import React from 'react'
import { client } from '@/sanity/lib/client'; 
import Image from 'next/image';

interface Product {
  name: string;
  price: number;
  description: string;
  imageUrl: string;
}


async function getData (){
  const fetchData = await client.fetch(` *[_type == "product"]
{
  name,price,description,
   "imageUrl": image.asset->url 
}`);

return fetchData
}


const page = async() => {
  const data =await getData();
  console.log(data);
  return (
    <div>


     <h1 className='text-center text-3xl font-mono font-bold mb-5'>MockAPI Integrating Sanity with Next js </h1>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5  '>

        {data.map((item:Product,i:number)=>{
          return <div key={i} className='p-2 border-[2px] shadow-md hover:scale-105'>
               <Image 
               src={item.imageUrl} 
               alt={item.name} 
               width={300} 
               height={300} 
               />
               <h2 className='font-bold  text-3xl text-center'>  {item.name}</h2>
               <p>{item.description}</p>
               <p className='text-red-500 text-bold'>Price:{item.price}</p>
          </div>
          
        })}
    </div>
    </div>
  )
}

export default page




