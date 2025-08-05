"use client";

import { queryClient } from "@/app/query-client-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import useNotifications from "@/hooks/useNotifications";
import { cn } from "@/lib/utils";
import apiClient from "@/services/api-client";
import { Bell, Check } from "lucide-react";
import { useEffect, useState } from "react";

export function NotificationDialog() {
  const [unreadCount, setUnreadCount] = useState(0);
  const { data, isLoading, error } = useNotifications();

  useEffect(() => {
    if (data?.data) {
      const count = data.data.filter((n) => n.status === "Unread").length;
      setUnreadCount(count);
    }
  }, [data]);

  const markAsRead = async (id: string) => {
    try {
      await apiClient.put(`/notifications/${id}`, { status: "Read" });
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  if (isLoading) return null;
  if (error) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 flex items-center justify-center"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80 p-0" align="end" forceMount>
        <div className="flex items-center justify-between px-4 py-2 border-b">
          <h4 className="font-semibold text-sm">Notifications</h4>
          <Button
            variant="ghost"
            size="sm"
            disabled={unreadCount === 0}
            className="text-xs text-muted-foreground hover:text-primary"
          >
            Mark all as read
          </Button>
        </div>

        <ScrollArea className="h-72">
          {!data?.data || data.data.length === 0 ? (
            <div className="p-4 text-center text-sm text-muted-foreground">
              No notifications found
            </div>
          ) : (
            data.data.map((notification) => (
              <DropdownMenuItem
                key={notification._id}
                className={cn(
                  "flex flex-col items-start gap-1 p-3 border-b cursor-pointer",
                  notification.status === "Unread" && "bg-muted/50"
                )}
                onClick={() => markAsRead(notification._id)}
              >
                <div className="flex items-center justify-between w-full">
                  <p className="font-medium text-sm">{notification.title}</p>
                  {notification.status === "Unread" && (
                    <span className="h-2 w-2 rounded-full bg-primary" />
                  )}
                </div>
                <p className="!text-xs text-muted-foreground">
                  {notification.description.slice(0, 60)}...
                </p>
                <div className="flex items-center justify-between w-full mt-1">
                  <time className="text-xs text-muted-foreground">
                    {new Date(notification.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </time>
                  {notification.status === "Unread" && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 text-muted-foreground hover:text-primary"
                      onClick={(e) => {
                        e.stopPropagation();
                        markAsRead(notification._id);
                      }}
                    >
                      <Check className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              </DropdownMenuItem>
            ))
          )}
        </ScrollArea>

        <div className="p-2 text-center border-t">
          <Button variant="ghost" size="sm" className="text-xs">
            View all notifications
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
