import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, ScatterChart, Scatter } from 'recharts';

export const DataVisualization = () => {
  // Mock data for visualizations
  const priceDistribution = [
    { range: '$200K-300K', count: 1250, percentage: 23 },
    { range: '$300K-400K', count: 1890, percentage: 35 },
    { range: '$400K-500K', count: 1345, percentage: 25 },
    { range: '$500K-600K', count: 650, percentage: 12 },
    { range: '$600K+', count: 297, percentage: 5 }
  ];

  const priceByLocation = [
    { location: 'Urban', avgPrice: 485000, count: 2100 },
    { location: 'Suburban', avgPrice: 425000, count: 2800 },
    { location: 'Rural', avgPrice: 325000, count: 532 }
  ];

  const priceOverTime = [
    { month: 'Jan', price: 415000 },
    { month: 'Feb', price: 422000 },
    { month: 'Mar', price: 438000 },
    { month: 'Apr', price: 445000 },
    { month: 'May', price: 452000 },
    { month: 'Jun', price: 448000 },
    { month: 'Jul', price: 455000 },
    { month: 'Aug', price: 462000 },
    { month: 'Sep', price: 458000 },
    { month: 'Oct', price: 465000 },
    { month: 'Nov', price: 472000 },
    { month: 'Dec', price: 468000 }
  ];

  const sqftVsPrice = [
    { sqft: 1200, price: 285000 },
    { sqft: 1500, price: 342000 },
    { sqft: 1800, price: 398000 },
    { sqft: 2100, price: 465000 },
    { sqft: 2400, price: 525000 },
    { sqft: 2700, price: 582000 },
    { sqft: 3000, price: 648000 },
    { sqft: 3300, price: 715000 },
    { sqft: 3600, price: 782000 },
    { sqft: 3900, price: 845000 }
  ];

  const featureImportance = [
    { feature: 'Square Footage', importance: 45, color: 'hsl(var(--chart-1))' },
    { feature: 'Location', importance: 28, color: 'hsl(var(--chart-2))' },
    { feature: 'Age', importance: 12, color: 'hsl(var(--chart-3))' },
    { feature: 'Bedrooms', importance: 8, color: 'hsl(var(--chart-4))' },
    { feature: 'Bathrooms', importance: 7, color: 'hsl(var(--chart-5))' }
  ];

  const COLORS = [
    'hsl(var(--chart-1))',
    'hsl(var(--chart-2))',
    'hsl(var(--chart-3))',
    'hsl(var(--chart-4))',
    'hsl(var(--chart-5))'
  ];

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-card shadow-custom-md border-0">
        <CardHeader>
          <CardTitle className="text-2xl">Housing Market Insights</CardTitle>
          <CardDescription>
            Interactive data visualizations and market analysis
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Price Distribution */}
      <Card className="bg-gradient-card shadow-custom-md border-0">
        <CardHeader>
          <CardTitle>Price Distribution</CardTitle>
          <CardDescription>Distribution of house prices in the dataset</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={priceDistribution}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="range" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }} 
              />
              <Bar dataKey="count" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Price by Location */}
        <Card className="bg-gradient-card shadow-custom-md border-0">
          <CardHeader>
            <CardTitle>Average Price by Location</CardTitle>
            <CardDescription>Price comparison across different areas</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={priceByLocation} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis type="number" stroke="hsl(var(--muted-foreground))" />
                <YAxis dataKey="location" type="category" stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  formatter={(value) => [`$${Number(value).toLocaleString()}`, 'Avg Price']}
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }} 
                />
                <Bar dataKey="avgPrice" fill="hsl(var(--accent))" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Feature Importance */}
        <Card className="bg-gradient-card shadow-custom-md border-0">
          <CardHeader>
            <CardTitle>Feature Importance</CardTitle>
            <CardDescription>Most influential factors in price prediction</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={featureImportance}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="importance"
                  label={({ feature, importance }) => `${feature}: ${importance}%`}
                  labelLine={false}
                >
                  {featureImportance.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Price Trend */}
        <Card className="bg-gradient-card shadow-custom-md border-0">
          <CardHeader>
            <CardTitle>Price Trend (2024)</CardTitle>
            <CardDescription>Monthly average house prices</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={priceOverTime}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  formatter={(value) => [`$${Number(value).toLocaleString()}`, 'Avg Price']}
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="price" 
                  stroke="hsl(var(--chart-2))" 
                  strokeWidth={3}
                  dot={{ fill: 'hsl(var(--chart-2))', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Square Footage vs Price */}
        <Card className="bg-gradient-card shadow-custom-md border-0">
          <CardHeader>
            <CardTitle>Square Footage vs Price</CardTitle>
            <CardDescription>Correlation between size and price</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <ScatterChart data={sqftVsPrice}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="sqft" stroke="hsl(var(--muted-foreground))" />
                <YAxis dataKey="price" stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  formatter={(value, name) => [
                    name === 'price' ? `$${Number(value).toLocaleString()}` : `${value} sq ft`,
                    name === 'price' ? 'Price' : 'Square Footage'
                  ]}
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }} 
                />
                <Scatter dataKey="price" fill="hsl(var(--chart-4))" />
              </ScatterChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Market Summary */}
      <Card className="bg-gradient-card shadow-custom-md border-0">
        <CardHeader>
          <CardTitle>Market Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="space-y-2">
              <p className="text-3xl font-bold text-accent">$425K</p>
              <p className="text-muted-foreground">Median Price</p>
            </div>
            <div className="space-y-2">
              <p className="text-3xl font-bold text-chart-2">2,150</p>
              <p className="text-muted-foreground">Avg. Sq Ft</p>
            </div>
            <div className="space-y-2">
              <p className="text-3xl font-bold text-chart-3">+5.2%</p>
              <p className="text-muted-foreground">YoY Growth</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};