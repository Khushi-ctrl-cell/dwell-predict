import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Award, Brain, BarChart3, Zap } from 'lucide-react';

export const ModelComparison = () => {
  const models = [
    {
      name: 'XGBoost Regressor',
      accuracy: 92.3,
      mae: 15420,
      rmse: 22180,
      r2: 0.923,
      trainingTime: '2.3s',
      status: 'best',
      icon: Award,
      description: 'Gradient boosting with optimal performance'
    },
    {
      name: 'Random Forest',
      accuracy: 89.7,
      mae: 18650,
      rmse: 26340,
      r2: 0.897,
      trainingTime: '1.8s',
      status: 'good',
      icon: Brain,
      description: 'Ensemble method with good interpretability'
    },
    {
      name: 'Linear Regression',
      accuracy: 78.2,
      mae: 28930,
      rmse: 38420,
      r2: 0.782,
      trainingTime: '0.1s',
      status: 'baseline',
      icon: BarChart3,
      description: 'Simple linear model for baseline comparison'
    },
    {
      name: 'Neural Network',
      accuracy: 88.9,
      mae: 19200,
      rmse: 27100,
      r2: 0.889,
      trainingTime: '15.2s',
      status: 'experimental',
      icon: Zap,
      description: 'Deep learning approach with complex patterns'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'best': return 'bg-accent text-accent-foreground';
      case 'good': return 'bg-chart-2 text-white';
      case 'baseline': return 'bg-chart-3 text-white';
      case 'experimental': return 'bg-chart-4 text-white';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'best': return '🏆 Best Model';
      case 'good': return '✅ Good';
      case 'baseline': return '📊 Baseline';
      case 'experimental': return '🧪 Experimental';
      default: return status;
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-card shadow-custom-md border-0">
        <CardHeader>
          <CardTitle className="text-2xl">Model Performance Comparison</CardTitle>
          <CardDescription>
            Comparing different machine learning algorithms for house price prediction
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {models.map((model, index) => (
              <Card key={index} className="border border-border/50 transition-smooth hover:shadow-custom-md">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <model.icon className="h-5 w-5 text-primary" />
                      <CardTitle className="text-lg">{model.name}</CardTitle>
                    </div>
                    <Badge className={getStatusColor(model.status)}>
                      {getStatusLabel(model.status)}
                    </Badge>
                  </div>
                  <CardDescription className="text-sm">
                    {model.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Accuracy */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Accuracy</span>
                      <span className="font-semibold">{model.accuracy}%</span>
                    </div>
                    <Progress value={model.accuracy} className="h-2" />
                  </div>

                  {/* Metrics Grid */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">MAE</p>
                      <p className="font-semibold">${model.mae.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">RMSE</p>
                      <p className="font-semibold">${model.rmse.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">R² Score</p>
                      <p className="font-semibold">{model.r2}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Training Time</p>
                      <p className="font-semibold">{model.trainingTime}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Metrics Explanation */}
          <div className="mt-8 p-4 bg-muted/50 rounded-lg">
            <h4 className="font-semibold mb-3">📊 Evaluation Metrics Explained</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <strong>MAE (Mean Absolute Error):</strong>
                <p className="text-muted-foreground">Average absolute difference between predicted and actual prices. Lower is better.</p>
              </div>
              <div>
                <strong>RMSE (Root Mean Square Error):</strong>
                <p className="text-muted-foreground">Square root of average squared errors. Penalizes larger errors more heavily.</p>
              </div>
              <div>
                <strong>R² Score:</strong>
                <p className="text-muted-foreground">Proportion of variance explained by the model. Closer to 1.0 is better.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};