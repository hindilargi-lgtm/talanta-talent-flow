import React from 'react';
import { Job, JobType } from '@/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, DollarSign, MapPin } from 'lucide-react';

interface JobsListProps {
  onApply: (job: JobType) => void;
}

const JOBS: Job[] = [
  {
    id: '1',
    title: 'Wapaka Rangi',
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/10b98b34-2e08-4054-b3eb-f497a0878b84/wapaka-rangi-a48fe13a-1782580367799.webp',
    dailyPay: 'Ksh 1,200',
    sundayPay: 'Ksh 2,400',
    intakeDate: '10th July 2026',
    workHours: '8:00AM - 12:00PM (Lunch 11AM-2PM)',
  },
  {
    id: '2',
    title: 'Wapanguza Vitu / Cleaners',
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/10b98b34-2e08-4054-b3eb-f497a0878b84/cleaners-3756de5f-1782580367297.webp',
    dailyPay: 'Ksh 1,200',
    sundayPay: 'Ksh 2,400',
    intakeDate: '10th July 2026',
    workHours: '8:00AM - 12:00PM (Lunch 11AM-2PM)',
  },
  {
    id: '3',
    title: 'Wapanda Maua / Landscapers',
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/10b98b34-2e08-4054-b3eb-f497a0878b84/landscapers-0eed223a-1782580368636.webp',
    dailyPay: 'Ksh 1,200',
    sundayPay: 'Ksh 2,400',
    intakeDate: '10th July 2026',
    workHours: '8:00AM - 12:00PM (Lunch 11AM-2PM)',
  },
  {
    id: '4',
    title: 'Weka Tiles / Tilers',
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/10b98b34-2e08-4054-b3eb-f497a0878b84/tilers-1fdd9d37-1782580368335.webp',
    dailyPay: 'Ksh 1,200',
    sundayPay: 'Ksh 2,400',
    intakeDate: '10th July 2026',
    workHours: '8:00AM - 12:00PM (Lunch 11AM-2PM)',
  },
];

export const JobsList: React.FC<JobsListProps> = ({ onApply }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {JOBS.map((job) => (
        <Card key={job.id} className="overflow-hidden border-none shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
          <div className="relative h-48 overflow-hidden">
            <img src={job.image} alt={job.title} className="w-full h-full object-cover" />
            <div className="absolute top-2 right-2">
              <Badge className="bg-red-600 text-white border-none">Active</Badge>
            </div>
          </div>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-bold">{job.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 flex-grow pb-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <DollarSign size={16} className="text-red-600" />
              <span>Daily: <span className="font-semibold text-black">{job.dailyPay}</span></span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar size={16} className="text-red-600" />
              <span>Sunday: <span className="font-semibold text-red-600">{job.sundayPay} [Double]</span></span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar size={16} className="text-red-600" />
              <span>Intake: <span className="font-semibold text-black">{job.intakeDate}</span></span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock size={16} className="text-red-600" />
              <span className="leading-tight">{job.workHours}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin size={16} className="text-red-600" />
              <span>Talanta Stadium</span>
            </div>
          </CardContent>
          <CardFooter className="pt-0 pb-6 px-6">
            <Button 
              className="w-full bg-black hover:bg-gray-900 text-white font-bold py-5 rounded-lg"
              onClick={() => onApply(job.title)}
            >
              Apply Now
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
