"use client";

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Profile from '@components/Profile';

const MyProfile = () => {
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);
  const router = useRouter()

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`/api/users/${session?.user.id}/posts`);
        const data = await response.json();
        console.log('###################fetch post fn', JSON.stringify(data));
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    if (session?.user.id) {
      console.log('session exists------');
      fetchPosts();
    } else {
      console.log('session doesn’t exist');
    }
  }, [session?.user.id]);

  useEffect(() => {
    console.log('-------------set post data =------', posts);
  }, [posts]); // Log the posts state whenever it changes

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`)
  };

  const handleDelete = async (post) => {
    const hasConfirmed = confirm("Are you sure you want to delete this prompt?")

    if(hasConfirmed){
      try{
        await fetch(`/api/prompt/${post._id.toString()}`,{
          method: 'DELETE'
        })

        const filteredPosts = posts.filter((p)=>p._id !== post._id)
        setPosts(filteredPosts)
      }catch(error){
        console.log(error)
      }
    }
  };

  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page"
      data={posts} // Directly pass posts array, no need to wrap it in an array
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
