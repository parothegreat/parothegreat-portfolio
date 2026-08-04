export interface EducationItem {
  id: string;
  school: string;
  program: string;
  location: string;
  startYear: number;
  endYear?: number;
  logo?: string;
  schoolUrl?: string;
}

export const EDUCATION: EducationItem[] = [
  {
    id: 'smk-mitra-industri',
    school: 'Mitra Industri Vocational High School',
    program: 'Industrial Electronics Engineering',
    location: 'Bekasi, Indonesia',
    startYear: 2024,
    logo: '/images/logos/smk-mitra-industri.png',
    schoolUrl: 'https://smkind-mm2100.sch.id',
  },
];
