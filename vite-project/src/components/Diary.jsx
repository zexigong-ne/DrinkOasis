import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/css/Diary.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Diary = () => {
  const [diaries, setDiaries] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

useEffect(() => {
    const isAuthenticated = sessionStorage.getItem("user") !== null;

    if (!isAuthenticated) {
      navigate('/Login');
      return;
    }

    // const username = sessionStorage.getItem("username");
    const username = checkUserLoginStatus();
    const apiUrl = `/userApi/diaries?username=${username}`;

    fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to fetch diaries');
        }
      })
      .then((data) => {
        setDiaries(data);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }


  const handlePostDiaryClick = () => {
    navigate('/PostDiary');
  };

  function checkUserLoginStatus() {
    const user = JSON.parse(sessionStorage.getItem("user"));
    console.log("jsx: ", user.username);
    return user && user.username ? user.username : null;
  }
  
    return (
      <div className='diary-area'>
        <section className="title">
        <div className="diary-title">
          <h1>📖 Diaries</h1>
        </div>
        </section>
        <div className="centered-button">
          <div className='post-btn'>
          <button className="post btn btn-large" onClick={handlePostDiaryClick}>Post</button>
          </div>
        </div>
        
        <div>
          <ul className='diaryList'>
          {diaries.map((diary) => (
            <li key={diary.id} className='diaryItem'>
              <h4>{diary.title}</h4>
              <p>{diary.content}</p>
              <div className='manage-btn'>
                {/* <button className='btn delete-btn' onClick={() => handleDelete(diary.id)}>Delete</button> */}
                <button className='btn edit-btn' to={`/edit/${diary.id}`}>Edit</button>
              </div>
            </li>
          ))}
          </ul>  
        </div>
      </div>
    );
  };
  


export default Diary;
