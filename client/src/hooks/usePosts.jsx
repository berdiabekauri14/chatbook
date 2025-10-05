import { useState, useEffect } from 'react';

export default function usePosts (fetchPosts) {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;
        setLoading(true);
        fetchPosts()
            .then(data => {
                if (isMounted) {
                    setPosts(data);
                    setLoading(false);
                }
            })
            .catch(err => {
                if (isMounted) {
                    setError(err);
                    setLoading(false);
                }
            });
        return () => {
            isMounted = false;
        };
    }, [fetchPosts]);

    return { posts, loading, error };
};