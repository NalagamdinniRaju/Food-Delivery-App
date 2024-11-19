import React, { useEffect, useState } from 'react'
import './List.css'
import axios from 'axios'
import { toast } from 'react-toastify'

const List = ({url}) => {
    const[list,setList] = useState([])
    const feachList = async () => {
        const response = await axios.get(`${url}/api/food/list`)
        console.log(response)
        if (response.data.success){
            setList(response.data.data)

        }else{
            toast.error("Erorr")
        }
    }

    const removeFood = async (foodId) => {
        const response = await axios.post(`${url}/api/food/remove/`,{id:foodId})
        await feachList()
        if (response.data.success){
            toast.success(response.data.message)

        }else{
            toast.error("Erorr")
        }
    }
    useEffect(() => {
        feachList()
    },[])
  return (
    <div className='list add flex-col'>
        <p>All Food List</p>
        <div className="lisst-table">
            <div className="list-table-format title">
                <b>Image</b>
                <b>Name</b>
                <b>Category</b>
                <b>Price</b>
                <b>Action</b>
            </div>
            {
                list.map((item,index) => {
                    return (
                        <div key={index} className="list-table-format">
                            <img src={`${url}/images/`+ item.image} alt="food" className="list-image" />
                            <p>{item.name}</p>
                            <p>{item.category}</p>
                            <p>${item.price}</p>
                            <p><button onClick={() => removeFood(item._id)}>X</button></p>
                            </div>
                    )
                })
            }
        </div>
    </div>
  )
}

export default List