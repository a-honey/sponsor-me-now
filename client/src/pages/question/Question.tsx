import OffenList from './components/Question.OffenList';
import Other from './components/Question.Other';

const Question = () => {
  return (
    <article>
      <h2>자주 묻는 질문</h2>
      <OffenList />
      <Other />
    </article>
  );
};

export default Question;
