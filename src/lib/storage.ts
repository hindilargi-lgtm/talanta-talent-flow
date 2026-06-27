import { User, Application } from '../types';

const STORAGE_KEYS = {
  USERS: 'talanta_users',
  APPLICATIONS: 'talanta_applications',
  CURRENT_USER: 'talanta_current_user',
};

export const storage = {
  getUsers: (): User[] => {
    const data = localStorage.getItem(STORAGE_KEYS.USERS);
    return data ? JSON.parse(data) : [];
  },
  saveUser: (user: User) => {
    const users = storage.getUsers();
    users.push(user);
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  },
  getApplications: (): Application[] => {
    const data = localStorage.getItem(STORAGE_KEYS.APPLICATIONS);
    return data ? JSON.parse(data) : [];
  },
  saveApplication: (app: Application) => {
    const apps = storage.getApplications();
    apps.push(app);
    localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(apps));
  },
  updateApplicationStatus: (id: string, status: 'Approved' | 'Rejected') => {
    const apps = storage.getApplications();
    const index = apps.findIndex((a) => a.id === id);
    if (index !== -1) {
      apps[index].status = status;
      localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(apps));
    }
  },
  getCurrentUser: (): User | null => {
    const data = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    return data ? JSON.parse(data) : null;
  },
  setCurrentUser: (user: User | null) => {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
  },
  logout: () => {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  },
};
