import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import {
  Bell,
  AlertTriangle,
  Clock,
  User,
  X,
  CheckCircle,
  AlertCircle,
  Info,
  Pill,
  Calendar
} from "lucide-react";

export interface Notification {
  id: string;
  type: "missed_dose" | "low_adherence" | "success" | "info";
  title: string;
  message: string;
  patientName: string;
  patientId: string;
  medication?: string;
  time: string;
  timestamp: Date;
  read: boolean;
  urgent: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "missed_dose",
    title: "Bỏ lỡ liều thuốc",
    message: "Bệnh nhân đã bỏ lỡ 3 liều thuốc trong tuần này",
    patientName: "James Williams",
    patientId: "4",
    medication: "Aspirin 100mg",
    time: "2 giờ trước",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    read: false,
    urgent: true
  },
  {
    id: "2",
    type: "missed_dose",
    title: "Không uống thuốc đúng giờ",
    message: "Bỏ lỡ liều Metformin lúc 9:00 sáng",
    patientName: "Michael Chen",
    patientId: "2",
    medication: "Metformin 500mg",
    time: "5 giờ trước",
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
    read: false,
    urgent: true
  },
  {
    id: "3",
    type: "low_adherence",
    title: "Tỷ lệ tuân thủ thấp",
    message: "Tỷ lệ tuân thủ xuống dưới 75% trong tuần này",
    patientName: "Michael Chen",
    patientId: "2",
    time: "1 ngày trước",
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
    read: false,
    urgent: false
  },
  {
    id: "4",
    type: "missed_dose",
    title: "Liên tục bỏ lỡ thuốc",
    message: "Đã bỏ lỡ cùng một loại thuốc 2 ngày liên tiếp",
    patientName: "James Williams",
    patientId: "4",
    medication: "Lisinopril 10mg",
    time: "1 ngày trước",
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
    read: true,
    urgent: true
  },
  {
    id: "5",
    type: "success",
    title: "Cải thiện tích cực",
    message: "Tỷ lệ tuân thủ đạt 100% trong 7 ngày",
    patientName: "Sarah Johnson",
    patientId: "1",
    time: "2 ngày trước",
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    read: true,
    urgent: false
  },
  {
    id: "6",
    type: "info",
    title: "Bệnh nhân mới",
    message: "Lisa Anderson đã được thêm vào danh sách theo dõi",
    patientName: "Lisa Anderson",
    patientId: "5",
    time: "3 ngày trước",
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    read: true,
    urgent: false
  }
];

interface NotificationCenterProps {
  onPatientClick?: (patientId: string) => void;
}

export function NotificationCenter({ onPatientClick }: NotificationCenterProps) {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [isOpen, setIsOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;
  const urgentCount = notifications.filter(n => !n.read && n.urgent).length;

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "missed_dose":
        return <AlertTriangle className="w-5 h-5 text-red-600" />;
      case "low_adherence":
        return <AlertCircle className="w-5 h-5 text-yellow-600" />;
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case "info":
        return <Info className="w-5 h-5 text-blue-600" />;
    }
  };

  const getNotificationColor = (type: Notification["type"]) => {
    switch (type) {
      case "missed_dose":
        return "bg-red-50 border-red-200";
      case "low_adherence":
        return "bg-yellow-50 border-yellow-200";
      case "success":
        return "bg-green-50 border-green-200";
      case "info":
        return "bg-blue-50 border-blue-200";
    }
  };

  const unreadNotifications = notifications.filter(n => !n.read);
  const readNotifications = notifications.filter(n => n.read);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
              {unreadCount}
            </div>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg p-0">
        <div className="flex flex-col h-full">
          <SheetHeader className="p-6 pb-4 border-b">
            <div className="flex items-center justify-between">
              <div>
                <SheetTitle className="text-2xl">Thông báo</SheetTitle>
                <SheetDescription>
                  {unreadCount > 0 ? (
                    <span className="text-red-600 font-medium">
                      {unreadCount} thông báo chưa đọc
                      {urgentCount > 0 && ` (${urgentCount} khẩn cấp)`}
                    </span>
                  ) : (
                    "Không có thông báo mới"
                  )}
                </SheetDescription>
              </div>
              {unreadCount > 0 && (
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={markAllAsRead}
                  className="text-blue-600"
                >
                  Đánh dấu tất cả đã đọc
                </Button>
              )}
            </div>
          </SheetHeader>

          <Tabs defaultValue="all" className="flex-1 flex flex-col">
            <TabsList className="mx-6 mt-4">
              <TabsTrigger value="all" className="flex-1">
                Tất cả ({notifications.length})
              </TabsTrigger>
              <TabsTrigger value="unread" className="flex-1">
                Chưa đọc ({unreadCount})
              </TabsTrigger>
              <TabsTrigger value="urgent" className="flex-1">
                Khẩn cấp ({urgentCount})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="flex-1 mt-0">
              <ScrollArea className="h-[calc(100vh-200px)]">
                <div className="p-6 space-y-3">
                  {notifications.length === 0 ? (
                    <div className="text-center py-12">
                      <Bell className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-500">Không có thông báo</p>
                    </div>
                  ) : (
                    <>
                      {unreadNotifications.length > 0 && (
                        <>
                          <h3 className="text-sm font-semibold text-gray-700 mb-2">Chưa đọc</h3>
                          {unreadNotifications.map(notification => (
                            <NotificationItem
                              key={notification.id}
                              notification={notification}
                              onMarkAsRead={markAsRead}
                              onDelete={deleteNotification}
                              onPatientClick={onPatientClick}
                              onClose={() => setIsOpen(false)}
                            />
                          ))}
                        </>
                      )}
                      
                      {readNotifications.length > 0 && (
                        <>
                          <h3 className="text-sm font-semibold text-gray-700 mb-2 mt-6">Đã đọc</h3>
                          {readNotifications.map(notification => (
                            <NotificationItem
                              key={notification.id}
                              notification={notification}
                              onMarkAsRead={markAsRead}
                              onDelete={deleteNotification}
                              onPatientClick={onPatientClick}
                              onClose={() => setIsOpen(false)}
                            />
                          ))}
                        </>
                      )}
                    </>
                  )}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="unread" className="flex-1 mt-0">
              <ScrollArea className="h-[calc(100vh-200px)]">
                <div className="p-6 space-y-3">
                  {unreadNotifications.length === 0 ? (
                    <div className="text-center py-12">
                      <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-3" />
                      <p className="text-gray-500">Bạn đã đọc hết thông báo!</p>
                    </div>
                  ) : (
                    unreadNotifications.map(notification => (
                      <NotificationItem
                        key={notification.id}
                        notification={notification}
                        onMarkAsRead={markAsRead}
                        onDelete={deleteNotification}
                        onPatientClick={onPatientClick}
                        onClose={() => setIsOpen(false)}
                      />
                    ))
                  )}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="urgent" className="flex-1 mt-0">
              <ScrollArea className="h-[calc(100vh-200px)]">
                <div className="p-6 space-y-3">
                  {notifications.filter(n => n.urgent && !n.read).length === 0 ? (
                    <div className="text-center py-12">
                      <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-3" />
                      <p className="text-gray-500">Không có cảnh báo khẩn cấp</p>
                    </div>
                  ) : (
                    notifications
                      .filter(n => n.urgent && !n.read)
                      .map(notification => (
                        <NotificationItem
                          key={notification.id}
                          notification={notification}
                          onMarkAsRead={markAsRead}
                          onDelete={deleteNotification}
                          onPatientClick={onPatientClick}
                          onClose={() => setIsOpen(false)}
                        />
                      ))
                  )}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>
      </SheetContent>
    </Sheet>
  );
}

