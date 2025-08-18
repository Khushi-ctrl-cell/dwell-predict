import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PredictionForm } from './PredictionForm';
import { ModelComparison } from './ModelComparison';
import { DataVisualization } from './DataVisualization';
import { PredictionResults } from './PredictionResults';
import { Activity, BarChart3, Home, TrendingUp } from 'lucide-react';

interface PredictionData {
  price: number;
  confidence: number;
  model: string;
  features: Record<string, any>;
}

export const Dashboard = () => {
  const [prediction, setPrediction] = useState<PredictionData | null>(null);
  const [activeTab, setActiveTab] = useState<'predict' | 'compare' | 'visualize'>('predict');

  // Mock model status data
  const modelStatus = {
    name: 'XGBoost Regressor',
    accuracy: 92.3,
    lastTrained: '2024-01-15',
    status: 'active'
  };

  const stats = [
    { label: 'Model Accuracy', value: '92.3%', icon: TrendingUp, color: 'text-accent' },
    { label: 'Predictions Made', value: '2,847', icon: Activity, color: 'text-primary' },
    { label: 'Houses Analyzed', value: '15,432', icon: Home, color: 'text-chart-3' },
    { label: 'Avg. Price', value: '$425K', icon: BarChart3, color: 'text-chart-4' }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-hero text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold">House Price Prediction</h1>
              <p className="text-blue-100 text-lg">Advanced ML-powered real estate price forecasting</p>
            </div>
            <div className="text-right">
              <Badge variant="secondary" className="mb-2">
                {modelStatus.status === 'active' ? '🟢 Active' : '🔴 Inactive'}
              </Badge>
              <p className="text-sm text-blue-100">Model: {modelStatus.name}</p>
              <p className="text-sm text-blue-100">Accuracy: {modelStatus.accuracy}%</p>
            </div>
          </div>
        </div>
      </header>

      {/* Stats Cards */}
      <div className="container mx-auto px-4 -mt-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-gradient-card shadow-custom-md border-0 animate-fade-in-up">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  </div>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="flex space-x-1 bg-muted p-1 rounded-lg w-fit">
            {[
              { id: 'predict', label: 'Predict Price', icon: Home },
              { id: 'compare', label: 'Model Comparison', icon: BarChart3 },
              { id: 'visualize', label: 'Data Insights', icon: TrendingUp }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-smooth ${
                  activeTab === tab.id
                    ? 'bg-primary text-primary-foreground shadow-custom-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {activeTab === 'predict' && (
              <Card className="bg-gradient-card shadow-custom-md border-0">
                <CardHeader>
                  <CardTitle className="text-2xl">Property Details</CardTitle>
                  <CardDescription>Enter the house features to get a price prediction</CardDescription>
                </CardHeader>
                <CardContent>
                  <PredictionForm onPredict={setPrediction} />
                </CardContent>
              </Card>
            )}

            {activeTab === 'compare' && <ModelComparison />}
            {activeTab === 'visualize' && <DataVisualization />}
          </div>

          <div className="space-y-6">
            {prediction && <PredictionResults prediction={prediction} />}
            
            {/* Quick Tips */}
            <Card className="bg-gradient-card shadow-custom-md border-0">
              <CardHeader>
                <CardTitle className="text-lg">💡 Pro Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <p><strong>Location matters:</strong> Properties in prime locations typically command 20-30% higher prices.</p>
                <p><strong>Square footage:</strong> Each additional 100 sq ft can increase value by $15K-25K.</p>
                <p><strong>Recent renovations:</strong> Updated kitchens and bathrooms add significant value.</p>
                <p><strong>Market trends:</strong> Consider seasonal variations in your local market.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};