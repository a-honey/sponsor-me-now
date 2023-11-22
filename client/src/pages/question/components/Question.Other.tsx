import emailjs from '@emailjs/browser';
import { useForm } from 'react-hook-form';

interface EmailBodyType {
  name: string;
  email: string;
  title: string;
  message: string;
}

const Other = () => {
  const { register, handleSubmit, setValue } = useForm<EmailBodyType>();
  const onSubmit = async (data: EmailBodyType) => {
    const response = await emailjs.send(
      import.meta.env.VITE_EMAIL_SERVICE_KEY,
      import.meta.env.VITE_EMAIL_TEMPLATE_KEY,
      {
        name: data.name,
        email: data.email,
        title: data.title,
        message: data.message,
      },
      import.meta.env.VITE_EMAIL_PUBLIC_KEY,
    );

    if (response.status === 200) {
      setValue('name', data.name);
      setValue('email', data.email);
      setValue('title', data.title);
      setValue('message', data.message);
    }
  };
  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <h4>직접 문의하기</h4>
      <label>작성자</label>
      <input type="text" {...register('name')} />
      <label>이메일</label>
      <input
        placeholder="답변받으실 이메일을 입력해주세요"
        type="text"
        {...register('email')}
      />
      <label>문의 제목</label>
      <input type="text" {...register('title')} />
      <label>문의 내용</label>
      <input type="text" {...register('message')} />
      <button>제출</button>
    </form>
  );
};

export default Other;
