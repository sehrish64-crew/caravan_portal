import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createDefaultReportData } from '../lib/defaultReportData';
import { saveLocalReport } from '../lib/localReports';
import {
  ArrowRight,
  Car,
  Upload,
  Palette,
  Package,
  FileText,
  Hash,
  Calendar,
  Gauge,
} from 'lucide-react';
import type { Brand, Report, ReportType, PackageType } from '../types';

const BRAND_PRESETS: Array<Pick<Brand, 'id' | 'name' | 'slug' | 'default_color' | 'email' | 'website'>> = [
  { id: 'autoscanora', name: 'AutoScanOra', slug: 'autoscanora', default_color: '#0F766E', email: 'info@autoscanora.com', website: 'https://autoscanora.com' },
  { id: 'carreaders', name: 'CarReaders', slug: 'carreaders', default_color: '#3B82F6', email: 'info@carreaders.com', website: 'https://carreaders.com/' },
  { id: 'vehiclehealthanalysis', name: 'VehicleHealthAnalysis', slug: 'vehiclehealthanalysis', default_color: '#10B981', email: 'info@vehiclehealthanalysis.com', website: 'https://vehiclehealthanalysis.com/' },
  { id: 'vehiclehealthestimate', name: 'VehicleHealthEstimate', slug: 'vehiclehealthestimate', default_color: '#F59E0B', email: 'info@vehiclehealthestimate.com', website: 'https://vehiclehealthestimate.com/' },
  { id: 'carbronze', name: 'CarBronze', slug: 'carbronze', default_color: '#92400E', email: 'info@carbronze.com', website: 'https://carbronze.com/' },
  { id: 'trueanalyzers', name: 'TrueAnalyzers', slug: 'trueanalyzers', default_color: '#8B5CF6', email: 'info@trueanalyzers.com', website: 'https://trueanalyzers.com/' },
  { id: 'trueinspectify', name: 'TrueInspectify', slug: 'trueinspectify', default_color: '#EC4899', email: 'info@trueinspectify.com', website: 'https://trueinspectify.com/' },
  { id: 'trueinfoprovider', name: 'TrueInfoProvider', slug: 'trueinfoprovider', default_color: '#06B6D4', email: 'info@trueinfoprovider.com', website: 'https://trueinfoprovider.com/' },
  { id: 'cardefiner', name: 'CarDefiner', slug: 'cardefiner', default_color: '#EF4444', email: 'info@cardefiner.com', website: 'https://cardefiner.com/' },
];

