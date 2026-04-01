import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'vi';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Common
    'common.logout': 'Logout',
    'common.upgrade': 'Upgrade',
    'common.add': 'Add',
    'common.cancel': 'Cancel',
    'common.save': 'Save',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.search': 'Search',
    'common.settings': 'Settings',

    // Patient Dashboard
    'patient.welcome': 'Welcome back',
    'patient.today': 'Today is',
    'patient.todayProgress': "Today's Progress",
    'patient.activeMeds': 'Active Meds',
    'patient.weeklyRate': 'Weekly Rate',
    'patient.streak': 'Streak',
    'patient.medicationsTracked': 'Medications tracked',
    'patient.daysInRow': 'Days in a row',
    'patient.fromLastWeek': 'from last week',
    'patient.todaySchedule': "Today's Schedule",
    'patient.allMedications': 'All Medications',
    'patient.history': 'History',
    'patient.addMedication': 'Add Medication',
    'patient.addNewMedication': 'Add New Medication',
    'patient.medicationName': 'Medication Name',
    'patient.dosage': 'Dosage',
    'patient.frequency': 'Frequency',
    'patient.time': 'Time',
    'patient.startDate': 'Start Date',
    'patient.endDate': 'End Date',
    'patient.taken': 'Taken',
    'patient.missed': 'Missed',
    'patient.markAsTaken': 'Mark as Taken',
    'patient.weeklyAdherence': 'Weekly Adherence',
    'patient.upcomingReminders': 'Upcoming Reminders',
    'patient.upgradeToPremium': 'Upgrade to Premium',
    'patient.premiumDesc': 'Get unlimited medications, SMS reminders, and family access',
    'patient.viewPlans': 'View Plans',
    'patient.recentActivity': 'Recent Activity',
    'patient.adherence': 'adherence',
    'patient.dateNote': 'Note: If no end date is selected, medication will be scheduled continuously.',

    // Frequency options
    'frequency.once': 'Once daily',
    'frequency.twice': 'Twice daily',
    'frequency.thrice': 'Three times daily',
    'frequency.custom': 'Custom',

    // Placeholders
    'placeholder.medication': 'e.g., Aspirin',
    'placeholder.dosage': 'e.g., 100mg',
    'placeholder.selectFrequency': 'Select frequency',

    // Mobile App
    'mobile.hello': 'Hello',
    'mobile.todayProgress': "Today's Progress",
    'mobile.completed': 'completed',
    'mobile.medications': 'Medications',
    'mobile.thisWeek': 'This week',
    'mobile.daysStreak': 'Days streak',
    'mobile.todaySchedule': "Today's Schedule",
    'mobile.allMedications': 'All Medications',
    'mobile.addMedication': 'Add Med',
    'mobile.searchMedication': 'Search medication...',
    'mobile.history': 'History',
    'mobile.profile': 'Profile',
    'mobile.home': 'Home',
    'mobile.calendar': 'Calendar',
    'mobile.thisWeekCal': 'This Week',
    'mobile.recentActivity': 'Recent Activity',
    'mobile.today': 'Today',
    'mobile.yesterday': 'Yesterday',
    'mobile.currentPlan': 'Current Plan',
    'mobile.free': 'Free',
    'mobile.memberSince': 'Member since',
    'mobile.upgradePremium': 'Upgrade Premium',
    'mobile.notifications': 'Notifications',
    'mobile.personalInfo': 'Personal Info',
    'mobile.healthTip': 'Health Tip',
    'mobile.healthTipText': 'Taking medication at the same time daily helps your body absorb it better.',
    'mobile.taken': 'Taken',
    'mobile.markTaken': 'Mark',
    'mobile.timesPerDay': 'times/day',
    'mobile.missedReminderTitle': 'You may have missed a dose',
    'mobile.missedReminderMessage': 'It is past the scheduled time. Please take this medication now if advised by your doctor.',
    'mobile.dismissReminder': 'Dismiss',
    'mobile.notificationCenter': 'Notifications',
    'mobile.noNotifications': 'No pending reminders',

    // Days
    'day.mon': 'Mon',
    'day.tue': 'Tue',
    'day.wed': 'Wed',
    'day.thu': 'Thu',
    'day.fri': 'Fri',
    'day.sat': 'Sat',
    'day.sun': 'Sun',
  },
  vi: {
    // Common
    'common.logout': 'Đăng xuất',
    'common.upgrade': 'Nâng cấp',
    'common.add': 'Thêm',
    'common.cancel': 'Hủy',
    'common.save': 'Lưu',
    'common.edit': 'Sửa',
    'common.delete': 'Xóa',
    'common.search': 'Tìm kiếm',
    'common.settings': 'Cài đặt',

    // Patient Dashboard
    'patient.welcome': 'Chào mừng trở lại',
    'patient.today': 'Hôm nay là',
    'patient.todayProgress': 'Tiến độ hôm nay',
    'patient.activeMeds': 'Thuốc đang dùng',
    'patient.weeklyRate': 'Tỷ lệ tuần',
    'patient.streak': 'Chuỗi',
    'patient.medicationsTracked': 'Thuốc được theo dõi',
    'patient.daysInRow': 'Ngày liên tục',
    'patient.fromLastWeek': 'so với tuần trước',
    'patient.todaySchedule': 'Lịch uống hôm nay',
    'patient.allMedications': 'Tất cả thuốc',
    'patient.history': 'Lịch sử',
    'patient.addMedication': 'Thêm thuốc',
    'patient.addNewMedication': 'Thêm thuốc mới',
    'patient.medicationName': 'Tên thuốc',
    'patient.dosage': 'Liều lượng',
    'patient.frequency': 'Tần suất',
    'patient.time': 'Giờ uống',
    'patient.startDate': 'Ngày bắt đầu',
    'patient.endDate': 'Ngày kết thúc',
    'patient.taken': 'Đã uống',
    'patient.missed': 'Bỏ lỡ',
    'patient.markAsTaken': 'Đánh dấu đã uống',
    'patient.weeklyAdherence': 'Tuân thủ hàng tuần',
    'patient.upcomingReminders': 'Nhắc nhở sắp tới',
    'patient.upgradeToPremium': 'Nâng cấp Premium',
    'patient.premiumDesc': 'Nhận không giới hạn thuốc, nhắc SMS và truy cập gia đình',
    'patient.viewPlans': 'Xem gói',
    'patient.recentActivity': 'Hoạt động gần đây',
    'patient.adherence': 'tuân thủ',
    'patient.dateNote': 'Lưu ý: Nếu không chọn ngày kết thúc, thuốc sẽ được lên lịch uống liên tục.',

    // Frequency options
    'frequency.once': 'Một lần mỗi ngày',
    'frequency.twice': 'Hai lần mỗi ngày',
    'frequency.thrice': 'Ba lần mỗi ngày',
    'frequency.custom': 'Tùy chỉnh',

    // Placeholders
    'placeholder.medication': 'Ví dụ: Aspirin',
    'placeholder.dosage': 'Ví dụ: 100mg',
    'placeholder.selectFrequency': 'Chọn tần suất',

    // Mobile App
    'mobile.hello': 'Xin chào',
    'mobile.todayProgress': 'Tiến độ hôm nay',
    'mobile.completed': 'hoàn thành',
    'mobile.medications': 'Thuốc',
    'mobile.thisWeek': 'Tuần này',
    'mobile.daysStreak': 'Ngày liên tục',
    'mobile.todaySchedule': 'Lịch uống hôm nay',
    'mobile.allMedications': 'Tất cả thuốc',
    'mobile.addMedication': 'Thêm',
    'mobile.searchMedication': 'Tìm kiếm thuốc...',
    'mobile.history': 'Lịch sử',
    'mobile.profile': 'Hồ sơ',
    'mobile.home': 'Trang chủ',
    'mobile.calendar': 'Lịch',
    'mobile.thisWeekCal': 'Tuần này',
    'mobile.recentActivity': 'Hoạt động gần đây',
    'mobile.today': 'Hôm nay',
    'mobile.yesterday': 'Hôm qua',
    'mobile.currentPlan': 'Gói hiện tại',
    'mobile.free': 'Miễn phí',
    'mobile.memberSince': 'Tham gia từ',
    'mobile.upgradePremium': 'Nâng cấp Premium',
    'mobile.notifications': 'Thông báo',
    'mobile.personalInfo': 'Thông tin cá nhân',
    'mobile.healthTip': 'Mẹo sức khỏe',
    'mobile.healthTipText': 'Uống thuốc cùng một giờ mỗi ngày giúp cơ thể hấp thụ tốt hơn.',
    'mobile.taken': 'Đã uống',
    'mobile.markTaken': 'Đánh dấu',
    'mobile.timesPerDay': 'lần/ngày',
    'mobile.missedReminderTitle': 'Bạn có thể đã quên uống thuốc',
    'mobile.missedReminderMessage': 'Đã quá giờ uống theo lịch. Vui lòng uống ngay nếu bác sĩ đã hướng dẫn.',
    'mobile.dismissReminder': 'Bỏ qua',
    'mobile.notificationCenter': 'Thông báo',
    'mobile.noNotifications': 'Không có nhắc nhở nào',

    // Days
    'day.mon': 'T2',
    'day.tue': 'T3',
    'day.wed': 'T4',
    'day.thu': 'T5',
    'day.fri': 'T6',
    'day.sat': 'T7',
    'day.sun': 'CN',
  }
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('vi');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
