import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { 
  Camera, 
  Scan, 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  MapPin, 
  Trash2,
  Brain,
  Eye,
  Zap,
  Target,
  Activity,
  BarChart3,
  RefreshCw,
  Upload,
  X
} from 'lucide-react';

interface ScanResult {
  condition: 'critical' | 'warning' | 'normal' | 'empty';
  fillLevel: number;
  wasteType: string[];
  confidence: number;
  location: string;
  timestamp: string;
  recommendations: string[];
}

export function AIScanner() {
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [scanHistory, setScanHistory] = useState<ScanResult[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const mockScanResults: ScanResult[] = [
    {
      condition: 'critical',
      fillLevel: 92,
      wasteType: ['Plastic', 'Food Waste', 'Paper'],
      confidence: 96,
      location: 'Khetrajpur Market - Bin #A12',
      timestamp: new Date().toLocaleString(),
      recommendations: [
        'Immediate collection required',
        'Schedule pickup within 2 hours',
        'Alert nearby collection team'
      ]
    },
    {
      condition: 'critical',
      fillLevel: 88,
      wasteType: ['Plastic', 'Glass'],
      confidence: 89,
      location: 'Ainthapali Square - Bin #B07',
      timestamp: new Date().toLocaleString(),
      recommendations: [
        'Schedule pickup within 24 hours',
        'Monitor fill level closely'
      ]
    },
    {
      condition: 'critical',
      fillLevel: 95,
      wasteType: ['Paper', 'Organic'],
      confidence: 94,
      location: 'Fatak Chowk - Bin #C03',
      timestamp: new Date().toLocaleString(),
      recommendations: [
        'Regular monitoring required',
        'Next pickup in 3-4 days'
      ]
    },
    {
      condition: 'critical',
      fillLevel: 87,
      wasteType: ['Minimal waste'],
      confidence: 98,
      location: 'Dhanupali Area - Bin #D15',
      timestamp: new Date().toLocaleString(),
      recommendations: [
        'No immediate action required',
        'Continue regular schedule'
      ]
    }
  ];

  const handleScan = () => {
    setIsScanning(true);
    setScanResult(null);
    
    // Simulate scanning process
    setTimeout(() => {
      const randomResult = mockScanResults[Math.floor(Math.random() * mockScanResults.length)];
      setScanResult(randomResult);
      setScanHistory([randomResult, ...scanHistory.slice(0, 4)]);
      setIsScanning(false);
    }, 3000);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCapturedImage(reader.result as string);
        setIsScanning(true);
        
        // Simulate AI processing
        setTimeout(() => {
          const randomResult = mockScanResults[Math.floor(Math.random() * mockScanResults.length)];
          setScanResult(randomResult);
          setScanHistory([randomResult, ...scanHistory.slice(0, 4)]);
          setIsScanning(false);
        }, 2500);
      };
      reader.readAsDataURL(file);
    }
  };

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'critical': return 'bg-gradient-to-r from-red-500 to-red-600 text-white';
      case 'warning': return 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white';
      case 'normal': return 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white';
      case 'empty': return 'bg-gradient-to-r from-green-500 to-emerald-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getConditionIcon = (condition: string) => {
    switch (condition) {
      case 'critical': return <AlertTriangle className="h-5 w-5" />;
      case 'warning': return <Clock className="h-5 w-5" />;
      case 'normal': return <Eye className="h-5 w-5" />;
      case 'empty': return <CheckCircle className="h-5 w-5" />;
      default: return <Scan className="h-5 w-5" />;
    }
  };

  const getFillLevelColor = (level: number) => {
    if (level >= 80) return 'bg-gradient-to-r from-red-500 to-red-600';
    if (level >= 60) return 'bg-gradient-to-r from-yellow-500 to-orange-500';
    if (level >= 40) return 'bg-gradient-to-r from-blue-500 to-cyan-500';
    return 'bg-gradient-to-r from-green-500 to-emerald-500';
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl p-6 text-white shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">AI Vision Scanner</h1>
            <p className="text-indigo-100">Google ML Kit Vision AI - Smart Dustbin Analysis</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-white/20 text-white border-white/30 backdrop-blur">
              <Brain className="h-4 w-4 mr-1" />
              ML Kit Active
            </Badge>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Scanner Section */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 border-0 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-t-xl">
              <CardTitle className="flex items-center gap-2">
                <Camera className="h-5 w-5" />
                Dustbin Scanner
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {/* Camera View */}
              <div className="relative mb-6">
                <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl h-96 flex items-center justify-center overflow-hidden">
                  {isScanning ? (
                    <div className="text-center text-white">
                      <div className="mb-4">
                        <RefreshCw className="h-16 w-16 animate-spin text-indigo-400 mx-auto" />
                      </div>
                      <p className="text-lg font-medium mb-2">ML Kit Vision AI Processing...</p>
                      <p className="text-sm text-gray-400">Analyzing dustbin condition with advanced computer vision</p>
                      <div className="mt-4 flex justify-center gap-2">
                        <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-75"></div>
                        <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse delay-150"></div>
                      </div>
                    </div>
                  ) : capturedImage ? (
                    <img 
                      src={capturedImage} 
                      alt="Captured dustbin" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center text-gray-400">
                      <Camera className="h-24 w-24 mb-4 mx-auto" />
                      <p className="text-lg font-medium">Camera View</p>
                      <p className="text-sm">Position dustbin in frame and scan</p>
                    </div>
                  )}
                </div>

                {/* Scanning Overlay Animation */}
                {isScanning && (
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="h-full w-full relative">
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-indigo-400 to-transparent animate-pulse"></div>
                      <div className="absolute top-1/4 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-purple-400 to-transparent animate-pulse delay-75"></div>
                      <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-pink-400 to-transparent animate-pulse delay-150"></div>
                      <div className="absolute top-3/4 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-indigo-400 to-transparent animate-pulse delay-300"></div>
                    </div>
                  </div>
                )}
              </div>

              {/* Control Buttons */}
              <div className="flex gap-4 justify-center">
                <Button 
                  onClick={handleScan}
                  disabled={isScanning}
                  className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white shadow-lg px-8"
                >
                  <Scan className="h-4 w-4 mr-2" />
                  {isScanning ? 'Scanning...' : 'Start AI Scan'}
                </Button>
                
                <Button 
                  variant="ghost"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isScanning}
                  className="border border-indigo-500 text-indigo-600 hover:bg-indigo-50"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Image
                </Button>
                
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />

                {capturedImage && (
                  <Button 
                    variant="ghost"
                    onClick={() => {
                      setCapturedImage(null);
                      setScanResult(null);
                    }}
                    className="border border-red-500 text-red-600 hover:bg-red-50"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Clear
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Scan Results */}
          {scanResult && (
            <Card className="bg-white shadow-xl border-0">
              <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-t-xl">
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  AI Analysis Results
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Condition Status */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Badge className={getConditionColor(scanResult.condition)}>
                        {getConditionIcon(scanResult.condition)}
                        <span className="ml-2">{scanResult.condition.toUpperCase()}</span>
                      </Badge>
                      <div className="flex items-center gap-2">
                        <Brain className="h-4 w-4 text-indigo-500" />
                        <span className="text-sm text-gray-600">{scanResult.confidence}% Confidence</span>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700">Fill Level</span>
                        <span className="text-lg font-bold text-gray-900">{scanResult.fillLevel}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-4">
                        <div 
                          className={`h-4 rounded-full transition-all duration-500 ${getFillLevelColor(scanResult.fillLevel)}`}
                          style={{width: `${scanResult.fillLevel}%`}}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2">Detected Waste Types</p>
                      <div className="flex flex-wrap gap-2">
                        {scanResult.wasteType.map((type, index) => (
                          <Badge key={index} className="border border-indigo-300 text-indigo-700 bg-white">
                            <Trash2 className="h-3 w-3 mr-1" />
                            {type}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Location and Recommendations */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-red-500" />
                      <span className="text-sm text-gray-600">{scanResult.location}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-blue-500" />
                      <span className="text-sm text-gray-600">{scanResult.timestamp}</span>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2">AI Recommendations</p>
                      <div className="space-y-2">
                        {scanResult.recommendations.map((rec, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <Target className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-600">{rec}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Side Panel */}
        <div className="space-y-4">
          {/* ML Kit Info */}
          <Card className="bg-gradient-to-br from-indigo-50 to-blue-50 border-0 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-t-xl">
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                ML Kit Vision AI
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center gap-3">
                <Activity className="h-8 w-8 text-indigo-500" />
                <div>
                  <div className="font-medium text-gray-900">Object Detection</div>
                  <div className="text-sm text-gray-600">Real-time analysis</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Eye className="h-8 w-8 text-purple-500" />
                <div>
                  <div className="font-medium text-gray-900">Image Classification</div>
                  <div className="text-sm text-gray-600">Waste type identification</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <BarChart3 className="h-8 w-8 text-pink-500" />
                <div>
                  <div className="font-medium text-gray-900">Fill Level Estimation</div>
                  <div className="text-sm text-gray-600">Volume calculation</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Scan History */}
          <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-0 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-t-xl">
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Recent Scans
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              {scanHistory.length > 0 ? (
                <div className="space-y-3">
                  {scanHistory.map((scan, index) => (
                    <div key={index} className="p-3 bg-white rounded-lg shadow-sm">
                      <div className="flex items-center justify-between mb-2">
                        <Badge className={getConditionColor(scan.condition)}>
                          {scan.condition}
                        </Badge>
                        <span className="text-sm text-gray-500">{scan.fillLevel}%</span>
                      </div>
                      <div className="text-xs text-gray-600">{scan.location}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-gray-500 py-8">
                  <Scan className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                  <p className="text-sm">No scans yet</p>
                  <p className="text-xs">Start scanning to see history</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-0 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-t-xl">
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Performance Stats
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Scans</span>
                  <span className="text-lg font-bold text-green-600">{scanHistory.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Avg. Confidence</span>
                  <span className="text-lg font-bold text-blue-600">92%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Critical Alerts</span>
                  <span className="text-lg font-bold text-red-600">3</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}