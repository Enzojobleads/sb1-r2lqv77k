import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { LinkedinIcon } from 'lucide-react';

interface LinkedInFormProps {
  onSubmit: (url: string) => void;
}

export function LinkedInForm({ onSubmit }: LinkedInFormProps) {
  const [url, setUrl] = useState('');

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <Card className="w-full max-w-lg p-8 space-y-6">
        <div className="flex flex-col items-center space-y-4">
          <LinkedinIcon className="w-16 h-16 text-blue-600" />
          <h1 className="text-3xl font-bold text-center">Analyse ton Bullshit LinkedIn</h1>
          <p className="text-muted-foreground text-center">
            Découvre à quel point ton profil LinkedIn est rempli de bullshit 💩
          </p>
        </div>
        
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(url);
          }}
          className="space-y-4"
        >
          <Input
            placeholder="Colle ton URL LinkedIn ici..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="text-lg p-6"
          />
          <Button 
            type="submit" 
            className="w-full text-lg p-6"
            disabled={!url}
          >
            Analyser le Bullshit
          </Button>
        </form>
      </Card>
    </div>
  );
}