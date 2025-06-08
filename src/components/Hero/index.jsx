import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { BookOpen, Users, ClipboardList, ArrowRight } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description, className }) => (
  <div
    className={`bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5 shadow-sm hover:shadow-md transition-colors duration-200 ${className}`}
    role="article"
  >
    <div className="text-indigo-500 dark:text-indigo-400 mb-3 flex justify-center">
      <Icon className="w-6 h-6" aria-hidden="true" />
    </div>
    <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 text-center">
      {title}
    </h3>
    <p className="text-sm text-slate-600 dark:text-slate-400 text-center mt-2 leading-relaxed">
      {description}
    </p>
  </div>
);

const Hero = ({ className = '' }) => {
  const { isAuthenticated } = useSelector((state) => state.user);

  return (
    <section className={`bg-slate-50 dark:bg-slate-900 pt-20 ${className}`} aria-label="Hero section">
      <div className="container mx-auto px-4">
        <div className="py-12 text-center">
          <div className="flex justify-center mb-6">
            <img
              src="/images/school-logo.png"
              alt="School Logo"
              className="h-14 w-auto"
            />
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold text-slate-800 dark:text-slate-100 mb-4">
            Welcome to Our School
          </h1>
          <h2 className="text-xl sm:text-2xl font-medium text-indigo-600 dark:text-indigo-400 mb-6">
            A Smarter Way to Learn and Manage
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            A simple, intuitive platform to manage academics, monitor student progress, and streamline school communication.
          </p>

          {!isAuthenticated && (
            <div className="flex justify-center mb-12">
              <Link
                href="/login"
                className="px-5 py-3 text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 rounded-lg transition duration-200 flex items-center gap-2 group shadow-sm"
              >
                Access School Portal
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <FeatureCard
              icon={Users}
              title="Student Management"
              description="Maintain accurate student records and parent contacts efficiently."
            />
            <FeatureCard
              icon={ClipboardList}
              title="Attendance"
              description="Track attendance of students and staff with ease and clarity."
            />
            <FeatureCard
              icon={BookOpen}
              title="Academics"
              description="Publish marks, generate reports, and manage academic workflows."
            />
          </div>
        </div>
      </div>
    </section>
  );
};


Hero.propTypes = {
  className: PropTypes.string,
};

export default Hero;