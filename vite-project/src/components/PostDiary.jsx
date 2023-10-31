import { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const PostDiary = ({ addDiary }) => {
  const [newDiaryText, setNewDiaryText] = useState('');

  const handlePostDiary = () => {
    if (newDiaryText) {
      const newDiary = {
        id: Date.now(), // Generate a unique ID (e.g., using a timestamp)
        text: newDiaryText,
      };
      addDiary(newDiary); // Add the new diary to the list
      setNewDiaryText(''); // Clear the input field
    }
  };

  return (
    <div>
      <h2>Post Diary Entry</h2>
      <div>
        <textarea
          placeholder="Write your diary entry..."
          value={newDiaryText}
          onChange={(e) => setNewDiaryText(e.target.value)}
        />
        <button onClick={handlePostDiary}>Post</button>
        <Link to="/Diary">Back to Diaries</Link>
      </div>
    </div>
  );
};

PostDiary.propTypes = {
    addDiary: PropTypes.func.isRequired,
  };

export default PostDiary;
