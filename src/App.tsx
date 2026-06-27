import { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { JobsList } from './components/JobsList';
import { SignInForm, SignUpForm } from './components/AuthForms';
import { AdminDashboard } from './components/AdminDashboard';
import { ApplicationForm } from './components/ApplicationForm';
import { storage } from './lib/storage';
import { User, JobType, Application } from './types';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './components/ui/dialog';
import { Toaster, toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, Briefcase, Info, ArrowRight } from 'lucide-react';
import { Button } from './components/ui/button';

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [view, setView] = useState<'home' | 'admin'>('home');
  const [authModal, setAuthModal] = useState<{ open: boolean; type: 'signin' | 'signup' }>({ open: false, type: 'signin' });
  const [applyModal, setApplyModal] = useState<{ open: boolean; job: JobType | null }>({ open: false, job: null });

  useEffect(() => {
    const user = storage.getCurrentUser();
    setCurrentUser(user);
    if (user?.role === 'admin') {
      setView('admin');
    }
  }, []);

  const handleAuthSuccess = (user: User) => {
    setCurrentUser(user);
    setAuthModal({ ...authModal, open: false });
    if (user.role === 'admin') {
      setView('admin');
    }
  };

  const handleLogout = () => {
    storage.logout();
    setCurrentUser(null);
    setView('home');
    toast.success('Logged out successfully');
  };

  const handleApplyClick = (job: JobType) => {
    if (!currentUser) {
      setAuthModal({ open: true, type: 'signin' });
      toast.info('Tafadhali Sign In kwanza ili uweze kuapply');
      return;
    }
    setApplyModal({ open: true, job });
  };

  const handleApplicationSubmit = (data: any) => {
    if (!currentUser || !applyModal.job) return;

    const newApplication: Application = {
      id: Math.random().toString(36).substr(2, 9),
      userId: currentUser.email, // using email as ID for simplicity
      userName: data.fullName,
      userPhone: data.phoneNumber,
      userIdNumber: data.idNumber,
      jobType: applyModal.job,
      status: 'Pending',
      dateApplied: new Date().toLocaleDateString(),
    };

    storage.saveApplication(newApplication);
    setApplyModal({ open: false, job: null });
    toast.success('Maombi yako yamepokelewa! Subiri majibu kutoka kwa HR.');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans selection:bg-red-100 selection:text-red-900">
      <Toaster position="top-center" richColors />
      
      <Navbar 
        user={currentUser} 
        onAuthClick={(type) => setAuthModal({ open: true, type })} 
        onLogout={handleLogout} 
      />

      <main className="flex-grow">
        {view === 'admin' && currentUser?.role === 'admin' ? (
          <div className="container mx-auto px-4 py-12">
            <AdminDashboard />
          </div>
        ) : (
          <>
            {/* Hero Section */}
            <section className="relative bg-black text-white py-20 overflow-hidden">
              <div className="absolute inset-0 opacity-40">
                <img 
                  src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/10b98b34-2e08-4054-b3eb-f497a0878b84/cleaners-3756de5f-1782580367297.webp" 
                  className="w-full h-full object-cover grayscale" 
                  alt="Stadium background"
                />
              </div>
              <div className="container mx-auto px-4 relative z-10 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">
                    Talanta <span className="text-red-600">Stadium</span> Jobs
                  </h1>
                  <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto mb-10 font-light">
                    Pata nafasi za kazi za muda mfupi katika uwanja wa kisasa wa Talanta Stadium. 
                    Apply sasa upate ajira!
                  </p>
                  <div className="flex flex-wrap justify-center gap-4">
                    <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 h-14 rounded-full" onClick={() => document.getElementById('jobs')?.scrollIntoView({ behavior: 'smooth' })}>
                      Angalia Kazi Zilizopo
                      <ArrowRight size={20} className="ml-2" />
                    </Button>
                  </div>
                </motion.div>
              </div>
            </section>

            {/* Job Listings Section */}
            <section id="jobs" className="container mx-auto px-4 py-20">
              <div className="flex flex-col items-center mb-16 text-center">
                <h2 className="text-4xl font-bold mb-4">Kazi Zinazopatikana</h2>
                <div className="w-20 h-1.5 bg-red-600 rounded-full mb-6"></div>
                <p className="text-gray-500 max-w-xl">
                  Chagua kazi inayokufaa na uapply sasa. Malipo ni ya kila siku na jumapili ni mara mbili (Double Pay).
                </p>
              </div>
              <JobsList onApply={handleApplyClick} />
            </section>
          </>
        )}
      </main>

      <Footer />

      {/* Auth Modal */}
      <Dialog open={authModal.open} onOpenChange={(open) => setAuthModal({ ...authModal, open })}>
        <DialogContent className="sm:max-w-md p-8 overflow-hidden rounded-2xl border-none shadow-2xl">
          <DialogHeader className="mb-6">
            <DialogTitle className="text-3xl font-extrabold text-center">
              {authModal.type === 'signin' ? 'Karibu Tena' : 'Jisajili Sasa'}
            </DialogTitle>
            <DialogDescription className="text-center text-gray-500 pt-2">
              {authModal.type === 'signin' 
                ? 'Weka email na password yako ili uingie' 
                : 'Jaza taarifa zako hapa chini kujiunga na Talanta Jobs'}
            </DialogDescription>
          </DialogHeader>
          
          {authModal.type === 'signin' ? (
            <SignInForm onSuccess={handleAuthSuccess} />
          ) : (
            <SignUpForm onSuccess={handleAuthSuccess} />
          )}
          
          <div className="mt-8 pt-6 border-t border-gray-100 text-center text-sm text-gray-500">
            {authModal.type === 'signin' ? "Huna akaunti?" : "Tayari unayo akaunti?"}{' '}
            <button 
              className="text-red-600 font-bold hover:underline"
              onClick={() => setAuthModal({ ...authModal, type: authModal.type === 'signin' ? 'signup' : 'signin' })}
            >
              {authModal.type === 'signin' ? 'Jisajili hapa' : 'Ingia hapa'}
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Application Modal */}
      <Dialog open={applyModal.open} onOpenChange={(open) => setApplyModal({ ...applyModal, open })}>
        <DialogContent className="sm:max-w-lg p-8 rounded-2xl border-none shadow-2xl">
          <DialogHeader className="mb-2">
            <DialogTitle className="text-2xl font-bold">Fomu ya Maombi</DialogTitle>
            <DialogDescription>Jaza fomu hii kwa umakini ili uweze kupatiwa nafasi ya kazi.</DialogDescription>
          </DialogHeader>
          {currentUser && applyModal.job && (
            <ApplicationForm 
              user={currentUser} 
              jobType={applyModal.job} 
              onSubmit={handleApplicationSubmit}
              onCancel={() => setApplyModal({ open: false, job: null })}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default App;
