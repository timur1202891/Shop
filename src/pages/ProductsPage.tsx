import React from 'react'
import { IPVersion } from 'net';
import { useContext} from 'react';
import CreateProduct from '../components/CreateProduct';
import { ErrorMessage } from '../components/error';
import { Loader } from '../components/loading';
import { Modal } from '../components/Modal';
import {Product} from '../components/Product'
import { ModalContext } from '../context/ModalCotext';
import { useProducts } from '../hooks/productss';
import { IProduct } from '../models';

const ProductsPage = () => {
	const {loading,error,products,addProduct}=useProducts()
	const {modal,open,close}=useContext(ModalContext)
  
	  const createHandler=(product:IProduct)=>{
		close()
		addProduct(product)
	  }
	 
	 return(
		<div className='container mx-auto max-w-2xl pt-5'>
		{loading && <Loader/>}
		{error &&<ErrorMessage error={error}/>}
		{products.map(product=><Product product={product} key={product.id} />)}
	  {modal &&<Modal title='Create new product' onClose={()=>close()}>
		<CreateProduct onCreate={createHandler} />
		</Modal>}
		 {/* <Product product={products[0]}/>
		 <Product product={products[1]}/> */}
		 <button className='fixed bottom-5 right-5 rounded-full py-2 px-4 border bg-yellow-400 hover:text-white' onClick={()=>open()}>+</button>
		</div>
	 )
}

export default ProductsPage