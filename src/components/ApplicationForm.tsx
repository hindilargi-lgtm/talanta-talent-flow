import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { JobType, User } from '@/types';

const applicationSchema = z.object({
  fullName: z.string().min(3, 'Jina kamili linahitajika'),
  idNumber: z.string().min(5, 'ID Number sahihi inahitajika'),
  phoneNumber: z.string().min(10, 'Namba ya simu sahihi inahitajika'),
  jobType: z.string(),
});

interface ApplicationFormProps {
  user: User;
  jobType: JobType;
  onSubmit: (data: z.infer<typeof applicationSchema>) => void;
  onCancel: () => void;
}

export const ApplicationForm: React.FC<ApplicationFormProps> = ({ user, jobType, onSubmit, onCancel }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof applicationSchema>>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      fullName: user.fullName,
      idNumber: user.idNumber,
      phoneNumber: user.phoneNumber,
      jobType: jobType,
    }
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="bg-red-50 p-4 rounded-lg border border-red-100 mb-4">
        <p className="text-sm font-semibold text-red-800">Unatuma maombi ya kazi ya:</p>
        <p className="text-xl font-bold text-red-600">{jobType}</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Jina Kamili</Label>
          <Input {...register('fullName')} />
          {errors.fullName && <p className="text-red-500 text-xs">{errors.fullName.message}</p>}
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>ID Number</Label>
            <Input {...register('idNumber')} />
            {errors.idNumber && <p className="text-red-500 text-xs">{errors.idNumber.message}</p>}
          </div>
          <div className="space-y-2">
            <Label>Namba ya Simu</Label>
            <Input {...register('phoneNumber')} />
            {errors.phoneNumber && <p className="text-red-500 text-xs">{errors.phoneNumber.message}</p>}
          </div>
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <Button type="button" variant="outline" className="flex-1 py-6" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-6">
          Submit Application
        </Button>
      </div>
    </form>
  );
};
