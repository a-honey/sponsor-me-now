import OffenList from './components/Question.OffenList';
import Other from './components/Question.Other';

const Question = () => {
  return (
    <article>
      <h2>자주 묻는 질문</h2>
      <OffenList />
      <h2>문의 혹은 피드백 남기기</h2>
      <Other />
    </article>
  );
};

export default Question;
