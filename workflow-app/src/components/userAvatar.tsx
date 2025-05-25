"use client"

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { User } from "@/types/interfaces";
import avatarColors from "@/lib/colors/avatar-colors";

interface UserAvatarProps {
  user: User;
  size?: number; // opcional para definir tamaño
}
import { useEffect, useState } from "react";

export const UserAvatar = ({ user, size = 40 }: UserAvatarProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div style={{ width: size, height: size }} />;
  }

  const initial = user.first_name.charAt(0).toUpperCase();
  const bgColor = avatarColors[initial] || "#000";

  const avatarUrl = user.profile?.avatar_url;

  return (
    <Avatar
      className="border border-gray-200"
      style={{ width: size, height: size, backgroundColor: avatarUrl ? undefined : bgColor }}
    >
      {avatarUrl ? (
        <AvatarImage src={avatarUrl} alt="Avatar" />
      ) : (
        <AvatarFallback className="text-text-primary font-semibold">{initial}</AvatarFallback>
      )}
    </Avatar>
  );
};
