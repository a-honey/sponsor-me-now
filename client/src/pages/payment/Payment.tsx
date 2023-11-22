import withLoginTrue from '@/components/withLogin';
import History from './components/Payment.History';

const Payment = () => {
  return (
    <article>
      <h2>내 결제내역</h2>
      <History />
    </article>
  );
};

export default withLoginTrue(Payment);
