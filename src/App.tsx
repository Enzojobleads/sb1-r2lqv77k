import { useState } from 'react';
import { LinkedInForm } from '@/components/LinkedInForm';
import { ProfileAnalysis } from '@/components/ProfileAnalysis';
import { Loader } from '@/components/Loader';
import { DanError } from '@/components/DanError';
import { useLinkedInAnalysis } from '@/hooks/useLinkedInAnalysis';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [profileData, setProfileData] = useState<any>(null);
  const [isDanError, setIsDanError] = useState(false);
  const { analyzeProfile } = useLinkedInAnalysis();

  const handleAnalyze = async (url: string) => {
    if (url.toLowerCase() === 'dan') {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setIsDanError(true);
      }, 2000);
      return;
    }

    setIsLoading(true);
    try {
      const data = await analyzeProfile(url);
      if (data) {
        setProfileData(data);
      }
    } catch (error) {
      console.error('Error analyzing profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isDanError) {
    return <DanError />;
  }

  return (
    <div className="min-h-screen bg-background">
      {!profileData && !isLoading && (
        <LinkedInForm onSubmit={handleAnalyze} />
      )}
      
      {isLoading && <Loader />}
      
      {profileData && !isLoading && (
        <div className="container mx-auto py-8">
          <ProfileAnalysis data={profileData} />
        </div>
      )}
    </div>
  );
}

export default App;