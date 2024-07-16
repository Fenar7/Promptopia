'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';

import Form from '@components/Form';

const EditPromptContent = () => {
    const router = useRouter();
    const { data: session } = useSession();
    const searchParams = useSearchParams();
    const promptId = searchParams.get('id');

    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        prompt: '',
        tag: ''
    });

    useEffect(() => {
        const getPromptDetails = async () => {
            console.log('Fetching prompt details');
            const response = await fetch(`/api/prompt/${promptId}`);
            if (!response.ok) throw new Error('Failed to fetch prompt details');
            const data = await response.json();
            setPost({
                prompt: data.prompt,
                tag: data.tag
            });
        };

        if (promptId) getPromptDetails();
    }, [promptId]);

    const updatePrompt = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        if (!promptId) {
            alert('Prompt ID not found');
            return setSubmitting(false);
        }

        try {
            console.log('Updating prompt');
            const response = await fetch(`/api/prompt/${promptId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    prompt: post.prompt,
                    tag: post.tag
                })
            });

            if (!response.ok) throw new Error('Failed to update prompt');
            
            router.push('/');
        } catch (error) {
            console.error('Error updating prompt:', error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Form
            type="Edit"
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={updatePrompt}
        />
    );
};

const EditPrompt = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <EditPromptContent />
        </Suspense>
    );
};

export default EditPrompt;
