import React, { useState } from 'react';

const AuthorView = () => {
    const [story, setStory] = useState({
        title: '',
        teaser: '',
        content: '',
        // Include more fields as needed
    });

    const handleChange = (event) => {
        setStory({ ...story, [event.target.name]: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Submit logic
        console.log('Story submitted:', story);
    };

    return (
        <div>
            <h1>Author's View</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input type="text" name="title" value={story.title} onChange={handleChange} />
                </div>
                <div>
                    <label>Teaser:</label>
                    <input type="text" name="teaser" value={story.teaser} onChange={handleChange} />
                </div>
                <div>
                    <label>Story Content:</label>
                    <textarea name="content" value={story.content} onChange={handleChange}></textarea>
                </div>
                {/* Include more fields as needed */}
                <button type="submit">Publish Story</button>
            </form>
        </div>
    );
};

export default AuthorView;
