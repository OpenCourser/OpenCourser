import { zodResolver } from '@hookform/resolvers/zod';
import { TestDto, testValidationSchema } from '@opencourser/interfaces';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function Web() {
  const [formValues, setFormValues] = useState<TestDto>();

  return (
    <div>
      <h1>Web</h1>
      <TestForm
        onSubmit={(values) => {
          setFormValues(values);
        }}
      />
      {!!formValues ? <p>{JSON.stringify(formValues)}</p> : null}
    </div>
  );
}

const TestForm = ({ onSubmit }: { onSubmit: (values: TestDto) => void }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TestDto>({
    resolver: zodResolver(testValidationSchema),
  });

  const onSubmitInternal = (data: TestDto) => {
    console.log(data);
    onSubmit(data);
  };

  return (
    <form style={{ display: 'flex', flexDirection: 'column', maxWidth: '300px' }} onSubmit={handleSubmit(onSubmitInternal)}>
      <input {...register('id', { valueAsNumber: true })} placeholder="Id" type="number" />
      {errors && errors.id ? <p style={{ color: 'red' }}>{errors.id.message}</p> : null}
      <input {...register('name')} placeholder="Name" />
      {errors && errors.name ? <p style={{ color: 'red' }}>{errors.name.message}</p> : null}
      <button type="submit">Submit</button>
    </form>
  );
};
