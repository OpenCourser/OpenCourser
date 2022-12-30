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
