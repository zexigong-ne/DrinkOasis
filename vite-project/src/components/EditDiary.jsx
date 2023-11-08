import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../assets/css/PostDiary.css';
import 'bootstrap/dist/css/bootstrap.min.css'

function EditDiary() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const userId = checkUserLoginStatus();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'title') {
      setTitle(value);
    } else if (name === 'content') {
      setContent(value);
    }
  };

  const handleEditDiary = (e) => {
    e.preventDefault();
    if (title && content) {
      fetch(`/userApi/postDiary?id=${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: title,
          content: content,  
        }),
      })
        .then((response) => {
          if (response.status === 200) {
            navigate("/Diary");
            return response.json();
          } else {
            throw new Error('Failed to post diary');
          }
        })
        .catch((error) => {
          console.error(error.message);
        });
    }else {
      alert("Please fill in the title and content before posting");
    }
  };

  function checkUserLoginStatus() {
    const user = JSON.parse(sessionStorage.getItem("user"));
    return user && user.id ? user.id : null;
  }

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
          placeholder="Write your diary title..."
          className='text-box'
          name='title'
          value={title}
          onChange={handleInputChange}
        />
        <textarea
          placeholder="Write your diary entry..."
          className='text-box'
          name='content'
          value={content}
          onChange={handleInputChange}
        />
        <button className='btn btn-lg btn-block btn-submit' type="submit" onClick={handleEditDiary}>Post</button>
        <Link to="/Diary" className='back-link'>Back to Diaries</Link>
        </div>
      </div>
    </div>
  );
}

EditDiary.propTypes = {
    addDiary: PropTypes.func.isRequired,
  };

export default EditDiary;
