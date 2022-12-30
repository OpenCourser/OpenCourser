import { AccessTokenError, getAccessToken } from '@auth0/nextjs-auth0';
import { useUser } from '@auth0/nextjs-auth0/client';
import { GetServerSidePropsContext } from 'next';

export default function Index({ serverText }) {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  if (user) {
    return (
      <div>
        {serverText} Welcome {user.name}! <a href="/api/auth/logout">Logout</a>
      </div>
    );
  }
  return <a href="/api/auth/login">{serverText} Login</a>;
}

export async function getServerSideProps({ req, res }: GetServerSidePropsContext) {
  try {
    const { accessToken } = await getAccessToken(req, res, {
      scopes: [],
    });

    const response = await fetch('http://localhost:3333', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return {
      props: {
        serverText: await response.text(),
      },
    };
  } catch (e) {
    if (e instanceof AccessTokenError) {
      console.error(e);
      return {
        props: { serverText: 'No session found' },
      };
    }
  }
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