export function NewReport() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Form fields
  const [selectedBrand, setSelectedBrand] = useState('autoscanora');
  const [brandColor, setBrandColor] = useState('#0F766E');
  const [brandEmail, setBrandEmail] = useState('info@autoscanora.com');
  const [brandWebsite, setBrandWebsite] = useState('https://autoscanora.com');
  const [reportType, setReportType] = useState<ReportType>('VIN');
  const [packageType, setPackageType] = useState<PackageType>('Standard');
  const [logoUrl, setLogoUrl] = useState<string>('');
  const [logoFile, setLogoFile] = useState<File | null>(null);

  // Vehicle details
  const [vinNumber, setVinNumber] = useState('');
  const [plateNumber, setPlateNumber] = useState('');
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [mileage, setMileage] = useState('');
  const [marketValue, setMarketValue] = useState('');

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleContinue = () => {
    if (!selectedBrand) {
      setErrorMessage('Please select a brand');
      return;
    }

    if (!make.trim() || !model.trim()) {
      setErrorMessage('Make and model are required');
      return;
    }

    setErrorMessage('');
    setLoading(true);
    try {
      const selectedBrandPreset = BRAND_PRESETS.find((brand) => brand.id === selectedBrand) ?? BRAND_PRESETS[0];
      const brandName = selectedBrandPreset.name;
      const now = new Date().toISOString();
      const reportId = crypto.randomUUID();
      const brand: Brand = {
        id: selectedBrand,
        name: brandName,
        slug: 'autoscanora',
        default_color: brandColor,
        email: brandEmail,
        website: brandWebsite,
        created_at: now,
      };
      const reportData = {
        ...createDefaultReportData(make.trim(), model.trim(), year ? Number(year) : undefined, mileage ? Number(mileage) : undefined, reportType === 'Plate' ? plateNumber : undefined, reportType === 'VIN' ? vinNumber : undefined),
        securedBy: `Secured by ${brandName}`,
        tagline: 'One VIN. Complete History.',
        email: brandEmail,
        website: brandWebsite,
        marketValue: marketValue || '---',
        marketValueSummary: `Market value is estimated at ${marketValue || '---'} with a Clear / Valid MOT.`,
      };
      const report: Report = {
        id: reportId,
        user_id: 'local',
        brand_id: brand.id,
        brand,
        report_type: reportType,
        package_type: packageType,
        vin_number: reportType === 'VIN' ? vinNumber || null : null,
        plate_number: reportType === 'Plate' ? plateNumber || null : null,
        make: make.trim(),
        model: model.trim(),
        year: year ? Number(year) : null,
        mileage: mileage ? Number(mileage) : null,
        brand_color: brandColor,
        logo_url: logoUrl || null,
        report_data: reportData,
        client_name: null,
        vehicle_name: `${make.trim()} ${model.trim()}`,
        overall_score: null,
        status: 'draft',
        created_at: now,
        updated_at: now,
      };
      saveLocalReport(report);
      navigate(`/dashboard/report/${report.id}`);
    } catch (error) {
      console.error('Error creating report:', error);
      const errorMsg = error instanceof Error ? error.message : 'Could not save report on this device';
      setErrorMessage(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">New Report</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Create a new inspection report with dynamic branding
        </p>
      </div>

      {/* Error Message */}
      {errorMessage && (
        <div className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 rounded-xl p-4 text-red-700 dark:text-red-400 text-sm">
          {errorMessage}
        </div>
      )}

      {/* Form */}
      <div className="space-y-6">
        {/* Brand Selection */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm p-4 sm:p-6">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <Car className="w-5 h-5 text-blue-500" />
            Brand Selection
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Brand Dropdown */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Select Brand
              </label>
              <select
                value={selectedBrand}
                onChange={(e) => {
                  const brand = BRAND_PRESETS.find((preset) => preset.id === e.target.value);
                  if (!brand) return;
                  setSelectedBrand(brand.id);
                  setBrandColor(brand.default_color);
                  setBrandEmail(brand.email ?? '');
                  setBrandWebsite(brand.website ?? '');
                }}
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {BRAND_PRESETS.map((brand) => (
                  <option key={brand.id} value={brand.id}>{brand.name}</option>
                ))}
              </select>
            </div>

            {/* Brand Color */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                <Palette className="w-4 h-4 inline mr-1" />
                Brand Color
              </label>
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <input
                  type="color"
                  value={brandColor}
                  onChange={(e) => setBrandColor(e.target.value)}
                  className="w-full sm:w-12 h-12 rounded-xl cursor-pointer border-2 border-slate-200 dark:border-slate-600 shrink-0"
                />
                <input
                  type="text"
                  value={brandColor}
                  onChange={(e) => setBrandColor(e.target.value)}
                  className="w-full min-w-0 px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-slate-900 dark:text-white uppercase"
                />
              </div>
            </div>
          </div>

          {/* Brand Contact Info */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Brand Email
              </label>
              <input
                type="email"
                value={brandEmail}
                onChange={(e) => setBrandEmail(e.target.value)}
                placeholder="info@example.com"
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Brand Website
              </label>
              <input
                type="url"
                value={brandWebsite}
                onChange={(e) => setBrandWebsite(e.target.value)}
                placeholder="https://example.com/"
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Logo Upload */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              <Upload className="w-4 h-4 inline mr-1" />
              Brand Logo (Optional)
            </label>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <label className="flex-1 flex items-center justify-center gap-3 px-6 py-4 bg-slate-50 dark:bg-slate-700 border-2 border-dashed border-slate-200 dark:border-slate-600 rounded-xl cursor-pointer hover:border-blue-500 transition-colors">
                <Upload className="w-5 h-5 text-slate-400" />
                <span className="text-slate-600 dark:text-slate-300">
                  {logoFile ? logoFile.name : 'Click to upload logo'}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="hidden"
                />
              </label>
              {logoUrl && (
                <div className="w-full sm:w-16 h-20 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-600">
                  <img src={logoUrl} alt="Logo" className="w-full h-full object-contain" />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Normal Report Form */}
        {/* Report Type & Package */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm p-4 sm:p-6">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-500" />
              Report Configuration
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Report Type */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Report Type
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(['VIN', 'Plate'] as ReportType[]).map((type) => (
                    <button
                      key={type}
                      onClick={() => setReportType(type)}
                      className={`flex-1 px-4 py-3 rounded-xl font-medium transition-all ${
                        reportType === type
                          ? 'text-white shadow-lg'
                          : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                      }`}
                      style={reportType === type ? { backgroundColor: brandColor } : undefined}
                    >
                      {type} Report
                    </button>
                  ))}
                </div>
              </div>

              {/* Package Type */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  <Package className="w-4 h-4 inline mr-1" />
                  Package Type
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {(['Basic', 'Standard', 'Premium'] as PackageType[]).map((pkg) => (
                    <button
                      key={pkg}
                      onClick={() => setPackageType(pkg)}
                      className={`flex-1 px-4 py-3 rounded-xl font-medium transition-all ${
                        packageType === pkg
                          ? 'text-white shadow-lg'
                          : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                      }`}
                      style={packageType === pkg ? { backgroundColor: brandColor } : undefined}
                    >
                      {pkg}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Vehicle Details */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm p-4 sm:p-6">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <Car className="w-5 h-5 text-blue-500" />
              Vehicle Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {reportType === 'VIN' ? (
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    <Hash className="w-4 h-4 inline mr-1" />
                    VIN Number
                  </label>
                  <input
                    type="text"
                    value={vinNumber}
                    onChange={(e) => setVinNumber(e.target.value)}
                    placeholder="Enter VIN number"
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    <Hash className="w-4 h-4 inline mr-1" />
                    Plate Number
                  </label>
                  <input
                    type="text"
                    value={plateNumber}
                    onChange={(e) => setPlateNumber(e.target.value)}
                    placeholder="Enter plate number"
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Make
                </label>
                <input
                  type="text"
                  value={make}
                  onChange={(e) => setMake(e.target.value)}
                  placeholder="e.g., Toyota"
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Model
                </label>
                <input
                  type="text"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  placeholder="e.g., Camry"
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  <Calendar className="w-4 h-4 inline mr-1" />
                  Year
                </label>
                <input
                  type="number"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  placeholder="e.g., 2023"
                  min="1900"
                  max={new Date().getFullYear() + 1}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  <Gauge className="w-4 h-4 inline mr-1" />
                  Mileage
                </label>
                <input
                  type="number"
                  value={mileage}
                  onChange={(e) => setMileage(e.target.value)}
                  placeholder="e.g., 50000"
                  min="0"
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Market Value
                </label>
                <input
                  type="text"
                  value={marketValue}
                  onChange={(e) => setMarketValue(e.target.value)}
                  placeholder="e.g., £12,500"
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

        {/* Continue Button */}
        <button
          onClick={handleContinue}
          disabled={loading || !selectedBrand || !make.trim() || !model.trim()}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 sm:gap-3 sm:px-6 sm:py-4 text-sm sm:text-base text-white font-semibold rounded-xl shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-xl"
          style={{ backgroundColor: brandColor }}
        >
          {loading ? (
            'Creating...'
          ) : (
            <>
              Continue
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
