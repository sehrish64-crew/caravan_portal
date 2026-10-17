import type { Report } from '../types';

const REPORTS_KEY = 'caravan-portal-reports';

export function getLocalReports(): Report[] {
  try {
    const storedReports = localStorage.getItem(REPORTS_KEY);
    return storedReports ? JSON.parse(storedReports) as Report[] : [];
  } catch (error) {
    console.error('Unable to read saved reports:', error);
    return [];
  }
}

export function saveLocalReport(report: Report): void {
  const reports = getLocalReports();
  const existingIndex = reports.findIndex((savedReport) => savedReport.id === report.id);
  if (existingIndex >= 0) {
    reports[existingIndex] = report;
  } else {
    reports.unshift(report);
  }
  localStorage.setItem(REPORTS_KEY, JSON.stringify(reports));
}

export function updateLocalReport(id: string, updates: Partial<Report>): Report | null {
  const report = getLocalReports().find((savedReport) => savedReport.id === id);
  if (!report) return null;

  const updatedReport = { ...report, ...updates, updated_at: new Date().toISOString() };
  saveLocalReport(updatedReport);
  return updatedReport;
}

export function deleteLocalReport(id: string): void {
  const reports = getLocalReports().filter((report) => report.id !== id);
  localStorage.setItem(REPORTS_KEY, JSON.stringify(reports));
}