import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { storage } from '@/lib/storage';
import { User } from '@/types';
import { toast } from 'sonner';

const signUpSchema = z.object({
  fullName: z.string().min(3, 'Jina kamili linahitajika'),
  idNumber: z.string().min(5, 'ID Number sahihi inahitajika'),
  phoneNumber: z.string().min(10, 'Namba ya simu sahihi inahitajika'),
  email: z.string().email('Barua pepe (Email) sahihi inahitajika'),
  location: z.string().min(2, 'Mahali unapoishi panahitajika'),
  password: z.string().min(4, 'Password inapaswa kuwa na herufi angalau 4'),
});

const signInSchema = z.object({
  email: z.string().email('Email sahihi inahitajika'),
  password: z.string().min(4, 'Password inahitajika'),
});

export const SignUpForm: React.FC<{ onSuccess: (user: User) => void }> = ({ onSuccess }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = (data: z.infer<typeof signUpSchema>) => {
    const existingUsers = storage.getUsers();
    if (existingUsers.find(u => u.email === data.email)) {
      toast.error('Email hii tayari imeshasajiliwa');
      return;
    }

    const newUser: User = {
      ...data,
      role: data.email === 'admin' || data.email === 'admin@talanta.com' ? 'admin' : 'applicant',
    };

    storage.saveUser(newUser);
    storage.setCurrentUser(newUser);
    toast.success('Usajili umefaulu!');
    onSuccess(newUser);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label>Jina Kamili</Label>
        <Input {...register('fullName')} placeholder="Mfano: John Doe" />
        {errors.fullName && <p className="text-red-500 text-xs">{errors.fullName.message}</p>}
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>ID Number</Label>
          <Input {...register('idNumber')} placeholder="ID Yako" />
          {errors.idNumber && <p className="text-red-500 text-xs">{errors.idNumber.message}</p>}
        </div>
        <div className="space-y-2">
          <Label>Namba ya Simu</Label>
          <Input {...register('phoneNumber')} placeholder="0712345678" />
          {errors.phoneNumber && <p className="text-red-500 text-xs">{errors.phoneNumber.message}</p>}
        </div>
      </div>
      <div className="space-y-2">
        <Label>Email</Label>
        <Input {...register('email')} type="email" placeholder="email@mfano.com" />
        {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
      </div>
      <div className="space-y-2">
        <Label>Location (Mahali unapoishi)</Label>
        <Input {...register('location')} placeholder="Mfano: Nairobi, Kasarani" />
        {errors.location && <p className="text-red-500 text-xs">{errors.location.message}</p>}
      </div>
      <div className="space-y-2">
        <Label>Password</Label>
        <Input {...register('password')} type="password" placeholder="****" />
        {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
      </div>
      <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-6">
        Sign Up
      </Button>
    </form>
  );
};

export const SignInForm: React.FC<{ onSuccess: (user: User) => void }> = ({ onSuccess }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = (data: z.infer<typeof signInSchema>) => {
    // Hardcoded admin check for specific requirement
    if (data.email === 'admin' && data.password === 'admin123') {
      const admin: User = {
        fullName: 'HR Administrator',
        email: 'admin',
        idNumber: '000000',
        phoneNumber: '0000000000',
        location: 'Talanta HQ',
        role: 'admin'
      };
      storage.setCurrentUser(admin);
      toast.success('Karibu Admin!');
      onSuccess(admin);
      return;
    }

    const users = storage.getUsers();
    const user = users.find(u => u.email === data.email && u.password === data.password);

    if (user) {
      storage.setCurrentUser(user);
      toast.success(`Karibu tena, ${user.fullName}!`);
      onSuccess(user);
    } else {
      toast.error('Email au Password si sahihi');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <Label>Email</Label>
        <Input {...register('email')} placeholder="Barua pepe yako" />
        {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
      </div>
      <div className="space-y-2">
        <Label>Password</Label>
        <Input {...register('password')} type="password" placeholder="****" />
        {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
      </div>
      <Button type="submit" className="w-full bg-black hover:bg-gray-900 text-white font-bold py-6">
        Sign In
      </Button>
      <p className="text-xs text-center text-gray-500">
        Admin email: <span className="font-mono">admin</span> | Pass: <span className="font-mono">admin123</span>
      </p>
    </form>
  );
};
