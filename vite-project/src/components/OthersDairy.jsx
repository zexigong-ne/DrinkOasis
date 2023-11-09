import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/css/Diary.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Diary = () => {
  const [diaries, setDiaries] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Assuming checkUserLoginStatus returns the currently logged-in user's details
  const currentUser = checkUserLoginStatus();

  useEffect(() => {
    const isAuthenticated = currentUser !== null;

    if (!isAuthenticated) {
      navigate('/Login');
      return;
    }

    // Assuming you have a way to get the userID whose diaries you want to fetch
    // This could be from the URL or another state management
    const userToFetch = getUserIdToFetch();

    const apiUrl = `/userApi/diaries?id=${userToFetch}`;

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

  // This function checks if the current user is the author of the diary
  const isCurrentUserAuthor = (diaryUserId) => currentUser && diaryUserId === currentUser.id;

  // ... (other code)

  return (
    <div className='diary-area'>
      {/* ... */}
      <div>
        <ul className='diaryList'>
          {diaries.map((diary) => (
            <li key={diary.id} className='diaryItem'>
              <h4>{diary.title}</h4>
              <p>{diary.content}</p>
              {/* Only show the edit and delete buttons if the current user is the author of the diary */}
              {isCurrentUserAuthor(diary.userId) && (
                <div className='manage-btn'>
                  <button className='btn delete-btn' onClick={() => handleDelete(diary.id)}>Delete</button>
                  <button className='btn edit-btn' onClick={() => handleEditDiaryClick(diary.id)}>Edit</button>
                </div>
              )}
            </li>
          ))}
        </ul>  
      </div>
    </div>
  );
};

export default Diary;
