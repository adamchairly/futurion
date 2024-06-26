import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createPost } from '../services/PostService';
import { toast } from 'react-toastify';

const useCreatePost = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Prevent too long input
        if (title.length > 30) {
            toast.error('Title must not exceed 30 characters.');
            return;
        }
        if (content.length > 100) {
            toast.error('Content must not exceed 100 characters.');
            return; 
        }

        const token = localStorage.getItem('token');
        //console.log("Token:", token);
        try {
            await createPost({ title, content }, token);
            toast.success('Post created successfully.');
            router.push('/');
        } catch (error: any) {
            if (error.response) {
                console.error("Server responded with an error:", error.response.data);
                toast.error('Failed to create post');
            } else {
                console.error("Error creating post:", error);
                toast.error('Failed to create post');
            }
        }
    };

    return {
        title,
        setTitle,
        content,
        setContent,
        handleSubmit,
    };
};

export default useCreatePost;