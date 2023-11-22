import withLoginTrue from '@/components/withLogin';

const Calculate = () => {
  return (
    <article>
      <h2>정산하기</h2>
      <div>
        <h3> 지금까지 모인 금액</h3>
        <div> 500,000 만원</div>
      </div>
    </article>
  );
};

export default withLoginTrue(Calculate);
