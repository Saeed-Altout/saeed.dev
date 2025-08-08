"use client";

import * as React from "react";
import { Globe, Lock, Paintbrush, Settings, User, LogOut } from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTheme } from "@/components/theme-provider";
import { useAuthStore } from "@/lib/auth";

type SettingsSectionId =
  | "account"
  | "settings"
  | "appearance"
  | "language-region"
  | "privacy-visibility";

type NavItem = {
  id: SettingsSectionId;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
};

const NAV_ITEMS: NavItem[] = [
  { id: "account", label: "Account", icon: User },
  { id: "settings", label: "Settings", icon: Settings },
  { id: "appearance", label: "Appearance", icon: Paintbrush },
  { id: "language-region", label: "Language & region", icon: Globe },
  { id: "privacy-visibility", label: "Privacy & visibility", icon: Lock },
];

export function SettingsDialog() {
  const [open, setOpen] = React.useState(false);
  const [activeSectionId, setActiveSectionId] =
    React.useState<SettingsSectionId>("appearance");
  const { user, signOut } = useAuthStore();
  const { theme, setTheme } = useTheme();
  const [signOutAlertOpen, setSignOutAlertOpen] = React.useState(false);

  const handleThemeChange = (value: "light" | "dark" | "system"): void => {
    setTheme(value);
  };

  const userDisplayName: string = user?.name ?? "—";
  const userDisplayEmail: string = user?.email ?? "—";
  const inferredRole: string =
    (user as unknown as { role?: string })?.role ?? "User";
  const userInitials: string = React.useMemo(() => {
    const name = userDisplayName.trim();
    if (!name || name === "—") return "U";
    const parts = name.split(" ").filter(Boolean);
    const first = parts.at(0)?.[0] ?? "U";
    const last = parts.length > 1 ? (parts.at(-1)?.[0] ?? "") : "";
    return (first + last).toUpperCase();
  }, [userDisplayName]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Avatar className="size-8">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DialogTrigger>
      <DialogContent className="overflow-hidden p-0 md:max-h-[500px] md:max-w-[700px] lg:max-w-[800px]">
        <DialogTitle className="sr-only">Settings</DialogTitle>
        <DialogDescription className="sr-only">
          Customize your settings here.
        </DialogDescription>
        <SidebarProvider className="items-start">
          <Sidebar collapsible="none" className="hidden md:flex">
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {NAV_ITEMS.map((item) => (
                      <SidebarMenuItem key={item.id}>
                        <SidebarMenuButton
                          asChild
                          isActive={item.id === activeSectionId}
                        >
                          <button
                            type="button"
                            onClick={() => setActiveSectionId(item.id)}
                            className="w-full text-left"
                          >
                            <item.icon />
                            <span>{item.label}</span>
                          </button>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>
          <main className="flex h-[480px] flex-1 flex-col overflow-hidden">
            <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
              <div className="flex items-center gap-2 px-4">
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem className="hidden md:block">
                      <BreadcrumbLink href="#">Settings</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="hidden md:block" />
                    <BreadcrumbItem>
                      <BreadcrumbPage>
                        {NAV_ITEMS.find((n) => n.id === activeSectionId)?.label}
                      </BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
            </header>
            <div className="flex flex-1 flex-col gap-6 overflow-y-auto p-4 pt-0">
              {activeSectionId === "account" && (
                <section className="max-w-3xl space-y-6">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback>{userInitials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h2 className="text-lg font-semibold">Account</h2>
                      <p className="text-sm text-muted-foreground">
                        View your basic profile information.
                      </p>
                    </div>
                  </div>
                  <Separator />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" value={userDisplayName} readOnly />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={userDisplayEmail}
                        readOnly
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="role">Role</Label>
                      <Input id="role" value={inferredRole} readOnly />
                    </div>
                  </div>
                  <div className="flex items-center justify-between rounded-md border p-4">
                    <div>
                      <h3 className="font-medium">Sign out</h3>
                      <p className="text-sm text-muted-foreground">
                        You will be logged out from this device.
                      </p>
                    </div>
                    <>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => setSignOutAlertOpen(true)}
                        className="gap-2"
                      >
                        <LogOut className="h-4 w-4" />
                        Sign Out
                      </Button>
                      <AlertDialog
                        open={signOutAlertOpen}
                        onOpenChange={setSignOutAlertOpen}
                      >
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Sign out?</AlertDialogTitle>
                            <AlertDialogDescription>
                              You will be logged out from this device. You can
                              sign in again anytime.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              className="bg-destructive hover:bg-destructive/90"
                              onClick={() => {
                                try {
                                  signOut();
                                } finally {
                                  setSignOutAlertOpen(false);
                                  setOpen(false);
                                }
                              }}
                            >
                              Sign Out
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </>
                  </div>
                </section>
              )}

              {activeSectionId === "settings" && (
                <section className="max-w-3xl space-y-6">
                  <div>
                    <h2 className="text-lg font-semibold">General Settings</h2>
                    <p className="text-sm text-muted-foreground">
                      Preferences for notifications and communication.
                    </p>
                  </div>
                  <Separator />
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Checkbox id="email-updates" />
                      <div className="grid gap-1.5">
                        <Label htmlFor="email-updates">Email updates</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive occasional product news and updates.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Checkbox id="marketing" />
                      <div className="grid gap-1.5">
                        <Label htmlFor="marketing">Marketing emails</Label>
                        <p className="text-sm text-muted-foreground">
                          Get tips, resources, and offers. You can unsubscribe
                          anytime.
                        </p>
                      </div>
                    </div>
                  </div>
                </section>
              )}

              {activeSectionId === "appearance" && (
                <section className="max-w-3xl space-y-6">
                  <div>
                    <h2 className="text-lg font-semibold">Appearance</h2>
                    <p className="text-sm text-muted-foreground">
                      Customize the look and feel.
                    </p>
                  </div>
                  <Separator />
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2 col-span-1">
                      <Label>Theme</Label>
                      <Select value={theme} onValueChange={handleThemeChange}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select theme" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="light">Light</SelectItem>
                          <SelectItem value="dark">Dark</SelectItem>
                          <SelectItem value="system">System</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </section>
              )}

              {activeSectionId === "language-region" && (
                <section className="max-w-3xl space-y-6">
                  <div>
                    <h2 className="text-lg font-semibold">Language & region</h2>
                    <p className="text-sm text-muted-foreground">
                      Choose your language and regional format.
                    </p>
                  </div>
                  <Separator />
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Language</Label>
                      <Select defaultValue="en" disabled>
                        <SelectTrigger>
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="ar">Arabic</SelectItem>
                          <SelectItem value="es">Spanish</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Time zone</Label>
                      <Select defaultValue="utc" disabled>
                        <SelectTrigger>
                          <SelectValue placeholder="Select time zone" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="utc">UTC</SelectItem>
                          <SelectItem value="gmt+3">GMT+3</SelectItem>
                          <SelectItem value="pst">PST</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </section>
              )}

              {activeSectionId === "privacy-visibility" && (
                <section className="max-w-3xl space-y-6">
                  <div>
                    <h2 className="text-lg font-semibold">
                      Privacy & visibility
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Control who can see your information.
                    </p>
                  </div>
                  <Separator />
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Checkbox id="show-email" />
                      <div className="grid gap-1.5">
                        <Label htmlFor="show-email">
                          Show email on profile
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Allow others to contact you via email.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Checkbox id="discoverability" />
                      <div className="grid gap-1.5">
                        <Label htmlFor="discoverability">
                          Search discoverability
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Allow your profile to appear in search results.
                        </p>
                      </div>
                    </div>
                  </div>
                </section>
              )}
            </div>
          </main>
        </SidebarProvider>
      </DialogContent>
    </Dialog>
  );
}

SettingsDialog.displayName = "SettingsDialog";
