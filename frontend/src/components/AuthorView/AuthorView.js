import React, { useState, useEffect } from 'react';
import { useAuth } from '../../AuthContext';

const AuthorView = () => {
    const [story, setStory] = useState({
        title: '',
        teaser: '',
        content: '',
        category: ''
    });
    const [categories, setCategories] = useState([]);
    const [message, setMessage] = useState('');
    const { auth } = useAuth(); // Use the useAuth hook

    useEffect(() => {
        fetch('http://localhost:5001/api/categories')
            .then(response => response.json())
            .then(data => setCategories(data))
            .catch(error => console.error('Error fetching categories:', error));
    }, []);

    // Handle changes in form inputs
    const handleChange = (event) => {
        const { name, value } = event.target;
        setStory({ ...story, [name]: value });
    };

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:5001/api/stories', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(story)
            });
            const data = await response.json();
            if (response.ok) {
                setMessage('Story submitted successfully!');
                setStory({ title: '', teaser: '', content: '', category: '' });
            } else {
                setMessage(`Submission failed: ${data.message}`);
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('An error occurred while submitting the story.');
        }
    };


    const categoryOptions = ["Technology", "Sports", "Entertainment", "Others"];

    console.log("Auth state in AuthorView:", auth);

    return (
        <div>
            <h1>Author's View</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input 
                        type="text" 
                        name="title" 
                        value={story.title} 
                        onChange={handleChange} 
                    />
                </div>
                <div>
                    <label>Teaser:</label>
                    <input 
                        type="text" 
                        name="teaser" 
                        value={story.teaser} 
                        onChange={handleChange} 
                    />
                </div>
                <div>
                    <label>Content:</label>
                    <textarea 
                        name="content" 
                        value={story.content} 
                        onChange={handleChange}
                    ></textarea>
                </div>

                <div>
                    <label>Category:</label>
                    <select 
                        name="category" 
                        value={story.category} 
                        onChange={handleChange}
                    >
                        <option value="">Select Category</option>
                        {categories.map(category => (
                            <option key={category._id} value={category._id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Include additional fields as needed */}
                <button type="submit">Publish Story</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default AuthorView;
