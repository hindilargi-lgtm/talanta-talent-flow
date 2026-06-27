export type JobType = 'Wapaka Rangi' | 'Wapanguza Vitu / Cleaners' | 'Wapanda Maua / Landscapers' | 'Weka Tiles / Tilers';

export interface Job {
  id: string;
  title: JobType;
  image: string;
  dailyPay: string;
  sundayPay: string;
  intakeDate: string;
  workHours: string;
}

export interface User {
  fullName: string;
  idNumber: string;
  phoneNumber: string;
  email: string;
  location: string;
  password?: string;
  role: 'applicant' | 'admin';
}

export interface Application {
  id: string;
  userId: string;
  userName: string;
  userPhone: string;
  userIdNumber: string;
  jobType: JobType;
  status: 'Pending' | 'Approved' | 'Rejected';
  dateApplied: string;
}
