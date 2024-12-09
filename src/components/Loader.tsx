import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Brain, Bot, LineChart } from 'lucide-react';

export function Loader() {
  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <Card className="w-full max-w-lg p-8 space-y-8">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <Brain className="w-16 h-16 animate-pulse text-primary" />
            <Bot className="w-8 h-8 absolute -right-2 -bottom-2 animate-bounce text-blue-500" />
          </div>
          <h2 className="text-2xl font-bold text-center">Analyse en cours...</h2>
        </div>

        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <LineChart className="w-6 h-6 text-muted-foreground animate-spin" />
            <div className="flex-1 space-y-2">
              <div className="text-sm font-medium">Calcul du niveau de bullshit</div>
              <Progress value={66} className="h-2" />
            </div>
          </div>
          
          <div className="text-sm text-muted-foreground text-center animate-pulse">
            Notre IA analyse minutieusement ton profil... 🕵️‍♂️
          </div>
        </div>
      </Card>
    </div>
  );
}