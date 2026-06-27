import React, { useState, useEffect } from 'react';
import { storage } from '@/lib/storage';
import { Application, JobType } from '@/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Download, CheckCircle, XCircle, Filter } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [filter, setFilter] = useState<string>('All');

  useEffect(() => {
    setApplications(storage.getApplications());
  }, []);

  const handleStatusUpdate = (id: string, status: 'Approved' | 'Rejected') => {
    storage.updateApplicationStatus(id, status);
    setApplications(storage.getApplications());
    toast.success(`Application imekuwa ${status === 'Approved' ? 'approved' : 'rejected'}`);
  };

  const filteredApplications = filter === 'All' 
    ? applications 
    : applications.filter(app => app.jobType === filter);

  const exportData = () => {
    toast.info('Exporting list to PDF/Excel... (Simulated)');
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">HR Dashboard</h1>
          <p className="text-gray-500">Manage stadium job applications</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg">
            <Filter size={16} className="text-gray-500" />
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-[180px] bg-transparent border-none shadow-none focus:ring-0">
                <SelectValue placeholder="Filter by Job" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Jobs</SelectItem>
                <SelectItem value="Wapaka Rangi">Wapaka Rangi</SelectItem>
                <SelectItem value="Wapanguza Vitu / Cleaners">Cleaners</SelectItem>
                <SelectItem value="Wapanda Maua / Landscapers">Landscapers</SelectItem>
                <SelectItem value="Weka Tiles / Tilers">Tilers</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button onClick={exportData} variant="outline" className="border-red-200 text-red-600">
            <Download size={16} className="mr-2" />
            Export List
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead>Applicant Name</TableHead>
              <TableHead>ID Number</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Job Type</TableHead>
              <TableHead>Date Applied</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredApplications.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-32 text-center text-gray-500">
                  Hakuna applications bado.
                </TableCell>
              </TableRow>
            ) : (
              filteredApplications.map((app) => (
                <TableRow key={app.id}>
                  <TableCell className="font-medium">{app.userName}</TableCell>
                  <TableCell>{app.userIdNumber}</TableCell>
                  <TableCell>{app.userPhone}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="bg-gray-100 text-gray-800 border-none font-normal">
                      {app.jobType}
                    </Badge>
                  </TableCell>
                  <TableCell>{app.dateApplied}</TableCell>
                  <TableCell>
                    <Badge 
                      className={
                        app.status === 'Approved' ? 'bg-green-100 text-green-700' :
                        app.status === 'Rejected' ? 'bg-red-100 text-red-700' :
                        'bg-yellow-100 text-yellow-700'
                      }
                    >
                      {app.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    {app.status === 'Pending' && (
                      <>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="text-green-600 hover:text-green-700 hover:bg-green-50"
                          onClick={() => handleStatusUpdate(app.id, 'Approved')}
                        >
                          <CheckCircle size={18} />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          onClick={() => handleStatusUpdate(app.id, 'Rejected')}
                        >
                          <XCircle size={18} />
                        </Button>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
