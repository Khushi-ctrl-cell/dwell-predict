import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Calculator, MapPin, Home as HomeIcon } from 'lucide-react';

interface HouseFeatures {
  sqft: number;
  bedrooms: number;
  bathrooms: number;
  age: number;
  location: string;
  garage: number;
  pool: boolean;
  renovated: boolean;
}

interface PredictionFormProps {
  onPredict: (prediction: {
    price: number;
    confidence: number;
    model: string;
    features: HouseFeatures;
  }) => void;
}

export const PredictionForm = ({ onPredict }: PredictionFormProps) => {
  const [features, setFeatures] = useState<HouseFeatures>({
    sqft: 2000,
    bedrooms: 3,
    bathrooms: 2,
    age: 10,
    location: 'suburban',
    garage: 2,
    pool: false,
    renovated: false
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call with mock prediction logic
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Mock prediction calculation
    let basePrice = 200000;
    basePrice += features.sqft * 150;
    basePrice += features.bedrooms * 25000;
    basePrice += features.bathrooms * 20000;
    basePrice -= features.age * 2000;

    // Location multiplier
    const locationMultipliers = {
      urban: 1.3,
      suburban: 1.0,
      rural: 0.8
    };
    basePrice *= locationMultipliers[features.location as keyof typeof locationMultipliers];

    // Additional features
    if (features.garage > 0) basePrice += features.garage * 15000;
    if (features.pool) basePrice += 50000;
    if (features.renovated) basePrice += 40000;

    // Add some randomness for realism
    const variance = 0.1;
    const randomFactor = 1 + (Math.random() - 0.5) * variance;
    const finalPrice = Math.round(basePrice * randomFactor);

    const confidence = Math.min(95, 85 + Math.random() * 10);

    onPredict({
      price: finalPrice,
      confidence: Math.round(confidence * 10) / 10,
      model: 'XGBoost Regressor',
      features
    });

    setIsLoading(false);
  };

  const updateFeature = (key: keyof HouseFeatures, value: any) => {
    setFeatures(prev => ({ ...prev, [key]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Info */}
      <Card className="border border-border/50">
        <CardContent className="p-4">
          <div className="flex items-center space-x-2 mb-4">
            <HomeIcon className="h-5 w-5 text-primary" />
            <h3 className="font-semibold text-lg">Basic Information</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="sqft">Square Footage</Label>
              <Input
                id="sqft"
                type="number"
                min="500"
                max="10000"
                value={features.sqft}
                onChange={(e) => updateFeature('sqft', parseInt(e.target.value) || 0)}
                className="transition-smooth focus:shadow-glow"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="age">Age (years)</Label>
              <Input
                id="age"
                type="number"
                min="0"
                max="100"
                value={features.age}
                onChange={(e) => updateFeature('age', parseInt(e.target.value) || 0)}
                className="transition-smooth focus:shadow-glow"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bedrooms">Bedrooms</Label>
              <Select value={features.bedrooms.toString()} onValueChange={(value) => updateFeature('bedrooms', parseInt(value))}>
                <SelectTrigger className="transition-smooth focus:shadow-glow">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[1,2,3,4,5,6].map(num => (
                    <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bathrooms">Bathrooms</Label>
              <Select value={features.bathrooms.toString()} onValueChange={(value) => updateFeature('bathrooms', parseInt(value))}>
                <SelectTrigger className="transition-smooth focus:shadow-glow">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[1,1.5,2,2.5,3,3.5,4,4.5,5].map(num => (
                    <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Location & Features */}
      <Card className="border border-border/50">
        <CardContent className="p-4">
          <div className="flex items-center space-x-2 mb-4">
            <MapPin className="h-5 w-5 text-accent" />
            <h3 className="font-semibold text-lg">Location & Features</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location">Location Type</Label>
              <Select value={features.location} onValueChange={(value) => updateFeature('location', value)}>
                <SelectTrigger className="transition-smooth focus:shadow-glow">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="urban">Urban</SelectItem>
                  <SelectItem value="suburban">Suburban</SelectItem>
                  <SelectItem value="rural">Rural</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="garage">Garage Spaces</Label>
              <Select value={features.garage.toString()} onValueChange={(value) => updateFeature('garage', parseInt(value))}>
                <SelectTrigger className="transition-smooth focus:shadow-glow">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[0,1,2,3,4].map(num => (
                    <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="pool"
                checked={features.pool}
                onChange={(e) => updateFeature('pool', e.target.checked)}
                className="w-4 h-4 text-accent bg-background border-border rounded focus:ring-accent"
              />
              <Label htmlFor="pool">Swimming Pool</Label>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="renovated"
                checked={features.renovated}
                onChange={(e) => updateFeature('renovated', e.target.checked)}
                className="w-4 h-4 text-accent bg-background border-border rounded focus:ring-accent"
              />
              <Label htmlFor="renovated">Recently Renovated</Label>
            </div>
          </div>
        </CardContent>
      </Card>

      <Button 
        type="submit" 
        disabled={isLoading}
        className="w-full bg-gradient-primary hover:bg-primary-hover text-white font-semibold py-3 transition-smooth shadow-custom-md hover:shadow-glow"
      >
        {isLoading ? (
          <div className="flex items-center space-x-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            <span>Analyzing Property...</span>
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <Calculator className="h-4 w-4" />
            <span>Predict House Price</span>
          </div>
        )}
      </Button>
    </form>
  );
};