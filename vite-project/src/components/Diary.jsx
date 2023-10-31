import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/css/Diary.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Diary = () => {
    // Move the state and logic for diaries to the parent component (Diary)
    const [diaries, setDiaries] = useState([
      { id: 1, text: 'Diary Entry 1' },
      { id: 2, text: 'Diary Entry 2' },
    ]);
  
  const handleDelete = (id) => {
    const updatedDiaries = diaries.filter((diary) => diary.id !== id);
    setDiaries(updatedDiaries);
  };

  const navigate = useNavigate();

  const handlePostDiaryClick = () => {
    navigate('/PostDiary');
  };
  
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
              <p>{diary.text}</p>
              <div className='manage-btn'>
                <button className='btn delete-btn' onClick={() => handleDelete(diary.id)}>Delete</button>
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
