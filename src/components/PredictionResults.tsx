import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, Download, Share2, AlertCircle, CheckCircle } from 'lucide-react';

interface PredictionData {
  price: number;
  confidence: number;
  model: string;
  features: Record<string, any>;
}

interface PredictionResultsProps {
  prediction: PredictionData;
}

export const PredictionResults = ({ prediction }: PredictionResultsProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getPriceRange = (price: number, confidence: number) => {
    const margin = price * (1 - confidence / 100) * 0.5;
    return {
      low: price - margin,
      high: price + margin
    };
  };

  const getConfidenceLevel = (confidence: number) => {
    if (confidence >= 90) return { level: 'High', color: 'text-accent', bgColor: 'bg-accent/10' };
    if (confidence >= 80) return { level: 'Good', color: 'text-chart-2', bgColor: 'bg-chart-2/10' };
    if (confidence >= 70) return { level: 'Moderate', color: 'text-chart-3', bgColor: 'bg-chart-3/10' };
    return { level: 'Low', color: 'text-chart-5', bgColor: 'bg-chart-5/10' };
  };

  const handleDownload = () => {
    const reportData = {
      prediction: prediction.price,
      confidence: prediction.confidence,
      model: prediction.model,
      features: prediction.features,
      timestamp: new Date().toISOString(),
      priceRange: getPriceRange(prediction.price, prediction.confidence)
    };

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(reportData, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `house_price_prediction_${Date.now()}.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const priceRange = getPriceRange(prediction.price, prediction.confidence);
  const confidenceInfo = getConfidenceLevel(prediction.confidence);

  return (
    <div className="space-y-4">
      {/* Main Result Card */}
      <Card className="bg-gradient-card shadow-custom-lg border-0 animate-fade-in-up">
        <CardHeader className="text-center">
          <CardTitle className="text-lg">🏠 Predicted House Price</CardTitle>
          <CardDescription>Based on {prediction.model}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Price Display */}
          <div className="text-center space-y-2">
            <div className="text-4xl font-bold text-primary animate-pulse-glow">
              {formatPrice(prediction.price)}
            </div>
            <div className="text-sm text-muted-foreground">
              Range: {formatPrice(priceRange.low)} - {formatPrice(priceRange.high)}
            </div>
          </div>

          {/* Confidence */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Prediction Confidence</span>
              <Badge className={`${confidenceInfo.bgColor} ${confidenceInfo.color} border-0`}>
                {confidenceInfo.level} - {prediction.confidence}%
              </Badge>
            </div>
            <Progress value={prediction.confidence} className="h-3" />
            <div className="flex items-center space-x-2 text-sm">
              {prediction.confidence >= 85 ? (
                <CheckCircle className="h-4 w-4 text-accent" />
              ) : (
                <AlertCircle className="h-4 w-4 text-chart-3" />
              )}
              <span className="text-muted-foreground">
                {prediction.confidence >= 85 
                  ? "High confidence prediction - reliable estimate"
                  : "Moderate confidence - consider additional factors"
                }
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-2">
            <Button
              onClick={handleDownload}
              variant="outline"
              size="sm"
              className="flex-1 transition-smooth hover:shadow-custom-sm"
            >
              <Download className="h-4 w-4 mr-2" />
              Download Report
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex-1 transition-smooth hover:shadow-custom-sm"
            >
              <Share2 className="h-4 w-4 mr-2" />
              Share Results
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Feature Analysis */}
      <Card className="bg-gradient-card shadow-custom-md border-0">
        <CardHeader>
          <CardTitle className="text-lg flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-accent" />
            <span>Feature Analysis</span>
          </CardTitle>
          <CardDescription>Key factors influencing this prediction</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="space-y-1">
              <p className="text-muted-foreground">Square Footage</p>
              <p className="font-semibold">{prediction.features.sqft?.toLocaleString()} sq ft</p>
            </div>
            <div className="space-y-1">
              <p className="text-muted-foreground">Bedrooms</p>
              <p className="font-semibold">{prediction.features.bedrooms}</p>
            </div>
            <div className="space-y-1">
              <p className="text-muted-foreground">Bathrooms</p>
              <p className="font-semibold">{prediction.features.bathrooms}</p>
            </div>
            <div className="space-y-1">
              <p className="text-muted-foreground">Age</p>
              <p className="font-semibold">{prediction.features.age} years</p>
            </div>
            <div className="space-y-1">
              <p className="text-muted-foreground">Location</p>
              <p className="font-semibold capitalize">{prediction.features.location}</p>
            </div>
            <div className="space-y-1">
              <p className="text-muted-foreground">Garage</p>
              <p className="font-semibold">{prediction.features.garage} spaces</p>
            </div>
          </div>

          {/* Special Features */}
          {(prediction.features.pool || prediction.features.renovated) && (
            <div className="mt-4 pt-4 border-t border-border/50">
              <p className="text-sm font-medium mb-2">Special Features:</p>
              <div className="flex flex-wrap gap-2">
                {prediction.features.pool && (
                  <Badge variant="secondary" className="text-xs">🏊‍♂️ Swimming Pool</Badge>
                )}
                {prediction.features.renovated && (
                  <Badge variant="secondary" className="text-xs">🔨 Recently Renovated</Badge>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Market Comparison */}
      <Card className="bg-gradient-card shadow-custom-md border-0">
        <CardHeader>
          <CardTitle className="text-lg">📊 Market Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
              <span className="text-sm">Market Average</span>
              <span className="font-semibold">$425,000</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-accent/10 rounded-lg">
              <span className="text-sm">Your Prediction</span>
              <span className="font-semibold text-accent">{formatPrice(prediction.price)}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
              <span className="text-sm">Difference</span>
              <span className={`font-semibold ${prediction.price > 425000 ? 'text-accent' : 'text-chart-5'}`}>
                {prediction.price > 425000 ? '+' : ''}{formatPrice(prediction.price - 425000)} 
                ({((prediction.price - 425000) / 425000 * 100).toFixed(1)}%)
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};