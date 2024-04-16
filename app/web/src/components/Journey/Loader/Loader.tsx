import { ShepherdJourneyProvider } from 'react-shepherd';
import { useAuth } from 'src/auth';

export function ShepherdJourneyLoader({
  children,
}: {
  children: React.ReactNode;
}) {
  const { currentUser } = useAuth();

  return (
    <ShepherdJourneyProvider
      apiKey={process.env.SHEPHERD_PUBLIC_KEY}
      properties={{
        email: currentUser?.email,
        id: currentUser?.id,
      }}
    >
      {children}
    </ShepherdJourneyProvider>
  );
}
