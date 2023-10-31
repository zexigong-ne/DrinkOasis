import { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../assets/css/PostDiary.css';
import 'bootstrap/dist/css/bootstrap.min.css'

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
      <div className='post-area'>
        <section className="title">
        <div className="post-title">
          <h1>📖 Post Your Diary!</h1>
        </div>
        </section>
      <div className='text'>
        <div className='text-area'>
        <textarea
          placeholder="Write your diary entry..."
          className='text-box'
          value={newDiaryText}
          onChange={(e) => setNewDiaryText(e.target.value)}
        />
        <button className='btn btn-lg btn-block btn-submit' onClick={handlePostDiary}>Post</button>
        <Link to="/Diary" className='back-link'>Back to Diaries</Link>
        </div>
      </div>
    </div>
  );
};

PostDiary.propTypes = {
    addDiary: PropTypes.func.isRequired,
  };

export default PostDiary;
