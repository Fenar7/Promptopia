"use client"

import {useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import Profile from '@components/Profile'

const MyProfile =  () => {
    const {data : session } = useSession()
    const [posts,setPosts] = useState([])

    useEffect(()=>{
        console.log('dfdf')
        const fetchPosts = async () => {
          const response = await fetch(`/api/users/${session?.user.id}/posts`)
          const data = await response.json()
          setPosts(data)
        }
        if(session?.user.id){
            console.log('session exists------')
            fetchPosts()
        }else{
            console.log('session dosent exist')
        }
      },[])

    const handleEdit = () =>{

    }

    const handleDelete = async () => {

    }

    return(
        <Profile
            name="My"
            desc="Welcome to your personalized profile page"
            data={[posts]}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    )
}

export default MyProfile