interface NotificationItemProps {
  notification: Notification;
  onMarkAsRead: (id: string) => void;
  onDelete: (id: string) => void;
  onPatientClick?: (patientId: string) => void;
  onClose: () => void;
}

function NotificationItem({ 
  notification, 
  onMarkAsRead, 
  onDelete, 
  onPatientClick,
  onClose 
}: NotificationItemProps) {
  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "missed_dose":
        return <AlertTriangle className="w-5 h-5 text-red-600" />;
      case "low_adherence":
        return <AlertCircle className="w-5 h-5 text-yellow-600" />;
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case "info":
        return <Info className="w-5 h-5 text-blue-600" />;
    }
  };

  const getNotificationColor = (type: Notification["type"]) => {
    switch (type) {
      case "missed_dose":
        return "bg-red-50 border-red-200";
      case "low_adherence":
        return "bg-yellow-50 border-yellow-200";
      case "success":
        return "bg-green-50 border-green-200";
      case "info":
        return "bg-blue-50 border-blue-200";
    }
  };

  const handlePatientClick = () => {
    if (onPatientClick) {
      onPatientClick(notification.patientId);
      onClose();
    }
  };

  return (
    <Card 
      className={`p-4 border transition-all ${
        getNotificationColor(notification.type)
      } ${!notification.read ? 'shadow-md' : 'opacity-75'}`}
    >
      <div className="flex gap-3">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
          notification.type === "missed_dose" ? "bg-red-100" :
          notification.type === "low_adherence" ? "bg-yellow-100" :
          notification.type === "success" ? "bg-green-100" : "bg-blue-100"
        }`}>
          {getNotificationIcon(notification.type)}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-gray-900">{notification.title}</h3>
              {notification.urgent && !notification.read && (
                <Badge className="bg-red-600 text-white text-xs">Khẩn cấp</Badge>
              )}
            </div>
            <button
              onClick={() => onDelete(notification.id)}
              className="text-gray-400 hover:text-gray-600 flex-shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-sm text-gray-700 mb-2">{notification.message}</p>

          <div className="flex flex-wrap items-center gap-3 text-xs text-gray-600 mb-3">
            <div className="flex items-center gap-1">
              <User className="w-3 h-3" />
              <button 
                onClick={handlePatientClick}
                className="hover:text-blue-600 hover:underline font-medium"
              >
                {notification.patientName}
              </button>
            </div>
            {notification.medication && (
              <div className="flex items-center gap-1">
                <Pill className="w-3 h-3" />
                <span>{notification.medication}</span>
              </div>
            )}
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{notification.time}</span>
            </div>
          </div>

          <div className="flex gap-2">
            {!notification.read && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => onMarkAsRead(notification.id)}
                className="h-7 text-xs"
              >
                Đánh dấu đã đọc
              </Button>
            )}
            <Button
              size="sm"
              variant="outline"
              onClick={handlePatientClick}
              className="h-7 text-xs"
            >
              Xem bệnh nhân
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
