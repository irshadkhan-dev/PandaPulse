import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import React from "react";

import { Home, Gem, Key, Settings } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const AppSideBar = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
  return (
    <Sidebar {...props} variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <Link href={"/"}>
                <div className="text-xl font-medium">
                  <span className="text-brand-600">Panda</span>Pulse
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Overview</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a className="flex gap-2">
                  <Home />
                  <span>DashBoard</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Account</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a className="flex gap-2">
                  <Gem />
                  <span>Upgrade</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Setting</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem className="space-y-2">
              <SidebarMenuButton asChild>
                <a className="flex gap-2">
                  <Key />
                  <span>API key</span>
                </a>
              </SidebarMenuButton>

              <SidebarMenuButton asChild>
                <a className="flex gap-2">
                  <Settings />
                  <span>Account Setting</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <a href="" className="flex gap-2 items-center">
                <Image
                  width={30}
                  height={30}
                  alt="profile image"
                  src={"/icons/panda.png"}
                  className="rounded-full"
                />
                <span className="flex flex-col text-xs">
                  <span>Irshad Khan</span>
                  <span>irshad98031@gmail.com</span>
                </span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSideBar;
